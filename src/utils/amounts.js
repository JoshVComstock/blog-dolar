export const AMOUNTS = [1, 5, 10, 20, 50, 100, 150, 200, 500, 1000, 2000, 5000, 10000];

export const PLURALS = {
  BOB: 'bolivianos',
  ARS: 'pesos-argentinos',
  VES: 'bolivares',
  COP: 'pesos-colombianos',
  MXN: 'pesos-mexicanos',
  PEN: 'soles',
  CLP: 'pesos-chilenos',
  UYU: 'pesos-uruguayos'
};

export const READABLE = {
  BOB: 'bolivianos',
  ARS: 'pesos argentinos',
  VES: 'bolívares',
  COP: 'pesos colombianos',
  MXN: 'pesos mexicanos',
  PEN: 'soles',
  CLP: 'pesos chilenos',
  UYU: 'pesos uruguayos'
};

export const SINGULAR = {
  BOB: 'boliviano',
  ARS: 'peso argentino',
  VES: 'bolívar',
  COP: 'peso colombiano',
  MXN: 'peso mexicano',
  PEN: 'sol',
  CLP: 'peso chileno',
  UYU: 'peso uruguayo'
};

const slugOf = (currency) => PLURALS[currency] || currency.toLowerCase();

export const forwardSlug = (amount, currency) => `${amount}-dolares-a-${slugOf(currency)}`;

export const reverseSlug = (amount, currency) => `${amount}-${slugOf(currency)}-a-dolares`;

export const conversionSlug = forwardSlug;

export const parseConversion = (slug, currency) => {
  const money = slugOf(currency);

  const forward = new RegExp(`^(\\d+)-dolares-a-${money}$`).exec(slug);
  if (forward) {
    const amount = Number(forward[1]);
    return AMOUNTS.includes(amount) ? { amount, direction: 'usd-local' } : null;
  }

  const reverse = new RegExp(`^(\\d+)-${money}-a-dolares$`).exec(slug);
  if (reverse) {
    const amount = Number(reverse[1]);
    return AMOUNTS.includes(amount) ? { amount, direction: 'local-usd' } : null;
  }

  return null;
};
