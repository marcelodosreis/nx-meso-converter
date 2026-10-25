"use client";

import { Info, RotateCcw, Save, X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  type ConversionSettingsDraft,
  type ConversionSettingsDraftField,
  createConversionSettingsDraft,
  getDraftMesosPerNx,
  parseConversionSettingsDraft,
  updateConversionSettingsDraft,
} from "@/application/settings/conversion-settings-draft";
import { DEFAULT_CONVERSION_RATES } from "@/domain/conversion/conversion.constants";
import { isValidConversionRates } from "@/domain/conversion/conversion.rules";
import { useLocale } from "@/i18n/locale-provider";
import {
  formatCanonicalNumberInput,
  normalizeLocalizedNumberInput,
  numberToCanonicalNumberInput,
  parseCanonicalNumber,
} from "@/lib/localized-number-input";
import { useConversionSettings } from "./conversion-settings-provider";

type SettingsDialogProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

const SETTINGS_FIELDS = [
  "nxPerUsd",
  "nxPerSlot",
  "mesosPerSlot",
  "mesosPerNx",
] as const satisfies readonly ConversionSettingsDraftField[];

const SETTINGS_FIELD_IDS: Record<ConversionSettingsDraftField, string> = {
  nxPerUsd: "settings-nx-per-usd",
  nxPerSlot: "settings-nx-per-slot",
  mesosPerSlot: "settings-mesos-per-slot",
  mesosPerNx: "settings-mesos-per-nx",
};

