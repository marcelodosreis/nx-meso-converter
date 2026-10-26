"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { writeStoredLocale } from "@/infrastructure/persistence/locale.repository";
import { DEFAULT_LOCALE, LOCALE_DEFINITIONS, type Locale, type LocaleDefinition } from "./locales";

type LocaleContextValue = LocaleDefinition & {
  localeHrefs: Readonly<Record<Locale, string>>;
  rememberLocale: (locale: Locale) => void;
};

type LocaleProviderProps = Readonly<{
  children: ReactNode;
  initialLocale?: Locale;
  localeHrefs?: Readonly<Record<Locale, string>>;
}>;

const defaultLocaleHrefs: Record<Locale, string> = {
  pt: "/",
  en: "/en",
  ko: "/ko",
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  localeHrefs = defaultLocaleHrefs,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const definition = LOCALE_DEFINITIONS[locale];

  useEffect(() => {
    document.documentElement.lang = definition.htmlLang;
  }, [definition.htmlLang]);

  function rememberLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    writeStoredLocale(nextLocale);
  }

  return (
    <LocaleContext.Provider value={{ ...definition, localeHrefs, rememberLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (context === null) {
    throw new Error("useLocale must be used within LocaleProvider.");
  }

  return context;
}
