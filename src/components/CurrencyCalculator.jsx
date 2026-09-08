import { useMemo, useState, useId } from 'react';

const parseAmount = (raw) => {
  const cleaned = String(raw).replace(/[^\d.,]/g, '');
  if (!cleaned) return null;
  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');
  const separator = lastComma > lastDot ? ',' : lastDot > lastComma ? '.' : '';
  let normalized = cleaned;
  if (separator) {
    const cut = cleaned.lastIndexOf(separator);
    normalized =
      cleaned.slice(0, cut).replace(/[.,]/g, '') + '.' + cleaned.slice(cut + 1).replace(/[.,]/g, '');
  } else {
    normalized = cleaned.replace(/[.,]/g, '');
  }
  const value = Number(normalized);
  return Number.isFinite(value) ? value : NaN;
};

const numberFormat = (value, locale, decimals) =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);

const QUICK = [50, 100, 500, 1000];

export default function CurrencyCalculator({
  rates = [],
  currency,
  currencyName,
  symbol,
  locale = 'es',
  decimals = 2,
  countryName,
  primaryKey
}) {
  const inputId = useId();
  const [raw, setRaw] = useState('100');
  const [mode, setMode] = useState('usd');

  const broadcast = (nextRaw, nextMode) => {
    if (typeof window === 'undefined') return;
    const parsedNext = parseAmount(nextRaw);
    const value = parsedNext === null || Number.isNaN(parsedNext) ? 1 : parsedNext;
    window.dispatchEvent(
      new CustomEvent('cc:amount', {
        detail: { amount: value, holdingUsd: nextMode === 'usd', currency }
      })
    );
  };

  const changeRaw = (value) => {
    setRaw(value);
    broadcast(value, mode);
  };

  const changeMode = (value) => {
    setMode(value);
    broadcast(raw, value);
  };

  const parsed = useMemo(() => parseAmount(raw), [raw]);
  const isEmpty = parsed === null;
  const isInvalid = Number.isNaN(parsed);
  const amount = isEmpty || isInvalid ? 1 : parsed;

  const holdingUsd = mode === 'usd';
  const sideName = holdingUsd ? 'compra' : 'venta';

  const results = useMemo(
    () =>
      rates.map((rate) => {
        const applied = holdingUsd ? rate.buy || rate.sell : rate.sell || rate.buy;
        const value = holdingUsd ? amount * applied : applied ? amount / applied : null;
        return {
          key: rate.key,
          label: rate.label,
          note: rate.note,
          indicative: rate.indicative,
          applied,
          text:
            value === null || !Number.isFinite(value)
              ? '—'
              : numberFormat(value, locale, holdingUsd ? decimals : 2)
        };
      }),
    [rates, holdingUsd, amount, locale, decimals]
  );

  const lead = results.find((result) => result.key === primaryKey) || results[0];
  const rest = results.filter((result) => !lead || result.key !== lead.key);

  const button = (active) => ({
    backgroundColor: active ? 'var(--cover)' : 'transparent',
    color: active ? 'var(--cover-ink)' : 'var(--ink-soft)'
  });

  return (
    <section aria-labelledby={inputId + '-title'} className="leaf overflow-hidden">
      <div
        className="px-4 py-3 sm:px-5"
        style={{ backgroundColor: 'var(--cover)', color: 'var(--cover-ink)' }}
      >
        <h2 id={inputId + '-title'} className="text-[0.9375rem] font-bold">
          Convertir
        </h2>
        <p className="mt-0.5 text-[0.75rem] opacity-75">
          Dólares y {currencyName.toLowerCase()}
        </p>
      </div>

      <div className="px-4 pb-5 pt-4 sm:px-5">
        <div
          className="grid grid-cols-2 gap-1 rounded-xl p-1"
          style={{ backgroundColor: 'var(--paper-band)' }}
          role="group"
          aria-label="Qué moneda tienes"
        >
          <button
            type="button"
            onClick={() => changeMode('usd')}
            aria-pressed={holdingUsd}
            className="rounded-lg px-2 py-2 text-[0.8125rem] font-semibold transition-colors duration-200"
            style={button(holdingUsd)}
          >
            Tengo dólares
          </button>
          <button
            type="button"
            onClick={() => changeMode('local')}
            aria-pressed={!holdingUsd}
            className="rounded-lg px-2 py-2 text-[0.8125rem] font-semibold transition-colors duration-200"
            style={button(!holdingUsd)}
          >
            Tengo {currency}
          </button>
        </div>

        <label htmlFor={inputId} className="mt-5 block label" style={{ color: 'var(--ink-faint)' }}>
          Monto en {holdingUsd ? 'USD' : currency}
        </label>
        <div
          className="mt-2 flex items-center gap-2 rounded-xl border px-3 py-2.5"
          style={{ borderColor: 'var(--rule-strong)', backgroundColor: 'var(--paper)' }}
        >
          <span className="figure text-[1.125rem] font-semibold" style={{ color: 'var(--ink-faint)' }}>
            {holdingUsd ? 'US$' : symbol}
          </span>
          <input
            id={inputId}
            value={raw}
            onChange={(event) => changeRaw(event.target.value)}
            inputMode="decimal"
            autoComplete="off"
            spellCheck="false"
            placeholder="100"
            aria-describedby={inputId + '-hint'}
            aria-invalid={isInvalid || undefined}
            className="figure w-full min-w-0 bg-transparent text-[1.75rem] font-bold leading-tight tracking-[-0.03em] outline-none"
            style={{ color: 'var(--ink)' }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => changeRaw(String(value))}
              className="rounded-lg px-2.5 py-1.5 figure text-[0.8125rem] font-semibold transition-colors duration-200 hover:opacity-80"
              style={{ backgroundColor: 'var(--paper-band)', color: 'var(--ink-soft)' }}
            >
              {value}
            </button>
          ))}
        </div>

        <p id={inputId + '-hint'} className="mt-3 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--ink-faint)' }}>
          {isInvalid
            ? 'Solo números. Borra las letras y escribe el monto otra vez.'
            : isEmpty
              ? 'Escribe un monto para ver la conversión.'
              : `Se aplica el precio de ${sideName} de cada cotización de ${countryName}.`}
        </p>

        {lead && (
          <div
            className="ruled-paper mt-5 rounded-xl px-4 py-4"
            style={{ backgroundColor: 'var(--paper-band)', '--rule-step': '2rem', '--rule-offset': '1.1rem' }}
          >
            <p className="label invert-mark">
              {lead.label}
              {lead.indicative ? ' · indicativa' : ''}
            </p>
            <p
              key={lead.text}
              className="animate-ink mt-2 figure text-[2rem] font-bold leading-none tracking-[-0.035em]"
              style={{ color: 'var(--ink)' }}
            >
              <span className="mr-1.5 text-[0.5em] font-semibold" style={{ color: 'var(--ink-faint)' }}>
                {holdingUsd ? symbol : 'US$'}
              </span>
              {lead.text}
            </p>
            <p className="mt-2 figure text-[0.8125rem]" style={{ color: 'var(--ink-faint)' }}>
              1 USD = {lead.applied ? numberFormat(lead.applied, locale, decimals) : '—'} {currency}{' '}
              · {sideName}
            </p>
          </div>
        )}

        {rest.length > 0 && (
          <ul className="mt-4 space-y-px">
            {rest.map((result) => (
              <li
                key={result.key}
                className="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5"
                style={{ backgroundColor: 'var(--paper-band)' }}
              >
                <span className="min-w-0">
                  <span className="block text-[0.8125rem] font-semibold" style={{ color: 'var(--ink-soft)' }}>
                    {result.label}
                  </span>
                  <span className="mt-0.5 block figure text-[0.75rem]" style={{ color: 'var(--ink-faint)' }}>
                    1 USD = {result.applied ? numberFormat(result.applied, locale, decimals) : '—'}
                  </span>
                </span>
                <span
                  key={result.text}
                  className="animate-ink figure shrink-0 text-[1.0625rem] font-bold tracking-[-0.02em]"
                  style={{ color: 'var(--ink)' }}
                >
                  <span className="mr-1 text-[0.7em] font-semibold" style={{ color: 'var(--ink-faint)' }}>
                    {holdingUsd ? symbol : 'US$'}
                  </span>
                  {result.text}
                </span>
              </li>
            ))}
          </ul>
        )}

        {lead && lead.note ? (
          <p className="mt-4 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--ink-faint)' }}>
            {lead.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
