import { Check, Copy } from "lucide-react";
import type { ConversionUnit } from "@/domain/conversion/conversion.types";
import { useLocale } from "@/i18n/locale-provider";
import { formatUnitValue } from "@/lib/formatters";
import { UNIT_ICONS } from "./unit-icons";

type ConversionResultItemProps = Readonly<{
  unit: ConversionUnit;
  value: number | null;
  isCopied: boolean;
  onCopy: (unit: ConversionUnit) => void;
}>;

export function ConversionResultItem({ unit, value, isCopied, onCopy }: ConversionResultItemProps) {
  const { messages, numberFormat } = useLocale();
  const intlLocale = numberFormat.intlLocale;
  const Icon = UNIT_ICONS[unit];
  const unitMessages = messages.units.labels[unit];
  const canCopy = value !== null;
  const copyLabel = isCopied ? messages.copy.success : unitMessages.copyAriaLabel;
  const formattedValue = value === null ? "—" : formatUnitValue(unit, value, intlLocale);
  const isLongValue = formattedValue.length > 13;

  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2.5 py-2.5 sm:gap-x-3 sm:py-4 lg:px-4 lg:py-5 lg:first:pl-0 lg:last:pr-0">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 sm:size-10 sm:rounded-xl lg:size-12">
        <Icon
          aria-hidden="true"
          strokeWidth={2.3}
          className="size-[17px] sm:size-[18px] lg:size-5"
        />
      </span>

      <div className="min-w-0">
        <span className="block truncate text-sm font-extrabold text-maple-ink lg:text-base">
          {unitMessages.label}
        </span>
        <p
          className={`mt-0.5 min-w-0 text-left font-display font-semibold tracking-tight text-maple-ink tabular-nums [overflow-wrap:anywhere] ${
            isLongValue
              ? "text-[1.35rem] leading-tight sm:text-[1.5rem] sm:leading-snug md:text-[1.65rem] lg:text-[1.8rem]"
              : "text-[1.45rem] leading-tight sm:text-[clamp(1.5rem,2.4vw,1.95rem)] md:text-[1.85rem] lg:text-[clamp(2rem,2.4vw,2.4rem)]"
          }`}
        >
          {formattedValue}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onCopy(unit)}
        disabled={!canCopy}
        aria-label={copyLabel}
        title={copyLabel}
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-35 sm:size-10 lg:size-11 ${
          isCopied
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-sky-100 bg-white text-sky-700 hover:border-sky-200 hover:bg-sky-50"
        }`}
      >
        {isCopied ? (
          <Check aria-hidden="true" strokeWidth={2.6} className="size-4 lg:size-[17px]" />
        ) : (
          <Copy aria-hidden="true" strokeWidth={2.4} className="size-[15px] lg:size-4" />
        )}
      </button>
    </li>
  );
}
