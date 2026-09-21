import { formatFigure, isoDate } from './format.js';
import { SITE } from './site.js';

export { SITE };

export const absolute = (path) => new URL(path, SITE).href;

export const organization = {
  '@type': 'Organization',
  '@id': `${SITE}/#organizacion`,
  name: 'Cambio Claro',
  url: SITE,
  logo: `${SITE}/og/default.png`,
  description:
    'Precio del dólar oficial y paralelo en ocho países de Latinoamérica, con la hora exacta de cada medición.'
};

export const breadcrumb = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absolute(item.path)
  }))
});

export const faqPage = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  }))
});

export const exchangeRate = (country, rate, canonical) => ({
  '@context': 'https://schema.org',
  '@type': 'ExchangeRateSpecification',
  '@id': `${absolute(canonical)}#tipo-de-cambio`,
  name: `Dólar estadounidense a ${country.currencyName}`,
  currency: 'USD',
  currentExchangeRate: {
    '@type': 'UnitPriceSpecification',
    price: Number(rate.sell.toFixed(country.decimals)),
    priceCurrency: country.currency,
    validFrom: isoDate(rate.updatedAt) || undefined
  },
  exchangeRateSpread:
    Number.isFinite(rate.buy) && Number.isFinite(rate.sell)
      ? Number((rate.sell - rate.buy).toFixed(country.decimals))
      : undefined,
  provider: organization
});

export const dataset = (country, canonical, measuredAt, firstDate) => ({
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  '@id': `${absolute(canonical)}#dataset`,
  name: `Cotizaciones del dólar en ${country.name}`,
  description: `Serie de cotizaciones oficiales y paralelas del dólar estadounidense frente al ${country.currencyName.toLowerCase()}, con la hora de cada medición.`,
  url: absolute(canonical),
  keywords: ['dólar', country.name, country.currency, 'tipo de cambio', 'mercado paralelo'],
  inLanguage: 'es',
  isAccessibleForFree: true,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  creator: organization,
  dateModified: isoDate(measuredAt) || undefined,
  temporalCoverage: firstDate ? `${firstDate}/..` : undefined,
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: absolute(`/api/v1/${country.code}/rates.json`)
    }
  ]
});

export const webPage = (title, description, canonical, modifiedTime) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absolute(canonical)}#pagina`,
  name: title,
  description,
  url: absolute(canonical),
  inLanguage: 'es',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE}/#sitio` },
  publisher: organization,
  dateModified: isoDate(modifiedTime) || undefined
});

export const website = (description) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#sitio`,
  name: 'Cambio Claro',
  url: SITE,
  description,
  inLanguage: 'es',
  publisher: organization
});

export const answerSentence = (country, primary, official, parallel, spread) => {
  const amount = (value) => `${country.symbol} ${formatFigure(value, country.locale, country.decimals)}`;

  if (official && parallel && spread) {
    const side = spread.value >= 0 ? 'por encima' : 'por debajo';
    const gap = Math.abs(spread.value).toFixed(1).replace('.', ',');
    return `En el mercado ${parallel.label.toLowerCase()} de ${country.name} te pagan ${amount(parallel.buy)} por cada dólar y te cobran ${amount(parallel.sell)}, un ${gap} % ${side} del oficial de ${amount(official.sell)}.`;
  }

  if (primary) {
    return `En ${country.name} te pagan ${amount(primary.buy)} por cada dólar y te cobran ${amount(primary.sell)}, al cambio ${primary.label.toLowerCase()}.`;
  }

  return `Ahora mismo no tenemos una cotización del dólar para ${country.name}.`;
};

export const priceTitle = (country, official, parallel, primary) => {
  const money = (rate) =>
    `${country.symbol} ${formatFigure(rate.buy ?? rate.sell, country.locale, country.decimals)}`;

  if (official && parallel) {
    return `Dólar hoy en ${country.name}: ${money(parallel)} paralelo · ${money(official)} oficial`;
  }
  if (primary) {
    return `Dólar hoy en ${country.name}: ${money(primary)} ${primary.label.toLowerCase()}`;
  }
  return `Dólar hoy en ${country.name} — cotización y tipo de cambio`;
};

export const stampShort = (iso, timezone) => {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('es', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone || 'UTC'
  }).format(date);
};

export const speakable = (canonical) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absolute(canonical)}#speakable`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '[data-respuesta]']
  },
  url: absolute(canonical)
});
