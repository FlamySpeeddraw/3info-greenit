import { Badge, Card, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { KeyFigure } from "./types";

/**
 * Grille de chiffres clés générique : titre optionnel + liste de figures
 * fournie par l'appelant.
 */

export type KeyFiguresProps = {
  heading?: string;
  figures: KeyFigure[];
  columns?: Record<string, string>;
};

export function KeyFigures({
  heading,
  figures,
  columns = { initial: "1", sm: "2" },
}: KeyFiguresProps) {
  return (
    <ScrollReveal>
      <Section size="2" pt="0">
        {heading && (
          <Heading as="h2" size="6" mb="4">
            {heading}
          </Heading>
        )}
        <Grid columns={columns} gap="4">
          {figures.map((fig) => (
            <Card key={fig.value} size="3">
              <Heading as="h3" size="8" color="grass" mb="2">
                {fig.value}
              </Heading>
              <Text as="p" size="2" color="gray" mb="3">
                {fig.label}
              </Text>
              <Badge color="gray" variant="soft">
                Source : {fig.source}
              </Badge>
            </Card>
          ))}
        </Grid>
      </Section>
    </ScrollReveal>
  );
}
