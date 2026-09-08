---
name: Cambio Claro
description: A Latin American savings passbook for the price of the dollar — manila paper pages bound in deep passbook green.
colors:
  cover: "#1e4d3b"
  cover-deep: "#163a2c"
  cover-ink: "#f2ead6"
  paper: "#f7f1e1"
  paper-leaf: "#fffaf0"
  paper-band: "#efe6cf"
  ink: "#221d14"
  ink-soft: "#4e4536"
  ink-faint: "#6e6553"
  rule: "rgba(30, 77, 59, 0.2)"
  rule-strong: "rgba(30, 77, 59, 0.4)"
  deposit: "#17693f"
  deposit-wash: "rgba(23, 105, 63, 0.1)"
  withdraw: "#a62f22"
  withdraw-wash: "rgba(166, 47, 34, 0.09)"
  cover-dark: "#1b4636"
  cover-deep-dark: "#123024"
  cover-ink-dark: "#e8dfc8"
  paper-dark: "#191712"
  paper-leaf-dark: "#211e17"
  paper-band-dark: "#2a2620"
  ink-dark: "#f2ead6"
  ink-soft-dark: "#c9bfa6"
  ink-faint-dark: "#948b75"
  rule-dark: "rgba(242, 234, 214, 0.16)"
  rule-strong-dark: "rgba(242, 234, 214, 0.32)"
  deposit-dark: "#4fbf83"
  deposit-wash-dark: "rgba(79, 191, 131, 0.12)"
  withdraw-dark: "#e8776a"
  withdraw-wash-dark: "rgba(232, 119, 106, 0.12)"
typography:
  display:
    fontFamily: "Familjen Grotesk Variable, Familjen Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.022em"
  balance:
    fontFamily: "Azeret Mono Variable, Azeret Mono, ui-monospace, monospace"
    fontSize: "clamp(2.75rem, 8vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.04em"
    fontFeature: "tabular-nums"
  pair:
    fontFamily: "Azeret Mono Variable, Azeret Mono, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 3.4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.038em"
    fontFeature: "tabular-nums"
  headline:
    fontFamily: "Familjen Grotesk Variable, Familjen Grotesk, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Familjen Grotesk Variable, Familjen Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.022em"
  body:
    fontFamily: "Familjen Grotesk Variable, Familjen Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "normal"
  body-small:
    fontFamily: "Familjen Grotesk Variable, Familjen Grotesk, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "normal"
  figure-row:
    fontFamily: "Azeret Mono Variable, Azeret Mono, ui-monospace, monospace"
    fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
    fontFeature: "tabular-nums"
  figure-cell:
    fontFamily: "Azeret Mono Variable, Azeret Mono, ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontFeature: "tabular-nums"
  label:
    fontFamily: "Familjen Grotesk Variable, Familjen Grotesk, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
  label-lg:
    fontFamily: "Familjen Grotesk Variable, Familjen Grotesk, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
  stamp:
    fontFamily: "Azeret Mono Variable, Azeret Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
    fontFeature: "tabular-nums"
rounded:
  stamp: "3px"
  focus: "4px"
  chip: "6px"
  control: "8px"
  field: "12px"
  leaf: "16px"
  pill: "9999px"
spacing:
  hair: "4px"
  tight: "8px"
  snug: "12px"
  gutter: "16px"
  gutter-wide: "24px"
  stack: "32px"
  section: "40px"
  footer: "48px"
