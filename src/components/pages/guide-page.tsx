import { GuideShell } from "@/components/pages/guide-shell";
import { getRouteLocaleHrefs, getRoutePath } from "@/content/seo";
import type { Locale } from "@/i18n/locales";
import { GuideArticle } from "./guide-article";
import { StructuredData } from "./structured-data";

type GuidePageProps = Readonly<{
  locale: Locale;
}>;

export function GuidePage({ locale }: GuidePageProps) {
  return (
    <>
      <GuideShell
        initialLocale={locale}
        localeHrefs={getRouteLocaleHrefs("guide")}
        homeHref={getRoutePath("home", locale)}
      >
        <GuideArticle locale={locale} />
      </GuideShell>
      <StructuredData routeKey="guide" locale={locale} />
    </>
  );
}
