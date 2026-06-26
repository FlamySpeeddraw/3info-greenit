import type { EnergyMix } from "./types";

export const MIX_COLORS: Record<keyof EnergyMix, string> = {
  charbon: "#3D2E2B",
  gaz: "#8C5E4F",
  nucleaire: "#5F7C65",
  hydraulique: "#2F6F7E",
  eolien: "#6A9A72",
  solaire: "#D0A629",
  autres: "#7B756B",
};

export const SELECTED_BAR_COLOR = "#112F1F";
export const MUTED_BAR_COLOR = "#C8D7CB";

export const REFERENCE_COUNTRY_NAMES = [
  "Suede",
  "France",
  "Royaume-Uni",
  "Allemagne",
  "Etats-Unis",
  "Pologne",
];
