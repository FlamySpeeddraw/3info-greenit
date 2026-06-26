import type { TrendChartProps } from "./types";
import { VizFigure } from "./VizFigure";

/**
 * Courbe (aire + ligne) générique. Réutilisable : passez une liste de points
 * {label, value}. Quand tous les labels sont numériques (ex. des années), les
 * points sont positionnés à l'échelle de leur valeur — les écarts inégaux sont
 * donc respectés. Sinon, ils sont répartis régulièrement.
 *
 * Génériques optionnels (tous avec défauts, rétro-compatibles) : dimensions du
 * dessin (`width`/`height`/`padding`), bascules d'affichage (`showArea`,
 * `showDots`, `showValues`, `showGrid`) et formatage (`formatValue` pour les
 * valeurs au-dessus des points, `formatYTick` pour l'axe Y, `formatLabel` pour
 * l'axe X).
 */

/** Marges internes du dessin (zone de tracé = dimensions - marges). */
type Padding = { left: number; right: number; top: number; bottom: number };

type Props = TrendChartProps & {
  /** Largeur du viewBox SVG. Défaut 420. */
  width?: number;
  /** Hauteur du viewBox SVG. Défaut 220. */
  height?: number;
  /** Marges internes ; override partiel possible. Défaut {44,20,24,30}. */
  padding?: Partial<Padding>;
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

const DEFAULT_W = 420;
const DEFAULT_H = 220;
const DEFAULT_PAD: Padding = { left: 44, right: 20, top: 24, bottom: 30 };

export function TrendChart({
  ariaLabel,
  points,
  title,
  caption,
  yMax,
  yTicks,
  color = "var(--grass-9)",
  highlightLast = false,
  highlightColor = "var(--tomato-9)",
  maxWidth = 480,
  width = DEFAULT_W,
  height = DEFAULT_H,
  padding,
  showArea = true,
  showDots = true,
  showValues = true,
  showGrid = true,
  formatValue = (v) => v,
  formatYTick = (v) => Math.round(v),
  formatLabel = (l) => l,
}: Props) {
  const W = width;
  const H = height;
  const PAD: Padding = { ...DEFAULT_PAD, ...padding };
  const PLOT_W = W - PAD.left - PAD.right;
  const PLOT_H = H - PAD.top - PAD.bottom;

  const max = yMax ?? (Math.max(...points.map((p) => p.value)) * 1.1 || 1);
  const ticks = yTicks ?? [0, max / 2, max];

  // Axe X : à l'échelle des labels s'ils sont tous numériques, sinon par index.
  const numeric = points.every((p) => typeof p.label === "number");
  const xs = numeric
    ? points.map((p) => p.label as number)
    : points.map((_, i) => i);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const xSpan = xMax - xMin || 1;

  const x = (i: number) =>
    points.length <= 1
      ? PAD.left + PLOT_W / 2
      : PAD.left + ((xs[i] - xMin) / xSpan) * PLOT_W;
  const y = (v: number) => PAD.top + (1 - v / max) * PLOT_H;
  const baseline = PAD.top + PLOT_H;

  const coords = points.map((p, i) => `${x(i)},${y(p.value)}`);
  const linePts = coords.join(" ");
  const areaPath = `M${x(0)},${baseline} L${coords.join(" L")} L${x(
    points.length - 1,
  )},${baseline} Z`;

  return (
    <VizFigure ariaLabel={ariaLabel} title={title} caption={caption}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="presentation"
        style={{ maxWidth, height: "auto" }}
      >
        {showGrid &&
          ticks.map((v) => (
            <g key={v}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(v)}
                y2={y(v)}
                stroke="var(--gray-4)"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 8}
                y={y(v) + 4}
                textAnchor="end"
                fontSize={10}
                fill="var(--gray-9)"
              >
                {formatYTick(v)}
              </text>
            </g>
          ))}

        {showArea && <path d={areaPath} fill={color} fillOpacity={0.12} />}
        <polyline
          points={linePts}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {points.map((p, i) => {
          const last = i === points.length - 1;
          const dot = highlightLast && last ? highlightColor : color;
          return (
            <g key={`${p.label}-${i}`}>
              {showDots && (
                <circle cx={x(i)} cy={y(p.value)} r={last ? 5 : 4} fill={dot} />
              )}
              {showValues && (
                <text
                  x={x(i)}
                  y={y(p.value) - 10}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill="var(--gray-12)"
                >
                  {formatValue(p.value)}
                </text>
              )}
              <text
                x={x(i)}
                y={H - 10}
                textAnchor="middle"
                fontSize={11}
                fill="var(--gray-9)"
              >
                {formatLabel(p.label)}
              </text>
            </g>
          );
        })}
      </svg>
    </VizFigure>
  );
}
