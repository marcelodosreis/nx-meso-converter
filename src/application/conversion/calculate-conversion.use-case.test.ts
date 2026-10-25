import { describe, expect, it } from "vitest";
import {
  DEFAULT_CONVERSION_RATES,
  DEFAULT_USD_CURRENCY_RATE,
  SOURCE_UNITS,
} from "@/domain/conversion/conversion.constants";
import { getMesosPerNx } from "@/domain/conversion/conversion.rules";
import type { SourceUnit } from "@/domain/conversion/conversion.types";
import type { CalculateConversionResult } from "./calculate-conversion.use-case";
import { calculateConversion } from "./calculate-conversion.use-case";

const rates = DEFAULT_CONVERSION_RATES;

function expectSuccess(result: CalculateConversionResult) {
  expect(result.ok).toBe(true);

  if (!result.ok) {
    throw new Error(`Expected a successful conversion, received ${result.reason}.`);
  }

  return result.values;
}

describe("calculateConversion", () => {
  it("calculates the canonical NX example across all displayed units", () => {
    const amount = rates.nxPerUsd * 10;
    const result = calculateConversion({
      amount,
      sourceUnit: "nx",
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates,
    });

    const values = expectSuccess(result);

    expect(values.nx).toBeCloseTo(amount, 10);
    expect(values.mesos).toBeCloseTo(amount * getMesosPerNx(rates), 10);
    expect(values.usd).toBeCloseTo(10, 10);
    expect(values.currency).toBeCloseTo(10 * DEFAULT_USD_CURRENCY_RATE, 10);
  });

  it("accepts every allowed source unit", () => {
    const inputs: Record<SourceUnit, number> = {
      nx: rates.nxPerSlot,
      usd: rates.nxPerSlot / rates.nxPerUsd,
      currency: (rates.nxPerSlot / rates.nxPerUsd) * DEFAULT_USD_CURRENCY_RATE,
      mesos: rates.nxPerSlot * getMesosPerNx(rates),
    };

    for (const sourceUnit of SOURCE_UNITS) {
      const result = calculateConversion({
        amount: inputs[sourceUnit],
        sourceUnit,
        usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
        rates,
      });

      const values = expectSuccess(result);

      expect(values.nx).toBeCloseTo(rates.nxPerSlot, 8);
    }
  });

  it("applies a custom currency exchange rate", () => {
    const customRate = 6.2;
    const result = calculateConversion({
      amount: rates.nxPerUsd,
      sourceUnit: "nx",
      usdCurrencyRate: customRate,
      rates,
    });

    const values = expectSuccess(result);

    expect(values.usd).toBeCloseTo(1, 10);
    expect(values.currency).toBeCloseTo(customRate, 10);
  });

  it("applies custom conversion rates", () => {
    const customRates = {
      nxPerUsd: 2_000,
      nxPerSlot: 6_000,
      mesosPerSlot: 30_000,
    };
    const result = calculateConversion({
      amount: 4_000,
      sourceUnit: "nx",
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates: customRates,
    });

    const values = expectSuccess(result);

    expect(values.usd).toBeCloseTo(2, 10);
    expect(values.mesos).toBeCloseTo(20_000, 10);
  });

  it("returns zeros for a zero amount", () => {
    const result = calculateConversion({
      amount: 0,
      sourceUnit: "nx",
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates,
    });

    const values = expectSuccess(result);

    expect(values).toEqual({
      nx: 0,
      mesos: 0,
      usd: 0,
      currency: 0,
    });
  });

  it("supports decimal amounts", () => {
    const result = calculateConversion({
      amount: 10.5,
      sourceUnit: "usd",
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates,
    });

    const values = expectSuccess(result);

    expect(values.nx).toBeCloseTo(10.5 * rates.nxPerUsd, 10);
    expect(values.currency).toBeCloseTo(10.5 * DEFAULT_USD_CURRENCY_RATE, 10);
  });

  it("rejects invalid amounts", () => {
    for (const amount of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(
        calculateConversion({
          amount,
          sourceUnit: "nx",
          usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
          rates,
        }),
      ).toEqual({ ok: false, reason: "invalid-amount" });
    }
  });

  it("rejects invalid exchange rates", () => {
    for (const usdCurrencyRate of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(
        calculateConversion({
          amount: rates.nxPerUsd,
          sourceUnit: "nx",
          usdCurrencyRate,
          rates,
        }),
      ).toEqual({ ok: false, reason: "invalid-exchange-rate" });
    }
  });

  it("rejects invalid conversion rates", () => {
    expect(
      calculateConversion({
        amount: rates.nxPerUsd,
        sourceUnit: "nx",
        usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
        rates: { ...rates, nxPerUsd: 0 },
      }),
    ).toEqual({ ok: false, reason: "invalid-conversion-rates" });
  });
});
