import type { ConversionRates } from "./conversion.types";

export const DEFAULT_CONVERSION_RATES: ConversionRates = {
  nxPerUsd: 1_000,
  nxPerSlot: 5_000,
  mesosPerSlot: 45_000,
};

export const DEFAULT_USD_CURRENCY_RATE = 5.4;

export const CONVERSION_UNITS = ["nx", "mesos", "usd", "currency"] as const;
export const SOURCE_UNITS = ["nx", "mesos", "usd", "currency"] as const;
