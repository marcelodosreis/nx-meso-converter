import { isValidUsdCurrencyRate } from "@/domain/conversion/conversion.rules";
import { type BrowserStorage, getBrowserStorage } from "./browser-storage";

const STORAGE_KEY = "nx-mesos-converter:usd-currency-rate";

export function readStoredExchangeRate(
  storage: BrowserStorage | null = getBrowserStorage(),
): number | null {
  if (storage === null) {
    return null;
  }

  try {
    const storedValue = storage.getItem(STORAGE_KEY);

    if (storedValue === null) {
      return null;
    }

    const parsedValue = Number(storedValue);
    return isValidUsdCurrencyRate(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function writeStoredExchangeRate(
  rate: number,
  storage: BrowserStorage | null = getBrowserStorage(),
): boolean {
  if (storage === null || !isValidUsdCurrencyRate(rate)) {
    return false;
  }

  try {
    storage.setItem(STORAGE_KEY, String(rate));
    return true;
  } catch {
    return false;
  }
}
