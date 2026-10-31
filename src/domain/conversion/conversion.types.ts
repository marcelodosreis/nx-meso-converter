import type { CONVERSION_UNITS, SOURCE_UNITS } from "./conversion.constants";

export type ConversionUnit = (typeof CONVERSION_UNITS)[number];

export type SourceUnit = (typeof SOURCE_UNITS)[number];

export type ConversionValues = Readonly<Record<ConversionUnit, number>>;

export type ConversionRates = Readonly<{
  nxPerUsd: number;
  mesosPerNx: number;
}>;
