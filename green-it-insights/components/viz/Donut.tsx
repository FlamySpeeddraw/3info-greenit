import { Box, Flex, Text } from "@radix-ui/themes";
import type { DonutProps } from "./types";
import { VizFigure } from "./VizFigure";

/**
 * Donut générique multi-segments. Réutilisable : passez n'importe quelle liste
 * de segments {label, value, color}. Les pourcentages sont calculés sur la
 * somme des valeurs.
 *
 * Props optionnelles de généricité (toutes avec défauts, rétro-compatibles) :
 * - `showLegend` : affiche ou non la légende (défaut : true).
 * - `legendPosition` : "right" (défaut) ou "bottom".
 * - `labelFontRatio` / `subFontRatio` : ratios des polices du centre relatifs
 *   au diamètre (défauts : 0.183 / 0.075).
 */

type Props = DonutProps & {
  /** Affiche la légende. Défaut : true. */
  showLegend?: boolean;
  /** Position de la légende relative au donut. Défaut : "right". */
  legendPosition?: "right" | "bottom";
  /** Ratio de la police du label central (× diamètre). Défaut : 0.183. */
  labelFontRatio?: number;
  /** Ratio de la police du sous-label central (× diamètre). Défaut : 0.075. */
  subFontRatio?: number;
};

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Flex align="center" gap="2">
      <Box
        style={{
          width: 12,
          height: 12,
          borderRadius: 3,
          background: color,
          flexShrink: 0,
        }}
      />
      <Text size="2">{label}</Text>
    </Flex>
  );
}

export function Donut({
  ariaLabel,
  segments,
  title,
  caption,
  centerLabel,
  centerSub,
  size = 120,
  thickness = 18,
  showLegend = true,
  legendPosition = "right",
  labelFontRatio = 0.183,
  subFontRatio = 0.075,
}: Props) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  // Décalages cumulés en O(n) (sommes de préfixes pré-calculées).
  const starts: number[] = [];
  let running = 0;
  for (const s of segments) {
    starts.push(running);
    running += s.value;
  }

  // Tailles de police relatives au diamètre pour que le label scale avec `size`.
  const labelFont = size * labelFontRatio;
  const subFont = size * subFontRatio;

  // Légende à droite : ligne (donut + légende côte à côte).
  // Légende en bas : colonne (donut au-dessus de la légende).
  const isBottom = legendPosition === "bottom";

  return (
    <VizFigure ariaLabel={ariaLabel} title={title} caption={caption}>
      <Flex
        align={isBottom ? "start" : "center"}
        direction={isBottom ? "column" : "row"}
        gap="5"
        wrap="wrap"
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="presentation"
        >
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {segments.map((s, i) => (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={thickness}
                strokeDasharray={`${(s.value / total) * c} ${
                  c - (s.value / total) * c
                }`}
                strokeDashoffset={-(starts[i] / total) * c}
              />
            ))}
          </g>
          {centerLabel && (
            <text
              x={size / 2}
              y={size / 2 - size * 0.015}
              textAnchor="middle"
              fontSize={labelFont}
              fontWeight={700}
              fill="var(--gray-12)"
            >
              {centerLabel}
            </text>
          )}
          {centerSub && (
            <text
              x={size / 2}
              y={size / 2 + size * 0.115}
              textAnchor="middle"
              fontSize={subFont}
              fill="var(--gray-9)"
            >
              {centerSub}
            </text>
          )}
        </svg>
        {showLegend && (
          <Flex
            direction={isBottom ? "row" : "column"}
            gap={isBottom ? "4" : "2"}
            wrap="wrap"
          >
            {segments.map((s, i) => (
              <LegendItem key={i} color={s.color} label={s.label} />
            ))}
          </Flex>
        )}
      </Flex>
    </VizFigure>
  );
}
