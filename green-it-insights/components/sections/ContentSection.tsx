import { Heading, Section } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

/**
 * Section de contenu générique : titre optionnel + contenu libre (children),
 * enveloppée dans l'animation d'apparition au scroll. Le contenu est fourni
 * par l'appelant (la page) — ce composant ne porte aucun texte en dur.
 */

export type ContentSectionProps = {
  heading?: string;
  children: ReactNode;
  /** Anime l'apparition au défilement. Défaut true. */
  reveal?: boolean;
  /** Niveau sémantique du titre. Défaut "h2". */
  headingAs?: "h2" | "h3";
};

export function ContentSection({
  heading,
  children,
  reveal = true,
  headingAs = "h2",
}: ContentSectionProps) {
  const body = (
    <Section size="2" pt="0">
      {heading && (
        <Heading as={headingAs} size="6" mb="3">
          {heading}
        </Heading>
      )}
      {children}
    </Section>
  );

  return reveal ? <ScrollReveal>{body}</ScrollReveal> : body;
}
