import type { ConversionUnit, SourceUnit } from "@/domain/conversion/conversion.types";
import type { Locale } from "@/i18n/locales";

export const SEO_PAGE_KEYS = [
  "home",
  "nxToMesos",
  "mesosToNx",
  "nxToUsd",
  "usdToNx",
  "whatIsNx",
  "whatAreMesos",
  "howToConvert",
  "slotGuide",
  "guideHub",
  "faq",
] as const;

export type SeoPageKey = (typeof SEO_PAGE_KEYS)[number];

export const SEO_ROUTE_KEYS = ["home", "guide"] as const;

export type SeoRouteKey = (typeof SEO_ROUTE_KEYS)[number];

export type SeoExampleSpec = Readonly<{
  sourceUnit: SourceUnit;
  amounts: readonly number[];
  targetUnits: readonly ConversionUnit[];
}>;

export type SeoPageSection = Readonly<{
  heading: string;
  paragraphs: readonly string[];
}>;

export type SeoFaqItem = Readonly<{
  question: string;
  answer: string;
}>;

export type SeoPageContent = Readonly<{
  title: string;
  description: string;
  h1: string;
  intro: string;
  sourceUnit: SourceUnit;
  sections: readonly SeoPageSection[];
  faqs: readonly SeoFaqItem[];
  related: readonly SeoPageKey[];
  examples?: SeoExampleSpec;
}>;

export type GuideMeta = Readonly<{
  title: string;
  description: string;
  h1: string;
  intro: string;
}>;

export const SEO_ROUTE_PATHS: Record<SeoRouteKey, Record<Locale, string>> = {
  home: { pt: "/", en: "/en", ko: "/ko" },
  guide: { pt: "/guide", en: "/en/guide", ko: "/ko/guide" },
};

export const GUIDE_SOURCE_KEYS: readonly SeoPageKey[] = [
  "nxToMesos",
  "mesosToNx",
  "nxToUsd",
  "usdToNx",
  "whatIsNx",
  "whatAreMesos",
  "howToConvert",
  "slotGuide",
  "faq",
];

export const GUIDE_META: Record<Locale, GuideMeta> = {
  pt: {
    title: "Guia de NX e Mesos para MapleStory — NX Mesos Converter",
    description:
      "Guia completo sobre NX, mesos, dólar, slots e conversões no MapleStory. Entenda as moedas e use a calculadora com as taxas do seu servidor.",
    h1: "Guia de NX, mesos e conversões para MapleStory",
    intro:
      "Tudo o que você precisa para entender NX, mesos, dólar, slots e taxas configuráveis em um único lugar.",
  },
  en: {
    title: "NX and Mesos Guide for MapleStory — NX Mesos Converter",
    description:
      "A complete guide to NX, mesos, dollars, slots, and conversions in MapleStory. Learn the currencies and use the calculator with your server's rates.",
    h1: "NX, Mesos, and Conversion Guide for MapleStory",
    intro:
      "Everything you need to understand NX, mesos, dollars, slots, and adjustable rates in one place.",
  },
  ko: {
    title: "메이플스토리 NX·메소 가이드 — NX 메소 변환기",
    description:
      "메이플스토리의 NX, 메소, 달러, 슬롯, 변환에 관한 종합 가이드입니다. 서버 비율로 계산기를 사용하세요.",
    h1: "메이플스토리 NX·메소·변환 가이드",
    intro: "NX, 메소, 달러, 슬롯, 설정 가능한 비율을 한곳에서 이해하세요.",
  },
};

export function getRoutePath(routeKey: SeoRouteKey, locale: Locale): string {
  return SEO_ROUTE_PATHS[routeKey][locale];
}

export function getRouteLocaleHrefs(routeKey: SeoRouteKey): Record<Locale, string> {
  return {
    pt: getRoutePath(routeKey, "pt"),
    en: getRoutePath(routeKey, "en"),
    ko: getRoutePath(routeKey, "ko"),
  };
}

export function getRouteKeyFromSlug(
  locale: Locale,
  slug: readonly string[] | undefined,
): SeoRouteKey | null {
  const normalizedSlug = slug ?? [];
  const path = normalizedSlug.length === 0 ? "" : `/${normalizedSlug.join("/")}`;
  const localePrefix = locale === "pt" ? "" : `/${locale}`;

  for (const routeKey of SEO_ROUTE_KEYS) {
    const routePath = getRoutePath(routeKey, locale);
    const relativePath = routePath.slice(localePrefix.length) || "";
    const normalizedRelativePath = relativePath === "/" ? "" : relativePath;

    if (normalizedRelativePath === path) {
      return routeKey;
    }
  }

  return null;
}

export function getStaticRouteSlugs(locale: Locale): { slug: string[] }[] {
  const localePrefix = locale === "pt" ? "" : `/${locale}`;

  return SEO_ROUTE_KEYS.map((routeKey) => {
    const routePath = getRoutePath(routeKey, locale);
    const relativePath = routePath.slice(localePrefix.length);
    const segments = relativePath.split("/").filter(Boolean);

    return { slug: segments };
  });
}
