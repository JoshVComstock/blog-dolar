const SLUGS = {
  oficial: 'dolar-oficial',
  blue: 'dolar-blue',
  paralelo: 'dolar-paralelo',
  binance: 'dolar-paralelo-digital',
  bolsa: 'dolar-mep',
  contadoconliqui: 'dolar-contado-con-liqui',
  mayorista: 'dolar-mayorista',
  cripto: 'dolar-cripto',
  tarjeta: 'dolar-tarjeta',
  mercado: 'dolar-mercado'
};

const ALIASES = {
  oficial: ['tipo de cambio oficial', 'dólar banco'],
  blue: ['dólar informal', 'dólar paralelo'],
  paralelo: ['dólar blue', 'dólar informal', 'dólar negro'],
  binance: ['dólar blue', 'dólar paralelo', 'USDT'],
  bolsa: ['dólar bolsa', 'MEP'],
  contadoconliqui: ['CCL', 'dólar cable'],
  mayorista: ['dólar interbancario'],
  cripto: ['dólar USDT', 'dólar stablecoin'],
  tarjeta: ['dólar turista', 'dólar ahorro'],
  mercado: ['tipo de cambio de mercado']
};

const EXPLAINERS = {
  oficial:
    'Es el precio que publica o fija la autoridad monetaria. Rige las operaciones bancarias reguladas y es el que aparece en el comprobante de un banco.',
  blue:
    'Se pacta en el mercado informal, cara a cara o por transferencia entre particulares. Nadie lo publica de forma oficial: el precio sale de promediar operaciones reales.',
  paralelo:
    'Se forma fuera del canal oficial, en operaciones entre particulares y plataformas digitales. Ninguna entidad lo publica, así que siempre es una referencia construida.',
  binance:
    'Sale de operaciones de intercambio digital entre personas, casi siempre comprando y vendiendo la stablecoin USDT. Es la referencia más líquida cuando no hay mercado formal.',
  bolsa:
    'Surge de comprar un bono en moneda local y venderlo en dólares dentro del país. Es legal y bancarizado, pero tiene comisiones y plazos de liquidación.',
  contadoconliqui:
    'Misma operación que el MEP, pero el bono se vende en el exterior, así que los dólares quedan fuera del país. Suele cotizar por encima del MEP.',
  mayorista:
    'Es el precio al que operan bancos y grandes empresas entre sí. No está disponible para una persona que va a una ventanilla.',
  cripto:
    'Promedio de operaciones con stablecoins en exchanges. Se mueve las veinticuatro horas, también fines de semana.',
  tarjeta:
    'Es el oficial más los impuestos que se cobran al consumo en el exterior. Es el que te aplican cuando pagas con tarjeta fuera del país.',
  mercado:
    'Precio de referencia del mercado formal, el que usan bancos y casas de cambio como base antes de aplicar su margen.'
};

export const variantSlug = (key) => SLUGS[key] || null;

export const variantAliases = (key) => ALIASES[key] || [];

export const variantExplainer = (key) => EXPLAINERS[key] || '';

export const parseVariantSlug = (slug, rates) => {
  const match = rates.find((rate) => SLUGS[rate.key] === slug);
  return match || null;
};
