import { describe, expect, it } from "vitest";
import { DEFAULT_CONVERSION_RATES } from "@/domain/conversion/conversion.constants";
import {
  createConversionSettingsDraft,
  getDraftMesosPerNx,
  parseConversionSettingsDraft,
  updateConversionSettingsDraft,
} from "./conversion-settings-draft";

describe("conversion settings draft", () => {
  it("creates a synchronized draft from rates", () => {
    const draft = createConversionSettingsDraft(DEFAULT_CONVERSION_RATES);

    expect(draft).toEqual({
      nxPerUsd: "1000",
      nxPerSlot: "5000",
      mesosPerSlot: "45000",
      mesosPerNx: "9",
    });
  });

  it("updates mesos per slot when the direct NX-to-mesos rate changes", () => {
    const initialDraft = createConversionSettingsDraft({
      nxPerUsd: 1_000,
      nxPerSlot: 6_000,
      mesosPerSlot: 30_000,
    });
    const nextDraft = updateConversionSettingsDraft(initialDraft, "mesosPerNx", "7");

    expect(nextDraft.mesosPerNx).toBe("7");
    expect(nextDraft.mesosPerSlot).toBe("42000");
    expect(parseConversionSettingsDraft(nextDraft)).toEqual({
      nxPerUsd: 1_000,
      nxPerSlot: 6_000,
      mesosPerSlot: 42_000,
    });
  });

  it("recalculates the direct rate when slot values change", () => {
    const initialDraft = createConversionSettingsDraft({
      nxPerUsd: 1_000,
      nxPerSlot: 6_000,
      mesosPerSlot: 30_000,
    });
    const withNewMesos = updateConversionSettingsDraft(initialDraft, "mesosPerSlot", "42000");
    const withNewNxSlot = updateConversionSettingsDraft(withNewMesos, "nxPerSlot", "7000");

    expect(withNewMesos.mesosPerNx).toBe("7");
    expect(withNewNxSlot.mesosPerNx).toBe("6");
    expect(getDraftMesosPerNx(withNewNxSlot)).toBe(6);
  });

  it("invalidates dependent values when the direct rate cannot be calculated", () => {
    const initialDraft = createConversionSettingsDraft(DEFAULT_CONVERSION_RATES);
    const nextDraft = updateConversionSettingsDraft(initialDraft, "mesosPerNx", "");

    expect(nextDraft.mesosPerSlot).toBe("");
    expect(parseConversionSettingsDraft(nextDraft)).toBeNull();
    expect(getDraftMesosPerNx(nextDraft)).toBeNull();
  });

  it("derives the NX-to-mesos relation without depending on the dollar rate", () => {
    const initialDraft = createConversionSettingsDraft(DEFAULT_CONVERSION_RATES);
    const nextDraft = updateConversionSettingsDraft(initialDraft, "nxPerUsd", "");

    expect(getDraftMesosPerNx(nextDraft)).toBe(9);
  });
});
