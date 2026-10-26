import type { Locale } from "@/i18n/locales";
import { EN_SEO_PAGES } from "./en";
import { KO_SEO_PAGES } from "./ko";
import type { SeoPageContent, SeoPageKey } from "./pages";
import { PT_SEO_PAGES } from "./pt";

const SEO_PAGES: Record<Locale, Record<SeoPageKey, SeoPageContent>> = {
  pt: PT_SEO_PAGES,
  en: EN_SEO_PAGES,
  ko: KO_SEO_PAGES,
};

export function getSeoPageContent(locale: Locale, pageKey: SeoPageKey): SeoPageContent {
  return SEO_PAGES[locale][pageKey];
}

export type {
  GuideMeta,
  SeoExampleSpec,
  SeoFaqItem,
  SeoPageContent,
  SeoPageKey,
  SeoPageSection,
  SeoRouteKey,
} from "./pages";
export {
  GUIDE_META,
  GUIDE_SOURCE_KEYS,
  getRouteKeyFromSlug,
  getRouteLocaleHrefs,
  getRoutePath,
  getStaticRouteSlugs,
  SEO_PAGE_KEYS,
  SEO_ROUTE_KEYS,
  SEO_ROUTE_PATHS,
} from "./pages";
