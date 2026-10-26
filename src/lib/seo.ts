import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE_PATH } from "@/config/seo";
import {
  GUIDE_META,
  getRouteKeyFromSlug,
  getRoutePath,
  getSeoPageContent,
  type SeoRouteKey,
} from "@/content/seo";
import { LOCALE_DEFINITIONS, type Locale } from "@/i18n/locales";

const HREFLANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  ko: "ko",
};

const OG_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  ko: "ko_KR",
};

const X_DEFAULT_LOCALE: Locale = "en";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function buildRouteMetadata(routeKey: SeoRouteKey, locale: Locale): Metadata {
  const page = routeKey === "home" ? getSeoPageContent(locale, "home") : GUIDE_META[locale];
  const canonicalPath = getRoutePath(routeKey, locale);
  const languages = Object.fromEntries(
    (["pt", "en", "ko"] as const).map((language) => [
      HREFLANG[language],
      getRoutePath(routeKey, language),
    ]),
  );
  languages["x-default"] = getRoutePath(routeKey, X_DEFAULT_LOCALE);

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "utilities",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: canonicalPath,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      url: canonicalPath,
      locale: OG_LOCALE[locale],
      images: [
        {
          url: SOCIAL_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [SOCIAL_IMAGE_PATH],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: getVerificationMetadata(),
  };
}

export function getRouteKeyForLocaleSlug(
  locale: Locale,
  slug: readonly string[] | undefined,
): SeoRouteKey | null {
  return getRouteKeyFromSlug(locale, slug);
}

export function getPageLanguage(locale: Locale): string {
  return LOCALE_DEFINITIONS[locale].htmlLang;
}

function getVerificationMetadata(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const other = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  if (google === undefined && other === undefined) {
    return undefined;
  }

  return {
    ...(google === undefined ? {} : { google }),
    ...(other === undefined ? {} : { other: { "msvalidate.01": other } }),
  };
}
