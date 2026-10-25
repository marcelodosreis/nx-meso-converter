"use client";

import { useState } from "react";
import { calculateConversion } from "@/application/conversion/calculate-conversion.use-case";
import {
  CONVERSION_UNITS,
  DEFAULT_USD_CURRENCY_RATE,
} from "@/domain/conversion/conversion.constants";
import type {
  ConversionRates,
  ConversionUnit,
  ConversionValues,
  SourceUnit,
} from "@/domain/conversion/conversion.types";
import { useLocale } from "@/i18n/locale-provider";
import { formatUnitValue } from "@/lib/formatters";
import { parseCanonicalNumber } from "@/lib/localized-number-input";
import { useConversionSettings } from "../settings/conversion-settings-provider";
import { AmountInput } from "./amount-input";
import { ConversionResults } from "./conversion-results";
import { ExchangeRateCard } from "./exchange-rate-card";
import { useCopyFeedback } from "./use-copy-feedback";
import { useExchangeRate } from "./use-exchange-rate";

export function Converter() {
  const { messages, numberFormat } = useLocale();
  const { rates } = useConversionSettings();
  const intlLocale = numberFormat.intlLocale;
  const [amountCanonical, setAmountCanonical] = useState("");
  const [sourceUnit, setSourceUnit] = useState<SourceUnit>("nx");
  const [currencyEnabled, setCurrencyEnabled] = useState(true);
  const {
    rateText,
    rate,
    error: exchangeRateError,
    updateRateText,
    restoreDefault,
  } = useExchangeRate();
  const { copiedTarget, statusMessage, copy } = useCopyFeedback();

  const amountValue = parseCanonicalNumber(amountCanonical);
  const amountError =
    amountCanonical.length > 0 && amountValue === null ? messages.amount.invalid : null;
  const effectiveRate = currencyEnabled ? rate : (rate ?? DEFAULT_USD_CURRENCY_RATE);
  const activeRateError = currencyEnabled ? exchangeRateError : null;
  const values = getConversionValues(amountValue, sourceUnit, effectiveRate, rates);
  const placeholderMessage = getResultsPlaceholder(
    amountCanonical,
    amountError,
    activeRateError,
    values,
    messages.results,
  );

  function handleToggleCurrency() {
    const nextEnabled = !currencyEnabled;
    setCurrencyEnabled(nextEnabled);

    if (!nextEnabled && sourceUnit === "currency") {
      setSourceUnit("nx");
    }
  }

  function handleCopy(unit: ConversionUnit) {
    if (values === null) {
      return;
    }

    void copy(unit, formatUnitValue(unit, values[unit], intlLocale));
  }

  function handleCopyAll() {
    if (values === null) {
      return;
    }

    const text = CONVERSION_UNITS.filter(
      (unit) => unit !== sourceUnit && (currencyEnabled || unit !== "currency"),
    )
      .map(
        (unit) =>
          `${messages.units.labels[unit].label}: ${formatUnitValue(
            unit,
            values[unit],
            intlLocale,
          )}`,
      )
      .join("\n");

    void copy("all", text);
  }

  return (
    <>
      <div className="calculator-surface">
        <div
          className={`grid ${
            currencyEnabled
              ? "md:grid-cols-[minmax(0,1.55fr)_minmax(18rem,1fr)]"
              : "md:grid-cols-[minmax(0,1fr)_minmax(15rem,24%)]"
          }`}
        >
          <section aria-labelledby="converter-input-title" className="min-w-0 p-4 sm:p-5">
            <h2 id="converter-input-title" className="sr-only">
              {messages.amount.inputSectionTitle}
            </h2>

            <AmountInput
              value={amountCanonical}
              unit={sourceUnit}
              currencyEnabled={currencyEnabled}
              error={amountError}
              onChange={setAmountCanonical}
              onUnitChange={setSourceUnit}
              onClear={() => setAmountCanonical("")}
            />
          </section>

          <div className="min-w-0 border-t border-sky-100/80 md:border-l md:border-t-0">
            <ExchangeRateCard
              rateText={rateText}
              rate={rate}
              error={exchangeRateError}
              currencyEnabled={currencyEnabled}
              onChange={updateRateText}
              onRestoreDefault={restoreDefault}
              onToggleCurrency={handleToggleCurrency}
              className="min-w-0"
            />
          </div>
        </div>

        <div className="border-t border-sky-100/80">
          <ConversionResults
            values={values}
            sourceUnit={sourceUnit}
            copiedTarget={copiedTarget}
            currencyEnabled={currencyEnabled}
            placeholderMessage={placeholderMessage}
            statusMessage={statusMessage}
            onCopy={handleCopy}
            onCopyAll={handleCopyAll}
          />
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </>
  );
}

function getConversionValues(
  amount: number | null,
  sourceUnit: SourceUnit,
  rate: number | null,
  rates: ConversionRates,
): ConversionValues | null {
  if (amount === null || rate === null) {
    return null;
  }

  const result = calculateConversion({
    amount,
    sourceUnit,
    usdCurrencyRate: rate,
    rates,
  });

  return result.ok ? result.values : null;
}

function getResultsPlaceholder(
  amountCanonical: string,
  amountError: string | null,
  exchangeRateError: string | null,
  values: ConversionValues | null,
  resultsMessages: {
    empty: string;
    fixAmount: string;
    fixRate: string;
    unavailable: string;
  },
): string {
  if (values !== null) {
    return "";
  }

  if (amountCanonical.length === 0) {
    return resultsMessages.empty;
  }

  if (amountError !== null) {
    return resultsMessages.fixAmount;
  }

  if (exchangeRateError !== null) {
    return resultsMessages.fixRate;
  }

  return resultsMessages.unavailable;
}
