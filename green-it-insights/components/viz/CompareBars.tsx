import { Box, Flex, Text } from "@radix-ui/themes";
import type { CompareBar, CompareBarsProps } from "./types";
import { VizFigure } from "./VizFigure";

/**
 * Barres comparatives génériques, regroupées par métrique. Réutilisable :
 * passez une liste de groupes, chacun avec ses barres {label, display, value}.
 *
 * Les dimensions et seuils visuels sont paramétrables via des props
 * optionnelles (toutes avec un défaut), pour réutiliser le composant dans
 * d'autres contextes sans en réécrire la logique.
 */

/** Valeurs par défaut, exposées pour rester cohérentes entre props. */
const DEFAULT_BAR_SIZE = 14;
const DEFAULT_MIN_BAR_PERCENT = 4;
const DEFAULT_TRACK_COLOR = "var(--gray-4)";

type Props = CompareBarsProps & {
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

function BarRow({
  bar,
  max,
  defaultColor,
  barSize,
  barRadius,
  minBarPercent,
  trackColor,
  valueInside,
}: {
  bar: CompareBar;
  max: number;
  defaultColor: string;
  barSize: number;
  barRadius: number;
  minBarPercent: number;
  trackColor: string;
  valueInside: boolean;
}) {
  // Plancher de largeur : une barre reste visible même pour une petite valeur.
  // `minBarPercent` rend ce seuil configurable (défaut 4, comportement d'avant).
  // `max` est garanti >= 1 par le garde-fou côté appelant (groupe vide → 1).
  const pct = Math.max(minBarPercent, (bar.value / max) * 100);
  return (
    <Flex direction="column" gap="1">
      <Flex justify="between" align="baseline">
        <Text size="2">{bar.label}</Text>
        {!valueInside && (
          <Text size="2" weight="bold">
            {bar.display}
          </Text>
        )}
      </Flex>
      <Box
        style={{
          height: barSize,
          borderRadius: barRadius,
          background: trackColor,
          overflow: "hidden",
        }}
      >
        <Flex
          align="center"
          justify="end"
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: barRadius,
            background: bar.color ?? defaultColor,
            paddingInline: valueInside ? "var(--space-2)" : undefined,
            boxSizing: "border-box",
          }}
        >
          {valueInside && (
            <Text size="1" weight="bold" style={{ color: "var(--gray-1)" }}>
              {bar.display}
            </Text>
          )}
        </Flex>
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
  barSize = DEFAULT_BAR_SIZE,
  barRadius,
  minBarPercent = DEFAULT_MIN_BAR_PERCENT,
  trackColor = DEFAULT_TRACK_COLOR,
  valueInside = false,
}: Props) {
  // Rayon par défaut : moitié de la hauteur (forme pilule), comme avant (7).
  const resolvedRadius = barRadius ?? barSize / 2;
  return (
    <VizFigure ariaLabel={ariaLabel} title={title} caption={caption} bordered>
      <Flex direction="column" gap="4">
        {groups.map((group, gi) => {
          // Référence pour 100 % : `max` fourni, sinon le plus grand du groupe
          // (garde-fou : groupe vide → 1, évite Math.max(...[]) = -Infinity).
          const max =
            group.max ??
            (group.bars.length
              ? Math.max(...group.bars.map((b) => b.value))
              : 1);
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
                    barSize={barSize}
                    barRadius={resolvedRadius}
                    minBarPercent={minBarPercent}
                    trackColor={trackColor}
                    valueInside={valueInside}
                  />
                ))}
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </VizFigure>
  );
}
