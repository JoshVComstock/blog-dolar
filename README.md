# Cambio Claro

Precio del dólar oficial y paralelo en ocho países de Latinoamérica. Astro en modo estático, sin
framework de UI, con comparador de plataformas P2P, calculadora, histórico propio y API pública

## Poner en marcha

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Lanzar

1. **Repositorio**

   ```bash
   git init
   git add .
   git commit -m "Cambio Claro"
   git branch -M main
   git remote add origin git@github.com:USUARIO/cambio-claro.git
   git push -u origin main
   ```

2. **Vercel** — importar el repo. Framework: Astro. Sin configuración extra: `vercel.json` ya trae
   `cleanUrls` y las cabeceras de la API.

3. **Variables de entorno** en Vercel (copiar de `.env.example`):

   | Variable | Para qué |
   |---|---|
   | `PUBLIC_SITE_URL` | **La única obligatoria.** El dominio final, sin barra al final. De ahí salen el canonical, el sitemap, `robots.txt`, `llms.txt`, el schema y las URLs de la API. Cambiar de dominio es cambiar esta variable y volver a desplegar |
   | `PUBLIC_GSC_VERIFICATION` | El valor del `content` que da Google Search Console al verificar por etiqueta HTML |
   | `PUBLIC_GA_ID` | El ID de Google Analytics 4, con formato `G-XXXXXXXXXX` |
   | `PUBLIC_ADSENSE_CLIENT` | El `pub-…` de AdSense. Mientras esté vacío no se renderiza ningún bloque de publicidad |

4. **Search Console**
   - Añadir la propiedad por dominio o por prefijo de URL.
   - Verificar con etiqueta HTML: pegar el `content` en `PUBLIC_GSC_VERIFICATION` y desplegar.
   - Enviar `https://cambioclaro.com/sitemap-index.xml`.

5. **Refresco automático**
   - En Vercel: Settings → Git → Deploy Hooks, crear uno para `main`.
   - En GitHub: Settings → Secrets → Actions, guardar la URL como `DEPLOY_HOOK`.
   - `.github/workflows/refrescar.yml` corre cada veinte minutos, graba la lectura en
     `data/history.json` y dispara el despliegue.

## Fuentes de datos

| Qué | Fuente | Clave |
|---|---|---|
| Cotizaciones AR, BO, VE, CL, CO, MX, UY | `dolarapi.com` | no |
| Cotización PE | `open.er-api.com` | no |
| Plataformas P2P (comparador) | `criptoya.com/api/USDT/{moneda}/1` | no |
| Serie histórica AR | `api.argentinadatos.com` | no |
| Serie histórica CL | `mindicador.cl` | no |
| Serie histórica CO | `datos.gov.co` recurso `32sa-8pi3` | no |
| Serie histórica PE | `estadisticas.bcrp.gob.pe` | no |
| Serie histórica MX | `api.frankfurter.dev` | no |
| Serie histórica BO, UY, VE | registro propio en `data/history.json` | — |

`scripts/record-history.mjs` corre en el `prebuild` y en el cron. Guarda la cotización del día y,
además, el promedio y el mínimo de las plataformas P2P (`{código}:p2p` y `{código}:p2p-min`).

## Rutas

- `/` portada con los ocho países
- `/{país}/dolar-hoy`
- `/{país}/dolar-paralelo` — solo Bolivia, Argentina y Venezuela
- `/{país}/{monto}-dolares-a-{moneda}` — 12 montos por país
- `/metodologia`, `/notas`, `/notas/{slug}`
- `/api/v1/rates.json` y `/api/v1/{país}/rates.json` — JSON público, CC BY 4.0

## Decisiones

- **Sin React.** La calculadora y el comparador son JavaScript plano en la propia página; se
  comunican por el evento `cc:amount`. El sitio no envía ningún framework al navegador.
- **El dominio no está quemado en ningún sitio.** Todo sale de `PUBLIC_SITE_URL` a través de
  `src/utils/site.js`. `robots.txt` y `llms.txt` son endpoints generados, no archivos estáticos.
- **`trailingSlash: 'never'` con `build.format: 'file'`.** El canonical, el sitemap y la URL servida
  coinciden. En un host que no sea Vercel hay que activar su equivalente de `cleanUrls`.
- **Sin `restcountries`.** La ficha de país sale de la tabla local de `src/utils/countries.js`.
- **El cierre de ayer sale de `data/history.json`** cuando la fuente no publica `ultimoCierre`.

## Imágenes para compartir

`public/og/{país}.png` y `public/og/default.png`, 1200×630. Se regeneran a mano; no dependen del
build.
