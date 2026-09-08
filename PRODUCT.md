# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (SSG) + React islands + Tailwind CSS. Pinned by the user: Astro pure for the great majority of the surface, React only where interaction demands it, Tailwind for all styling. Static output for programmatic SEO.

## Users

Primary: a Latin American adult who needs today's USD exchange rate before a concrete decision — sending or receiving a remittance, pricing work billed in dollars, buying online, or deciding whether to change money today or wait. They arrive from a Google search shaped like "dolar hoy bolivia" or "cuanto está el dólar paralelo", usually on a phone, and they want the number in under three seconds. Confirmed by the user: the audience is all of Latin America, and the site must read as friendly to someone who has never seen it before.

Secondary: the site operator (the user), based in **Bolivia**, monetizing organic search traffic through Google AdSense.

## Product Purpose

Answer one question per country — what is the dollar worth here, right now, and which dollar — then let the visitor do arithmetic on that answer and see where it has been. Success is a visitor who finds the number without hunting, converts their own amount, and comes back tomorrow.

## Positioning

Most sites in this niche show one rate per country with no history and no honesty about which rate it is. This one names every rate, stamps the hour it was measured, and keeps its own record over time.

The durable advantage is **Bolivia**: no institution publishes the Bolivian parallel rate, so no site has its history. This site records its own reading on every build, which makes the Bolivian parallel series something the project owns and nobody can copy quickly.

## Operating Context

Static site generated at build time; pages rebuild on a schedule so rates stay current. The build also appends each reading to a committed history file, which is the project's own dataset.

Confirmed live sources (verified 2026-09-06):
- `https://dolarapi.com/v1/dolares` — Argentina, 7 rate variants.
- `https://bo.dolarapi.com/v1/dolares` — Bolivia, oficial + parallel digital proxy.
- `https://{cl,co,mx,uy}.dolarapi.com/v1/cotizaciones` — single USD rate, some with previous close.
- `https://ve.dolarapi.com/v1/dolares` — Venezuela, oficial + paralelo.
- `https://open.er-api.com/v6/latest/USD` — fallback for any currency, used for Peru.

Confirmed historical sources (free, no key, verified 2026-09-06):
- Argentina: `api.argentinadatos.com` — daily series from 2011, every casa.
- Chile: `mindicador.cl` — dólar observado by year.
- Colombia: `datos.gov.co` resource `32sa-8pi3` — official TRM.
- Peru: `estadisticas.bcrp.gob.pe` — daily SBS series.
- Mexico, Brazil: `api.frankfurter.dev`. Banxico SIE is available with a free token.
- **Bolivia, Uruguay, Venezuela: none exists.** These depend entirely on the project's own recorded history.

`restcountries.com` requires an authorization key as of 2026. A key is present in `.env` under `restcountries` but no auth scheme accepted it across nine attempts; the country profile table falls back to verified local reference data, labeled as such in the UI. Open question for the user: the exact header the provider expects.

Countries in scope, confirmed by the user: `ar` Argentina, `bo` Bolivia, `cl` Chile, `co` Colombia, `mx` México, `pe` Perú, `uy` Uruguay, `ve` Venezuela.

## Capabilities and Constraints

- Static generation via `getStaticPaths`. Language: Spanish (LATAM).
- Zero code comments. Maximum componentization. No unnecessary `useEffect`.
- Dark mode is required and is a peer theme, not an inversion.
- Rising and falling rates are shown in green and red — confirmed by the user, reversing the earlier decision.
- AdSense is a future goal; ad slots ship inert until the account exists.
- Rates are informational, never a quote or advice. Bolivia's parallel has no official source and must always be labeled indicative.
- A dead endpoint may never fail the build, and a stale number may never be presented as fresh.
- The project has **no domain yet**. All absolute URLs are placeholders.

## Brand Commitments

Name undecided. `Cambio Claro` is a placeholder the user has not adopted and is free to discard. Voice: plain, numerate, Spanish-LATAM, friendly, no hype, no financial advice.

Confirmed visual constraint: the design must read as **warm with its own character** — explicitly not the category's generic card-and-flag clone, and explicitly not the austere ruled board the first build shipped, which the user rejected as "muy cuadrado".

## Evidence on Hand

The live and historical endpoints above; no proprietary data, no logo, no testimonials, no traffic numbers, no AdSense account. Nothing about audience size, revenue, or partnerships may be claimed anywhere. The project's own recorded history begins empty and grows one reading per build.

## Product Principles

1. The number is the product, and the visitor must find it without hunting.
2. Say which rate and when it was measured, every time. An unlabeled rate is a wrong rate.
3. Never advise. Report, convert, contextualize — the visitor decides.
4. A missing feed degrades to an honest empty state, never to a stale number presented as fresh.
5. One consistent surface across every country, so a visitor who learns Bolivia can read Argentina instantly.
6. Record what nobody else records. Today's reading is tomorrow's only history.

## Accessibility & Inclusion

Phone-first, low-bandwidth. Direction of movement uses green and red but never color alone — a glyph and a signed figure always carry it too. Dark mode holds the same contrast floor as light. Target WCAG AA on all text and numeric displays.

## Roadmap (user-confirmed, in priority order)

1. Redesign in the chosen visual world; eight countries; own history recording begins.
2. Historical charts wherever a source exists, plus the project's own series.
3. Blog with real example notes written for the user as models.
4. Legal and identity pages required for AdSense approval, plus `ads.txt` and a consent banner.
5. Long-tail conversion routes (`{amount} dólares a {currency}`, both directions).
6. Remittance corridors (origin country → destination country), identified as the highest-value search intent in the niche.
7. Cross-currency pairs within the region; dollarized countries as a distinct page type.
