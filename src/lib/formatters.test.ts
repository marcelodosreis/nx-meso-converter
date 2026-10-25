import { describe, expect, it } from "vitest";
import {
  DEFAULT_CONVERSION_RATES,
  DEFAULT_USD_CURRENCY_RATE,
} from "@/domain/conversion/conversion.constants";
import { getMesosPerNx } from "@/domain/conversion/conversion.rules";
import { LOCALE_DEFINITIONS } from "@/i18n/locales";
import { formatExchangeRate, formatUnitValue, formatUnitValueWithLabel } from "./formatters";

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
    expect(formatUnitValue("mesos", mesos, pt)).toBe("90.000");
    expect(formatUnitValue("mesos", mesos, en)).toBe("90,000");
    expect(formatUnitValue("usd", 10, pt)).toBe("US$ 10,00");
    expect(formatUnitValue("usd", 10, en)).toBe("US$ 10.00");
    expect(formatUnitValue("currency", currency, pt)).toBe("54,00");
    expect(formatUnitValue("currency", currency, ko)).toBe("54.00");
  });

  it("limits fractional digits to two for regular values", () => {
    expect(formatUnitValue("nx", 1022.2222, pt)).toBe("1.022,22");
    expect(formatUnitValue("nx", 1022.2222, en)).toBe("1,022.22");
    expect(formatUnitValue("mesos", 1.999_999, pt)).toBe("2");
  });

  it("keeps useful precision for small non-zero values", () => {
    expect(formatUnitValue("usd", 0.001, en)).toBe("US$ 0.001");
    expect(formatUnitValue("currency", 0.001, pt)).toBe("0,001");
    expect(formatUnitValue("nx", 0.0001, en)).toBe("0.0001");
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
