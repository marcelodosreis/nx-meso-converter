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
  rateCanonical: string;
  rate: number | null;
  error: ExchangeRateError | null;
  updateRateText: (value: string) => void;
  applyCanonicalRate: (value: string) => void;
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

  function applyCanonicalRate(value: string) {
    hasEditedRate.current = true;
    setRateCanonical(value);

    const parsedValue = parseCanonicalNumber(value);

    if (parsedValue !== null && isValidUsdCurrencyRate(parsedValue)) {
      writeStoredExchangeRate(parsedValue);
    }
  }

  function updateRateText(value: string) {
    applyCanonicalRate(normalizeLocalizedNumberInput(value, numberFormat));
  }

  function restoreDefault() {
    applyCanonicalRate(numberToCanonicalNumberInput(DEFAULT_USD_CURRENCY_RATE, 2));
  }

  const validation = validateExchangeRate(rateCanonical);

  return {
    rateText: formatCanonicalNumberInput(rateCanonical, numberFormat),
    rateCanonical,
    rate: validation.rate,
    error: validation.error,
    updateRateText,
    applyCanonicalRate,
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
