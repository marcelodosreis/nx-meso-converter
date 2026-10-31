import { describe, expect, it } from "vitest";
import {
  DEFAULT_CONVERSION_RATES,
  DEFAULT_USD_CURRENCY_RATE,
} from "@/domain/conversion/conversion.constants";
import { getMesosPerNx } from "@/domain/conversion/conversion.rules";
import { LOCALE_DEFINITIONS } from "@/i18n/locales";
import {
  formatCompactUnitValue,
  formatExchangeRate,
  formatUnitValue,
  formatUnitValueWithLabel,
} from "./formatters";

const pt = LOCALE_DEFINITIONS.pt.numberFormat.intlLocale;
const en = LOCALE_DEFINITIONS.en.numberFormat.intlLocale;
const ko = LOCALE_DEFINITIONS.ko.numberFormat.intlLocale;

describe("formatUnitValue", () => {
  it("formats values using the active locale", () => {
    const amount = DEFAULT_CONVERSION_RATES.nxPerUsd * 10;
    const currency = 10 * DEFAULT_USD_CURRENCY_RATE;
    const mesos = amount * getMesosPerNx(DEFAULT_CONVERSION_RATES);

    expect(formatUnitValue("nx", amount, pt)).toBe("10.000");
    expect(formatUnitValue("nx", amount, en)).toBe("10,000");
    expect(formatUnitValue("nx", amount, ko)).toBe("10,000");
    expect(formatUnitValue("mesos", mesos, pt)).toBe("100.000");
    expect(formatUnitValue("mesos", mesos, en)).toBe("100,000");
    expect(formatUnitValue("usd", 10, pt)).toBe("US$ 10,00");
    expect(formatUnitValue("usd", 10, en)).toBe("US$ 10.00");
    expect(formatUnitValue("currency", currency, pt)).toBe("54,00");
    expect(formatUnitValue("currency", currency, ko)).toBe("54.00");
  });

  it("formats NX and mesos as whole numbers", () => {
    expect(formatUnitValue("nx", 1022.2222, pt)).toBe("1.022");
    expect(formatUnitValue("nx", 1022.2222, en)).toBe("1,022");
    expect(formatUnitValue("nx", 1022.5, en)).toBe("1,023");
    expect(formatUnitValue("mesos", 1.999_999, pt)).toBe("2");
    expect(formatUnitValue("nx", 0.0001, en)).toBe("0");
    expect(formatUnitValue("mesos", 0.6, pt)).toBe("1");
  });

  it("keeps useful precision for small non-zero currency values", () => {
    expect(formatUnitValue("usd", 0.001, en)).toBe("US$ 0.001");
    expect(formatUnitValue("currency", 0.001, pt)).toBe("0,001");
  });

  it("formats zero and small values", () => {
    expect(formatUnitValue("nx", 0, pt)).toBe("0");
    expect(formatUnitValue("usd", 0, en)).toBe("US$ 0.00");
  });

  it("never renders NaN or Infinity", () => {
    expect(formatUnitValue("nx", Number.NaN, pt)).toBe("—");
    expect(formatUnitValue("mesos", Number.POSITIVE_INFINITY, en)).toBe("—");
  });
});

describe("formatUnitValueWithLabel", () => {
  it("appends the unit label only when the value has no currency symbol", () => {
    expect(formatUnitValueWithLabel("nx", 1_000, pt, "NX")).toBe("1.000 NX");
    expect(formatUnitValueWithLabel("mesos", 90_000, en, "Mesos")).toBe("90,000 Mesos");
    expect(formatUnitValueWithLabel("usd", 10, pt, "Dólar")).toBe("US$ 10,00");
    expect(formatUnitValueWithLabel("currency", 54, pt, "Moeda")).toBe("54,00 Moeda");
  });
});

describe("formatCompactUnitValue", () => {
  it("uses community suffixes for NX and mesos", () => {
    expect(formatCompactUnitValue("nx", 1_000)).toBe("1k");
    expect(formatCompactUnitValue("nx", 1_500)).toBe("1.5k");
    expect(formatCompactUnitValue("nx", 10_000)).toBe("10k");
    expect(formatCompactUnitValue("mesos", 45_000)).toBe("45k");
    expect(formatCompactUnitValue("mesos", 1_000_000)).toBe("1m");
    expect(formatCompactUnitValue("mesos", 1_250_000)).toBe("1.3m");
    expect(formatCompactUnitValue("mesos", 2_000_000_000)).toBe("2b");
    expect(formatCompactUnitValue("mesos", 1_000_000_000_000)).toBe("1t");
  });

  it("promotes the scale after rounding", () => {
    expect(formatCompactUnitValue("mesos", 999_950)).toBe("1m");
  });

  it("does not compact small values, currencies, or invalid numbers", () => {
    expect(formatCompactUnitValue("nx", 999)).toBeNull();
    expect(formatCompactUnitValue("usd", 1_000)).toBeNull();
    expect(formatCompactUnitValue("currency", 1_000)).toBeNull();
    expect(formatCompactUnitValue("nx", Number.NaN)).toBeNull();
    expect(formatCompactUnitValue("mesos", Number.POSITIVE_INFINITY)).toBeNull();
  });

  it("preserves the sign for negative values", () => {
    expect(formatCompactUnitValue("nx", -5_000)).toBe("-5k");
  });
});

describe("formatExchangeRate", () => {
  it("formats the default rate for each locale", () => {
    expect(formatExchangeRate(DEFAULT_USD_CURRENCY_RATE, pt)).toBe("5,40");
    expect(formatExchangeRate(DEFAULT_USD_CURRENCY_RATE, en)).toBe("5.40");
    expect(formatExchangeRate(DEFAULT_USD_CURRENCY_RATE, ko)).toBe("5.40");
  });

  it("preserves useful decimal precision", () => {
    expect(formatExchangeRate(5.12345678, pt)).toBe("5,12345678");
  });
});
