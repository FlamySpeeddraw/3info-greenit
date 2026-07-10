import type { EnergyMix } from "./types";

export const MIX_COLORS: Record<keyof EnergyMix, string> = {
  charbon: "var(--brown-9)",
  gaz: "var(--brown-8)",
  nucleaire: "var(--grass-8)",
  hydraulique: "var(--grass-10)",
  eolien: "var(--grass-7)",
  solaire: "var(--brown-7)",
  autres: "var(--brown-10)",
};

export const CHART_GRID_COLOR = "var(--brown-3)";
export const CHART_CURSOR_COLOR = "var(--brown-2)";
export const CHART_PRIMARY_TEXT_COLOR = "var(--grass-11)";
export const CHART_SECONDARY_TEXT_COLOR = "var(--brown-11)";
export const SELECTED_BAR_COLOR = "var(--grass-9)";
export const MUTED_BAR_COLOR = "var(--grass-5)";

export const REFERENCE_COUNTRY_NAMES = [
  "Suede",
  "France",
  "Royaume-Uni",
  "Allemagne",
  "Etats-Unis",
  "Pologne",
];
