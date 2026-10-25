import { Eye, EyeOff, PencilLine, RotateCcw } from "lucide-react";
import { EXCHANGE_RATE_INPUT_MAX_LENGTH } from "@/config/app.constants";
import { DEFAULT_USD_CURRENCY_RATE } from "@/domain/conversion/conversion.constants";
import { useLocale } from "@/i18n/locale-provider";
import { formatExchangeRate } from "@/lib/formatters";
import type { ExchangeRateError } from "./use-exchange-rate";

type ExchangeRateCardProps = Readonly<{
  rateText: string;
  error: ExchangeRateError | null;
  currencyEnabled: boolean;
  onChange: (value: string) => void;
  onRestoreDefault: () => void;
  onToggleCurrency: () => void;
  className?: string;
}>;

const RATE_INPUT_ID = "exchange-rate";
const RATE_HELP_ID = "exchange-rate-help";
const RATE_ERROR_ID = "exchange-rate-error";

export function ExchangeRateCard({
  rateText,
  error,
  currencyEnabled,
  onChange,
  onRestoreDefault,
  onToggleCurrency,
  className,
}: ExchangeRateCardProps) {
  const { messages, numberFormat } = useLocale();
  const intlLocale = numberFormat.intlLocale;
  const errorMessage = getExchangeRateErrorMessage(error, messages.rate.errors);
  const descriptionId = error === null ? RATE_HELP_ID : RATE_ERROR_ID;
  const toggleLabel = currencyEnabled ? messages.rate.hide : messages.rate.show;

  return (
    <section
      aria-labelledby="exchange-rate-title"
      className={`flex flex-col p-4 sm:p-5 md:justify-center ${className ?? ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className={`min-w-0 ${currencyEnabled ? "" : "opacity-55"}`}>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h2
              id="exchange-rate-title"
              className="font-display text-base font-semibold tracking-tight text-maple-ink sm:text-lg lg:text-2xl"
            >
              {messages.rate.title}
            </h2>
            {currencyEnabled ? (
              <span
                title={messages.rate.note}
                className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-2 py-0.5 text-[0.625rem] font-extrabold uppercase tracking-[0.08em] text-amber-900 lg:text-[0.6875rem]"
              >
                <PencilLine aria-hidden="true" size={10} strokeWidth={2.6} />
                {messages.rate.manual}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[0.625rem] font-extrabold uppercase tracking-[0.08em] text-slate-600 lg:text-[0.6875rem]">
                {messages.rate.disabled}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs font-semibold leading-snug text-maple-muted lg:text-sm">
            {currencyEnabled ? messages.rate.description : messages.rate.disabledDescription}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleCurrency}
          aria-pressed={currencyEnabled}
          aria-label={toggleLabel}
          title={toggleLabel}
          className={`flex size-9 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-colors lg:size-11 ${
            currencyEnabled
              ? "border-sky-100 bg-white text-sky-800 hover:border-sky-200 hover:bg-sky-50"
              : "border-amber-200 bg-amber-50 text-maple-orange-dark hover:border-amber-300 hover:bg-amber-100"
          }`}
        >
          {currencyEnabled ? (
            <Eye aria-hidden="true" className="size-4 lg:size-5" />
          ) : (
            <EyeOff aria-hidden="true" className="size-4 lg:size-5" />
          )}
        </button>
      </div>

      <div
        inert={!currencyEnabled}
        className={`mt-3 transition-opacity ${currencyEnabled ? "" : "pointer-events-none opacity-40"}`}
      >
        <label htmlFor={RATE_INPUT_ID} className="sr-only">
          {messages.rate.ariaLabel}
        </label>

        <div className="flex items-center gap-2">
          <span className="shrink-0 text-[0.6875rem] font-extrabold uppercase tracking-wide text-maple-muted sm:text-xs lg:text-sm">
            {messages.rate.equalsPrefix}
          </span>

          <div
            className={`flex min-w-0 flex-1 items-center rounded-xl border bg-white shadow-control transition-[border-color,box-shadow] focus-within:ring-4 ${
              error === null
                ? "border-sky-100 focus-within:border-maple-orange focus-within:ring-amber-200/55"
                : "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
            }`}
          >
            <input
              id={RATE_INPUT_ID}
              type="text"
              inputMode="decimal"
              enterKeyHint="done"
              autoComplete="off"
              spellCheck={false}
              disabled={!currencyEnabled}
              maxLength={EXCHANGE_RATE_INPUT_MAX_LENGTH}
              value={rateText}
              onChange={(event) => onChange(event.target.value)}
              aria-invalid={error !== null}
              aria-describedby={descriptionId}
              className="min-w-0 flex-1 bg-transparent py-2.5 pl-3 text-right font-display text-lg font-semibold text-maple-ink tabular-nums focus:outline-none disabled:cursor-not-allowed sm:text-xl lg:py-3 lg:text-2xl"
            />
            <span className="shrink-0 pl-1.5 pr-3 text-[0.6875rem] font-extrabold uppercase tracking-[0.08em] text-maple-muted lg:text-xs">
              {messages.rate.suffix}
            </span>
          </div>
        </div>

        <div className="mt-2 flex min-h-5 items-center justify-between gap-2">
          <p
            id={descriptionId}
            className={`text-xs font-semibold leading-snug lg:text-sm ${
              error === null ? "text-maple-muted" : "text-red-700"
            }`}
          >
            {errorMessage ??
              `${messages.rate.defaultPrefix} ${formatExchangeRate(
                DEFAULT_USD_CURRENCY_RATE,
                intlLocale,
              )}`}
          </p>

          <button
            type="button"
            onClick={onRestoreDefault}
            disabled={!currencyEnabled}
            aria-label={messages.rate.reset}
            title={messages.rate.reset}
            className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-lg px-2 text-[0.6875rem] font-extrabold text-sky-800 transition-colors hover:bg-sky-50 hover:text-sky-950 disabled:cursor-not-allowed lg:min-h-9 lg:text-xs"
          >
            <RotateCcw aria-hidden="true" size={13} strokeWidth={2.5} />
            {messages.rate.resetShort}
          </button>
        </div>
      </div>
    </section>
  );
}

function getExchangeRateErrorMessage(
  error: ExchangeRateError | null,
  errors: {
    empty: string;
    nonPositive: string;
    invalid: string;
  },
): string | null {
  switch (error) {
    case null:
      return null;
    case "empty":
      return errors.empty;
    case "non-positive":
      return errors.nonPositive;
    case "invalid":
      return errors.invalid;
  }
}
