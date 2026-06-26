import { Box, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

/**
 * Cadre partagé des visualisations : conteneur accessible (role="img" +
 * aria-label), titre et légende optionnels avec des marges uniformes.
 * Centralise le chrome dupliqué auparavant dans chaque composant viz.
 */

export type VizFigureProps = {
  ariaLabel: string;
  title?: string;
  caption?: string;
  children: ReactNode;
  /** Encadre la figure (utilisé par les barres comparatives). */
  bordered?: boolean;
};

export function VizFigure({
  ariaLabel,
  title,
  caption,
  children,
  bordered = false,
}: VizFigureProps) {
  return (
    <Box
      role="img"
      aria-label={ariaLabel}
      my="4"
      p={bordered ? "4" : undefined}
      style={
        bordered
          ? {
              border: "1px solid var(--gray-5)",
              borderRadius: "var(--radius-4)",
            }
          : undefined
      }
    >
      {title && (
        <Text size="3" weight="bold" as="div" mb="3">
          {title}
        </Text>
      )}
      {children}
      {caption && (
        <Text size="1" color="gray" as="p" mt="3">
          {caption}
        </Text>
      )}
    </Box>
  );
}
