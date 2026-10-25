"use client";

import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";
import { DEFAULT_CONVERSION_RATES } from "@/domain/conversion/conversion.constants";
import { isValidConversionRates } from "@/domain/conversion/conversion.rules";
import type { ConversionRates } from "@/domain/conversion/conversion.types";
import {
  readStoredConversionRates,
  writeStoredConversionRates,
} from "@/infrastructure/persistence/conversion-settings.repository";

type ConversionSettingsContextValue = Readonly<{
  rates: ConversionRates;
  saveRates: (rates: ConversionRates) => void;
  resetRates: () => void;
}>;

const ConversionSettingsContext = createContext<ConversionSettingsContextValue | null>(null);

export function ConversionSettingsProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [rates, setRates] = useState<ConversionRates>(DEFAULT_CONVERSION_RATES);
  const hasEditedSettings = useRef(false);

  useEffect(() => {
    if (hasEditedSettings.current) {
      return;
    }

    const storedRates = readStoredConversionRates();

    if (storedRates !== null) {
      setRates(storedRates);
    }
  }, []);

  function saveRates(nextRates: ConversionRates) {
    if (!isValidConversionRates(nextRates)) {
      return;
    }

    hasEditedSettings.current = true;
    setRates(nextRates);
    writeStoredConversionRates(nextRates);
  }

  function resetRates() {
    hasEditedSettings.current = true;
    setRates(DEFAULT_CONVERSION_RATES);
    writeStoredConversionRates(DEFAULT_CONVERSION_RATES);
  }

  return (
    <ConversionSettingsContext.Provider value={{ rates, saveRates, resetRates }}>
      {children}
    </ConversionSettingsContext.Provider>
  );
}

export function useConversionSettings(): ConversionSettingsContextValue {
  const context = useContext(ConversionSettingsContext);

  if (context === null) {
    throw new Error("useConversionSettings must be used within ConversionSettingsProvider.");
  }

  return context;
}
