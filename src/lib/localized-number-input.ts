import type { LocaleNumberFormat } from "@/i18n/locales";

export type LocalizedNumberInputResult = Readonly<{
  value: string;
  canonicalValue: string;
  caretPosition: number;
}>;

export function formatLocalizedNumberInput(
  rawValue: string,
  caretPosition: number,
  format: LocaleNumberFormat,
): LocalizedNumberInputResult {
  const safeCaret = Math.min(Math.max(caretPosition, 0), rawValue.length);
  const rawPrefix = rawValue.slice(0, safeCaret);
  const canonicalValue = normalizeLocalizedNumberInput(rawValue, format);
  const value = formatCanonicalNumberInput(canonicalValue, format);
  const prefixParts = parseRawValue(rawPrefix, format);
  const hasInsertedLeadingZero =
    prefixParts.hasDecimalSeparator && prefixParts.integerDigits.length === 0;
  const significantChars =
    countSignificantChars(rawPrefix, format) + (hasInsertedLeadingZero ? 1 : 0);

  return {
    value,
    canonicalValue,
    caretPosition: findCaretPosition(value, significantChars, format),
  };
}

export function normalizeLocalizedNumberInput(
  rawValue: string,
  format: LocaleNumberFormat,
): string {
  const parsedValue = parseRawValue(rawValue, format);
  const integerDigits = stripLeadingZeros(parsedValue.integerDigits);

  if (parsedValue.hasDecimalSeparator) {
    return `${integerDigits || "0"}.${parsedValue.fractionDigits}`;
  }

  return integerDigits;
}

export function formatCanonicalNumberInput(
  canonicalValue: string,
  format: LocaleNumberFormat,
): string {
  if (canonicalValue.length === 0) {
    return "";
  }

  const decimalIndex = canonicalValue.indexOf(".");
  const hasDecimalSeparator = decimalIndex !== -1;
  const integerDigits = hasDecimalSeparator
    ? canonicalValue.slice(0, decimalIndex)
    : canonicalValue;
  const fractionDigits = hasDecimalSeparator ? canonicalValue.slice(decimalIndex + 1) : "";
  const groupedIntegerDigits = groupThousands(integerDigits, format.groupSeparator);

  return hasDecimalSeparator
    ? `${groupedIntegerDigits}${format.decimalSeparator}${fractionDigits}`
    : groupedIntegerDigits;
}

export function parseCanonicalNumber(canonicalValue: string): number | null {
  if (canonicalValue.length === 0) {
    return null;
  }

  const value = Number(canonicalValue);
  return Number.isFinite(value) ? value : null;
}

export function numberToCanonicalNumberInput(
  value: number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 20,
): string {
  if (!Number.isFinite(value)) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    useGrouping: false,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

function parseRawValue(
  rawValue: string,
  format: LocaleNumberFormat,
): {
  integerDigits: string;
  fractionDigits: string;
  hasDecimalSeparator: boolean;
} {
  let integerDigits = "";
  let fractionDigits = "";
  let hasDecimalSeparator = false;

  for (const character of rawValue) {
    if (character === format.decimalSeparator && !hasDecimalSeparator) {
      hasDecimalSeparator = true;
      continue;
    }

    if (!/\d/.test(character)) {
      continue;
    }

    if (hasDecimalSeparator) {
      fractionDigits += character;
    } else {
      integerDigits += character;
    }
  }

  return { integerDigits, fractionDigits, hasDecimalSeparator };
}

function countSignificantChars(rawValue: string, format: LocaleNumberFormat): number {
  let count = 0;
  let hasDecimalSeparator = false;

  for (const character of rawValue) {
    if (/\d/.test(character)) {
      count += 1;
    } else if (character === format.decimalSeparator && !hasDecimalSeparator) {
      hasDecimalSeparator = true;
      count += 1;
    }
  }

  return count;
}

function findCaretPosition(
  formattedValue: string,
  significantChars: number,
  format: LocaleNumberFormat,
): number {
  if (significantChars <= 0) {
    return 0;
  }

  let count = 0;

  for (let index = 0; index < formattedValue.length; index += 1) {
    const character = formattedValue[index];

    if (
      character !== undefined &&
      (/\d/.test(character) || character === format.decimalSeparator)
    ) {
      count += 1;

      if (count >= significantChars) {
        return index + 1;
      }
    }
  }

  return formattedValue.length;
}

function stripLeadingZeros(digits: string): string {
  return digits.replace(/^0+(?=\d)/, "");
}

function groupThousands(digits: string, separator: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
