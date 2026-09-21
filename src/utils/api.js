import { COUNTRIES, COUNTRY_CODES } from './countries.js';
import { readOwnSeries, previousPoint } from './history.js';
import { fetchP2P, p2pSummary, p2pReference } from './p2p.js';
import { fetchUsdRates } from './fx.js';

const FX_FALLBACK = 'https://open.er-api.com/v6/latest/USD';
const TIMEOUT = 12000;
const SERIES_DAYS = 180;

const memo = new Map();

const withMemo = (key, loader) => {
  if (!memo.has(key)) memo.set(key, loader());
  return memo.get(key);
};

export const fetchJson = async (url, headers) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: Object.assign({ accept: 'application/json' }, headers || {})
    });
    if (!response.ok) return null;
    const payload = await response.json();
    if (payload && payload.success === false) return null;
    return payload;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

const RATE_ENDPOINTS = {
  ar: 'https://dolarapi.com/v1/dolares',
  bo: 'https://bo.dolarapi.com/v1/dolares',
  ve: 'https://ve.dolarapi.com/v1/dolares',
  cl: 'https://cl.dolarapi.com/v1/cotizaciones',
  co: 'https://co.dolarapi.com/v1/cotizaciones',
  mx: 'https://mx.dolarapi.com/v1/cotizaciones',
  uy: 'https://uy.dolarapi.com/v1/cotizaciones',
  pe: null
};

const VARIANT_LABELS = {
  oficial: 'Oficial',
  blue: 'Blue',
  paralelo: 'Paralelo',
  binance: 'Paralelo digital',
  bolsa: 'MEP / Bolsa',
  contadoconliqui: 'Contado con liqui',
  mayorista: 'Mayorista',
  cripto: 'Cripto',
  tarjeta: 'Tarjeta',
  mercado: 'Dólar de mercado'
};

const VARIANT_NOTES = {
  oficial: 'Lo fija o publica la autoridad monetaria y rige las operaciones bancarias.',
  blue: 'Mercado informal, sin respaldo regulatorio.',
  paralelo: 'Promedio de operaciones informales, sin respaldo institucional.',
  binance: 'Referencia de intercambio digital entre personas.',
  tarjeta: 'Oficial más los impuestos al consumo en el exterior.',
  bolsa: 'Sale de comprar y vender bonos en pesos y en dólares.',
  contadoconliqui: 'Operación que liquida los dólares fuera del país.',
  mayorista: 'Precio entre bancos, no disponible al público.',
  cripto: 'Promedio de operaciones con stablecoins.',
  mercado: 'Precio de referencia del mercado formal.'
};

const INDICATIVE = new Set(['binance', 'cripto', 'blue', 'paralelo', 'referencia']);

const PRIMARY_VARIANT = { ar: 'blue', bo: 'oficial', ve: 'paralelo' };

const toNumber = (value) => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : null;
};

const today = () => new Date().toISOString().slice(0, 10);

const FRESH_DAYS = 3;

const comparison = (entry, code, key, sell) => {
  const closing = toNumber(entry.ultimoCierre);
  if (closing !== null) return { value: closing, days: 1, since: null };

  const point = previousPoint(code, key, today());
  if (!point) return null;
  return { value: point.value, days: point.days, since: point.days > FRESH_DAYS ? point.date : null };
};

const normalizeEntry = (entry, code) => {
  const key = String(entry.casa || entry.fuente || 'mercado').toLowerCase();
  const sell = toNumber(entry.venta) ?? toNumber(entry.promedio) ?? toNumber(entry.fix);
  if (sell === null) return null;

  const buy = toNumber(entry.compra) ?? toNumber(entry.promedio) ?? sell;
  const before = comparison(entry, code, key, sell);
  const previous = before ? before.value : null;

  return {
    key,
    label: VARIANT_LABELS[key] || entry.nombre || 'Referencia',
    note: VARIANT_NOTES[key] || '',
    buy,
    sell,
    previous,
    previousDate: before ? before.since : null,
    previousDays: before ? before.days : null,
    change: previous !== null ? sell - previous : null,
    changePct: previous !== null && previous !== 0 ? ((sell - previous) / previous) * 100 : null,
    updatedAt: entry.fechaActualizacion || null,
    indicative: INDICATIVE.has(key),
    source: code === 'ar' ? 'dolarapi.com' : code + '.dolarapi.com'
  };
};

