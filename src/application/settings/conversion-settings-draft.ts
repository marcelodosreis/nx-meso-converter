import type { ConversionRates } from "@/domain/conversion/conversion.types";
import { numberToCanonicalNumberInput, parseCanonicalNumber } from "@/lib/localized-number-input";

const DIRECT_RATE_MAX_FRACTION_DIGITS = 6;
const DERIVED_RATE_MAX_FRACTION_DIGITS = 20;

export type ConversionSettingsDraft = Readonly<{
  nxPerUsd: string;
  nxPerSlot: string;
  mesosPerSlot: string;
  mesosPerNx: string;
}>;

export type ConversionSettingsDraftField = keyof ConversionSettingsDraft;

export function createConversionSettingsDraft(rates: ConversionRates): ConversionSettingsDraft {
  const mesosPerNx = rates.mesosPerSlot / rates.nxPerSlot;

  return {
    nxPerUsd: numberToCanonicalNumberInput(rates.nxPerUsd),
    nxPerSlot: numberToCanonicalNumberInput(rates.nxPerSlot),
    mesosPerSlot: numberToCanonicalNumberInput(rates.mesosPerSlot),
    mesosPerNx: numberToCanonicalNumberInput(mesosPerNx, 0, DIRECT_RATE_MAX_FRACTION_DIGITS),
  };
}

export function updateConversionSettingsDraft(
  draft: ConversionSettingsDraft,
  field: ConversionSettingsDraftField,
  canonicalValue: string,
): ConversionSettingsDraft {
  switch (field) {
    case "nxPerUsd":
      return { ...draft, nxPerUsd: canonicalValue };
    case "nxPerSlot":
      return syncMesosPerNx({ ...draft, nxPerSlot: canonicalValue });
    case "mesosPerSlot":
      return syncMesosPerNx({ ...draft, mesosPerSlot: canonicalValue });
    case "mesosPerNx":
      return syncMesosPerSlot({ ...draft, mesosPerNx: canonicalValue });
  }
}

export function parseConversionSettingsDraft(
  draft: ConversionSettingsDraft,
): ConversionRates | null {
  const nxPerUsd = parseCanonicalNumber(draft.nxPerUsd);
  const nxPerSlot = parseCanonicalNumber(draft.nxPerSlot);
  const mesosPerSlot = parseCanonicalNumber(draft.mesosPerSlot);

  if (nxPerUsd === null || nxPerSlot === null || mesosPerSlot === null) {
    return null;
  }

  return { nxPerUsd, nxPerSlot, mesosPerSlot };
}

export function getDraftMesosPerNx(draft: ConversionSettingsDraft): number | null {
  const nxPerSlot = parseCanonicalNumber(draft.nxPerSlot);
  const mesosPerSlot = parseCanonicalNumber(draft.mesosPerSlot);

  if (nxPerSlot === null || mesosPerSlot === null || nxPerSlot <= 0 || mesosPerSlot <= 0) {
    return null;
  }

  return mesosPerSlot / nxPerSlot;
}

function syncMesosPerNx(draft: ConversionSettingsDraft): ConversionSettingsDraft {
  const nxPerSlot = parseCanonicalNumber(draft.nxPerSlot);
  const mesosPerSlot = parseCanonicalNumber(draft.mesosPerSlot);

  if (nxPerSlot === null || mesosPerSlot === null || nxPerSlot <= 0) {
    return { ...draft, mesosPerNx: "" };
  }

  return {
    ...draft,
    mesosPerNx: numberToCanonicalNumberInput(
      mesosPerSlot / nxPerSlot,
      0,
      DIRECT_RATE_MAX_FRACTION_DIGITS,
    ),
  };
}

function syncMesosPerSlot(draft: ConversionSettingsDraft): ConversionSettingsDraft {
  const nxPerSlot = parseCanonicalNumber(draft.nxPerSlot);
  const mesosPerNx = parseCanonicalNumber(draft.mesosPerNx);

  if (nxPerSlot === null || mesosPerNx === null || nxPerSlot <= 0) {
    return { ...draft, mesosPerSlot: "" };
  }

  return {
    ...draft,
    mesosPerSlot: numberToCanonicalNumberInput(
      nxPerSlot * mesosPerNx,
      0,
      DERIVED_RATE_MAX_FRACTION_DIGITS,
    ),
  };
}
