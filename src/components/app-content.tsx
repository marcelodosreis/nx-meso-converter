"use client";

import { useState } from "react";
import { LocaleProvider } from "@/i18n/locale-provider";
import { AppDisclaimer } from "./app-disclaimer";
import { AppHeader } from "./app-header";
import { Converter } from "./converter/converter";
import { ConversionSettingsProvider } from "./settings/conversion-settings-provider";
import { SettingsDialog } from "./settings/settings-dialog";

export function AppContent() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <LocaleProvider>
      <ConversionSettingsProvider>
        <main className="mx-auto flex min-h-dvh w-full max-w-[84rem] flex-col px-4 py-3 sm:px-6 sm:py-6 justify-center lg:py-6">
          <AppHeader onOpenSettings={() => setIsSettingsOpen(true)} />
          <Converter />
          <AppDisclaimer />
        </main>

        <SettingsDialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </ConversionSettingsProvider>
    </LocaleProvider>
  );
}
