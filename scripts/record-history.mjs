import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'data/history.json');
const MAX_POINTS = 1200;

const RATES = {
  ar: 'https://dolarapi.com/v1/dolares',
  bo: 'https://bo.dolarapi.com/v1/dolares',
  ve: 'https://ve.dolarapi.com/v1/dolares',
  cl: 'https://cl.dolarapi.com/v1/cotizaciones',
  co: 'https://co.dolarapi.com/v1/cotizaciones',
  mx: 'https://mx.dolarapi.com/v1/cotizaciones',
  uy: 'https://uy.dolarapi.com/v1/cotizaciones'
};

const CURRENCIES = {
  ar: 'ARS',
  bo: 'BOB',
  ve: 'VES',
  cl: 'CLP',
  co: 'COP',
  mx: 'MXN',
  pe: 'PEN',
  uy: 'UYU'
};

const FX_FALLBACK = 'https://open.er-api.com/v6/latest/USD';
const FALLBACK_CURRENCY = { pe: 'PEN' };
const P2P = 'https://criptoya.com/api/USDT/';

const fetchJson = async (url) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { accept: 'application/json' }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

const toNumber = (value) => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : null;
};

const load = () => {
  try {
    const parsed = JSON.parse(readFileSync(target, 'utf8'));
    return parsed && parsed.series ? parsed : { series: {} };
  } catch {
    return { series: {} };
  }
};

const upsert = (series, key, date, value) => {
  if (!Number.isFinite(value)) return 0;
  if (!series[key]) series[key] = [];
  const list = series[key];
  const existing = list.find((point) => point.d === date);
  if (existing) {
    if (existing.v === value) return 0;
    existing.v = value;
    return 1;
  }
  list.push({ d: date, v: value });
  list.sort((a, b) => (a.d < b.d ? -1 : 1));
  if (list.length > MAX_POINTS) list.splice(0, list.length - MAX_POINTS);
  return 1;
};

const recordRates = async (series, today) => {
  let written = 0;
  let reached = 0;

  for (const [code, url] of Object.entries(RATES)) {
    const payload = await fetchJson(url);
    if (!Array.isArray(payload)) {
      console.log('  ' + code + ': sin respuesta');
      continue;
    }
    reached += 1;
    for (const entry of payload) {
      if (entry.moneda && entry.moneda !== 'USD') continue;
      const variant = String(entry.casa || entry.fuente || 'mercado').toLowerCase();
      const value = toNumber(entry.venta) ?? toNumber(entry.promedio) ?? toNumber(entry.fix);
      written += upsert(series, code + ':' + variant, today, value);
    }
  }

  return { written, reached };
};

const recordFallback = async (series, today) => {
  const payload = await fetchJson(FX_FALLBACK);
  if (!payload || !payload.rates) return 0;

  let written = 0;
  for (const [code, currency] of Object.entries(FALLBACK_CURRENCY)) {
    written += upsert(series, code + ':referencia', today, toNumber(payload.rates[currency]));
  }
  return written;
};

const recordP2P = async (series, today) => {
  let written = 0;

  for (const [code, currency] of Object.entries(CURRENCIES)) {
    const payload = await fetchJson(P2P + currency + '/100');
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) continue;

    const prices = Object.values(payload)
      .map((entry) => (entry && typeof entry === 'object' ? toNumber(entry.totalAsk ?? entry.ask) : null))
      .filter((value) => value !== null && value > 0);

    if (prices.length < 2) continue;

    const average = prices.reduce((sum, value) => sum + value, 0) / prices.length;
    written += upsert(series, code + ':p2p', today, Number(average.toFixed(4)));
    written += upsert(series, code + ':p2p-min', today, Math.min(...prices));
  }

  return written;
};

const run = async () => {
  const db = load();
  const today = new Date().toISOString().slice(0, 10);

  const rates = await recordRates(db.series, today);
  const fallback = await recordFallback(db.series, today);
  const p2p = await recordP2P(db.series, today);

  writeFileSync(target, JSON.stringify(db, null, 2) + '\n', 'utf8');

  const total = Object.values(db.series).reduce((sum, list) => sum + list.length, 0);
  console.log(
    `historial: ${rates.reached} fuentes leidas, ${rates.written + fallback + p2p} lecturas nuevas, ` +
      `${Object.keys(db.series).length} series, ${total} puntos`
  );
};

run();
