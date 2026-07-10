import { Badge, Heading, Section, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

/**
 * En-tête de page générique : pastille optionnelle, titre et accroche fournis
 * par l'appelant.
 */

export type HeroProps = {
  badge?: string;
  title: ReactNode;
  lead: ReactNode;
};

export function Hero({ badge, title, lead }: HeroProps) {
  return (
    <Section size="2">
      {badge && (
        <Badge color="grass" variant="soft" radius="full" mb="3">
          {badge}
        </Badge>
      )}
      <Heading as="h1" size="8" mb="3">
        {title}
      </Heading>
      <Text as="p" size="4" color="gray">
        {lead}
      </Text>
    </Section>
  );
}