components:
  leaf:
    backgroundColor: "{colors.paper-leaf}"
    textColor: "{colors.ink}"
    rounded: "{rounded.leaf}"
    padding: "20px 16px"
  leaf-flat:
    backgroundColor: "{colors.paper-leaf}"
    textColor: "{colors.ink}"
    rounded: "{rounded.leaf}"
    padding: "20px 16px"
  band:
    backgroundColor: "{colors.paper-band}"
    textColor: "{colors.ink-faint}"
    typography: "{typography.label}"
    padding: "10px 16px"
  chrome-bar:
    backgroundColor: "{colors.cover}"
    textColor: "{colors.cover-ink}"
    padding: "14px 16px"
  nav-pill:
    backgroundColor: "transparent"
    textColor: "{colors.cover-ink}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
    typography: "{typography.body-small}"
  nav-pill-active:
    backgroundColor: "{colors.cover-ink}"
    textColor: "{colors.cover}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
    typography: "{typography.body-small}"
  toggle-segment:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.control}"
    padding: "8px 8px"
    typography: "{typography.body-small}"
  toggle-segment-active:
    backgroundColor: "{colors.cover}"
    textColor: "{colors.cover-ink}"
    rounded: "{rounded.control}"
    padding: "8px 8px"
    typography: "{typography.body-small}"
  quick-amount:
    backgroundColor: "{colors.paper-band}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.control}"
    padding: "6px 10px"
    typography: "{typography.body-small}"
  input-amount:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
    height: "52px"
  movement-up:
    backgroundColor: "{colors.deposit-wash}"
    textColor: "{colors.deposit}"
    rounded: "{rounded.chip}"
    padding: "4px 6px"
    typography: "{typography.stamp}"
  movement-down:
    backgroundColor: "{colors.withdraw-wash}"
    textColor: "{colors.withdraw}"
    rounded: "{rounded.chip}"
    padding: "4px 6px"
    typography: "{typography.stamp}"
  date-stamp:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.stamp}"
    padding: "6px 10px"
    typography: "{typography.stamp}"
  icon-affordance:
    backgroundColor: "{colors.paper-band}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    size: "32px"
---

# Design System: Cambio Claro

## Overview

**Creative North Star: "The Savings Passbook"**

Cambio Claro is a Latin American savings passbook rendered for the browser. The chrome is the booklet's cover — deep passbook green, unbroken, carrying the mark, the country tabs and the footer. Everything you read sits on a page torn from inside that booklet: warm manila paper, a hairline rule, a soft shadow where the leaf lifts off the ground. Figures are printed in a monospaced face with tabular digits so a column of prices lines up the way it would in a teller's ledger; prose and labels are set in a grotesk that stays quiet underneath them. Nothing here pretends to be a trading terminal. It is a record book: a number, the name of the number, and the hour it was measured.

The system is dense but never crowded. Rows are separated by a single hairline, not by gaps; sections are separated by whitespace, not by boxes inside boxes. Depth is real but shallow — one radius (16px), one hairline border, one two-part shadow, applied to exactly one container. Every accent the palette owns is a ledger word: green is a deposit, red is a withdrawal, and both are always accompanied by an arrow and a signed percentage so the meaning survives without color.

Light and dark are peer editions of the same booklet, not an inversion of each other. Each defines its own paper, its own cover green, its own deposit and withdrawal hues; the dark edition is a passbook printed on dark card, and it is read with the same eyes.

**Key Characteristics:**
- Deep passbook green owns all chrome; warm manila paper owns all reading.
- One container, the `leaf`: 16px radius, one hairline, one soft two-part shadow.
- Two families with split duties — grotesk for language, mono for every figure.
- Four figure steps, never a fifth invented one.
- Direction is never color alone: arrow glyph plus signed percentage, always.
- Motion is a single easing carrying a 40ms-per-row settle and an ink stamp.

## Colors

Two peer themes built from one material: a green booklet cover and warm manila pages, with a deposit/withdrawal accent pair that comes from bookkeeping, not from the stock market.

### Primary
- **Passbook Green** (`cover` light / `cover-dark` dark): the cover. It fills the header, the country-tab strip, the footer, the converter's head, the active navigation pill, the focus ring in light mode, the text caret, and the selection highlight. It is never used as a text color on paper and never as a page background.
- **Passbook Green Deep** (`cover-deep`): the darker seam of the cover, reserved for depth against the cover itself.
- **Cover Ink** (`cover-ink`): the cream that prints on green. Used for all type, borders and dots that sit on a cover surface, and as the fill of the active nav pill.

### Secondary
- **Deposit Green** (`deposit` light / `deposit-dark` dark): a rise. Applied to the movement chip, the primary quotation's row wash and label, the note-body link color, and the dark-mode focus ring.
- **Withdrawal Red** (`withdraw` light / `withdraw-dark` dark): a fall. Applied only to the movement chip.
- **Deposit Wash / Withdrawal Wash**: the same two hues at roughly 10% opacity, used to tint the chip behind the figure, the highlighted ledger row, and the converter's lead result panel.

