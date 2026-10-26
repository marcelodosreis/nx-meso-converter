"use client";

import { QUICK_AMOUNT_PRESETS } from "@/config/quick-amounts";
import type { SourceUnit } from "@/domain/conversion/conversion.types";
import { useLocale } from "@/i18n/locale-provider";
import { formatCompactUnitValue } from "@/lib/formatters";
import {
  formatCanonicalNumberInput,
  numberToCanonicalNumberInput,
} from "@/lib/localized-number-input";

type QuickAmountsProps = Readonly<{
  unit: SourceUnit;
  onSelect: (canonicalValue: string) => void;
}>;

export function QuickAmounts({ unit, onSelect }: QuickAmountsProps) {
  const { messages, numberFormat } = useLocale();
  const unitLabel = messages.units.labels[unit].shortLabel;

  return (
    <fieldset className="flex shrink-0 flex-wrap items-center gap-1">
      <legend className="sr-only">{messages.amount.quickValues}</legend>
      <span
        aria-hidden="true"
        className="text-[0.6875rem] font-extrabold uppercase tracking-[0.1em] text-maple-muted lg:text-xs"
      >
        {messages.amount.quickShort}
      </span>
      {QUICK_AMOUNT_PRESETS[unit].map((preset) => {
        const canonicalValue = numberToCanonicalNumberInput(preset);
        const fullValue = formatCanonicalNumberInput(canonicalValue, numberFormat);
        const shortValue = formatCompactUnitValue(unit, preset) ?? fullValue;

        return (
          <button
            key={canonicalValue}
            type="button"
            onClick={() => onSelect(canonicalValue)}
            aria-label={`${messages.amount.useValue}: ${fullValue} ${unitLabel}`}
            title={`${fullValue} ${unitLabel}`}
            className="min-h-9 rounded-full border border-sky-100 bg-white px-2.5 text-xs font-extrabold text-sky-800 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-maple-orange-dark lg:min-h-11 lg:px-3 lg:text-[0.8125rem]"
          >
            {shortValue}
          </button>
        );
      })}
    </fieldset>
  );
}
