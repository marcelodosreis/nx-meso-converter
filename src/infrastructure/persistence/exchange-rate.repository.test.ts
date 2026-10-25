import { describe, expect, it } from "vitest";
import type { BrowserStorage } from "./browser-storage";
import { readStoredExchangeRate, writeStoredExchangeRate } from "./exchange-rate.repository";

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

describe("exchange-rate repository", () => {
  it("reads a valid stored rate", () => {
    const { storage } = createMemoryStorage("6.2");

    expect(readStoredExchangeRate(storage)).toBe(6.2);
  });

  it("ignores missing, malformed, or invalid stored rates", () => {
    for (const storedValue of [null, "", "invalid", "0", "-1", "Infinity"]) {
      const { storage } = createMemoryStorage(storedValue);

      expect(readStoredExchangeRate(storage)).toBeNull();
    }
  });

  it("writes valid rates and rejects invalid ones", () => {
    const { storage, getStoredValue } = createMemoryStorage();

    expect(writeStoredExchangeRate(6.2, storage)).toBe(true);
    expect(getStoredValue()).toBe("6.2");

    expect(writeStoredExchangeRate(0, storage)).toBe(false);
    expect(writeStoredExchangeRate(-1, storage)).toBe(false);
    expect(getStoredValue()).toBe("6.2");
  });

  it("fails safely when storage is unavailable", () => {
    expect(readStoredExchangeRate(null)).toBeNull();
    expect(writeStoredExchangeRate(6.2, null)).toBe(false);
  });

  it("fails safely when storage throws", () => {
    const throwingStorage: BrowserStorage = {
      getItem: () => {
        throw new Error("Storage blocked");
      },
      setItem: () => {
        throw new Error("Storage blocked");
      },
    };

    expect(readStoredExchangeRate(throwingStorage)).toBeNull();
    expect(writeStoredExchangeRate(6.2, throwingStorage)).toBe(false);
  });
});
