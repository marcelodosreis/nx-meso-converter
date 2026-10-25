"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_USD_CURRENCY_RATE } from "@/domain/conversion/conversion.constants";
import { isValidUsdCurrencyRate } from "@/domain/conversion/conversion.rules";
import { useLocale } from "@/i18n/locale-provider";
import {
  readStoredExchangeRate,
  writeStoredExchangeRate,
} from "@/infrastructure/persistence/exchange-rate.repository";
import {
  formatCanonicalNumberInput,
  normalizeLocalizedNumberInput,
  numberToCanonicalNumberInput,
  parseCanonicalNumber,
} from "@/lib/localized-number-input";

export type ExchangeRateError = "empty" | "non-positive" | "invalid";

export type ExchangeRateState = Readonly<{
  rateText: string;
  rate: number | null;
  error: ExchangeRateError | null;
  updateRateText: (value: string) => void;
  restoreDefault: () => void;
}>;

export function useExchangeRate(): ExchangeRateState {
  const { numberFormat } = useLocale();
  const [rateCanonical, setRateCanonical] = useState(() =>
    numberToCanonicalNumberInput(DEFAULT_USD_CURRENCY_RATE, 2),
  );
  const hasEditedRate = useRef(false);

  useEffect(() => {
    if (hasEditedRate.current) {
      return;
    }

    const storedRate = readStoredExchangeRate();

    if (storedRate !== null) {
      setRateCanonical(numberToCanonicalNumberInput(storedRate, 2));
    }
  }, []);

  function updateRateText(value: string) {
    hasEditedRate.current = true;
    const nextCanonicalValue = normalizeLocalizedNumberInput(value, numberFormat);
    setRateCanonical(nextCanonicalValue);

    const parsedValue = parseCanonicalNumber(nextCanonicalValue);

    if (parsedValue !== null && isValidUsdCurrencyRate(parsedValue)) {
      writeStoredExchangeRate(parsedValue);
    }
  }

  function restoreDefault() {
    hasEditedRate.current = true;
    setRateCanonical(numberToCanonicalNumberInput(DEFAULT_USD_CURRENCY_RATE, 2));
    writeStoredExchangeRate(DEFAULT_USD_CURRENCY_RATE);
  }

  const validation = validateExchangeRate(rateCanonical);

  return {
    rateText: formatCanonicalNumberInput(rateCanonical, numberFormat),
    rate: validation.rate,
    error: validation.error,
    updateRateText,
    restoreDefault,
  };
}

function validateExchangeRate(canonicalValue: string): {
  rate: number | null;
  error: ExchangeRateError | null;
} {
  if (canonicalValue.length === 0) {
    return { rate: null, error: "empty" };
  }

  const parsedValue = parseCanonicalNumber(canonicalValue);

  if (parsedValue === null) {
    return { rate: null, error: "invalid" };
  }

  if (!isValidUsdCurrencyRate(parsedValue)) {
    return { rate: null, error: "non-positive" };
  }

  return { rate: parsedValue, error: null };
}
