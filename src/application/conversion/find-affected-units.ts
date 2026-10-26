import {
  CONVERSION_UNITS,
  DEFAULT_CONVERSION_RATES,
} from "@/domain/conversion/conversion.constants";
import { areNumbersClose } from "@/domain/conversion/conversion.rules";
import type { ConversionUnit, ConversionValues } from "@/domain/conversion/conversion.types";
import {
  type CalculateConversionCommand,
  calculateConversion,
} from "./calculate-conversion.use-case";

export function findAffectedUnits(
  command: CalculateConversionCommand,
  values: ConversionValues,
): ReadonlySet<ConversionUnit> {
  const defaultResult = calculateConversion({
    ...command,
    rates: DEFAULT_CONVERSION_RATES,
  });

  if (!defaultResult.ok) {
    return new Set();
  }

  const affectedUnits = new Set<ConversionUnit>();

  for (const unit of CONVERSION_UNITS) {
    if (!areNumbersClose(values[unit], defaultResult.values[unit])) {
      affectedUnits.add(unit);
    }
  }

  return affectedUnits;
}
