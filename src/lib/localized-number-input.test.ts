import { describe, expect, it } from "vitest";
import { LOCALE_DEFINITIONS } from "@/i18n/locales";
import {
  formatCanonicalNumberInput,
  formatLocalizedNumberInput,
  normalizeLocalizedNumberInput,
  numberToCanonicalNumberInput,
  parseCanonicalNumber,
} from "./localized-number-input";

const pt = LOCALE_DEFINITIONS.pt.numberFormat;
const en = LOCALE_DEFINITIONS.en.numberFormat;
const ko = LOCALE_DEFINITIONS.ko.numberFormat;

describe("localized number input", () => {
  it("formats canonical values with locale separators", () => {
    expect(formatCanonicalNumberInput("1234.56", pt)).toBe("1.234,56");
    expect(formatCanonicalNumberInput("1234.56", en)).toBe("1,234.56");
    expect(formatCanonicalNumberInput("1234.56", ko)).toBe("1,234.56");
    expect(formatCanonicalNumberInput("1000", pt)).toBe("1.000");
    expect(formatCanonicalNumberInput("1000", en)).toBe("1,000");
  });

  it("normalizes pasted values using the active locale", () => {
    expect(normalizeLocalizedNumberInput("1.234,56", pt)).toBe("1234.56");
    expect(normalizeLocalizedNumberInput("1,234.56", en)).toBe("1234.56");
    expect(normalizeLocalizedNumberInput("R$ 12.345,67", pt)).toBe("12345.67");
    expect(normalizeLocalizedNumberInput("$-1,234.5", en)).toBe("1234.5");
  });

  it("inserts separators while typing", () => {
    expect(formatLocalizedNumberInput("1000", 4, pt)).toEqual({
      value: "1.000",
      canonicalValue: "1000",
      caretPosition: 5,
    });
    expect(formatLocalizedNumberInput("1234567", 7, en)).toEqual({
      value: "1,234,567",
      canonicalValue: "1234567",
      caretPosition: 9,
    });
  });

  it("keeps decimal input and caret positions", () => {
    expect(formatLocalizedNumberInput("1234,56", 7, pt)).toEqual({
      value: "1.234,56",
      canonicalValue: "1234.56",
      caretPosition: 8,
    });
    expect(formatLocalizedNumberInput("1234.56", 7, en)).toEqual({
      value: "1,234.56",
      canonicalValue: "1234.56",
      caretPosition: 8,
    });
    expect(formatLocalizedNumberInput("1000", 2, pt)).toEqual({
      value: "1.000",
      canonicalValue: "1000",
      caretPosition: 3,
    });
  });

  it("handles a leading decimal separator", () => {
    expect(formatLocalizedNumberInput(",5", 2, pt)).toEqual({
      value: "0,5",
      canonicalValue: "0.5",
      caretPosition: 3,
    });
    expect(formatLocalizedNumberInput(".5", 2, en)).toEqual({
      value: "0.5",
      canonicalValue: "0.5",
      caretPosition: 3,
    });
  });

  it("preserves a trailing decimal separator", () => {
    expect(formatLocalizedNumberInput("10,", 3, pt)).toEqual({
      value: "10,",
      canonicalValue: "10.",
      caretPosition: 3,
    });
  });

  it("discards unsupported characters and leading zeros", () => {
    expect(formatLocalizedNumberInput("abc", 3, pt)).toEqual({
      value: "",
      canonicalValue: "",
      caretPosition: 0,
    });
    expect(normalizeLocalizedNumberInput("0005", en)).toBe("5");
  });

  it("converts between numbers and canonical input values", () => {
    expect(numberToCanonicalNumberInput(5.4)).toBe("5.4");
    expect(numberToCanonicalNumberInput(5.4, 2)).toBe("5.40");
    expect(numberToCanonicalNumberInput(0.0000001)).toBe("0.0000001");
    expect(parseCanonicalNumber("5.4")).toBe(5.4);
    expect(parseCanonicalNumber("5.")).toBe(5);
    expect(parseCanonicalNumber("")).toBeNull();
    expect(parseCanonicalNumber("9".repeat(400))).toBeNull();
  });
});
