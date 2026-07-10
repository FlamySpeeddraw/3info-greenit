/**
 * Types partagés des primitives de visualisation (components/viz).
 * Centralisés ici (source unique) pour être réutilisés par d'autres tickets
 * sans dépendre d'un composant en particulier.
 */

/* ----------------------------- Waffle ----------------------------- */

export type WaffleProps = {
  /** Texte alternatif accessible (obligatoire). */
  ariaLabel: string;
  /** Nombre de cases remplies. Optionnel si `percent` est fourni. */
  filled?: number;
  /** Proportion remplie en pourcentage (0–100). Ignoré si `filled` est fourni. */
  percent?: number;
  /** Nombre total de cases. Défaut 100. */
  total?: number;
  /** Cases par ligne. Défaut 10. */
  columns?: number;
  title?: string;
  caption?: string;
  color?: string;
  emptyColor?: string;
  maxWidth?: number;
  /** Côté d'une case en px. Défaut 14. */
  cellSize?: number;
  /** Espacement entre deux cases en px. Défaut 2. */
  gap?: number;
  /** Rayon des coins arrondis en px. Défaut 2. */
  radius?: number;
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
  /** Affiche la légende. Défaut true. */
  showLegend?: boolean;
  /** Position de la légende relative au donut. Défaut "right". */
  legendPosition?: "right" | "bottom";
  /** Ratio de la police du label central (× diamètre). Défaut 0.183. */
  labelFontRatio?: number;
  /** Ratio de la police du sous-label central (× diamètre). Défaut 0.075. */
  subFontRatio?: number;
};

/* --------------------------- TrendChart --------------------------- */

export type TrendPoint = {
  label: string | number;
  value: number;
};

/** Marges internes du dessin (zone de tracé = dimensions - marges). */
export type TrendPadding = {
  left: number;
  right: number;
  top: number;
  bottom: number;
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
  /** Largeur du viewBox SVG. Défaut 420. */
  width?: number;
  /** Hauteur du viewBox SVG. Défaut 220. */
  height?: number;
  /** Marges internes ; override partiel possible. Défaut {44,20,24,30}. */
  padding?: Partial<TrendPadding>;
  /** Affiche l'aire sous la courbe. Défaut true. */
  showArea?: boolean;
  /** Affiche les points (cercles). Défaut true. */
  showDots?: boolean;
  /** Affiche la valeur au-dessus de chaque point. Défaut true. */
  showValues?: boolean;
  /** Affiche les lignes de repère horizontales + l'axe Y. Défaut true. */
  showGrid?: boolean;
  /** Formate la valeur affichée au-dessus d'un point. Défaut : telle quelle. */
  formatValue?: (value: number) => string | number;
  /** Formate une graduation de l'axe Y. Défaut : arrondi. */
  formatYTick?: (value: number) => string | number;
  /** Formate un label de l'axe X. Défaut : tel quel. */
  formatLabel?: (label: string | number) => string | number;
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
  /** Hauteur (px) de chaque barre. Défaut 14. */
  barSize?: number;
  /** Rayon (px) des coins. Défaut : barSize / 2 (pilule). */
  barRadius?: number;
  /** Largeur minimale (%) d'une barre non nulle, pour rester visible. Défaut 4. */
  minBarPercent?: number;
  /** Couleur de fond de la piste (zone vide). Défaut var(--gray-4). */
  trackColor?: string;
  /** Affiche `display` à l'intérieur de la barre plutôt qu'au-dessus à droite. */
  valueInside?: boolean;
};