### Neutral
- **Manila Ground** (`paper`): the page beneath everything, including the scrollbar track and the converter's input well.
- **Manila Leaf** (`paper-leaf`): the raised sheet — the fill of every `leaf` container.
- **Manila Band** (`paper-band`): the pressed strip. Table headers, meta rows above a hero, quick-amount chips, secondary result rows, the round chevron affordance, and card hover.
- **Ledger Ink** (`ink`): headings and every primary figure.
- **Soft Ink** (`ink-soft`): running prose, secondary figures, buy-side values.
- **Faint Ink** (`ink-faint`): labels, stamps, currency symbols, hints, unavailable states, scrollbar thumb.
- **Rule / Rule Strong** (`rule` / `rule-strong`): the hairline. `rule` divides rows and outlines leaves; `rule-strong` is the heavier line reserved for input wells and paper-toned stamp borders.

### Named Rules
**The Cover-and-Page Rule.** Green is structure; paper is content. Chrome, tabs, the converter head and the footer are green; anything you read a number or a sentence on is paper. A green panel in the middle of the reading column is out of system.

**The Two Editions Rule.** Light and dark are peer editions, never an inversion. Every new color must be authored twice, once on `:root` and once on `html.dark`, as its own value. Never derive a dark value by filtering, inverting, or reusing the light one.

**The Ledger Language Rule.** Deposit green and withdrawal red mean "up" and "down" in a passbook sense, and they never carry that meaning alone. A movement is always an arrow glyph plus a signed percentage plus the color, with a screen-reader phrase behind it; a flat movement is an `=` in faint ink with no wash. This is an accessibility commitment, not a stylistic preference.

## Typography

**Display / Body / Label Font:** Familjen Grotesk Variable (with Familjen Grotesk, system-ui, sans-serif)
**Figure Font:** Azeret Mono Variable (with Azeret Mono, ui-monospace, monospace)

**Character:** A humanist grotesk that recedes, paired with a squared monospace that behaves like a printing press. The grotesk carries every word — headings, prose, uppercase labels; the mono carries every digit, always with tabular figures so columns align down the page and a changing number never shifts its neighbours.

### Hierarchy
- **Display** (700, `clamp(2rem, 5vw, 3.25rem)`, 1.04): page-opening headlines on the index and text pages, capped near 16ch so the line breaks where it should. Headings carry `-0.022em` tracking and `text-wrap: balance` globally.
- **Balance** (mono 600, `clamp(2.75rem, 8vw, 5rem)`, 0.94): the single hero figure on a country that has one headline quotation. One per page, maximum.
- **Pair** (mono 600, `clamp(1.75rem, 3.4vw, 3rem)`, 1): the step for two figures side by side — oficial next to paralelo. This step exists because the balance step overflows when a country shows both; when there are two, they step down together.
- **Headline** (700, 1.375rem, 1.15): the country page's `h1` inside the hero leaf.
- **Title** (700, 1.0625rem, 1.2): section headings inside a leaf, and country names on the board.
- **Body** (400, 1.0625rem, 1.72, soft ink): long-form note and legal prose, capped at the note measure (40rem). Short interface copy drops to 0.8125rem / 0.875rem at the same colors.
- **Figure Row** (mono 600, `clamp(1.25rem, 2.5vw, 1.625rem)`, 1.05): the per-country price on the index board.
- **Figure Cell** (mono 500, 0.9375rem, 1.25): dense table values — buy side, secondary values inside a row.
- **Label** (600, 0.6875rem, `0.1em`, uppercase): names the data next to it — column headers, quotation names, meta strips. **Label Large** (600, 0.8125rem, `0.08em`, uppercase) is the same voice one step up.
- **Stamp** (mono 500, 0.6875rem, `0.04em`, uppercase): measurement times and the date-stamp chip. The mono face is what makes it read as machine-printed.

### Named Rules
**The Tabular Figures Rule.** Every number a reader might compare is set in Azeret Mono with `tabular-nums`. No figure is ever set in the grotesk, and no sentence is ever set in the mono. A currency symbol beside a figure is sized at `0.34em`–`0.7em` of that figure and set in faint ink so the digits stay dominant.

**The Four Steps Rule.** There are exactly four figure steps — `balance`, `pair`, `row`, `cell` — and a new surface picks one of them. Do not author a fifth size; if a figure does not fit, step down, do not interpolate.

