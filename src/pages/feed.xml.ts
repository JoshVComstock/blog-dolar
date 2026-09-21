import type { APIRoute } from 'astro';
import { fetchAllBoards } from '../utils/api.js';
import { answerSentence } from '../utils/seo.js';
import { isoDate } from '../utils/format.js';

import { SITE } from '../utils/site.js';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const boards = await fetchAllBoards({ series: false, p2p: false, fx: false });
  const now = new Date().toUTCString();

  const items = boards
    .filter((board) => board.available)
    .map((board) => {
      const { country, rates, primary, spread } = board;
      const official = rates.find((rate) => rate.key === 'oficial');
      const parallel = rates.find((rate) => rate.indicative && rate.key !== 'oficial');
      const link = `${SITE}/${country.code}/dolar-hoy`;
      const published = isoDate(board.measuredAt);

      return [
        '    <item>',
        `      <title>${escape(`Dólar hoy en ${country.name}`)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="false">${link}#${published || now}</guid>`,
        `      <pubDate>${published ? new Date(published).toUTCString() : now}</pubDate>`,
        `      <description>${escape(answerSentence(country, primary, official, parallel, spread))}</description>`,
        '    </item>'
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Cambio Claro — el dólar en Latinoamérica</title>',
    `    <link>${SITE}</link>`,
    '    <description>Precio del dólar oficial y paralelo en ocho países, con la hora exacta de cada medición.</description>',
    '    <language>es</language>',
    `    <lastBuildDate>${now}</lastBuildDate>`,
    '    <ttl>20</ttl>',
    items,
    '  </channel>',
    '</rss>',
    ''
  ].join('\n');

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=300'
    }
  });
};
