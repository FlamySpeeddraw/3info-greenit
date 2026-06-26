import { Box, Flex, Text } from "@radix-ui/themes";

/**
 * Barres comparatives génériques, regroupées par métrique. Réutilisable :
 * passez une liste de groupes, chacun avec ses barres {label, display, value}.
 */

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

function BarRow({
  bar,
  max,
  defaultColor,
}: {
  bar: CompareBar;
  max: number;
  defaultColor: string;
}) {
  const pct = Math.max(4, (bar.value / max) * 100);
  return (
    <Flex direction="column" gap="1">
      <Flex justify="between" align="baseline">
        <Text size="2">{bar.label}</Text>
        <Text size="2" weight="bold">
          {bar.display}
        </Text>
      </Flex>
      <Box
        style={{
          height: 14,
          borderRadius: 7,
          background: "var(--gray-4)",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 7,
            background: bar.color ?? defaultColor,
          }}
        />
      </Box>
    </Flex>
  );
}

export function CompareBars({
  ariaLabel,
  groups,
  title,
  caption,
  defaultColor = "var(--grass-9)",
}: CompareBarsProps) {
  return (
    <Box
      role="img"
      aria-label={ariaLabel}
      my="4"
      p="4"
      style={{
        border: "1px solid var(--gray-5)",
        borderRadius: "var(--radius-4)",
      }}
    >
      {title && (
        <Text size="3" weight="bold" as="div" mb="4">
          {title}
        </Text>
      )}
      <Flex direction="column" gap="4">
        {groups.map((group, gi) => {
          const max = group.max ?? Math.max(...group.bars.map((b) => b.value));
          return (
            <Box key={group.heading ?? gi}>
              {group.heading && (
                <Text size="2" color="gray" as="div" mb="2">
                  {group.heading}
                </Text>
              )}
              <Flex direction="column" gap="3">
                {group.bars.map((bar) => (
                  <BarRow
                    key={bar.label}
                    bar={bar}
                    max={max}
                    defaultColor={defaultColor}
                  />
                ))}
              </Flex>
            </Box>
          );
        })}
      </Flex>
      {caption && (
        <Text size="1" color="gray" as="p" mt="4">
          {caption}
        </Text>
      )}
    </Box>
  );
}
