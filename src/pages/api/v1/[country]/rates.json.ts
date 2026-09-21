import type { APIRoute } from 'astro';
import { fetchBoard } from '../../../../utils/api.js';
import { COUNTRY_CODES } from '../../../../utils/countries.js';
import { readOwnSeries } from '../../../../utils/history.js';
import { SITE } from '../../../../utils/site.js';

export function getStaticPaths() {
  return COUNTRY_CODES.map((code: string) => ({ params: { country: code } }));
}

export const GET: APIRoute = async ({ params }) => {
  const board = await fetchBoard(params.country as string, { series: false });

  if (!board) {
    return new Response(JSON.stringify({ error: 'country not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }

  const payload = {
    source: `${SITE}/${board.country.code}/dolar-hoy`,
    license: 'CC BY 4.0',
    generatedAt: new Date().toISOString(),
    country: {
      code: board.country.code,
      name: board.country.name,
      currency: board.country.currency,
      timezone: board.country.timezone
    },
    measuredAt: board.measuredAt,
    spread: board.spread
      ? {
          label: board.spread.label,
          official: board.spread.official,
          parallel: board.spread.parallel,
          percent: Number(board.spread.value.toFixed(2))
        }
      : null,
    rates: board.rates.map((rate) => ({
      key: rate.key,
      label: rate.label,
      buy: rate.buy,
      sell: rate.sell,
      previous: rate.previous,
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
    })),
    history: board.primary ? readOwnSeries(board.country.code, board.primary.key).points : []
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=300'
    }
  });
};
