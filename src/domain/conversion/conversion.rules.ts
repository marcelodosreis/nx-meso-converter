import type { ConversionRates, ConversionUnit } from "./conversion.types";

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

function assertNever(value: never): never {
  throw new Error(`Unsupported conversion unit: ${String(value)}`);
}
