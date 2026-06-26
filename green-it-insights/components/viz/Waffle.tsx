import { Box, Text } from "@radix-ui/themes";

/**
 * Waffle générique (grille de cases) pour matérialiser une proportion
 * « X sur total ». Réutilisable : il suffit de passer `filled` / `total`.
 */

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

const STEP = 16;
const CELL = 14;

export function Waffle({
  ariaLabel,
  filled,
  total = 100,
  columns = 10,
  title,
  caption,
  color = "var(--grass-9)",
  emptyColor = "var(--gray-4)",
  maxWidth = 200,
}: WaffleProps) {
  const rows = Math.ceil(total / columns);
  const cells = Array.from({ length: total }, (_, i) => i);
  const vbW = columns * STEP - (STEP - CELL);
  const vbH = rows * STEP - (STEP - CELL);

  return (
    <Box role="img" aria-label={ariaLabel} my="4">
      {title && (
        <Text size="3" weight="bold" as="div" mb="3">
          {title}
        </Text>
      )}
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        width="100%"
        role="presentation"
        style={{ maxWidth, height: "auto" }}
      >
        {cells.map((i) => {
          const col = i % columns;
          const row = Math.floor(i / columns);
          return (
            <rect
              key={i}
              x={col * STEP}
              y={row * STEP}
              width={CELL}
              height={CELL}
              rx={2}
              fill={i < filled ? color : emptyColor}
            />
          );
        })}
      </svg>
      {caption && (
        <Text size="1" color="gray" as="p" mt="2">
          {caption}
        </Text>
      )}
    </Box>
  );
}
