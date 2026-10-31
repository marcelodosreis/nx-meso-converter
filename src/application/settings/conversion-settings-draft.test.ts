import { describe, expect, it } from "vitest";
import { DEFAULT_CONVERSION_RATES } from "@/domain/conversion/conversion.constants";
import {
  createConversionSettingsDraft,
  parseConversionSettingsDraft,
  updateConversionSettingsDraft,
} from "./conversion-settings-draft";

describe("conversion settings draft", () => {
  it("creates a draft from rates", () => {
    const draft = createConversionSettingsDraft(DEFAULT_CONVERSION_RATES);

    expect(draft).toEqual({
      nxPerUsd: "1000",
      mesosPerNx: "10",
    });
  });

  it("updates the NX-to-mesos ratio", () => {
    const initialDraft = createConversionSettingsDraft({
      nxPerUsd: 1_000,
      mesosPerNx: 5,
    });
    const nextDraft = updateConversionSettingsDraft(initialDraft, "mesosPerNx", "7");

    expect(nextDraft.mesosPerNx).toBe("7");
    expect(parseConversionSettingsDraft(nextDraft)).toEqual({
      nxPerUsd: 1_000,
      mesosPerNx: 7,
    });
  });

  it("updates the NX-per-USD rate without changing the ratio", () => {
    const initialDraft = createConversionSettingsDraft(DEFAULT_CONVERSION_RATES);
    const nextDraft = updateConversionSettingsDraft(initialDraft, "nxPerUsd", "2000");

    expect(nextDraft.nxPerUsd).toBe("2000");
    expect(nextDraft.mesosPerNx).toBe("10");
  });

  it("rejects incomplete drafts", () => {
    const initialDraft = createConversionSettingsDraft(DEFAULT_CONVERSION_RATES);
    const missingRatio = updateConversionSettingsDraft(initialDraft, "mesosPerNx", "");

    expect(parseConversionSettingsDraft(missingRatio)).toBeNull();
  });
});
