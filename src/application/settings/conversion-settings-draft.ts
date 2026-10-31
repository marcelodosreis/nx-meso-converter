import type { ConversionRates } from "@/domain/conversion/conversion.types";
import { numberToCanonicalNumberInput, parseCanonicalNumber } from "@/lib/localized-number-input";

export type ConversionSettingsDraft = Readonly<{
  nxPerUsd: string;
  mesosPerNx: string;
}>;

export type ConversionSettingsDraftField = keyof ConversionSettingsDraft;

export function createConversionSettingsDraft(rates: ConversionRates): ConversionSettingsDraft {
  return {
    nxPerUsd: numberToCanonicalNumberInput(rates.nxPerUsd),
    mesosPerNx: numberToCanonicalNumberInput(rates.mesosPerNx),
  };
}

export function updateConversionSettingsDraft(
  draft: ConversionSettingsDraft,
  field: ConversionSettingsDraftField,
  canonicalValue: string,
): ConversionSettingsDraft {
  return { ...draft, [field]: canonicalValue };
}

export function parseConversionSettingsDraft(
  draft: ConversionSettingsDraft,
): ConversionRates | null {
  const nxPerUsd = parseCanonicalNumber(draft.nxPerUsd);
  const mesosPerNx = parseCanonicalNumber(draft.mesosPerNx);

  if (nxPerUsd === null || mesosPerNx === null) {
    return null;
  }

  return { nxPerUsd, mesosPerNx };
}
