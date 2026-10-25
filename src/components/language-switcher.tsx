"use client";

import { ChevronDown, Globe2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { LOCALE_DEFINITIONS, LOCALES, type Locale } from "@/i18n/locales";

export function LanguageSwitcher() {
  const { locale, messages, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const container = containerRef.current;
    activeOptionRef.current?.focus();

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && container !== null && !container.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleFocusOut(event: FocusEvent) {
      const nextFocusedElement = event.relatedTarget;

      if (
        !(nextFocusedElement instanceof Node) ||
        container === null ||
        !container.contains(nextFocusedElement)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    container?.addEventListener("focusout", handleFocusOut);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      container?.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function selectLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="language-options"
        aria-label={`${messages.language.change}: ${LOCALE_DEFINITIONS[locale].name}`}
        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-sky-100 bg-white/85 px-2.5 text-xs font-extrabold text-maple-ink shadow-sm transition-colors hover:border-sky-200 hover:bg-white lg:h-11 lg:gap-2 lg:px-3 lg:text-sm"
      >
        <Globe2 aria-hidden="true" strokeWidth={2.4} className="size-[15px] lg:size-[18px]" />
        <span>{LOCALE_DEFINITIONS[locale].shortLabel}</span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={2.8}
          className={`size-3 transition-transform lg:size-3.5 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <fieldset
          id="language-options"
          aria-label={messages.language.label}
          className="absolute right-0 top-full z-30 mt-1.5 w-40 rounded-xl border border-sky-100 bg-white p-1 shadow-xl"
        >
          {LOCALES.map((option) => {
            const isActive = option === locale;

            return (
              <button
                key={option}
                ref={isActive ? activeOptionRef : null}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectLocale(option)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-amber-50 font-extrabold text-maple-orange-dark ring-1 ring-inset ring-amber-200/80"
                    : "text-maple-ink hover:bg-sky-50"
                }`}
              >
                <span>{LOCALE_DEFINITIONS[option].name}</span>
              </button>
            );
          })}
        </fieldset>
      ) : null}
    </div>
  );
}
