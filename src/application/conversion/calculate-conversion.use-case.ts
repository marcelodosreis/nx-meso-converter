import {
  fromNx,
  isValidAmount,
  isValidConversionRates,
  isValidUsdCurrencyRate,
  toNx,
} from "@/domain/conversion/conversion.rules";
import type {
  ConversionRates,
  ConversionValues,
  SourceUnit,
} from "@/domain/conversion/conversion.types";

export type ConversionFailureReason =
  | "invalid-amount"
  | "invalid-exchange-rate"
  | "invalid-conversion-rates";

export type CalculateConversionCommand = Readonly<{
  amount: number;
  sourceUnit: SourceUnit;
  usdCurrencyRate: number;
  rates: ConversionRates;
}>;

export type CalculateConversionResult =
  | Readonly<{ ok: true; values: ConversionValues }>
  | Readonly<{ ok: false; reason: ConversionFailureReason }>;

export function calculateConversion(
  command: CalculateConversionCommand,
): CalculateConversionResult {
  const { amount, sourceUnit, usdCurrencyRate, rates } = command;

  if (!isValidAmount(amount)) {
    return { ok: false, reason: "invalid-amount" };
  }

  if (!isValidUsdCurrencyRate(usdCurrencyRate)) {
    return { ok: false, reason: "invalid-exchange-rate" };
  }

  if (!isValidConversionRates(rates)) {
    return { ok: false, reason: "invalid-conversion-rates" };
  }

  const nx = toNx(amount, sourceUnit, usdCurrencyRate, rates);
  const values: ConversionValues = {
    nx,
    mesos: fromNx(nx, "mesos", usdCurrencyRate, rates),
    usd: fromNx(nx, "usd", usdCurrencyRate, rates),
    currency: fromNx(nx, "currency", usdCurrencyRate, rates),
  };

  return { ok: true, values };
}