**The Named Number Rule.** No figure appears without a label above it naming which quotation it is, and no measured figure appears without a stamp saying when it was read.

## Layout

The shell is `max-w-shell` (80rem) with a gutter that steps 16px → 24px → 32px. Reading prose is capped separately at `max-w-note` (40rem). One extra breakpoint, `xs` (400px), exists for the narrowest phones; the rest are Tailwind defaults.

The country page is the system's spine: a single grid, `lg:grid-cols-[minmax(0,1fr)_21rem]` with `lg:items-start` and a 32px gap (40px at `xl`). The left column holds the hero leaf in row 1 and the rest of the content in row 2; the right column is a 21rem stub spanning both rows, sticky at `top: 1.5rem`, holding the converter and an ad slot. **The stub is authored earlier in the DOM than the row-2 content on purpose:** on phones, where the grid collapses to one column, that ordering drops the converter directly under the hero, which is where a reader who has just seen a price wants it. Desktop position is restored with explicit column and row placement. Never reorder that markup to match visual order on desktop.

Inside a leaf, rhythm is vertical and rule-driven: rows are divided by a single hairline (`divide-y`, or the `ruled` helper), never by gaps or nested cards. Padding inside a leaf is 16px horizontal stepping to 24px at `sm`, with 10–20px vertical depending on whether the strip is a band or a content block. Between leaves the gap is 32px; between page sections it is 40px, and the footer opens with 64px of air above it.

Wide tables scroll horizontally rather than reflowing: the ledger keeps a 34rem minimum width inside an `overflow-x-auto` well, so a column never collapses into an unreadable stack.

### Named Rules
**The One Grid Rule.** A page is the shell, one grid, and leaves inside it. Do not nest a second multi-column grid inside a leaf; step down to a flex row that wraps.

**The Source-Order Rule.** Mobile reading order is the source order. When desktop needs a different arrangement, move it with grid placement, never by duplicating or reordering markup.

## Elevation & Depth

This world uses real depth, sparingly and at exactly one intensity. A `leaf` is a sheet of paper resting on the ground: a hairline border plus a two-part shadow — a 1px contact shade and a wide, heavily-offset ambient bloom. There is no hover elevation, no elevation scale, no lifted state. Depth says "this is a separate sheet," nothing more. Where a surface belongs to the same sheet but needs to read as pressed rather than raised, it is tinted with `paper-band` instead of shadowed; that tonal press is the system's only other depth device.

The dark edition re-authors the shadow rather than reusing it: heavier, wider, fully black, because a shadow tuned for manila disappears on dark card.

### Shadow Vocabulary
- **Leaf, light** (`box-shadow: 0 1px 2px rgba(34, 29, 20, 0.05), 0 10px 26px -12px rgba(34, 29, 20, 0.22)`): the only elevation in the light edition, applied by `leaf`.
- **Leaf, dark** (`box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 14px 34px -16px rgba(0, 0, 0, 0.7)`): the same role, re-authored for dark card.

### Named Rules
**The One Shadow Rule.** There is one shadow token and it belongs to the `leaf`. Anything that needs separation without lift uses `leaf-flat` (same fill, same hairline, same radius, no shadow) or a `band` tint. Never introduce a second elevation step or a hover lift.

## Shapes

Corners are consistently soft and consistently sized to their role. The sheet is 16px — the largest radius in the system and the one that reads as a rounded page corner. Interactive surfaces sit below it: 12px for input wells and result panels, 8px for buttons, nav pills and quick amounts, 6px for the movement chip, 4px for the focus ring. The full pill radius appears only on circular affordances: the 32px chevron disc on a board row and the scrollbar thumb. The date stamp is the deliberate outlier at 3px, because a rubber stamp has a hard corner.

Borders are hairlines: 1px in `rule`, stepping to `rule-strong` only where a control needs to be grabbable (the amount well) or where a stamp sits on paper. Dividers are borders, not spacing. The one geometric liberty in the system is the date stamp's `-1.4deg` rotation — a stamp pressed slightly crooked into the page — and it is a world device, used identically on every surface that carries a measurement time.

