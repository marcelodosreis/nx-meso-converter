import { isLocale, type Locale } from "@/i18n/locales";
import { type BrowserStorage, getBrowserStorage } from "./browser-storage";

const STORAGE_KEY = "nx-mesos-converter:locale";

export function readStoredLocale(
  storage: BrowserStorage | null = getBrowserStorage(),
): Locale | null {
  if (storage === null) {
    return null;
  }

  try {
    const storedValue = storage.getItem(STORAGE_KEY);
    return isLocale(storedValue) ? storedValue : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(
  locale: Locale,
  storage: BrowserStorage | null = getBrowserStorage(),
): boolean {
  if (storage === null) {
    return false;
  }

  try {
    storage.setItem(STORAGE_KEY, locale);
    return true;
  } catch {
    return false;
  }
}
