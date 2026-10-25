import { isValidConversionRates } from "@/domain/conversion/conversion.rules";
import type { ConversionRates } from "@/domain/conversion/conversion.types";
import { type BrowserStorage, getBrowserStorage } from "./browser-storage";

const STORAGE_KEY = "nx-mesos-converter:conversion-rates";

export function readStoredConversionRates(
  storage: BrowserStorage | null = getBrowserStorage(),
): ConversionRates | null {
  if (storage === null) {
    return null;
  }

  try {
    const storedValue = storage.getItem(STORAGE_KEY);

    if (storedValue === null) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!isRecord(parsedValue)) {
      return null;
    }

    const { nxPerUsd, nxPerSlot, mesosPerSlot } = parsedValue;

    if (
      typeof nxPerUsd !== "number" ||
      typeof nxPerSlot !== "number" ||
      typeof mesosPerSlot !== "number"
    ) {
      return null;
    }

    const rates: ConversionRates = { nxPerUsd, nxPerSlot, mesosPerSlot };
    return isValidConversionRates(rates) ? rates : null;
  } catch {
    return null;
  }
}

export function writeStoredConversionRates(
  rates: ConversionRates,
  storage: BrowserStorage | null = getBrowserStorage(),
): boolean {
  if (storage === null || !isValidConversionRates(rates)) {
    return false;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(rates));
    return true;
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
