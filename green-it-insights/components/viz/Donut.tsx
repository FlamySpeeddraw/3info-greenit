import { Box, Flex, Text } from "@radix-ui/themes";

/**
 * Donut générique multi-segments. Réutilisable : passez n'importe quelle liste
 * de segments {label, value, color}. Les pourcentages sont calculés sur la
 * somme des valeurs.
 */

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
}: DonutProps) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  const arcs = segments.map((s, i) => {
    const len = (s.value / total) * c;
    const prev = segments
      .slice(0, i)
      .reduce((sum, x) => sum + x.value, 0);
    return { ...s, len, dashoffset: -(prev / total) * c };
  });

  return (
    <Box role="img" aria-label={ariaLabel} my="4">
      {title && (
        <Text size="3" weight="bold" as="div" mb="3">
          {title}
        </Text>
      )}
      <Flex align="center" gap="5" wrap="wrap">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="presentation"
        >
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {arcs.map((a) => (
              <circle
                key={a.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={a.color}
                strokeWidth={thickness}
                strokeDasharray={`${a.len} ${c - a.len}`}
                strokeDashoffset={a.dashoffset}
              />
            ))}
          </g>
          {centerLabel && (
            <text
              x={size / 2}
              y={size / 2 - 2}
              textAnchor="middle"
              fontSize={22}
              fontWeight={700}
              fill="var(--foreground)"
            >
              {centerLabel}
            </text>
          )}
          {centerSub && (
            <text
              x={size / 2}
              y={size / 2 + 14}
              textAnchor="middle"
              fontSize={9}
              fill="var(--gray-9)"
            >
              {centerSub}
            </text>
          )}
        </svg>
        <Flex direction="column" gap="2">
          {segments.map((s) => (
            <LegendItem key={s.label} color={s.color} label={s.label} />
          ))}
        </Flex>
      </Flex>
      {caption && (
        <Text size="1" color="gray" as="p" mt="2">
          {caption}
        </Text>
      )}
    </Box>
  );
}
