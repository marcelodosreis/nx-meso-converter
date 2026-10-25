import { describe, expect, it } from "vitest";
import { detectPreferredLocale, isLocale, LOCALES } from "./locales";

describe("locale selection", () => {
  it("keeps Portuguese, English, and Korean as supported locales", () => {
    expect(LOCALES).toEqual(["pt", "en", "ko"]);
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ko")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("detects the first supported browser language", () => {
    expect(detectPreferredLocale(["ko-KR", "en-US"])).toBe("ko");
    expect(detectPreferredLocale(["fr-FR", "en-US", "pt-BR"])).toBe("en");
    expect(detectPreferredLocale(["pt-BR"])).toBe("pt");
    expect(detectPreferredLocale(["fr-FR", "de-DE"])).toBeNull();
  });
});
