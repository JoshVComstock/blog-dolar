import raw from '../../data/history.json';

const store = raw && raw.series ? raw.series : {};

export const seriesKey = (code, variantKey) => code + ':' + variantKey;

const points = (code, variantKey) => {
  const list = store[seriesKey(code, variantKey)];
  return Array.isArray(list) ? list.filter((p) => p && p.d && Number.isFinite(p.v)) : [];
};

export const readOwnSeries = (code, variantKey) => ({
  label: 'Registro propio',
  points: points(code, variantKey).map((p) => ({ date: p.d, value: p.v }))
});

export const previousValue = (code, variantKey, today) => {
  const earlier = points(code, variantKey).filter((p) => p.d < today);
  return earlier.length ? earlier[earlier.length - 1].v : null;
};

export const ownSeriesLength = (code, variantKey) => points(code, variantKey).length;

export const firstRecordedDate = () => {
  const dates = Object.values(store)
    .flat()
    .map((p) => p && p.d)
    .filter(Boolean)
    .sort();
  return dates.length ? dates[0] : null;
};

export const recordedSeriesCount = () => Object.keys(store).length;