Iconography is inline SVG stroke paths at 12–18px, drawn on a 24px grid with `currentColor`: sun, moon, chevron, swap, minus, and the two filled movement arrows.

### Named Rules
**The Radius Ladder Rule.** Radius descends with scale: sheet 16px, well 12px, control 8px, chip 6px, ring 4px, stamp 3px. A control never carries a radius larger than the surface containing it.

## Components

### Cards / Containers — the Leaf
The signature container and the only elevated surface. **Corner:** 16px. **Background:** manila leaf. **Border:** 1px hairline in `rule`. **Shadow:** the single leaf shadow (use `leaf-flat` for the unelevated twin). **Internal padding:** 16px horizontal stepping to 24px at `sm`; content blocks run 28–32px vertical, band strips 10–12px. Leaves almost always carry `overflow-hidden` so a band or a table meets the rounded corner cleanly.

### Bands
A pressed strip inside a leaf, filled with `paper-band`. It carries uppercase `label` type in faint ink and is the standard treatment for table headers and the meta line above a hero. Bands never carry a border of their own — the leaf's edge and the row hairlines do that work.

### Navigation
The header is a cover-green bar: a 32px cream mark tile carrying the initials, the wordmark at 0.9375rem bold, and a 0.6875rem descriptor at 70% opacity beneath it. Below it, a country tab strip separated by a 1px cream-at-16% rule, scrolling horizontally with the scrollbar hidden. **Default pill:** cover ink at 78% opacity, transparent background, 8px radius, 12px/6px padding. **Active pill:** filled cream with green text — the full inversion is the only current-page cue, and it is set from `aria-current="page"`. **Hover** on cover surfaces is a 10–14% white wash over 200ms.

### Inputs / Fields
**Amount well:** manila ground inside a 12px-radius well bordered in `rule-strong`, with a faint currency prefix and a borderless 1.75rem bold mono input. The input has no ring of its own — the well is the affordance. **Caret:** passbook green. **Placeholder:** faint ink. **Focus:** the global ring — 2px solid passbook green (deposit green in dark), 3px offset, 4px radius — applied on `:focus-visible` only, never suppressed. **Invalid:** `aria-invalid` plus a plain-language hint line in faint ink; no red border, because red is reserved for withdrawals.

### Buttons and Chips
**Segmented toggle:** a two-cell grid in a 12px-radius `paper-band` trough with 4px inset; the active cell fills cover green with cream text, the inactive is transparent with soft ink. State is announced with `aria-pressed`. **Quick amounts:** 8px-radius `paper-band` chips with mono numerals in soft ink, hovering to 80% opacity. **Icon button:** 36px square, 8px radius, transparent, tinted on hover. All color transitions run 200ms.

### Movement Chip (signature)
The system's smallest and most load-bearing component. An inline chip at 6px radius carrying, in order: a filled arrow SVG (up or down), the signed percentage in bold tabular mono, and a visually-hidden phrase naming the direction. Rising takes deposit green on deposit wash; falling takes withdrawal red on withdrawal wash; flat takes faint ink, an `=` glyph, and no wash. Two sizes only: `sm` (0.75rem, 6px/4px) inside table rows, `md` (0.8125rem, 8px/6px) beside a hero figure. When a source publishes no prior close, the chip is replaced by an uppercase label reading "sin dato de ayer" — absence is stated, never faked with a zero.

### Date Stamp (signature)
A crooked rubber stamp: `-1.4deg` rotation, 3px radius, 1px border, uppercase mono `stamp` type, with a 6px live dot when a measurement time exists. Two tones — `cover` (cream on green, for chrome) and `paper` (soft ink on `rule-strong`, for a band). It is the visual promise that every number is dated.

### Rate Ledger (signature)
The full quotation table inside a leaf: a `band` header row of uppercase labels, body rows divided by hairlines, right-aligned figures, and a staggered entrance. The primary quotation's row is tinted with deposit wash and its name is set in deposit green. Buy-side values take `figure-cell` in soft ink; sell-side takes bold mono at 1.0625rem in full ink. The table closes with a plain-language footnote explaining compra and venta.

