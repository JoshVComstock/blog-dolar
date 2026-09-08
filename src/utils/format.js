export const formatFigure = (value, locale, decimals) => {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

export const formatDelta = (value, locale, decimals) => {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  const sign = value > 0 ? '+' : value < 0 ? '−' : '±';
  const magnitude = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(Math.abs(value));
  return sign + magnitude;
};

export const formatPercent = (value, locale) => {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  const sign = value > 0 ? '+' : value < 0 ? '−' : '±';
  const magnitude = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(value));
  return sign + magnitude + ' %';
};

export const formatCompact = (value, locale) => {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
};

export const formatStamp = (iso, timezone) => {
  if (!iso) return 'SIN REGISTRO';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'SIN REGISTRO';
  return new Intl.DateTimeFormat('es', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone || 'UTC'
  })
    .format(date)
    .replace(/\./g, '')
    .replace(/,\s*/g, ' ')
    .toUpperCase();
};

export const isoDate = (iso) => {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

export const trendWord = (value) => {
  if (value === null || value === undefined || !Number.isFinite(value) || value === 0)
    return 'sin cambio';
  return value > 0 ? 'sube' : 'baja';
};

export const formatDay = (iso) => {
  if (!iso) return '—';
  const date = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('es', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC'
  })
    .format(date)
    .replace(/\./g, '');
};

export const formatLongDay = (iso) => {
  if (!iso) return '';
  const date = new Date(iso.length === 10 ? iso + 'T00:00:00Z' : iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
};
