import type { ConversionRates } from "./conversion.types";

export const DEFAULT_CONVERSION_RATES: ConversionRates = {
  nxPerUsd: 1_000,
  mesosPerNx: 10,
};

export const DEFAULT_USD_CURRENCY_RATE = 5.4;

export const CONVERSION_UNITS = ["mesos", "nx", "usd", "currency"] as const;
export const SOURCE_UNITS = ["mesos", "nx", "usd", "currency"] as const;
