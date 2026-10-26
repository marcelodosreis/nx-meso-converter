import type { Metadata } from "next";
import { calculateConversion } from "@/application/conversion/calculate-conversion.use-case";
import { UNIT_SYMBOLS } from "@/config/app.constants";
import { SITE_NAME, SITE_URL } from "@/config/seo";
import { getRoutePath, getSeoPageContent } from "@/content/seo";
import {
  DEFAULT_CONVERSION_RATES,
  DEFAULT_USD_CURRENCY_RATE,
} from "@/domain/conversion/conversion.constants";
import type {
  ConversionRates,
  ConversionValues,
  SourceUnit,
} from "@/domain/conversion/conversion.types";
import { LOCALE_DEFINITIONS, type Locale } from "@/i18n/locales";
import { formatUnitValue, formatUnitValueWithLabel } from "./formatters";
import { parseCanonicalNumber } from "./localized-number-input";
import { parseScenarioSearchParams } from "./scenario-url";

const DEFAULT_SHARE_AMOUNT = 5_000;
const DEFAULT_SHARE_SOURCE_UNIT: SourceUnit = "nx";

const OG_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  ko: "ko_KR",
};

const SHARE_TEXT: Record<
  Locale,
  Readonly<{ tag: string; description: (details: string) => string }>
> = {
  pt: {
    tag: "Cenário compartilhado",
    description: (details) =>
      `Confira a conversão que eu montei: ${details}. Ajuste as taxas para o seu servidor.`,
  },
  en: {
    tag: "Shared scenario",
    description: (details) =>
      `Check out the conversion I set up: ${details}. Adjust the rates for your server.`,
  },
  ko: {
    tag: "공유된 시나리오",
    description: (details) =>
      `제가 설정한 변환을 확인해 보세요: ${details}. 서버에 맞게 비율을 조정하세요.`,
  },
};

export type SharePreview = Readonly<{
  title: string;
  description: string;
  nxValue: string;
  mesosValue: string;
  usdValue: string;
}>;

export function buildSharePreview(locale: Locale, search: string): SharePreview {
  const overrides = parseScenarioSearchParams(search);
  const sourceUnit = overrides.sourceUnit ?? DEFAULT_SHARE_SOURCE_UNIT;
  const amount = parseCanonicalNumber(overrides.amountCanonical ?? "") ?? DEFAULT_SHARE_AMOUNT;
  const rates = overrides.rates ?? DEFAULT_CONVERSION_RATES;
  const exchangeRate =
    parseCanonicalNumber(overrides.exchangeRateCanonical ?? "") ?? DEFAULT_USD_CURRENCY_RATE;
  const intlLocale = LOCALE_DEFINITIONS[locale].numberFormat.intlLocale;
  const labels = LOCALE_DEFINITIONS[locale].messages.units.labels;
  const home = getSeoPageContent(locale, "home");
  const values = getConversionValues({
    amount,
    sourceUnit,
    usdCurrencyRate: exchangeRate,
    rates,
  });
  const sourceText = formatUnitValueWithLabel(
    sourceUnit,
    amount,
    intlLocale,
    labels[sourceUnit].label,
  );
  const nxValue = formatUnitValue("nx", values.nx, intlLocale);
  const mesosValue = formatUnitValue("mesos", values.mesos, intlLocale);
  const usdValue = formatShareUsd(values.usd, intlLocale);
  const nxText = formatUnitValueWithLabel("nx", values.nx, intlLocale, labels.nx.label);
  const mesosText = formatUnitValueWithLabel("mesos", values.mesos, intlLocale, labels.mesos.label);
  const usdText = usdValue;
  const titleTarget = sourceUnit === "nx" ? mesosText : sourceUnit === "mesos" ? nxText : mesosText;
  const hasScenario =
    overrides.amountCanonical !== undefined ||
    overrides.sourceUnit !== undefined ||
    overrides.currencyEnabled !== undefined ||
    overrides.exchangeRateCanonical !== undefined ||
    overrides.rates !== undefined;

  return {
    title: hasScenario ? `${sourceText} ≈ ${titleTarget} — ${SHARE_TEXT[locale].tag}` : home.title,
    description: hasScenario
      ? SHARE_TEXT[locale].description(`${nxText} · ${mesosText} · ${usdText}`)
      : home.description,
    nxValue,
    mesosValue,
    usdValue,
  };
}

export function buildShareMetadata(locale: Locale, search: string): Metadata {
  const preview = buildSharePreview(locale, search);
  const homePath = getRoutePath("home", locale);
  const imageParams = new URLSearchParams(normalizeSearch(search));

  imageParams.set("locale", locale);

  const imageUrl = `/api/og?${imageParams.toString()}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: preview.title,
    description: preview.description,
    applicationName: SITE_NAME,
    alternates: {
      canonical: homePath,
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: preview.title,
      description: preview.description,
      url: homePath,
      locale: OG_LOCALE[locale],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: preview.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: preview.title,
      description: preview.description,
      images: [imageUrl],
    },
  };
}

export function searchParamsToString(
  searchParams: Readonly<Record<string, string | string[] | undefined>>,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    } else if (value !== undefined) {
      params.set(key, value);
    }
  }

  const search = params.toString();
  return search.length > 0 ? `?${search}` : "";
}

function getConversionValues(input: {
  amount: number;
  sourceUnit: SourceUnit;
  usdCurrencyRate: number;
  rates: ConversionRates;
}): ConversionValues {
  const result = calculateConversion(input);

  if (result.ok) {
    return result.values;
  }

  const fallback = calculateConversion({
    amount: DEFAULT_SHARE_AMOUNT,
    sourceUnit: DEFAULT_SHARE_SOURCE_UNIT,
    usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
    rates: DEFAULT_CONVERSION_RATES,
  });

  if (fallback.ok) {
    return fallback.values;
  }

  return { nx: 0, mesos: 0, usd: 0, currency: 0 };
}

function formatShareUsd(value: number, intlLocale: string): string {
  const formattedValue = new Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(value);

  return `${UNIT_SYMBOLS.usd ?? "US$"} ${formattedValue}`;
}

function normalizeSearch(search: string): string {
  return search.startsWith("?") ? search.slice(1) : search;
}
