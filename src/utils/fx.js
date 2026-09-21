const CROSSES = {
  EUR: { slug: 'euro', name: 'euro', plural: 'euros', symbol: '€', reason: 'remesas desde España' },
  ARS: {
    slug: 'peso-argentino',
    name: 'peso argentino',
    plural: 'pesos argentinos',
    symbol: '$',
    reason: 'frontera y viajes a Argentina'
  },
  CLP: {
    slug: 'peso-chileno',
    name: 'peso chileno',
    plural: 'pesos chilenos',
    symbol: '$',
    reason: 'remesas desde el norte de Chile'
  },
  BRL: { slug: 'real-brasileno', name: 'real brasileño', plural: 'reales', symbol: 'R$', reason: 'comercio con Brasil' },
  PEN: { slug: 'sol-peruano', name: 'sol peruano', plural: 'soles', symbol: 'S/', reason: 'frontera con Perú' }
};

export const CROSS_CODES = Object.keys(CROSSES);

export const crossInfo = (code) => CROSSES[code] || null;

export const crossSlug = (code, currency, plural) =>
  `${CROSSES[code].slug}-a-${plural[currency] || currency.toLowerCase()}`;

export const parseCrossSlug = (slug, currency, plural) => {
  const suffix = `-a-${plural[currency] || currency.toLowerCase()}`;
  if (!slug.endsWith(suffix)) return null;
  const head = slug.slice(0, -suffix.length);
  const code = CROSS_CODES.find((item) => CROSSES[item].slug === head);
  return code && code !== currency ? code : null;
};

export const fetchUsdRates = async (loader) => {
  const payload = await loader('https://open.er-api.com/v6/latest/USD');
  if (!payload || !payload.rates) return null;

  const rates = {};
  for (const code of CROSS_CODES) {
    const value = Number(payload.rates[code]);
    if (Number.isFinite(value) && value > 0) rates[code] = value;
  }

  return {
    rates,
    updatedAt: payload.time_last_update_utc
      ? new Date(payload.time_last_update_utc).toISOString()
      : null,
    source: 'open.er-api.com'
  };
};

export const crossRate = (usdPerForeign, localPerUsd) => {
  if (!Number.isFinite(usdPerForeign) || usdPerForeign <= 0) return null;
  if (!Number.isFinite(localPerUsd) || localPerUsd <= 0) return null;
  return localPerUsd / usdPerForeign;
};