### Converter (signature)
The one interactive island. A leaf whose head is cover green — title plus a 0.75rem subtitle at 75% opacity — over a paper body holding the toggle, the amount well, quick amounts, a hint line, and the results. The lead result sits in a 12px-radius deposit-wash panel with a 2rem bold mono figure; secondary results are a list of `paper-band` rows at 8px radius separated by a 1px gap. Every result figure replays the `ink` animation when its value changes, keyed on the formatted text.

### Ad Slot
A `paper-band` panel with a centered uppercase label and one of three reserved heights (100 / 160 / 250px) so the slot never causes layout shift.

### Motion
One easing for everything: `cubic-bezier(0.16, 1, 0.3, 1)`. Two named animations. **Settle** (`0.42s`, `backwards`) is the entrance: a list or table body takes the `stagger` class and each child a `--row` index, producing a 40ms-per-row cascade from `opacity 0 / translateY(0.5rem)`. **Ink** (`0.34s`) is the stamp: a figure drops in from `-0.18em` at 25% opacity, overshoots to 1.004 scale, and settles — replayed by changing the React `key` to the formatted value, never by an effect. Interface state changes are 200ms color transitions; the chevron affordance slides 1px on hover over 300ms. Under `prefers-reduced-motion: reduce` both animations are killed outright and all transitions collapse to `0.01ms`.

### Named Rules
**The Single Easing Rule.** Every animation and transition in this system uses `cubic-bezier(0.16, 1, 0.3, 1)`. Do not introduce a second curve, a bounce, or a spring.

**The Replay-By-Key Rule.** A figure animates because its value changed, and the change is expressed by keying the element to its formatted text. Never drive an animation from an effect or a timer.

## Do's and Don'ts

### Do:
- **Do** put every reusable class in `src/styles/ledger.css` under `@layer components` and every palette value on `:root` and `html.dark`. New surfaces compose existing classes before they invent CSS.
- **Do** reach for tokens through `var(--token)` in inline style attributes when Tailwind has no utility for them; that is the established pattern throughout the build.
- **Do** wrap every readable region in a `leaf` (or `leaf-flat`) and divide its contents with hairlines rather than gaps or nested cards.
- **Do** pair every figure with a `label` naming the quotation and a `stamp` naming the measurement time.
- **Do** author every new color twice — light and dark — as independent values.
- **Do** state direction with an arrow glyph, a signed percentage, a color, and a screen-reader phrase, all four together.
- **Do** say when data is missing in plain Spanish ("sin dato de ayer", "La fuente no respondió") instead of rendering a zero or an empty cell.
- **Do** cap running prose at `max-w-note` (40rem) and page shells at `max-w-shell` (80rem).
- **Do** keep the sticky 21rem stub earlier in the DOM than the rest of the content, and position it with grid placement.
- **Do** let wide tables scroll horizontally inside `overflow-x-auto` with a `min-w` floor.
- **Do** disable both animations under `prefers-reduced-motion`.

### Don't:
- **Don't** write code comments anywhere in `src/`, `scripts/`, or the config files. This codebase carries zero comments by contract; name things so they do not need one.
- **Don't** ship a second client component. Everything is static Astro except the single `client:load` converter island.
- **Don't** use `useEffect`. Derive with `useMemo`, replay animation with a `key`, and read theme from the inline head script.
- **Don't** use color as the only signal for a rise or a fall.
- **Don't** treat dark mode as an inversion of light, or derive one theme's values from the other's.
- **Don't** set a figure in the grotesk or a sentence in the mono, and don't ship a figure without `tabular-nums`.
- **Don't** invent a fifth figure step; step down through `balance` → `pair` → `row` → `cell`.
- **Don't** add a second shadow, an elevation scale, or a hover lift. Use `leaf-flat` or a `band` tint.
- **Don't** put a cover-green panel inside the reading column; green is chrome, paper is content.
- **Don't** use red for form validation — red is withdrawal. Errors are plain-language hints in faint ink plus `aria-invalid`.
- **Don't** nest a leaf inside a leaf, or a multi-column grid inside a leaf.
- **Don't** add a decorative kicker or eyebrow above a heading. The uppercase `label` exists to name the data beside it, not to decorate a title.
- **Don't** use emoji, icon fonts, or glyph characters as icons; icons are inline 24px-grid SVG paths using `currentColor`.
- **Don't** remove or restyle the `:focus-visible` ring, and don't rely on `:focus` without it.
