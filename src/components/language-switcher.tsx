"use client";

import { ChevronDown, Globe2 } from "lucide-react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { LOCALE_DEFINITIONS, LOCALES, type Locale } from "@/i18n/locales";
import { SCENARIO_URL_FLUSH_EVENT, SCENARIO_URL_UPDATED_EVENT } from "@/lib/scenario-url";

export function LanguageSwitcher() {
  const { locale, messages, localeHrefs, rememberLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [urlSuffix, setUrlSuffix] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeOptionRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const updateUrlSuffix = () => {
      setUrlSuffix(`${window.location.search}${window.location.hash}`);
    };

    updateUrlSuffix();
    window.addEventListener(SCENARIO_URL_UPDATED_EVENT, updateUrlSuffix);
    window.addEventListener("popstate", updateUrlSuffix);
    window.addEventListener("hashchange", updateUrlSuffix);

    return () => {
      window.removeEventListener(SCENARIO_URL_UPDATED_EVENT, updateUrlSuffix);
      window.removeEventListener("popstate", updateUrlSuffix);
      window.removeEventListener("hashchange", updateUrlSuffix);
    };
  }, []);

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

  function handleSelect(event: MouseEvent<HTMLAnchorElement>, nextLocale: Locale) {
    const isModifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

    if (isModifiedClick) {
      return;
    }

    event.preventDefault();
    rememberLocale(nextLocale);
    setIsOpen(false);
    window.dispatchEvent(new Event(SCENARIO_URL_FLUSH_EVENT));

    const suffix = `${window.location.search}${window.location.hash}`;
    window.location.assign(`${localeHrefs[nextLocale]}${suffix}`);
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
          className="absolute right-0 top-full z-30 mt-1.5 w-44 rounded-xl border border-sky-100 bg-white p-1 shadow-xl"
        >
          {LOCALES.map((option) => {
            const isActive = option === locale;

            return (
              <a
                key={option}
                ref={isActive ? activeOptionRef : null}
                href={`${localeHrefs[option]}${urlSuffix}`}
                hrefLang={LOCALE_DEFINITIONS[option].htmlLang}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => handleSelect(event, option)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-amber-50 font-extrabold text-maple-orange-dark ring-1 ring-inset ring-amber-200/80"
                    : "text-maple-ink hover:bg-sky-50"
                }`}
              >
                <span>{LOCALE_DEFINITIONS[option].name}</span>
              </a>
            );
          })}
        </fieldset>
      ) : null}
    </div>
  );
}
