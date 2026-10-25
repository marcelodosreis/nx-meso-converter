import {
  EXCHANGE_RATE_FRACTION_DIGITS,
  UNIT_FRACTION_DIGITS,
  UNIT_SYMBOLS,
} from "@/config/app.constants";
import type { ConversionUnit } from "@/domain/conversion/conversion.types";

const formatterCache = new Map<string, Intl.NumberFormat>();

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

  if (Number.isFinite(value) && absoluteValue > 0 && absoluteValue < 1) {
    const smallValueMaximum = unit === "usd" || unit === "currency" ? 8 : 6;

    return {
      minimum: defaultDigits.minimum,
      maximum: Math.max(defaultDigits.maximum, smallValueMaximum),
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
