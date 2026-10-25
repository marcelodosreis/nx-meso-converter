"use client";

import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";
import {
  readStoredLocale,
  writeStoredLocale,
} from "@/infrastructure/persistence/locale.repository";
import {
  DEFAULT_LOCALE,
  detectPreferredLocale,
  isLocale,
  LOCALE_DEFINITIONS,
  type Locale,
  type LocaleDefinition,
} from "./locales";

type LocaleContextValue = LocaleDefinition & {
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const hasSelectedLocale = useRef(false);
  const definition = LOCALE_DEFINITIONS[locale];

  useEffect(() => {
    if (hasSelectedLocale.current) {
      return;
    }

    const queryLocale = new URLSearchParams(window.location.search).get("lang");
    const storedLocale = readStoredLocale();
    const preferredLocale = isLocale(queryLocale)
      ? queryLocale
      : (storedLocale ?? detectPreferredLocale(navigator.languages));

    if (preferredLocale !== null) {
      setLocaleState(preferredLocale);

      if (storedLocale === null) {
        writeStoredLocale(preferredLocale);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = definition.htmlLang;
    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription instanceof HTMLMetaElement) {
      metaDescription.content = definition.messages.metaDescription;
    }
  }, [definition.htmlLang, definition.messages.metaDescription]);

  function setLocale(nextLocale: Locale) {
    hasSelectedLocale.current = true;
    setLocaleState(nextLocale);
    writeStoredLocale(nextLocale);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.history.replaceState(null, "", url);
  }

  return (
    <LocaleContext.Provider value={{ ...definition, setLocale }}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (context === null) {
    throw new Error("useLocale must be used within LocaleProvider.");
  }

  return context;
}
