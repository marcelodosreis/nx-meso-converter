import Link from "next/link";
import { AppContent } from "@/components/app-content";
import { getRouteLocaleHrefs, getRoutePath, getSeoPageContent } from "@/content/seo";
import type { Locale } from "@/i18n/locales";
import { StructuredData } from "./structured-data";

type HomePageProps = Readonly<{
  locale: Locale;
}>;

const GUIDE_LINK: Record<Locale, string> = {
  pt: "Guia completo de NX e mesos",
  en: "Full NX and mesos guide",
  ko: "NX·메소 전체 가이드",
};

export function HomePage({ locale }: HomePageProps) {
  const page = getSeoPageContent(locale, "home");

  return (
    <>
      <AppContent
        initialLocale={locale}
        localeHrefs={getRouteLocaleHrefs("home")}
        initialSourceUnit="mesos"
        intro={<h1 className="sr-only">{page.h1}</h1>}
        content={
          <nav className="mt-3 text-center">
            <Link
              href={getRoutePath("guide", locale)}
              className="inline-flex rounded-full border border-sky-100 bg-white/70 px-3 py-1.5 text-xs font-extrabold text-sky-800 transition-colors hover:border-sky-200 hover:bg-white"
            >
              {GUIDE_LINK[locale]}
            </Link>
          </nav>
        }
      />
      <StructuredData routeKey="home" locale={locale} />
    </>
  );
}
