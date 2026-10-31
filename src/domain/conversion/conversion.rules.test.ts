import { describe, expect, it } from "vitest";
import {
  CONVERSION_UNITS,
  DEFAULT_CONVERSION_RATES,
  DEFAULT_USD_CURRENCY_RATE,
} from "./conversion.constants";
import {
  areConversionRatesEqual,
  fromNx,
  getMesosPerNx,
  isDefaultConversionRates,
  isValidAmount,
  isValidConversionRates,
  isValidUsdCurrencyRate,
  toNx,
} from "./conversion.rules";

describe("conversion rules", () => {
  it("converts NX to USD", () => {
    expect(
      fromNx(
        DEFAULT_CONVERSION_RATES.nxPerUsd,
        "usd",
        DEFAULT_USD_CURRENCY_RATE,
        DEFAULT_CONVERSION_RATES,
      ),
    ).toBe(1);
  });

  it("converts USD to NX", () => {
    expect(toNx(1, "usd", DEFAULT_USD_CURRENCY_RATE, DEFAULT_CONVERSION_RATES)).toBe(
      DEFAULT_CONVERSION_RATES.nxPerUsd,
    );
  });

  it("uses the configured NX-to-mesos ratio", () => {
    expect(getMesosPerNx(DEFAULT_CONVERSION_RATES)).toBe(10);
    expect(fromNx(1, "mesos", DEFAULT_USD_CURRENCY_RATE, DEFAULT_CONVERSION_RATES)).toBe(10);
    expect(toNx(10, "mesos", DEFAULT_USD_CURRENCY_RATE, DEFAULT_CONVERSION_RATES)).toBe(1);
  });

  it("converts between USD and the generic currency using the configured rate", () => {
    const rate = 6.2;

    expect(
      fromNx(DEFAULT_CONVERSION_RATES.nxPerUsd, "currency", rate, DEFAULT_CONVERSION_RATES),
    ).toBeCloseTo(rate, 10);
    expect(toNx(rate, "currency", rate, DEFAULT_CONVERSION_RATES)).toBeCloseTo(
      DEFAULT_CONVERSION_RATES.nxPerUsd,
      10,
    );
  });

  it("keeps every displayed unit reversible", () => {
    const sourceValues = {
      nx: 12_345.67,
      mesos: 111_111.11,
      usd: 12.34567,
      currency: 66.666,
    };

    for (const unit of CONVERSION_UNITS) {
      const nx = toNx(
        sourceValues[unit],
        unit,
        DEFAULT_USD_CURRENCY_RATE,
        DEFAULT_CONVERSION_RATES,
      );
      const roundTrip = fromNx(nx, unit, DEFAULT_USD_CURRENCY_RATE, DEFAULT_CONVERSION_RATES);

      expect(roundTrip).toBeCloseTo(sourceValues[unit], 10);
    }
  });

  it("validates amounts", () => {
    expect(isValidAmount(0)).toBe(true);
    expect(isValidAmount(10.5)).toBe(true);
    expect(isValidAmount(-1)).toBe(false);
    expect(isValidAmount(Number.NaN)).toBe(false);
    expect(isValidAmount(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it("validates exchange rates", () => {
    expect(isValidUsdCurrencyRate(DEFAULT_USD_CURRENCY_RATE)).toBe(true);
    expect(isValidUsdCurrencyRate(0)).toBe(false);
    expect(isValidUsdCurrencyRate(-1)).toBe(false);
    expect(isValidUsdCurrencyRate(Number.NaN)).toBe(false);
    expect(isValidUsdCurrencyRate(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it("detects custom conversion rates", () => {
    expect(isDefaultConversionRates(DEFAULT_CONVERSION_RATES)).toBe(true);
    expect(
      isDefaultConversionRates({
        ...DEFAULT_CONVERSION_RATES,
        nxPerUsd: DEFAULT_CONVERSION_RATES.nxPerUsd * 2,
      }),
    ).toBe(false);
    expect(isDefaultConversionRates({ ...DEFAULT_CONVERSION_RATES, mesosPerNx: 11 })).toBe(false);
    expect(
      areConversionRatesEqual(DEFAULT_CONVERSION_RATES, {
        ...DEFAULT_CONVERSION_RATES,
        mesosPerNx: DEFAULT_CONVERSION_RATES.mesosPerNx + 0.000_000_000_1,
      }),
    ).toBe(true);
  });

  it("validates conversion rates", () => {
    expect(isValidConversionRates(DEFAULT_CONVERSION_RATES)).toBe(true);
    expect(
      isValidConversionRates({
        ...DEFAULT_CONVERSION_RATES,
        nxPerUsd: 0,
      }),
    ).toBe(false);
    expect(
      isValidConversionRates({
        ...DEFAULT_CONVERSION_RATES,
        mesosPerNx: Number.NaN,
      }),
    ).toBe(false);
    expect(
      isValidConversionRates({
        ...DEFAULT_CONVERSION_RATES,
        mesosPerNx: Number.POSITIVE_INFINITY,
      }),
    ).toBe(false);
  });
});
