import type { MetadataRoute } from "next";
import { SEO_LAST_MODIFIED, SITE_URL } from "@/config/seo";
import { getRoutePath, SEO_ROUTE_KEYS } from "@/content/seo";
import { LOCALES, type Locale } from "@/i18n/locales";

const HREFLANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  ko: "ko",
};

const X_DEFAULT_LOCALE: Locale = "en";

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SEO_LAST_MODIFIED);

  return LOCALES.flatMap((locale) =>
    SEO_ROUTE_KEYS.map((routeKey) => {
      const languages = Object.fromEntries(
        LOCALES.map((language) => [HREFLANG[language], absolute(getRoutePath(routeKey, language))]),
      );
      languages["x-default"] = absolute(getRoutePath(routeKey, X_DEFAULT_LOCALE));

      return {
        url: absolute(getRoutePath(routeKey, locale)),
        lastModified,
        changeFrequency: routeKey === "home" ? "weekly" : "monthly",
        priority: routeKey === "home" ? 1 : 0.8,
        alternates: {
          languages,
        },
      };
    }),
  );
}