export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { messages, numberFormat } = useLocale();
  const { rates, saveRates } = useConversionSettings();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [drafts, setDrafts] = useState<ConversionSettingsDraft>(() =>
    createConversionSettingsDraft(rates),
  );
  const [invalidFields, setInvalidFields] = useState<ReadonlySet<ConversionSettingsDraftField>>(
    () => new Set(),
  );

  useEffect(() => {
    if (open) {
      setDrafts(createConversionSettingsDraft(rates));
      setInvalidFields(new Set());
    }
  }, [open, rates]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog === null) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const mesosPerNx = getDraftMesosPerNx(drafts);
  const derivedValue =
    mesosPerNx === null
      ? "—"
      : formatCanonicalNumberInput(numberToCanonicalNumberInput(mesosPerNx, 0, 8), numberFormat);

  function updateDraft(field: ConversionSettingsDraftField, value: string) {
    const canonicalValue = normalizeLocalizedNumberInput(value, numberFormat);
    setDrafts((currentDrafts) =>
      updateConversionSettingsDraft(currentDrafts, field, canonicalValue),
    );
    setInvalidFields((currentFields) => {
      if (!currentFields.has(field)) {
        return currentFields;
      }

      const nextFields = new Set(currentFields);
      nextFields.delete(field);
      return nextFields;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const invalid = SETTINGS_FIELDS.filter((field) => {
      const value = parseCanonicalNumber(drafts[field]);
      return value === null || !Number.isFinite(value) || value <= 0;
    });

    if (invalid.length > 0) {
      setInvalidFields(new Set(invalid));
      focusSettingsField(invalid[0]);
      return;
    }

    const parsedRates = parseConversionSettingsDraft(drafts);

    if (parsedRates === null || !isValidConversionRates(parsedRates)) {
      setInvalidFields(new Set(SETTINGS_FIELDS));
      focusSettingsField(SETTINGS_FIELDS[0]);
      return;
    }

    saveRates(parsedRates);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="settings-title"
      aria-describedby="settings-description"
      onClose={onClose}
      className="settings-dialog m-auto max-h-[calc(100dvh-2rem)] w-[min(calc(100vw-2rem),35rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] border border-white/90 p-0 text-maple-ink shadow-2xl"
    >
      <form onSubmit={handleSubmit} className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id="settings-title"
              className="font-display text-xl font-semibold tracking-tight text-maple-ink"
            >
              {messages.settings.title}
            </h2>
            <p
              id="settings-description"
              className="mt-1 text-xs font-semibold leading-relaxed text-maple-muted sm:text-sm"
            >
              {messages.settings.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={messages.settings.close}
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-white text-sky-700 transition-colors hover:border-sky-200 hover:bg-sky-50"
          >
            <X aria-hidden="true" size={17} strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SettingsRateField
            id="settings-nx-per-usd"
            label={messages.settings.nxPerUsd}
            hint={messages.settings.nxPerUsdHint}
            displayValue={formatCanonicalNumberInput(drafts.nxPerUsd, numberFormat)}
            isInvalid={invalidFields.has("nxPerUsd")}
            errorMessage={messages.settings.invalidField}
            onChange={(value) => updateDraft("nxPerUsd", value)}
          />
          <SettingsRateField
            id="settings-nx-per-slot"
            label={messages.settings.nxPerSlot}
            hint={messages.settings.nxPerSlotHint}
            displayValue={formatCanonicalNumberInput(drafts.nxPerSlot, numberFormat)}
            isInvalid={invalidFields.has("nxPerSlot")}
            errorMessage={messages.settings.invalidField}
            onChange={(value) => updateDraft("nxPerSlot", value)}
          />
          <SettingsRateField
            id="settings-mesos-per-slot"
            label={messages.settings.mesosPerSlot}
            hint={messages.settings.mesosPerSlotHint}
            displayValue={formatCanonicalNumberInput(drafts.mesosPerSlot, numberFormat)}
            isInvalid={invalidFields.has("mesosPerSlot")}
            errorMessage={messages.settings.invalidField}
            onChange={(value) => updateDraft("mesosPerSlot", value)}
          />
          <SettingsRateField
            id="settings-mesos-per-nx"
            label={messages.settings.mesosPerNx}
            hint={messages.settings.mesosPerNxHint}
            displayValue={formatCanonicalNumberInput(drafts.mesosPerNx, numberFormat)}
            isInvalid={invalidFields.has("mesosPerNx")}
            errorMessage={messages.settings.invalidField}
            onChange={(value) => updateDraft("mesosPerNx", value)}
          />
        </div>

        {mesosPerNx !== null ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-amber-200/70 bg-amber-50/75 px-3 py-2">
            <span className="text-[0.625rem] font-extrabold uppercase tracking-[0.12em] text-amber-900/75">
              {messages.settings.currentRelation}
            </span>
            <p className="font-display text-sm font-semibold text-amber-950">
              {messages.settings.derived(derivedValue)}
            </p>
          </div>
        ) : null}

        <p className="mt-2 text-[0.6875rem] font-semibold leading-relaxed text-maple-muted">
          {messages.settings.syncNote}
        </p>
        <p className="mt-1 text-[0.6875rem] font-semibold leading-relaxed text-maple-muted">
          {messages.settings.note}
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => {
              setDrafts(createConversionSettingsDraft(DEFAULT_CONVERSION_RATES));
              setInvalidFields(new Set());
            }}
            className="inline-flex min-h-9 items-center gap-1.5 self-start rounded-lg px-1 text-[0.6875rem] font-extrabold text-sky-800 transition-colors hover:text-sky-950"
          >
            <RotateCcw aria-hidden="true" size={13} strokeWidth={2.5} />
            {messages.settings.reset}
          </button>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-sky-100 bg-white px-3 py-2 text-xs font-extrabold text-maple-ink transition-colors hover:border-sky-200 hover:bg-sky-50 sm:px-4"
            >
              {messages.settings.cancel}
            </button>
            <button
              type="submit"
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-maple-orange-dark px-3 py-2 text-xs font-extrabold text-white shadow-control transition-colors hover:bg-maple-orange-deep sm:px-4"
            >
              <Save aria-hidden="true" size={14} strokeWidth={2.5} />
              {messages.settings.save}
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}

function SettingsRateField({
  id,
  label,
  hint,
  displayValue,
  isInvalid,
  errorMessage,
  onChange,
}: Readonly<{
  id: string;
  label: string;
  hint: string;
  displayValue: string;
  isInvalid: boolean;
  errorMessage: string;
  onChange: (value: string) => void;
}>) {
  const [showHint, setShowHint] = useState(false);
  const hintId = `${id}-hint`;
  const describedBy =
    [showHint ? hintId : null, isInvalid ? `${id}-error` : null]
      .filter((value): value is string => value !== null)
      .join(" ") || undefined;

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1">
        <label
          htmlFor={id}
          className="text-[0.6875rem] font-extrabold leading-tight text-maple-ink"
        >
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowHint((visible) => !visible)}
          aria-label={hint}
          aria-expanded={showHint}
          aria-controls={hintId}
          title={hint}
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-maple-muted transition-colors hover:bg-sky-50 hover:text-maple-orange-dark"
        >
          <Info aria-hidden="true" size={12} strokeWidth={2.5} />
        </button>
      </div>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        enterKeyHint="next"
        autoComplete="off"
        spellCheck={false}
        value={displayValue}
        aria-invalid={isInvalid}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-right font-display text-lg font-semibold text-maple-ink tabular-nums shadow-control transition-[border-color,box-shadow] focus:outline-none focus:ring-4 ${
          isInvalid
            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
            : "border-sky-100 focus:border-maple-orange focus:ring-amber-200/55"
        }`}
      />
      {isInvalid ? (
        <p id={`${id}-error`} className="mt-1 text-[0.6875rem] font-bold text-red-700">
          {errorMessage}
        </p>
      ) : null}
      {showHint ? (
        <p
          id={hintId}
          className="mt-1 text-[0.6875rem] font-semibold leading-relaxed text-maple-muted"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function focusSettingsField(field: ConversionSettingsDraftField | undefined) {
  if (field === undefined) {
    return;
  }

  requestAnimationFrame(() => {
    document.getElementById(SETTINGS_FIELD_IDS[field])?.focus();
  });
}
