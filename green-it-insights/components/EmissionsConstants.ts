/**
 * Seuils d'émission en gCO₂e/kWh (ACV)
 * Source : ADEME Base Carbone® / GIEC AR6
 */
export const EMISSION_THRESHOLDS = {
  VERY_HIGH: 600, // filières très carbonées (charbon, fioul)
  HIGH: 200,      // filières modérément carbonées (gaz, biomasse)
  MEDIUM: 50,     // filières faiblement émettrices (solaire)
} as const;

/**
 * Couleurs associées à chaque niveau d'émission.
 * Définies ici pour éviter la répétition dans EmissionsBarChart et FilieresTooltip.
 */
export const EMISSION_COLORS = {
  VERY_HIGH: "#c0392b", // rouge  — très carboné
  HIGH:      "#e67e22", // orange — modéré
  MEDIUM:    "#f1c40f", // jaune  — faible
  LOW:       "#27ae60", // vert   — bas-carbone
} as const;

export type EmissionLevel = keyof typeof EMISSION_COLORS;

export function getEmissionLevel(value: number): EmissionLevel {
  if (value >= EMISSION_THRESHOLDS.VERY_HIGH) return "VERY_HIGH";
  if (value >= EMISSION_THRESHOLDS.HIGH)      return "HIGH";
  if (value >= EMISSION_THRESHOLDS.MEDIUM)    return "MEDIUM";
  return "LOW";
}

export function getEmissionColor(value: number): string {
  return EMISSION_COLORS[getEmissionLevel(value)];
}
