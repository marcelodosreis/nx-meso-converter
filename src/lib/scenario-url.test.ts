import { describe, expect, it } from "vitest";
import {
  DEFAULT_CONVERSION_RATES,
  DEFAULT_USD_CURRENCY_RATE,
} from "@/domain/conversion/conversion.constants";
import {
  buildScenarioSearchParams,
  parseScenarioSearchParams,
  type ScenarioUrlState,
} from "./scenario-url";

const defaultState: ScenarioUrlState = {
  amountCanonical: "",
  sourceUnit: "nx",
  currencyEnabled: true,
  exchangeRateCanonical: String(DEFAULT_USD_CURRENCY_RATE),
  rates: DEFAULT_CONVERSION_RATES,
};

describe("scenario URL", () => {
  it("omits default values from the URL", () => {
    expect(buildScenarioSearchParams(defaultState).toString()).toBe("");
  });

  it("serializes only the changed scenario values", () => {
    const params = buildScenarioSearchParams({
      ...defaultState,
      amountCanonical: "5000",
      sourceUnit: "mesos",
      currencyEnabled: false,
      exchangeRateCanonical: "6.2",
    });

    expect(Object.fromEntries(params)).toEqual({
      amount: "5000",
      unit: "mesos",
      currency: "0",
      rate: "6.2",
    });
  });

  it("serializes custom conversion rates", () => {
    const params = buildScenarioSearchParams({
      ...defaultState,
      rates: { nxPerUsd: 2_000, nxPerSlot: 6_000, mesosPerSlot: 30_000 },
    });

    expect(Object.fromEntries(params)).toEqual({
      nxPerUsd: "2000",
      nxPerSlot: "6000",
      mesosPerSlot: "30000",
    });
  });

  it("parses a shared scenario", () => {
    const overrides = parseScenarioSearchParams(
      "?amount=5000&unit=mesos&currency=0&rate=6.2&nxPerUsd=2000&nxPerSlot=6000&mesosPerSlot=30000",
    );

    expect(overrides).toEqual({
      amountCanonical: "5000",
      sourceUnit: "mesos",
      currencyEnabled: false,
      exchangeRateCanonical: "6.2",
      rates: { nxPerUsd: 2_000, nxPerSlot: 6_000, mesosPerSlot: 30_000 },
    });
  });

  it("ignores invalid or incomplete values", () => {
    const overrides = parseScenarioSearchParams(
      "?amount=abc&unit=unknown&currency=maybe&rate=-1&nxPerUsd=2000",
    );

    expect(overrides).toEqual({});
  });

  it("prevents a currency source when currency is disabled", () => {
    expect(parseScenarioSearchParams("?unit=currency&currency=0")).toEqual({
      sourceUnit: "nx",
      currencyEnabled: false,
    });
  });
});
