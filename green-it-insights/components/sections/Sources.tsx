import { Flex, Heading, Link, Section, Separator, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";
import type { Source } from "./types";

/**
 * Liste de sources générique : titre, liens et note de bas fournis par
 * l'appelant.
 */

export type SourcesProps = {
  heading?: string;
  sources: Source[];
  note?: ReactNode;
};

export function Sources({ heading = "Sources", sources, note }: SourcesProps) {
  return (
    <Section size="2" pt="0">
      <Separator size="4" mb="5" />
      {heading && (
        <Heading as="h2" size="6" mb="4">
          {heading}
        </Heading>
      )}
      <Flex direction="column" gap="2">
        {sources.map((src) => (
          <Link
            key={src.url}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            size="2"
          >
            {src.label}
          </Link>
        ))}
      </Flex>
      {note && (
        <Text as="p" size="1" color="gray" mt="5">
          {note}
        </Text>
      )}
    </Section>
  );
}
