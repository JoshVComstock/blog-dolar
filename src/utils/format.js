const DATE_ONLY = /T00:00:00(\.000)?Z$/;

export const formatFigure = (value, locale, decimals) => {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

export const formatDelta = (value, locale, decimals) => {
  if (!Number.isFinite(value)) return null;
  const sign = value > 0 ? '+' : value < 0 ? '−' : '±';
  return (
    sign +
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(Math.abs(value))
  );
};

export const formatPercent = (value, locale) => {
  if (!Number.isFinite(value)) return null;
  const sign = value > 0 ? '+' : value < 0 ? '−' : '±';
  return (
    sign +
    new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
      Math.abs(value)
    ) +
    ' %'
  );
};

export const formatCompact = (value, locale) => {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(
    value
  );
};

export const formatStamp = (iso, timezone) => {
  if (!iso) return 'sin registro';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'sin registro';
  const options = DATE_ONLY.test(iso)
    ? { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }
    : {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezone || 'UTC'
      };
  return new Intl.DateTimeFormat('es', options).format(date).replace(/\./g, '').replace(/,\s*/g, ' ');
};

export const isDateOnly = (iso) => Boolean(iso) && DATE_ONLY.test(iso);

export const isoDate = (iso) => {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

export const isoDay = (iso) => {
  const full = isoDate(iso);
  return full ? full.slice(0, 10) : null;
};

export const trendWord = (value) => {
  if (!Number.isFinite(value) || value === 0) return 'sin cambio';
  return value > 0 ? 'subió' : 'bajó';
};

export const formatDay = (iso) => {
  if (!iso) return '—';
  const date = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short', timeZone: 'UTC' })
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
