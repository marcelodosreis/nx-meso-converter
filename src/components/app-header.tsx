"use client";

import { Coins, Settings2, Sparkles } from "lucide-react";
import { APP_NAME } from "@/config/app.constants";
import { useLocale } from "@/i18n/locale-provider";
import { LanguageSwitcher } from "./language-switcher";

type AppHeaderProps = Readonly<{
  onOpenSettings?: () => void;
  settingsCustomized?: boolean;
}>;

export function AppHeader({ onOpenSettings, settingsCustomized = false }: AppHeaderProps) {
  const { messages } = useLocale();
  const settingsLabel = settingsCustomized
    ? `${messages.settings.open} (${messages.settings.custom})`
    : messages.settings.open;

  return (
    <header className="mb-3 flex items-center justify-between gap-3 sm:mb-4 sm:gap-4 lg:mb-5">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <span className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 via-orange-400 to-orange-500 text-white shadow-[0_14px_30px_-18px_rgba(180,72,8,0.9)] ring-2 ring-white/80 sm:size-12 sm:rounded-[1.25rem] lg:size-14">
          <Coins aria-hidden="true" strokeWidth={2.3} className="size-5 sm:size-6 lg:size-7" />
          <Sparkles
            aria-hidden="true"
            size={11}
            strokeWidth={2.4}
            className="absolute -right-1 -top-1 size-2.5 text-amber-100 drop-shadow-sm lg:size-3"
          />
        </span>

        <div className="min-w-0">
          <p className="truncate font-display text-[1.0625rem] font-semibold leading-tight tracking-tight text-maple-ink sm:text-[1.45rem] lg:text-[1.9rem]">
            <span aria-hidden="true" className="sm:hidden">
              NX Mesos
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              {APP_NAME}
            </span>
          </p>
          <p className="mt-0.5 hidden text-xs font-semibold text-maple-muted sm:block lg:text-sm">
            {messages.header.tagline}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {onOpenSettings === undefined ? null : (
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label={settingsLabel}
            title={settingsLabel}
            className="relative flex size-9 items-center justify-center rounded-xl border border-white/90 bg-white/75 text-sky-900 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-200 hover:bg-white lg:size-11"
          >
            {settingsCustomized ? (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-maple-orange ring-2 ring-white"
              />
            ) : null}
            <Settings2 aria-hidden="true" strokeWidth={2.4} className="size-4 lg:size-[18px]" />
          </button>
        )}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
