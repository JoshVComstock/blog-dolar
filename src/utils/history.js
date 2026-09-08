import raw from '../../data/history.json';

const store = raw && raw.series ? raw.series : {};

export const seriesKey = (code, variantKey) => code + ':' + variantKey;

export const readOwnSeries = (code, variantKey) => {
  const points = store[seriesKey(code, variantKey)];
  return {
    label: 'Registro propio',
    points: Array.isArray(points)
      ? points
          .filter((point) => point && point.d && Number.isFinite(point.v))
          .map((point) => ({ date: point.d, value: point.v }))
      : []
  };
};

export const ownSeriesLength = (code, variantKey) => readOwnSeries(code, variantKey).points.length;

export const firstRecordedDate = () => {
  const dates = Object.values(store)
    .flat()
    .map((point) => point && point.d)
    .filter(Boolean)
    .sort();
  return dates.length ? dates[0] : null;
};

export const recordedSeriesCount = () => Object.keys(store).length;
