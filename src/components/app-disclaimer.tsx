"use client";

import { useLocale } from "@/i18n/locale-provider";

export function AppDisclaimer() {
  const { messages } = useLocale();

  return (
    <footer className="mt-2 text-center text-[0.625rem] font-semibold leading-relaxed text-maple-muted sm:text-[0.6875rem]">
      {messages.disclaimer}
    </footer>
  );
}
