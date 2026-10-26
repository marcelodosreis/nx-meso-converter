"use client";

import { type ReactNode, useState } from "react";
import type { SourceUnit } from "@/domain/conversion/conversion.types";
import { LocaleProvider } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/locales";
import { AppDisclaimer } from "./app-disclaimer";
import { AppHeader } from "./app-header";
import { Converter } from "./converter/converter";
import { ConversionSettingsProvider } from "./settings/conversion-settings-provider";
import { SettingsDialog } from "./settings/settings-dialog";

type AppContentProps = Readonly<{
  initialLocale: Locale;
  localeHrefs: Readonly<Record<Locale, string>>;
  initialSourceUnit?: SourceUnit;
  intro: ReactNode;
  content: ReactNode;
}>;

export function AppContent({
  initialLocale,
  localeHrefs,
  initialSourceUnit = "nx",
  intro,
  content,
}: AppContentProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <LocaleProvider initialLocale={initialLocale} localeHrefs={localeHrefs}>
      <ConversionSettingsProvider>
        <main className="mx-auto flex min-h-dvh w-full max-w-[84rem] flex-col justify-center px-4 py-3 sm:px-6 sm:py-6 lg:py-6">
          <AppHeader onOpenSettings={() => setIsSettingsOpen(true)} />
          {intro}
          <Converter initialSourceUnit={initialSourceUnit} />
          {content}
          <AppDisclaimer />
        </main>

        <SettingsDialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </ConversionSettingsProvider>
    </LocaleProvider>
  );
}
