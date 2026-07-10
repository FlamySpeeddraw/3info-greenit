import { COLORS } from "../color.const";
import type { EnergyMix } from "./types";

export const MIX_COLORS: Record<keyof EnergyMix, string> = {
  charbon: COLORS.brown.dark,
  gaz: COLORS.light.brown[8],
  nucleaire: COLORS.light.grass[8],
  hydraulique: COLORS.green.accent,
  eolien: COLORS.light.grass[7],
  solaire: COLORS.light.brown[7],
  autres: COLORS.brown.light,
};

export const SELECTED_BAR_COLOR = COLORS.green.dark;
export const MUTED_BAR_COLOR = COLORS.light.grass[5];

export const REFERENCE_COUNTRY_NAMES = [
  "Suede",
  "France",
  "Royaume-Uni",
  "Allemagne",
  "Etats-Unis",
  "Pologne",
];
