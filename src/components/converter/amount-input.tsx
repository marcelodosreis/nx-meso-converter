"use client";

import { X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import type { SourceUnit } from "@/domain/conversion/conversion.types";
import { useLocale } from "@/i18n/locale-provider";
import {
  formatCanonicalNumberInput,
  formatLocalizedNumberInput,
} from "@/lib/localized-number-input";
import { QuickAmounts } from "./quick-amounts";
import { UNIT_ICONS } from "./unit-icons";
import { UnitSelector } from "./unit-selector";

type AmountInputProps = Readonly<{
  value: string;
  unit: SourceUnit;
  currencyEnabled: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onUnitChange: (unit: SourceUnit) => void;
  onClear: () => void;
}>;

const AMOUNT_INPUT_ID = "conversion-amount";
const AMOUNT_HELP_ID = "conversion-amount-help";
const AMOUNT_ERROR_ID = "conversion-amount-error";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function AmountInput({
  value,
  unit,
  currencyEnabled,
  error,
  onChange,
  onUnitChange,
  onClear,
}: AmountInputProps) {
  const { messages, numberFormat } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCaretRef = useRef<number | null>(null);
  const displayValue = formatCanonicalNumberInput(value, numberFormat);
  const hasValue = value.length > 0;
  const descriptionId = error === null ? AMOUNT_HELP_ID : AMOUNT_ERROR_ID;
  const Icon = UNIT_ICONS[unit];
  const unitMessages = messages.units.labels[unit];

  useIsomorphicLayoutEffect(() => {
    const input = inputRef.current;
    const pendingCaret = pendingCaretRef.current;

    if (input !== null && pendingCaret !== null) {
      input.setSelectionRange(pendingCaret, pendingCaret);
      pendingCaretRef.current = null;
    }
  });

  function handleChange(nextValue: string, caretPosition: number) {
    const formatted = formatLocalizedNumberInput(nextValue, caretPosition, numberFormat);
    const input = inputRef.current;

    if (formatted.canonicalValue === value) {
      pendingCaretRef.current = null;

      if (input !== null) {
        input.value = formatted.value;
        input.setSelectionRange(formatted.caretPosition, formatted.caretPosition);
      }

      return;
    }

    pendingCaretRef.current = formatted.caretPosition;
    onChange(formatted.canonicalValue);
  }

  function handleClear() {
    onClear();
    inputRef.current?.focus();
  }

  function handleQuickAmount(canonicalValue: string) {
    pendingCaretRef.current = formatCanonicalNumberInput(canonicalValue, numberFormat).length;
    onChange(canonicalValue);
    inputRef.current?.focus();
  }

  return (
    <div>
      <label
        htmlFor={AMOUNT_INPUT_ID}
        className="mb-1.5 block text-base font-extrabold tracking-wide text-maple-ink lg:text-lg"
      >
        {messages.amount.label}
      </label>

      <div
        className={`flex items-stretch rounded-2xl border bg-white shadow-control transition-[border-color,box-shadow] focus-within:bg-white focus-within:ring-4 ${
          error === null
            ? "border-sky-100 focus-within:border-maple-orange focus-within:ring-amber-200/55"
            : "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
        }`}
      >
        <span className="flex shrink-0 items-center gap-1.5 rounded-l-[0.9rem] border-r border-sky-100/90 bg-amber-50/80 px-3 text-maple-orange-dark">
          <Icon aria-hidden="true" strokeWidth={2.4} className="size-4 lg:size-[18px]" />
          <span className="hidden text-xs font-extrabold uppercase tracking-[0.1em] sm:inline lg:text-sm">
            {unitMessages.shortLabel}
          </span>
        </span>

        <input
          ref={inputRef}
          id={AMOUNT_INPUT_ID}
          type="text"
          inputMode="decimal"
          enterKeyHint="done"
          autoComplete="off"
          spellCheck={false}
          value={displayValue}
          aria-label={`${messages.amount.label} (${unitMessages.shortLabel})`}
          onChange={(event) =>
            handleChange(event.currentTarget.value, event.currentTarget.selectionStart ?? 0)
          }
          placeholder={messages.amount.placeholder}
          aria-invalid={error !== null}
          aria-describedby={descriptionId}
          className="min-w-0 flex-1 bg-transparent py-3 pl-3 pr-2 text-right font-display text-[clamp(1.7rem,7.4vw,3.25rem)] font-semibold leading-none tracking-tight text-maple-ink tabular-nums placeholder:text-slate-500 focus:outline-none lg:py-4"
        />

        <span className="flex items-center pr-1.5">
          <button
            type="button"
            onClick={handleClear}
            disabled={!hasValue}
            aria-label={messages.amount.clear}
            className="flex size-10 items-center justify-center rounded-xl text-sky-700 transition-colors hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-30 lg:size-11"
          >
            <X aria-hidden="true" strokeWidth={2.5} className="size-[17px] lg:size-[19px]" />
          </button>
        </span>
      </div>

      {error !== null ? (
        <p
          id={AMOUNT_ERROR_ID}
          className="mt-1.5 text-xs font-semibold leading-relaxed text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-2.5">
        <UnitSelector value={unit} currencyEnabled={currencyEnabled} onChange={onUnitChange} />
      </div>

      <div
        className={`mt-2 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1.5 ${
          error === null ? "justify-between" : "justify-end"
        }`}
      >
        {error === null ? (
          <p
            id={AMOUNT_HELP_ID}
            className="text-[0.8125rem] font-semibold text-maple-muted max-sm:sr-only lg:text-sm"
          >
            {messages.amount.help}
          </p>
        ) : null}
        <QuickAmounts unit={unit} onSelect={handleQuickAmount} />
      </div>
    </div>
  );
}
