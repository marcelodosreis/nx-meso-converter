import { describe, expect, it } from "vitest";
import type { BrowserStorage } from "./browser-storage";
import { readStoredLocale, writeStoredLocale } from "./locale.repository";

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

describe("locale repository", () => {
  it("reads a stored supported locale", () => {
    const { storage } = createMemoryStorage("ko");

    expect(readStoredLocale(storage)).toBe("ko");
  });

  it("ignores unsupported or missing locales", () => {
    for (const storedValue of [null, "", "pt-BR", "en-US", "fr"]) {
      const { storage } = createMemoryStorage(storedValue);

      expect(readStoredLocale(storage)).toBeNull();
    }
  });

  it("writes the selected locale", () => {
    const { storage, getStoredValue } = createMemoryStorage();

    expect(writeStoredLocale("en", storage)).toBe(true);
    expect(getStoredValue()).toBe("en");
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

    expect(readStoredLocale(null)).toBeNull();
    expect(writeStoredLocale("pt", null)).toBe(false);
    expect(readStoredLocale(throwingStorage)).toBeNull();
    expect(writeStoredLocale("pt", throwingStorage)).toBe(false);
  });
});
