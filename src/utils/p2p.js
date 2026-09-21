const ENDPOINT = 'https://criptoya.com/api/';
const ASSETS = ['USDT', 'USDC'];

const PLATFORMS = {
  binancep2p: 'Binance P2P',
  eldoradop2p: 'El Dorado',
  bybitp2p: 'Bybit P2P',
  bitgetp2p: 'Bitget P2P',
  mexcp2p: 'MEXC P2P',
  okexp2p: 'OKX P2P',
  huobip2p: 'HTX P2P',
  paxfulp2p: 'Paxful',
  vitawallet: 'Vita Wallet',
  vibrant: 'Vibrant',
  saldo: 'Saldo',
  fiwind: 'Fiwind',
  lemoncash: 'Lemon Cash',
  belo: 'Belo',
  buenbit: 'Buenbit',
  letsbit: 'Letsbit',
  ripio: 'Ripio',
  satoshitango: 'SatoshiTango',
  decrypto: 'Decrypto'
};

const toPrice = (value) => {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const nameFor = (key) =>
  PLATFORMS[key] || key.replace(/p2p$/, ' P2P').replace(/^./, (c) => c.toUpperCase());

const readAsset = (payload, asset) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return [];

  return Object.entries(payload)
    .map(([key, value]) => {
      if (!value || typeof value !== 'object') return null;
      const sell = toPrice(value.totalAsk) ?? toPrice(value.ask);
      if (sell === null) return null;
      return {
        key,
        asset,
        label: nameFor(key),
        buy: toPrice(value.totalBid) ?? toPrice(value.bid),
        sell,
        updatedAt: value.time ? new Date(value.time * 1000).toISOString() : null
      };
    })
    .filter(Boolean);
};

export const fetchP2P = async (currency, loader) => {
  const responses = await Promise.all(
    ASSETS.map((asset) =>
      loader(ENDPOINT + asset + '/' + currency + '/1').then((payload) => readAsset(payload, asset))
    )
  );

  const merged = new Map();
  for (const rows of responses) {
    for (const row of rows) {
      const current = merged.get(row.key);
      if (!current || (current.asset !== 'USDT' && row.asset === 'USDT')) merged.set(row.key, row);
    }
  }

  return [...merged.values()].sort((a, b) => a.sell - b.sell);
};

export const p2pSummary = (rows) => {
  if (!rows || rows.length < 2) return null;

  const sells = rows.map((row) => row.sell);
  const buys = rows.map((row) => row.buy).filter(Number.isFinite);
  const min = Math.min(...sells);
  const max = Math.max(...sells);
  const stamps = rows.map((row) => row.updatedAt).filter(Boolean).sort();

  return {
    count: rows.length,
    min,
    max,
    gap: max - min,
    gapPct: min ? ((max - min) / min) * 100 : null,
    averageSell: sells.reduce((sum, value) => sum + value, 0) / sells.length,
    averageBuy: buys.length ? buys.reduce((sum, value) => sum + value, 0) / buys.length : null,
    cheapest: rows[0],
    dearest: rows[rows.length - 1],
    updatedAt: stamps.length ? stamps[stamps.length - 1] : null
  };
};
