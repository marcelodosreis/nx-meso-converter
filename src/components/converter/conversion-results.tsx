import { Check, ClipboardCopy } from "lucide-react";
import { CONVERSION_UNITS } from "@/domain/conversion/conversion.constants";
import type {
  ConversionUnit,
  ConversionValues,
  SourceUnit,
} from "@/domain/conversion/conversion.types";
import { useLocale } from "@/i18n/locale-provider";
import { formatUnitValueWithLabel } from "@/lib/formatters";
import { ConversionResultItem } from "./conversion-result-item";
import type { CopyTarget } from "./use-copy-feedback";

type ConversionResultsProps = Readonly<{
  values: ConversionValues | null;
  sourceUnit: SourceUnit;
  affectedUnits: ReadonlySet<ConversionUnit> | null;
  currencyEnabled: boolean;
  copiedTarget: CopyTarget | null;
  placeholderMessage: string;
  statusMessage: string;
  onCopy: (unit: ConversionUnit) => void;
  onCopyAll: () => void;
  className?: string;
}>;

export function ConversionResults({
  values,
  sourceUnit,
  affectedUnits,
  currencyEnabled,
  copiedTarget,
  placeholderMessage,
  statusMessage,
  onCopy,
  onCopyAll,
  className,
}: ConversionResultsProps) {
  const { messages, numberFormat } = useLocale();
  const copiedAll = copiedTarget === "all";
  const destinations = CONVERSION_UNITS.filter(
    (unit) => unit !== sourceUnit && (currencyEnabled || unit !== "currency"),
  );
  const gridColumnsClass = destinations.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  const sourceSummary =
    values === null
      ? placeholderMessage
      : messages.results.source(
          formatUnitValueWithLabel(
            sourceUnit,
            values[sourceUnit],
            numberFormat.intlLocale,
            messages.units.labels[sourceUnit].label,
          ),
        );
  const feedback = statusMessage.length > 0 ? statusMessage : sourceSummary;
  const feedbackClassName =
    statusMessage.length > 0
      ? copiedTarget === null
        ? "text-red-700"
        : "text-emerald-700"
      : "text-maple-muted";

  return (
    <section aria-labelledby="conversion-results-title" className={`p-4 sm:p-5 ${className ?? ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2
            id="conversion-results-title"
            className="font-display text-xl font-semibold tracking-tight text-maple-ink sm:text-2xl lg:text-3xl"
          >
            {messages.results.title}
          </h2>
          <p
            className={`mt-0.5 min-h-5 text-[0.8125rem] font-semibold leading-relaxed lg:text-sm ${feedbackClassName}`}
          >
            {feedback}
          </p>
        </div>

        <button
          type="button"
          onClick={onCopyAll}
          disabled={values === null}
          aria-label={messages.results.copyAll}
          title={messages.results.copyAll}
          className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl border px-3 text-xs font-extrabold transition-colors disabled:cursor-not-allowed disabled:opacity-35 lg:min-h-12 lg:text-sm ${
            copiedAll
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-sky-100 bg-white text-sky-800 hover:border-sky-200 hover:bg-sky-50"
          }`}
        >
          {copiedAll ? (
            <Check aria-hidden="true" size={14} strokeWidth={2.6} />
          ) : (
            <ClipboardCopy aria-hidden="true" size={13} strokeWidth={2.4} />
          )}
          <span>{messages.results.copyAllShort}</span>
        </button>
      </div>

      <ul
        className={`mt-2 grid grid-cols-1 divide-y divide-sky-100/80 border-t border-sky-100/80 lg:divide-x lg:divide-y-0 ${gridColumnsClass}`}
      >
        {destinations.map((unit) => (
          <ConversionResultItem
            key={unit}
            unit={unit}
            value={values === null ? null : values[unit]}
            isAffected={affectedUnits?.has(unit) ?? false}
            isCopied={copiedTarget === unit}
            onCopy={onCopy}
          />
        ))}
      </ul>
    </section>
  );
}