const fromFallbackFx = async (country) => {
  const payload = await withMemo('fx-fallback', () => fetchJson(FX_FALLBACK));
  const rate = payload && payload.rates ? toNumber(payload.rates[country.currency]) : null;
  if (rate === null) return [];

  const point = previousPoint(country.code, 'referencia', today());
  const previous = point ? point.value : null;

  return [
    {
      key: 'referencia',
      label: 'Referencia de mercado',
      note: 'Promedio internacional de cierre, no es una cotización de mostrador.',
      buy: rate,
      sell: rate,
      previous,
      previousDate: point && point.days > 3 ? point.date : null,
      previousDays: point ? point.days : null,
      change: previous !== null ? rate - previous : null,
      changePct: previous !== null && previous !== 0 ? ((rate - previous) / previous) * 100 : null,
      updatedAt: payload.time_last_update_utc
        ? new Date(payload.time_last_update_utc).toISOString()
        : null,
      indicative: true,
      source: 'open.er-api.com'
    }
  ];
};

export const fetchRates = async (code) => {
  const country = COUNTRIES[code];
  if (!country) return [];

  const endpoint = RATE_ENDPOINTS[code];
  if (!endpoint) return fromFallbackFx(country);

  const payload = await withMemo('rates-' + code, () => fetchJson(endpoint));
  if (!Array.isArray(payload)) return fromFallbackFx(country);

  const entries = payload
    .filter((entry) => !entry.moneda || entry.moneda === 'USD')
    .map((entry) => normalizeEntry(entry, code))
    .filter(Boolean);

  return entries.length ? entries : fromFallbackFx(country);
};

const SPANISH_MONTHS = {
  ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
  jul: 6, ago: 7, sep: 8, set: 8, oct: 9, nov: 10, dic: 11
};

const trimSeries = (points) =>
  points
    .filter((point) => point && point.date && Number.isFinite(point.value))
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(-SERIES_DAYS);

const isoFromParts = (year, month, day) =>
  new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);

const seriesLoaders = {
  ar: async () => {
    const payload = await fetchJson('https://api.argentinadatos.com/v1/cotizaciones/dolares/blue');
    if (!Array.isArray(payload)) return null;
    return {
      source: 'argentinadatos.com',
      label: 'Blue',
      points: trimSeries(payload.map((row) => ({ date: row.fecha, value: toNumber(row.venta) })))
    };
  },
  cl: async () => {
    const payload = await fetchJson('https://mindicador.cl/api/dolar/' + new Date().getUTCFullYear());
    if (!payload || !Array.isArray(payload.serie)) return null;
    return {
      source: 'mindicador.cl',
      label: 'Observado',
      points: trimSeries(
        payload.serie.map((row) => ({
          date: String(row.fecha).slice(0, 10),
          value: toNumber(row.valor)
        }))
      )
    };
  },
  co: async () => {
    const payload = await fetchJson(
      'https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=400&$order=vigenciadesde%20DESC'
    );
    if (!Array.isArray(payload)) return null;
    return {
      source: 'datos.gov.co',
      label: 'TRM',
      points: trimSeries(
        payload.map((row) => ({
          date: String(row.vigenciadesde).slice(0, 10),
          value: toNumber(row.valor)
        }))
      )
    };
  },
  pe: async () => {
    const to = new Date();
    const from = new Date(to.getTime() - SERIES_DAYS * 86400000);
    const stamp = (date) => date.toISOString().slice(0, 10);
    const payload = await fetchJson(
      'https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04640PD/json/' +
        stamp(from) + '/' + stamp(to)
    );
    if (!payload || !Array.isArray(payload.periods)) return null;
    const points = payload.periods
      .map((period) => {
        const parts = String(period.name).split('.');
        if (parts.length !== 3) return null;
        const month = SPANISH_MONTHS[parts[1].toLowerCase().slice(0, 3)];
        if (month === undefined) return null;
        const value = toNumber(period.values && period.values[0]);
        if (value === null) return null;
        return { date: isoFromParts(2000 + Number(parts[2]), month, Number(parts[0])), value };
      })
      .filter(Boolean);
    return { source: 'bcrp.gob.pe', label: 'SBS venta', points: trimSeries(points) };
  },
  mx: async () => {
    const to = new Date();
    const from = new Date(to.getTime() - SERIES_DAYS * 86400000);
    const stamp = (date) => date.toISOString().slice(0, 10);
    const payload = await fetchJson(
      'https://api.frankfurter.dev/v1/' + stamp(from) + '..' + stamp(to) + '?base=USD&symbols=MXN'
    );
    if (!payload || !payload.rates) return null;
    return {
      source: 'frankfurter.dev',
      label: 'Referencia BCE',
      points: trimSeries(
        Object.keys(payload.rates).map((date) => ({
          date,
          value: toNumber(payload.rates[date].MXN)
        }))
      )
    };
  }
};

