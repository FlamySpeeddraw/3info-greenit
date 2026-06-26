/**
 * Types partagés des primitives de visualisation (components/viz).
 * Centralisés ici pour être réutilisés par d'autres tickets sans dépendre
 * d'un composant en particulier.
 */

/* ----------------------------- Waffle ----------------------------- */

export type WaffleProps = {
  /** Texte alternatif accessible (obligatoire). */
  ariaLabel: string;
  /** Nombre de cases remplies. */
  filled: number;
  /** Nombre total de cases. Défaut 100. */
  total?: number;
  /** Cases par ligne. Défaut 10. */
  columns?: number;
  title?: string;
  caption?: string;
  color?: string;
  emptyColor?: string;
  maxWidth?: number;
};

/* ------------------------------ Donut ----------------------------- */

export type DonutSegment = {
  label: string;
  value: number;
  color: string;
};

export type DonutProps = {
  ariaLabel: string;
  segments: DonutSegment[];
  title?: string;
  caption?: string;
  centerLabel?: string;
  centerSub?: string;
  /** Diamètre en px. Défaut 120. */
  size?: number;
  thickness?: number;
};

/* --------------------------- TrendChart --------------------------- */

export type TrendPoint = {
  label: string | number;
  value: number;
};

export type TrendChartProps = {
  ariaLabel: string;
  points: TrendPoint[];
  title?: string;
  caption?: string;
  /** Valeur max de l'axe Y. Défaut : calculée à partir des données. */
  yMax?: number;
  yTicks?: number[];
  color?: string;
  /** Met en évidence le dernier point (ex. projection). */
  highlightLast?: boolean;
  highlightColor?: string;
  maxWidth?: number;
};

/* --------------------------- CompareBars -------------------------- */

export type CompareBar = {
  label: string;
  display: string;
  value: number;
  color?: string;
};

export type CompareGroup = {
  heading?: string;
  bars: CompareBar[];
  /** Valeur de référence pour 100 % de largeur. Défaut : max du groupe. */
  max?: number;
};

export type CompareBarsProps = {
  ariaLabel: string;
  groups: CompareGroup[];
  title?: string;
  caption?: string;
  defaultColor?: string;
};
