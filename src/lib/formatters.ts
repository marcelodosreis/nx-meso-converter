import {
  EXCHANGE_RATE_FRACTION_DIGITS,
  UNIT_FRACTION_DIGITS,
  UNIT_SYMBOLS,
} from "@/config/app.constants";
import type { ConversionUnit } from "@/domain/conversion/conversion.types";

const formatterCache = new Map<string, Intl.NumberFormat>();

const COMPACT_SCALES = ["k", "m", "b", "t"] as const;
const COMPACT_MINIMUM_VALUE = 1_000;

function getNumberFormatter(
  intlLocale: string,
  minimum: number,
  maximum: number,
): Intl.NumberFormat {
  const cacheKey = `${intlLocale}:${minimum}:${maximum}`;
  const cachedFormatter = formatterCache.get(cacheKey);

  if (cachedFormatter !== undefined) {
    return cachedFormatter;
  }

  const formatter = new Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: minimum,
    maximumFractionDigits: maximum,
    useGrouping: true,
  });

  formatterCache.set(cacheKey, formatter);
  return formatter;
}

function formatNumber(value: number, intlLocale: string, minimum: number, maximum: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return getNumberFormatter(intlLocale, minimum, maximum).format(Object.is(value, -0) ? 0 : value);
}

export function formatUnitValue(unit: ConversionUnit, value: number, intlLocale: string): string {
  const { minimum, maximum } = getUnitFractionDigits(unit, value);
  const formattedValue = formatNumber(value, intlLocale, minimum, maximum);
  const symbol = UNIT_SYMBOLS[unit];

  return symbol === null ? formattedValue : `${symbol} ${formattedValue}`;
}

export function formatCompactUnitValue(unit: ConversionUnit, value: number): string | null {
  if (unit === "usd" || unit === "currency") {
    return null;
  }

  const absoluteValue = Math.abs(value);

  if (!Number.isFinite(value) || absoluteValue < COMPACT_MINIMUM_VALUE) {
    return null;
  }

  const exponent = Math.floor(Math.log10(absoluteValue) + Number.EPSILON);
  let scaleIndex = Math.max(0, Math.floor(exponent / 3) - 1);
  scaleIndex = Math.min(scaleIndex, COMPACT_SCALES.length - 1);

  let roundedValue =
    Math.round((absoluteValue / 1_000 ** (scaleIndex + 1) + Number.EPSILON) * 10) / 10;

  if (roundedValue >= 1_000 && scaleIndex < COMPACT_SCALES.length - 1) {
    roundedValue /= 1_000;
    scaleIndex += 1;
  }

  const formattedValue = Number.isInteger(roundedValue)
    ? String(roundedValue)
    : roundedValue.toFixed(1);
  const sign = value < 0 ? "-" : "";

  return `${sign}${formattedValue}${COMPACT_SCALES[scaleIndex]}`;
}

export function formatUnitValueWithLabel(
  unit: ConversionUnit,
  value: number,
  intlLocale: string,
  label: string,
): string {
  const formattedValue = formatUnitValue(unit, value, intlLocale);

  return UNIT_SYMBOLS[unit] === null ? `${formattedValue} ${label}` : formattedValue;
}

function getUnitFractionDigits(
  unit: ConversionUnit,
  value: number,
): Readonly<{ minimum: number; maximum: number }> {
  const defaultDigits = UNIT_FRACTION_DIGITS[unit];
  const absoluteValue = Math.abs(value);
  const hasFractionalCurrency = unit === "usd" || unit === "currency";

  if (hasFractionalCurrency && Number.isFinite(value) && absoluteValue > 0 && absoluteValue < 1) {
    return {
      minimum: defaultDigits.minimum,
      maximum: Math.max(defaultDigits.maximum, 8),
    };
  }

  return defaultDigits;
}

export function formatExchangeRate(value: number, intlLocale: string): string {
  return formatNumber(
    value,
    intlLocale,
    EXCHANGE_RATE_FRACTION_DIGITS.minimum,
    EXCHANGE_RATE_FRACTION_DIGITS.maximum,
  );
}
