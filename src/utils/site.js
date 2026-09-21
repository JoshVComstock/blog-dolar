const raw =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PUBLIC_SITE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.PUBLIC_SITE_URL) ||
  'http://localhost:4321';

export const SITE = String(raw).replace(/\/+$/, '');

export const url = (path) => new URL(path, SITE + '/').href;
