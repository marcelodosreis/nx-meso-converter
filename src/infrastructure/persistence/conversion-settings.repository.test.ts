import { describe, expect, it } from "vitest";
import { DEFAULT_CONVERSION_RATES } from "@/domain/conversion/conversion.constants";
import type { BrowserStorage } from "./browser-storage";
import {
  readStoredConversionRates,
  writeStoredConversionRates,
} from "./conversion-settings.repository";

function createMemoryStorage(initialValue: string | null = null): {
  storage: BrowserStorage;
  getStoredValue: () => string | null;
} {
  let storedValue = initialValue;

  return {
    storage: {
      getItem: () => storedValue,
      setItem: (_key, nextValue) => {
        storedValue = nextValue;
      },
    },
    getStoredValue: () => storedValue,
  };
}

describe("conversion settings repository", () => {
  it("reads valid stored rates", () => {
    const rates = { nxPerUsd: 2_000, nxPerSlot: 6_000, mesosPerSlot: 30_000 };
    const { storage } = createMemoryStorage(JSON.stringify(rates));

    expect(readStoredConversionRates(storage)).toEqual(rates);
  });

  it("ignores malformed or invalid stored rates", () => {
    const invalidValues = [
      null,
      "",
      "{}",
      "[]",
      JSON.stringify({ nxPerUsd: 0, nxPerSlot: 6_000, mesosPerSlot: 30_000 }),
      JSON.stringify({ nxPerUsd: "1000", nxPerSlot: 6_000, mesosPerSlot: 30_000 }),
    ];

    for (const storedValue of invalidValues) {
      const { storage } = createMemoryStorage(storedValue);

      expect(readStoredConversionRates(storage)).toBeNull();
    }
  });

  it("writes valid rates and rejects invalid ones", () => {
    const { storage, getStoredValue } = createMemoryStorage();
    const customRates = { nxPerUsd: 2_000, nxPerSlot: 6_000, mesosPerSlot: 30_000 };

    expect(writeStoredConversionRates(customRates, storage)).toBe(true);
    expect(JSON.parse(getStoredValue() ?? "null")).toEqual(customRates);

    expect(writeStoredConversionRates({ ...DEFAULT_CONVERSION_RATES, nxPerUsd: 0 }, storage)).toBe(
      false,
    );
    expect(JSON.parse(getStoredValue() ?? "null")).toEqual(customRates);
  });

  it("fails safely when storage is unavailable or throws", () => {
    const throwingStorage: BrowserStorage = {
      getItem: () => {
        throw new Error("Storage blocked");
      },
      setItem: () => {
        throw new Error("Storage blocked");
      },
    };

    expect(readStoredConversionRates(null)).toBeNull();
    expect(writeStoredConversionRates(DEFAULT_CONVERSION_RATES, null)).toBe(false);
    expect(readStoredConversionRates(throwingStorage)).toBeNull();
    expect(writeStoredConversionRates(DEFAULT_CONVERSION_RATES, throwingStorage)).toBe(false);
  });
});
