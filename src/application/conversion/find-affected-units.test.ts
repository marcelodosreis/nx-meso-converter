import { describe, expect, it } from "vitest";
import {
  DEFAULT_CONVERSION_RATES,
  DEFAULT_USD_CURRENCY_RATE,
} from "@/domain/conversion/conversion.constants";
import type { ConversionValues } from "@/domain/conversion/conversion.types";
import type { CalculateConversionCommand } from "./calculate-conversion.use-case";
import { calculateConversion } from "./calculate-conversion.use-case";
import { findAffectedUnits } from "./find-affected-units";

function getValues(command: CalculateConversionCommand): ConversionValues {
  const result = calculateConversion(command);

  if (!result.ok) {
    throw new Error(`Expected a successful conversion, received ${result.reason}.`);
  }

  return result.values;
}

describe("findAffectedUnits", () => {
  it("returns no units when rates are the defaults", () => {
    const command: CalculateConversionCommand = {
      amount: 10_000,
      sourceUnit: "nx",
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates: DEFAULT_CONVERSION_RATES,
    };

    expect(findAffectedUnits(command, getValues(command))).toEqual(new Set());
  });

  it("marks only USD and currency when NX per USD changes", () => {
    const command: CalculateConversionCommand = {
      amount: 10_000,
      sourceUnit: "nx",
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates: { ...DEFAULT_CONVERSION_RATES, nxPerUsd: 2_000 },
    };

    expect(findAffectedUnits(command, getValues(command))).toEqual(new Set(["usd", "currency"]));
  });

  it("marks only mesos when the mesos relation changes", () => {
    const command: CalculateConversionCommand = {
      amount: 10_000,
      sourceUnit: "nx",
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates: { ...DEFAULT_CONVERSION_RATES, mesosPerNx: 12 },
    };

    expect(findAffectedUnits(command, getValues(command))).toEqual(new Set(["mesos"]));
  });

  it("does not mark values when the custom rates do not change the result", () => {
    const command: CalculateConversionCommand = {
      amount: 0,
      sourceUnit: "nx",
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates: { ...DEFAULT_CONVERSION_RATES, mesosPerNx: 12 },
    };

    expect(findAffectedUnits(command, getValues(command))).toEqual(new Set());
  });
});
