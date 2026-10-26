import { Eye, EyeOff, PencilLine, RotateCcw } from "lucide-react";
import { EXCHANGE_RATE_INPUT_MAX_LENGTH } from "@/config/app.constants";
import { DEFAULT_USD_CURRENCY_RATE } from "@/domain/conversion/conversion.constants";
import { useLocale } from "@/i18n/locale-provider";
import { formatExchangeRate, formatUnitValue } from "@/lib/formatters";
import type { ExchangeRateError } from "./use-exchange-rate";

type ExchangeRateCardProps = Readonly<{
  rateText: string;
  rate: number | null;
  error: ExchangeRateError | null;
  currencyEnabled: boolean;
  onChange: (value: string) => void;
  onRestoreDefault: () => void;
  onToggleCurrency: () => void;
  className?: string;
}>;

const REFERENCE_USD_AMOUNTS = [1, 10, 50] as const;

const RATE_INPUT_ID = "exchange-rate";
const RATE_HELP_ID = "exchange-rate-help";
const RATE_ERROR_ID = "exchange-rate-error";

export function ExchangeRateCard({
  rateText,
  rate,
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
  const toggleLabel = currencyEnabled ? messages.rate.hide : messages.rate.show;
  const isCompact = !currencyEnabled;
  const defaultRateText = `${messages.rate.defaultPrefix} ${formatExchangeRate(
    DEFAULT_USD_CURRENCY_RATE,
    intlLocale,
  )}`;
  const describedBy = errorMessage === null ? RATE_HELP_ID : `${RATE_HELP_ID} ${RATE_ERROR_ID}`;
  const paddingClass = isCompact ? "px-4 pb-2 pt-4 sm:px-5 sm:pb-2 sm:pt-5" : "p-4 sm:p-5";
  const badgeClass = `inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-extrabold uppercase tracking-[0.08em] ${isCompact ? "text-[0.5rem]" : "text-[0.625rem] lg:text-[0.6875rem]"}`;

  return (
    <section
      aria-labelledby="exchange-rate-title"
      className={`flex flex-col ${paddingClass} ${className ?? ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className={`min-w-0 ${currencyEnabled ? "" : "opacity-55"}`}>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <h2
              id="exchange-rate-title"
              className={`font-display font-semibold tracking-tight text-maple-ink ${
                isCompact ? "text-xs lg:text-[0.8125rem]" : "text-base sm:text-lg lg:text-2xl"
              }`}
            >
              {messages.rate.title}
            </h2>
            {isCompact ? (
              <span className={`${badgeClass} bg-slate-100 text-slate-600`}>
                <PencilLine aria-hidden="true" size={9} strokeWidth={2.6} />
                {messages.rate.manual} · {messages.rate.disabled}
              </span>
            ) : (
              <span
                title={messages.rate.note}
                className={`${badgeClass} bg-amber-100/80 text-amber-900`}
              >
                <PencilLine aria-hidden="true" size={9} strokeWidth={2.6} />
                {messages.rate.manual}
              </span>
            )}
          </div>
          <p
            className={`mt-0.5 font-semibold leading-snug text-maple-muted ${
              isCompact ? "text-[0.5rem]" : "text-xs lg:text-sm"
            }`}
          >
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

      <div className={`transition-opacity ${currencyEnabled ? "" : "opacity-55"}`}>
        <div className={isCompact ? "mt-1.5" : "mt-3"}>
          <label htmlFor={RATE_INPUT_ID} className="sr-only">
            {messages.rate.ariaLabel}
          </label>

          <div className={`flex items-center ${isCompact ? "gap-1" : "gap-2"}`}>
            <span
              className={`shrink-0 font-extrabold uppercase tracking-wide text-maple-muted ${
                isCompact ? "text-[0.5rem]" : "text-[0.6875rem] sm:text-xs lg:text-sm"
              }`}
            >
              {messages.rate.equalsPrefix}
            </span>

            <div
              className={`flex min-w-0 flex-1 items-center border bg-white shadow-control transition-[border-color,box-shadow] focus-within:ring-4 ${
                isCompact ? "rounded-lg" : "rounded-xl"
              } ${
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
                aria-describedby={describedBy}
                className={`min-w-0 flex-1 bg-transparent pl-3 text-right font-display font-semibold text-maple-ink tabular-nums focus:outline-none disabled:cursor-not-allowed ${
                  isCompact
                    ? "py-1 text-[0.6875rem]"
                    : "py-2.5 text-lg sm:text-xl lg:py-3 lg:text-2xl"
                }`}
              />
              <span
                className={`shrink-0 pr-3 font-extrabold uppercase tracking-[0.08em] text-maple-muted ${
                  isCompact ? "pl-1 text-[0.5rem]" : "pl-1.5 text-[0.6875rem] lg:text-xs"
                }`}
              >
                {messages.rate.suffix}
              </span>
            </div>
          </div>

          <div
            className={`flex min-h-5 items-center justify-between gap-2 ${
              isCompact ? "mt-0.5" : "mt-2"
            }`}
          >
            <p
              id={RATE_HELP_ID}
              className={`font-semibold leading-snug text-maple-muted ${
                isCompact ? "text-[0.5625rem]" : "text-xs lg:text-sm"
              }`}
            >
              {defaultRateText}
            </p>

            <button
              type="button"
              onClick={onRestoreDefault}
              disabled={!currencyEnabled}
              aria-label={messages.rate.reset}
              title={messages.rate.reset}
              className={`inline-flex shrink-0 items-center justify-center gap-1 rounded-lg font-extrabold text-sky-800 transition-colors hover:bg-sky-50 hover:text-sky-950 disabled:cursor-not-allowed ${
                isCompact
                  ? "min-h-5 px-1 text-[0.5rem]"
                  : "min-h-8 px-2 text-[0.6875rem] lg:min-h-9 lg:text-xs"
              }`}
            >
              <RotateCcw aria-hidden="true" size={13} strokeWidth={2.5} />
              {messages.rate.resetShort}
            </button>
          </div>

          {errorMessage !== null ? (
            <p
              id={RATE_ERROR_ID}
              className={`font-semibold leading-snug text-red-700 ${
                isCompact ? "mt-0.5 text-[0.5rem]" : "mt-1 text-xs lg:text-sm"
              }`}
            >
              {errorMessage}
            </p>
          ) : null}
        </div>

        {rate !== null ? (
          <div className={`border-t border-sky-100/80 ${isCompact ? "mt-1 pt-1" : "mt-3 pt-2.5"}`}>
            <p
              className={`font-extrabold uppercase tracking-[0.12em] text-maple-muted ${
                isCompact ? "text-[0.5rem]" : "text-[0.625rem] lg:text-[0.6875rem]"
              }`}
            >
              {messages.rate.reference}
            </p>
            <dl className={`grid grid-cols-3 ${isCompact ? "mt-0.5 gap-1" : "mt-1.5 gap-2"}`}>
              {REFERENCE_USD_AMOUNTS.map((amount) => (
                <div key={amount} className="min-w-0">
                  <dt
                    className={`truncate font-extrabold text-maple-muted ${
                      isCompact ? "text-[0.4375rem]" : "text-[0.625rem]"
                    }`}
                  >
                    {formatUnitValue("usd", amount, intlLocale)}
                  </dt>
                  <dd
                    className={`mt-0.5 font-display font-semibold tabular-nums text-maple-ink ${
                      isCompact ? "text-[0.625rem]" : "text-sm lg:text-base"
                    }`}
                  >
                    {formatUnitValue("currency", amount * rate, intlLocale)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
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
