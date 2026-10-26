import type { ConversionUnit } from "@/domain/conversion/conversion.types";
export const APP_NAME = "NX Mesos Converter";
export const APP_DESCRIPTION =
  "Converta NX, mesos, dólar e moeda em uma única página, com taxas ajustáveis.";

export const EXCHANGE_RATE_INPUT_MAX_LENGTH = 16;
export const COPY_FEEDBACK_DURATION_MS = 1_800;

export const UNIT_FRACTION_DIGITS: Record<
  ConversionUnit,
  Readonly<{ minimum: number; maximum: number }>
> = {
  nx: { minimum: 0, maximum: 0 },
  mesos: { minimum: 0, maximum: 0 },
  usd: { minimum: 2, maximum: 2 },
  currency: { minimum: 2, maximum: 2 },
};

export const UNIT_SYMBOLS: Record<ConversionUnit, string | null> = {
  nx: null,
  mesos: null,
  usd: "US$",
  currency: null,
};

export const EXCHANGE_RATE_FRACTION_DIGITS = {
  minimum: 2,
  maximum: 8,
} as const;
