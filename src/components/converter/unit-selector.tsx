import { SOURCE_UNITS } from "@/domain/conversion/conversion.constants";
import type { SourceUnit } from "@/domain/conversion/conversion.types";
import { useLocale } from "@/i18n/locale-provider";
import { UNIT_ICONS } from "./unit-icons";

type UnitSelectorProps = Readonly<{
  value: SourceUnit;
  currencyEnabled: boolean;
  onChange: (unit: SourceUnit) => void;
}>;

export function UnitSelector({ value, currencyEnabled, onChange }: UnitSelectorProps) {
  const { messages } = useLocale();
  const visibleUnits = currencyEnabled
    ? SOURCE_UNITS
    : SOURCE_UNITS.filter((unit) => unit !== "currency");

  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 text-[0.6875rem] font-extrabold uppercase tracking-[0.14em] text-maple-muted lg:text-xs">
        {messages.units.legend}
      </legend>

      <div
        className={`grid gap-1 rounded-2xl border border-sky-100/80 bg-sky-50/60 p-1 ${
          currencyEnabled ? "grid-cols-4" : "grid-cols-3"
        }`}
      >
        {visibleUnits.map((unit) => {
          const Icon = UNIT_ICONS[unit];
          const unitMessages = messages.units.labels[unit];
          const isSelected = unit === value;

          return (
            <button
              key={unit}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(unit)}
              className={`flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-xl px-1 text-xs font-extrabold transition-[background-color,box-shadow,color] sm:min-h-12 lg:min-h-14 lg:gap-1.5 lg:text-sm ${
                isSelected
                  ? "bg-white text-maple-ink shadow-sm ring-1 ring-amber-200/80"
                  : "text-maple-muted hover:bg-white/65 hover:text-maple-ink"
              }`}
            >
              <Icon
                aria-hidden="true"
                size={15}
                strokeWidth={2.4}
                className={`hidden sm:block lg:size-[17px] ${
                  isSelected ? "text-maple-orange-dark" : "text-sky-700/70"
                }`}
              />
              <span className="truncate">{unitMessages.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
