"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/locales";
import { AppDisclaimer } from "../app-disclaimer";
import { AppHeader } from "../app-header";

type GuideShellProps = Readonly<{
  initialLocale: Locale;
  localeHrefs: Readonly<Record<Locale, string>>;
  children: ReactNode;
}>;

export function GuideShell({ initialLocale, localeHrefs, children }: GuideShellProps) {
  return (
    <LocaleProvider initialLocale={initialLocale} localeHrefs={localeHrefs}>
      <main className="mx-auto flex min-h-dvh w-full max-w-[76rem] flex-col px-4 py-4 sm:px-6 sm:py-6">
        <AppHeader />
        {children}
        <AppDisclaimer />
      </main>
    </LocaleProvider>
  );
}
