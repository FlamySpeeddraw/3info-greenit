import { Box, Text } from "@radix-ui/themes";

/**
 * Courbe (aire + ligne) générique. Réutilisable : passez une liste de points
 * {label, value}, ils sont répartis régulièrement sur l'axe X.
 */

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

const W = 420;
const H = 220;
const PAD = { left: 44, right: 20, top: 24, bottom: 30 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

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
}: TrendChartProps) {
  const max =
    yMax ?? (Math.max(...points.map((p) => p.value)) * 1.1 || 1);
  const ticks = yTicks ?? [0, max / 2, max];

  const x = (i: number) =>
    points.length <= 1
      ? PAD.left + PLOT_W / 2
      : PAD.left + (i / (points.length - 1)) * PLOT_W;
  const y = (v: number) => PAD.top + (1 - v / max) * PLOT_H;
  const baseline = PAD.top + PLOT_H;

  const linePts = points.map((p, i) => `${x(i)},${y(p.value)}`).join(" ");
  const areaPath = `M${x(0)},${baseline} L${points
    .map((p, i) => `${x(i)},${y(p.value)}`)
    .join(" L")} L${x(points.length - 1)},${baseline} Z`;

  return (
    <Box role="img" aria-label={ariaLabel} my="4">
      {title && (
        <Text size="3" weight="bold" as="div" mb="2">
          {title}
        </Text>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="presentation"
        style={{ maxWidth, height: "auto" }}
      >
        {ticks.map((v) => (
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
              {Math.round(v)}
            </text>
          </g>
        ))}

        <path d={areaPath} fill={color} fillOpacity={0.12} />
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
              <circle cx={x(i)} cy={y(p.value)} r={last ? 5 : 4} fill={dot} />
              <text
                x={x(i)}
                y={y(p.value) - 10}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill="var(--foreground)"
              >
                {p.value}
              </text>
              <text
                x={x(i)}
                y={H - 10}
                textAnchor="middle"
                fontSize={11}
                fill="var(--gray-9)"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
      {caption && (
        <Text size="1" color="gray" as="p" mt="1">
          {caption}
        </Text>
      )}
    </Box>
  );
}
