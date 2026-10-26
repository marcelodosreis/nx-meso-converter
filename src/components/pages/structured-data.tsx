import { SITE_NAME, SITE_URL } from "@/config/seo";
import {
  GUIDE_META,
  GUIDE_SOURCE_KEYS,
  getRoutePath,
  getSeoPageContent,
  type SeoRouteKey,
} from "@/content/seo";
import { LOCALE_DEFINITIONS, type Locale } from "@/i18n/locales";

type StructuredDataProps = Readonly<{
  routeKey: SeoRouteKey;
  locale: Locale;
}>;

export function StructuredData({ routeKey, locale }: StructuredDataProps) {
  const url = new URL(getRoutePath(routeKey, locale), SITE_URL).toString();
  const language = LOCALE_DEFINITIONS[locale].htmlLang;
  const graph: Record<string, unknown>[] = [];

  if (routeKey === "home") {
    const page = getSeoPageContent(locale, "home");
    graph.push({
      "@type": "WebApplication",
      "@id": `${url}#application`,
      name: SITE_NAME,
      url,
      description: page.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: language,
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    });
  } else {
    const meta = GUIDE_META[locale];
    const faqs = Array.from(
      new Map(
        GUIDE_SOURCE_KEYS.flatMap((key) => getSeoPageContent(locale, key).faqs).map((item) => [
          item.question,
          item,
        ]),
      ).values(),
    );

    graph.push(
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: meta.h1,
        description: meta.description,
        inLanguage: language,
        mainEntityOfPage: url,
        author: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    );
  }

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: new URL(getRoutePath("home", locale), SITE_URL).toString(),
      },
      ...(routeKey === "guide"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: GUIDE_META[locale].h1,
              item: url,
            },
          ]
        : []),
    ],
  });

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from local, trusted content.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