export const fetchSeries = async (code, primaryKey) => {
  const loader = seriesLoaders[code];
  if (loader) {
    const external = await withMemo('series-' + code, loader);
    if (external && external.points.length > 2) return Object.assign({ own: false }, external);
  }
  const own = readOwnSeries(code, primaryKey);
  if (own.points.length > 1) {
    return { source: 'registro propio', label: own.label, points: own.points, own: true };
  }
  return null;
};

const pickPrimary = (code, rates) => {
  if (!rates.length) return null;
  const preferred = PRIMARY_VARIANT[code];
  return (preferred && rates.find((rate) => rate.key === preferred)) || rates[0];
};

const computeSpread = (rates) => {
  const official = rates.find((rate) => rate.key === 'oficial');
  const parallel = rates.find((rate) => rate.indicative && rate.key !== 'oficial');
  if (!official || !parallel || !official.sell) return null;
  return {
    label: parallel.label,
    official: official.sell,
    parallel: parallel.sell,
    value: ((parallel.sell - official.sell) / official.sell) * 100
  };
};

const P2P_DERIVED = new Set(['binance', 'cripto', 'paralelo']);

const withP2PReference = (rates, reference, code) => {
  const target = rates.find((rate) => P2P_DERIVED.has(rate.key));
  if (!target) return rates;

  const before = previousPoint(code, 'p2p', today());
  const previous = before ? before.value : target.previous;

  const replacement = {
    ...target,
    buy: reference.buy,
    sell: reference.sell,
    previous,
    previousDate: before && before.days > 3 ? before.date : null,
    previousDays: before ? before.days : null,
    change: previous !== null && previous !== undefined ? reference.sell - previous : null,
    changePct:
      previous !== null && previous !== undefined && previous !== 0
        ? ((reference.sell - previous) / previous) * 100
        : null,
    updatedAt: reference.updatedAt || target.updatedAt,
    source: 'criptoya.com',
    platforms: reference.count
  };

  return rates.map((rate) => (rate.key === target.key ? replacement : rate));
};

export const fetchBoard = async (code, options) => {
  const country = COUNTRIES[code];
  if (!country) return null;

  const settings = options || {};
  const wantsSeries = settings.series !== false;
  const wantsP2P = settings.p2p !== false;
  const wantsFx = settings.fx !== false;

  const [baseRates, p2pRows, fx] = await Promise.all([
    fetchRates(code),
    wantsP2P
      ? withMemo('p2p-' + code, () => fetchP2P(country.currency, fetchJson))
      : Promise.resolve([]),
    wantsFx ? withMemo('fx-cross', () => fetchUsdRates(fetchJson)) : Promise.resolve(null)
  ]);

  const reference = wantsP2P ? p2pReference(p2pRows) : null;
  const rates = reference ? withP2PReference(baseRates, reference, code) : baseRates;

  const primary = pickPrimary(code, rates);
  const stamps = rates.map((rate) => rate.updatedAt).filter(Boolean).sort();
  const series = wantsSeries && primary ? await fetchSeries(code, primary.key) : null;

  return {
    country,
    rates,
    primary,
    profile: Object.assign({}, country.fallbackProfile),
    series,
    p2p: p2pRows,
    p2pSummary: p2pSummary(p2pRows),
    fx,
    spread: computeSpread(rates),
    available: Boolean(primary),
    measuredAt: stamps.length ? stamps[stamps.length - 1] : null
  };
};

export const fetchAllBoards = async (options) => {
  const boards = await Promise.all(COUNTRY_CODES.map((code) => fetchBoard(code, options)));
  return boards.filter(Boolean);
};
