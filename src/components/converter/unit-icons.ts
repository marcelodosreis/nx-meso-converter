import { Banknote, CircleDollarSign, Coins, Gem, type LucideIcon } from "lucide-react";
import type { ConversionUnit } from "@/domain/conversion/conversion.types";

export const UNIT_ICONS: Record<ConversionUnit, LucideIcon> = {
  nx: Gem,
  mesos: Coins,
  usd: CircleDollarSign,
  currency: Banknote,
};
