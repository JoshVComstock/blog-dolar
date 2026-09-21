import type { APIRoute } from 'astro';
import { fetchAllBoards } from '../../../utils/api.js';
import { SITE } from '../../../utils/site.js';

export const GET: APIRoute = async () => {
  const boards = await fetchAllBoards({ series: false });

  const payload = {
    source: SITE,
    license: 'CC BY 4.0',
    generatedAt: new Date().toISOString(),
    countries: boards.map((board) => ({
      code: board.country.code,
      name: board.country.name,
      currency: board.country.currency,
      measuredAt: board.measuredAt,
      spread: board.spread ? Number(board.spread.value.toFixed(2)) : null,
      rates: board.rates.map((rate) => ({
        key: rate.key,
        label: rate.label,
        buy: rate.buy,
        sell: rate.sell,
        indicative: rate.indicative,
        updatedAt: rate.updatedAt,
        source: rate.source
      })),
      platforms: board.p2p.map((row) => ({
        key: row.key,
        label: row.label,
        buy: row.buy,
        sell: row.sell,
        updatedAt: row.updatedAt
      }))
    }))
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=300'
    }
  });
};
