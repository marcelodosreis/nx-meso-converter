"use client";

import { useEffect, useRef, useState } from "react";
import { calculateConversion } from "@/application/conversion/calculate-conversion.use-case";
import { findAffectedUnits } from "@/application/conversion/find-affected-units";
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
import {
  parseScenarioSearchParams,
  SCENARIO_URL_DEBOUNCE_MS,
  SCENARIO_URL_FLUSH_EVENT,
  type ScenarioUrlState,
  writeScenarioUrl,
} from "@/lib/scenario-url";
import { useConversionSettings } from "../settings/conversion-settings-provider";
import { AmountInput } from "./amount-input";
import { ConversionResults } from "./conversion-results";
import { ConverterSkeleton } from "./converter-skeleton";
import { ExchangeRateCard } from "./exchange-rate-card";
import { useCopyFeedback } from "./use-copy-feedback";
import { useExchangeRate } from "./use-exchange-rate";

type ConverterProps = Readonly<{
  initialSourceUnit?: SourceUnit;
  isLoading?: boolean;
}>;

export function Converter({ initialSourceUnit = "mesos", isLoading = false }: ConverterProps) {
  const { messages, numberFormat } = useLocale();
  const { rates, isHydrated: settingsHydrated, saveRates } = useConversionSettings();
  const intlLocale = numberFormat.intlLocale;
  const [amountCanonical, setAmountCanonical] = useState("");
  const [sourceUnit, setSourceUnit] = useState<SourceUnit>(initialSourceUnit);
  const [currencyEnabled, setCurrencyEnabled] = useState(true);
  const [isUrlReady, setIsUrlReady] = useState(false);
  const hasInitializedUrl = useRef(false);
  const {
    rateText,
    rateCanonical,
    rate,
    error: exchangeRateError,
    isHydrated: exchangeRateHydrated,
    updateRateText,
    applyCanonicalRate,
    restoreDefault,
  } = useExchangeRate();
  const { copiedTarget, statusMessage, copy } = useCopyFeedback();

  const amountValue = parseCanonicalNumber(amountCanonical);
  const amountError =
    amountCanonical.length > 0 && amountValue === null ? messages.amount.invalid : null;
  const effectiveRate = currencyEnabled ? rate : (rate ?? DEFAULT_USD_CURRENCY_RATE);
  const activeRateError = currencyEnabled ? exchangeRateError : null;
  const values = getConversionValues(amountValue, sourceUnit, effectiveRate, rates);
  const affectedUnits =
    values === null || amountValue === null || effectiveRate === null
      ? null
      : findAffectedUnits(
          {
            amount: amountValue,
            sourceUnit,
            usdCurrencyRate: effectiveRate,
            rates,
          },
          values,
        );
  const placeholderMessage = getResultsPlaceholder(
    amountCanonical,
    amountError,
    activeRateError,
    values,
    messages.results,
  );
  const scenarioStateRef = useRef<ScenarioUrlState>({
    amountCanonical,
    sourceUnit,
    currencyEnabled,
    exchangeRateCanonical: rateCanonical,
    rates,
  });

  scenarioStateRef.current = {
    amountCanonical,
    sourceUnit,
    currencyEnabled,
    exchangeRateCanonical: rateCanonical,
    rates,
  };

  useEffect(() => {
    if (hasInitializedUrl.current) {
      return;
    }

    hasInitializedUrl.current = true;

    const overrides = parseScenarioSearchParams(window.location.search);
    const nextCurrencyEnabled = overrides.currencyEnabled ?? currencyEnabled;
    const requestedSourceUnit = overrides.sourceUnit ?? sourceUnit;
    const nextSourceUnit =
      !nextCurrencyEnabled && requestedSourceUnit === "currency" ? "nx" : requestedSourceUnit;

    if (overrides.amountCanonical !== undefined) {
      setAmountCanonical(overrides.amountCanonical);
    }

    if (nextSourceUnit !== sourceUnit) {
      setSourceUnit(nextSourceUnit);
    }

    if (nextCurrencyEnabled !== currencyEnabled) {
      setCurrencyEnabled(nextCurrencyEnabled);
    }

    if (overrides.exchangeRateCanonical !== undefined) {
      applyCanonicalRate(overrides.exchangeRateCanonical);
    }

    if (overrides.rates !== undefined) {
      saveRates(overrides.rates);
    }

    setIsUrlReady(true);
  }, [applyCanonicalRate, currencyEnabled, saveRates, sourceUnit]);

  useEffect(() => {
    if (!isUrlReady) {
      return;
    }

    const timeout = window.setTimeout(() => {
      writeScenarioUrl({
        amountCanonical,
        sourceUnit,
        currencyEnabled,
        exchangeRateCanonical: rateCanonical,
        rates,
      });
    }, SCENARIO_URL_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [isUrlReady, amountCanonical, sourceUnit, currencyEnabled, rateCanonical, rates]);

  useEffect(() => {
    if (!isUrlReady) {
      return;
    }

    const flush = () => writeScenarioUrl(scenarioStateRef.current);

    window.addEventListener(SCENARIO_URL_FLUSH_EVENT, flush);

    return () => window.removeEventListener(SCENARIO_URL_FLUSH_EVENT, flush);
  }, [isUrlReady]);

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

  if (isLoading || !isUrlReady || !settingsHydrated || !exchangeRateHydrated) {
    return <ConverterSkeleton />;
  }

  return (
    <>
      <div className="calculator-surface flex flex-col">
        <div
          className={`contents md:grid ${
            currencyEnabled
              ? "md:grid-cols-[minmax(0,2.1fr)_minmax(18rem,1fr)]"
              : "md:grid-cols-[minmax(0,1fr)_minmax(15rem,24%)]"
          }`}
        >
          <section aria-labelledby="converter-input-title" className="order-1 min-w-0 p-4 sm:p-5">
            <h2 id="converter-input-title" className="sr-only">
              {messages.amount.inputSectionTitle}
            </h2>

            <AmountInput
              value={amountCanonical}
              unit={sourceUnit}
              currencyEnabled={currencyEnabled}
              error={amountError}
              mesosPerNx={rates.mesosPerNx}
              onChange={setAmountCanonical}
              onUnitChange={setSourceUnit}
              onClear={() => setAmountCanonical("")}
            />
          </section>

          <div className="order-3 min-w-0 border-t border-sky-100/80 md:border-l md:border-t-0">
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

        <div className="order-2 border-t border-sky-100/80">
          <ConversionResults
            values={values}
            sourceUnit={sourceUnit}
            affectedUnits={affectedUnits}
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
