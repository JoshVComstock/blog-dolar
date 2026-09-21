import type { APIRoute } from 'astro';
import { SITE } from '../utils/site.js';
import { countryList } from '../utils/countries.js';

export const GET: APIRoute = () => {
  const countries = countryList();
  const link = (label: string, path: string) => `[${label}](${SITE}${path})`;

  const body = `# Cambio Claro

> Precio del dólar oficial y paralelo en ocho países de Latinoamérica, con el nombre de cada
> cotización y la hora exacta en que fue medida.

Los datos se releen cada veinte minutos. Publicamos la única serie histórica del dólar paralelo
boliviano, construida con registro propio. Todo es gratuito y está bajo licencia CC BY 4.0.

## Datos en JSON

- ${link('Todas las cotizaciones', '/api/v1/rates.json')}: los ocho países en un solo archivo
${countries.map((c) => `- ${link(c.name, `/api/v1/${c.code}/rates.json`)}: cotizaciones, plataformas P2P e histórico propio`).join('\n')}

## Resumen en texto plano

${countries.map((c) => `- ${link(c.name, `/api/v1/${c.code}/resumen.txt`)}`).join('\n')}
- ${link('Feed RSS', '/feed.xml')}: una entrada por país, con el precio y la hora de la última medición

## Páginas

${countries.map((c) => `- ${link(`Dólar hoy en ${c.name}`, `/${c.code}/dolar-hoy`)}${c.hasParallel ? ` · ${link('paralelo', `/${c.code}/dolar-paralelo`)}` : ''} · ${link('plataformas', `/${c.code}/plataformas`)} · ${link('histórico', `/${c.code}/historico`)}`).join('\n')}
- Cada cotización por separado, por ejemplo ${link('dólar oficial en Bolivia', '/bo/dolar-oficial')}
- Conversiones en ambos sentidos, por ejemplo ${link('100 dólares a bolivianos', '/bo/100-dolares-a-bolivianos')} y ${link('100 bolivianos a dólares', '/bo/100-bolivianos-a-dolares')}
- Cambios cruzados calculados con el dólar real del país y no con la tasa oficial internacional, por ejemplo ${link('euro a boliviano', '/bo/euro-a-bolivianos')}

## Cómo medimos

- ${link('Metodología', '/metodologia')}: fuentes, frecuencia, qué significa cada etiqueta y qué límites tiene cada cifra
- Fuentes: dolarapi.com, criptoya.com, open.er-api.com, argentinadatos.com, mindicador.cl, datos.gov.co, bcrp.gob.pe y frankfurter.dev

## Integraciones

- ${link('Widget de una línea', '/integraciones')} y ${link('documentación de la API', '/api')}

## Contacto

- ${link('Contacto', '/contacto')}
`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
};
