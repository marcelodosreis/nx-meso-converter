import { DEFAULT_CONVERSION_RATES } from "./conversion.constants";
import type { ConversionRates, ConversionUnit } from "./conversion.types";

const RATE_COMPARISON_EPSILON = 1e-9;

export function isValidAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount >= 0;
}

export function isValidUsdCurrencyRate(rate: number): boolean {
  return Number.isFinite(rate) && rate > 0;
}

export function isValidConversionRates(rates: ConversionRates): boolean {
  return (
    Number.isFinite(rates.nxPerUsd) &&
    rates.nxPerUsd > 0 &&
    Number.isFinite(rates.nxPerSlot) &&
    rates.nxPerSlot > 0 &&
    Number.isFinite(rates.mesosPerSlot) &&
    rates.mesosPerSlot > 0
  );
}

export function areConversionRatesEqual(left: ConversionRates, right: ConversionRates): boolean {
  return (
    areNumbersClose(left.nxPerUsd, right.nxPerUsd) &&
    areNumbersClose(left.nxPerSlot, right.nxPerSlot) &&
    areNumbersClose(left.mesosPerSlot, right.mesosPerSlot)
  );
}

export function isDefaultConversionRates(rates: ConversionRates): boolean {
  return areConversionRatesEqual(rates, DEFAULT_CONVERSION_RATES);
}

export function getMesosPerNx(rates: ConversionRates): number {
  return rates.mesosPerSlot / rates.nxPerSlot;
}

export function toNx(
  amount: number,
  unit: ConversionUnit,
  usdCurrencyRate: number,
  rates: ConversionRates,
): number {
  switch (unit) {
    case "nx":
      return amount;
    case "usd":
      return amount * rates.nxPerUsd;
    case "currency":
      return (amount / usdCurrencyRate) * rates.nxPerUsd;
    case "mesos":
      return amount / getMesosPerNx(rates);
    default:
      return assertNever(unit);
  }
}

export function fromNx(
  nx: number,
  unit: ConversionUnit,
  usdCurrencyRate: number,
  rates: ConversionRates,
): number {
  switch (unit) {
    case "nx":
      return nx;
    case "usd":
      return nx / rates.nxPerUsd;
    case "currency":
      return (nx / rates.nxPerUsd) * usdCurrencyRate;
    case "mesos":
      return nx * getMesosPerNx(rates);
    default:
      return assertNever(unit);
  }
}

export function areNumbersClose(left: number, right: number): boolean {
  const scale = Math.max(1, Math.abs(left), Math.abs(right));

  return Math.abs(left - right) <= RATE_COMPARISON_EPSILON * scale;
}

function assertNever(value: never): never {
  throw new Error(`Unsupported conversion unit: ${String(value)}`);
}
