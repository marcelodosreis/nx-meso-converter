import { DEFAULT_USD_CURRENCY_RATE, SOURCE_UNITS } from "@/domain/conversion/conversion.constants";
import {
  areNumbersClose,
  isDefaultConversionRates,
  isValidAmount,
  isValidConversionRates,
  isValidUsdCurrencyRate,
} from "@/domain/conversion/conversion.rules";
import type { ConversionRates, SourceUnit } from "@/domain/conversion/conversion.types";
import { numberToCanonicalNumberInput, parseCanonicalNumber } from "./localized-number-input";

export const SCENARIO_URL_DEBOUNCE_MS = 400;
export const SCENARIO_URL_FLUSH_EVENT = "nx-converter:flush-scenario-url";
export const SCENARIO_URL_UPDATED_EVENT = "nx-converter:scenario-url-updated";

const SCENARIO_KEYS = [
  "amount",
  "unit",
  "currency",
  "rate",
  "nxPerUsd",
  "nxPerSlot",
  "mesosPerSlot",
] as const;

export type ScenarioUrlState = Readonly<{
  amountCanonical: string;
  sourceUnit: SourceUnit;
  currencyEnabled: boolean;
  exchangeRateCanonical: string;
  rates: ConversionRates;
}>;

export type ScenarioUrlOverrides = Readonly<{
  amountCanonical?: string;
  sourceUnit?: SourceUnit;
  currencyEnabled?: boolean;
  exchangeRateCanonical?: string;
  rates?: ConversionRates;
}>;

export function buildScenarioSearchParams(state: ScenarioUrlState): URLSearchParams {
  const params = new URLSearchParams();
  const amount = parseCanonicalNumber(state.amountCanonical);

  if (amount !== null && isValidAmount(amount)) {
    params.set("amount", numberToCanonicalNumberInput(amount, 0, 20));
  }

  if (state.sourceUnit !== "nx") {
    params.set("unit", state.sourceUnit);
  }

  if (!state.currencyEnabled) {
    params.set("currency", "0");
  }

  const exchangeRate = parseCanonicalNumber(state.exchangeRateCanonical);

  if (
    exchangeRate !== null &&
    isValidUsdCurrencyRate(exchangeRate) &&
    !areNumbersClose(exchangeRate, DEFAULT_USD_CURRENCY_RATE)
  ) {
    params.set("rate", numberToCanonicalNumberInput(exchangeRate, 0, 20));
  }

  if (!isDefaultConversionRates(state.rates)) {
    params.set("nxPerUsd", numberToCanonicalNumberInput(state.rates.nxPerUsd, 0, 20));
    params.set("nxPerSlot", numberToCanonicalNumberInput(state.rates.nxPerSlot, 0, 20));
    params.set("mesosPerSlot", numberToCanonicalNumberInput(state.rates.mesosPerSlot, 0, 20));
  }

  return params;
}

export function parseScenarioSearchParams(search: string): ScenarioUrlOverrides {
  const params = new URLSearchParams(search);
  const overrides: {
    amountCanonical?: string;
    sourceUnit?: SourceUnit;
    currencyEnabled?: boolean;
    exchangeRateCanonical?: string;
    rates?: ConversionRates;
  } = {};

  const amount = parseCanonicalNumber(params.get("amount") ?? "");

  if (amount !== null && isValidAmount(amount)) {
    overrides.amountCanonical = numberToCanonicalNumberInput(amount, 0, 20);
  }

  const sourceUnit = params.get("unit");

  if (sourceUnit !== null && isSourceUnit(sourceUnit)) {
    overrides.sourceUnit = sourceUnit;
  }

  const currency = params.get("currency");

  if (currency === "0" || currency === "false") {
    overrides.currencyEnabled = false;
  } else if (currency === "1" || currency === "true") {
    overrides.currencyEnabled = true;
  }

  const exchangeRate = parseCanonicalNumber(params.get("rate") ?? "");

  if (exchangeRate !== null && isValidUsdCurrencyRate(exchangeRate)) {
    overrides.exchangeRateCanonical = numberToCanonicalNumberInput(exchangeRate, 0, 20);
  }

  const nxPerUsd = parseCanonicalNumber(params.get("nxPerUsd") ?? "");
  const nxPerSlot = parseCanonicalNumber(params.get("nxPerSlot") ?? "");
  const mesosPerSlot = parseCanonicalNumber(params.get("mesosPerSlot") ?? "");

  if (nxPerUsd !== null && nxPerSlot !== null && mesosPerSlot !== null) {
    const rates: ConversionRates = { nxPerUsd, nxPerSlot, mesosPerSlot };

    if (isValidConversionRates(rates)) {
      overrides.rates = rates;
    }
  }

  if (overrides.currencyEnabled === false && overrides.sourceUnit === "currency") {
    overrides.sourceUnit = "nx";
  }

  return overrides;
}

export function writeScenarioUrl(state: ScenarioUrlState): void {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);

  for (const key of SCENARIO_KEYS) {
    params.delete(key);
  }

  buildScenarioSearchParams(state).forEach((value, key) => {
    params.set(key, value);
  });

  const search = params.toString();
  const nextUrl = `${window.location.pathname}${search.length > 0 ? `?${search}` : ""}${window.location.hash}`;

  if (nextUrl === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    return;
  }

  window.history.replaceState(window.history.state, "", nextUrl);
  window.dispatchEvent(new Event(SCENARIO_URL_UPDATED_EVENT));
}

function isSourceUnit(value: string): value is SourceUnit {
  return SOURCE_UNITS.some((unit) => unit === value);
}
