import type { WaffleProps } from "./types";
import { VizFigure } from "./VizFigure";

/**
 * Waffle générique (grille de cases) pour matérialiser une proportion
 * « X sur total ». Réutilisable : il suffit de passer `filled` / `total`,
 * ou bien un `percent` (0–100) pour déduire automatiquement les cases pleines.
 *
 * La géométrie (taille des cases, espacement, arrondi) est entièrement
 * configurable via des props optionnelles, avec des valeurs par défaut
 * rétro-compatibles avec l'usage historique.
 */

export function Waffle({
  ariaLabel,
  filled,
  percent,
  total = 100,
  columns = 10,
  title,
  caption,
  color = "var(--grass-9)",
  emptyColor = "var(--gray-4)",
  maxWidth = 200,
  cellSize = 14,
  gap = 2,
  radius = 2,
}: WaffleProps) {
  // Nombre de cases pleines : priorité à `filled`, sinon déduit de `percent`.
  const filledCount =
    filled ?? (percent != null ? Math.round((percent / 100) * total) : 0);
  // Garde-fous : on borne la valeur dans l'intervalle [0, total].
  const safeFilled = Math.max(0, Math.min(filledCount, total));

  const step = cellSize + gap;
  const rows = Math.ceil(total / columns);
  const cells = Array.from({ length: total }, (_, i) => i);
  const vbW = columns * step - gap;
  const vbH = rows * step - gap;

  return (
    <VizFigure ariaLabel={ariaLabel} title={title} caption={caption}>
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
              x={col * step}
              y={row * step}
              width={cellSize}
              height={cellSize}
              rx={radius}
              fill={i < safeFilled ? color : emptyColor}
            />
          );
        })}
      </svg>
    </VizFigure>
  );
}
