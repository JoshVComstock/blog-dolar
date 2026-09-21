import type { APIRoute } from 'astro';
import { fetchBoard } from '../../../../utils/api.js';
import { COUNTRY_CODES } from '../../../../utils/countries.js';
import { formatFigure, formatStamp } from '../../../../utils/format.js';
import { answerSentence } from '../../../../utils/seo.js';
import { SITE } from '../../../../utils/site.js';

export function getStaticPaths() {
  return COUNTRY_CODES.map((code: string) => ({ params: { country: code } }));
}

export const GET: APIRoute = async ({ params }) => {
  const board = await fetchBoard(params.country as string, { series: false, fx: false });

  if (!board) {
    return new Response('País no encontrado.\n', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    });
  }

  const { country, rates, primary, spread, p2pSummary, measuredAt } = board;
  const price = (value: number) =>
    `${country.symbol} ${formatFigure(value, country.locale, country.decimals)}`;

  const official = rates.find((rate) => rate.key === 'oficial');
  const parallel = rates.find((rate) => rate.indicative && rate.key !== 'oficial');

  const lines = [
    `DOLAR HOY EN ${country.name.toUpperCase()}`,
    `Fuente: Cambio Claro (${SITE}/${country.code}/dolar-hoy)`,
    `Medido: ${formatStamp(measuredAt, country.timezone)} (${country.timezone})`,
    '',
    answerSentence(country, primary, official, parallel, spread),
    ''
  ];

  if (rates.length) {
    lines.push('COTIZACIONES');
    for (const rate of rates) {
      lines.push(
        `- ${rate.label}: venta ${price(rate.sell)}, compra ${price(rate.buy)}${rate.indicative ? ' (indicativa)' : ''}`
      );
    }
    lines.push('');
  }

  if (spread) {
    lines.push(
      `BRECHA: el ${spread.label.toLowerCase()} está ${spread.value >= 0 ? 'por encima' : 'por debajo'} del oficial en ${Math.abs(spread.value).toFixed(1)} %.`,
      ''
    );
  }

  if (p2pSummary) {
    lines.push(
      'PLATAFORMAS P2P',
      `- Más barata: ${p2pSummary.cheapest.label} a ${price(p2pSummary.min)}`,
      `- Más cara: ${p2pSummary.dearest.label} a ${price(p2pSummary.max)}`,
      `- Promedio de ${p2pSummary.count} plataformas: ${price(p2pSummary.averageSell)}`,
      ''
    );
  }

  lines.push(
    'USO',
    'Datos bajo licencia CC BY 4.0. Cita "Cambio Claro" con enlace a la pagina del pais.',
    `JSON: ${SITE}/api/v1/${country.code}/rates.json`,
    `Metodologia: ${SITE}/metodologia`,
    ''
  );

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=300'
    }
  });
};
