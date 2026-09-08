# Cambio Claro

Sitio estático del precio del dólar en ocho países de Latinoamérica, construido con Astro (SSG), una isla de React y Tailwind CSS. Incluye histórico, calculadora y notas.

## Puesta en marcha

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

Las cotizaciones se leen **en tiempo de compilación**. Para mantenerlas frescas hay que reconstruir el sitio de forma periódica (un cron en Netlify, Vercel, Cloudflare Pages o GitHub Actions cada 30–60 minutos es suficiente).

## Fuentes de datos

Cotización del día:

| País | Endpoint |
|---|---|
| Argentina | `dolarapi.com/v1/dolares` — 7 cotizaciones |
| Bolivia | `bo.dolarapi.com/v1/dolares` — oficial + paralelo digital |
| Venezuela | `ve.dolarapi.com/v1/dolares` — oficial + paralelo |
| Chile, Colombia, México, Uruguay | `{cc}.dolarapi.com/v1/cotizaciones` |
| Perú | `open.er-api.com` (dolarapi no tiene endpoint peruano) |

Histórico (gratis, sin clave, verificado el 6-9-2026):

| País | Fuente |
|---|---|
| Argentina | `api.argentinadatos.com` — serie desde 2011 |
| Chile | `mindicador.cl` |
| Colombia | `datos.gov.co` recurso `32sa-8pi3` (TRM) |
| Perú | `estadisticas.bcrp.gob.pe` |
| México | `api.frankfurter.dev` |
| Bolivia, Uruguay, Venezuela | **no existe ninguna** |

### Nuestro propio registro

Para los tres países sin fuente histórica, el proyecto graba su propia lectura. `scripts/record-history.mjs` corre en el `prebuild` y añade la cotización del día a `data/history.json`, que se versiona con el repositorio.

Ese archivo **es un activo del proyecto**: cuanto más seguido se reconstruya el sitio, más densa queda la serie. En el caso del dólar paralelo boliviano no existe en ningún otro lado.

```bash
npm run record
```

### restcountries

El endpoint del brief original ya no funciona sin clave. Hay una clave en `.env` bajo `restcountries`, pero ninguno de los nueve esquemas de autenticación probados fue aceptado por el proveedor. Hasta resolverlo, la ficha de cada país usa una tabla de referencia local, declarada en pantalla como `FUENTE REFERENCIA LOCAL`.

## Rutas

- `/` portada con los ocho países
- `/{ar,bo,cl,co,mx,pe,uy,ve}/dolar-hoy`
- `/notas` y `/notas/{slug}`
- `/acerca-de`, `/privacidad`, `/terminos`, `/contacto`
- `/404`, `sitemap-index.xml`, `robots.txt`, `ads.txt`

## AdSense

Los huecos son inertes: `AdSensePlaceholder.astro` no carga ningún script. Acepta `slot` (`horizontal`, `rectangle`, `inline`), `client` y `unit`, y los expone como `data-*` en el DOM.

Antes de solicitar la cuenta hace falta:

1. Poner el identificador real en `public/ads.txt` (hoy tiene un marcador).
2. Completar el correo en `/contacto`.
3. Ampliar `/privacidad` con la sección de cookies de Google cuando los anuncios se activen.
4. Añadir un banner de consentimiento si esperas tráfico europeo.
5. Publicar más notas: el contenido original propio es lo que más pesa en la aprobación.

## Modo oscuro

Clase `dark` en `<html>`, aplicada por un script en línea antes del primer pintado, así que no hay parpadeo. Respeta `prefers-color-scheme` y guarda la elección manual en `localStorage` bajo `cc-theme`. El tema claro no es una inversión: tiene sus propios tokens en `src/styles/ledger.css`.

## Reglas del proyecto

- Cero comentarios en el código.
- Astro estático salvo una isla: `CurrencyCalculator.jsx` con `client:load`. Sin `useEffect`.
- Toda cifra declara a qué cotización pertenece, a qué hora fue medida y qué lado del spread aplica.
- Si una fuente no responde, la página lo dice en vez de mostrar un valor viejo.
- Verde y rojo nunca son el único indicio: siempre hay flecha y porcentaje con signo.

## Pendiente antes de publicar

1. Dominio y nombre definitivos. Cambiar `site` en `astro.config.mjs`, las URLs absolutas del JSON-LD, `robots.txt` y los textos de marca. "Cambio Claro" es provisional.
2. Correo de contacto real.
3. Reconstrucción periódica (cada 15–30 min) para mantener frescura y engordar el histórico propio.
4. Identificador de AdSense.
