import type { SourceUnit } from "@/domain/conversion/conversion.types";

export const QUICK_AMOUNT_PRESETS: Record<SourceUnit, readonly number[]> = {
  nx: [1_000, 5_000, 10_000],
  mesos: [100_000, 1_000_000, 10_000_000],
  usd: [1, 5, 10],
  currency: [10, 50, 100],
};
