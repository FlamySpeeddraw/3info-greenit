import {
  Badge,
  Box,
  Container,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EmissionsParPaysClient } from "./EmissionsParPaysClient";
import { countries } from "./data";
import { getDataYearLabel } from "./country-utils";

export const metadata: Metadata = {
  title: "Émissions de CO₂ par pays",
  description:
    "Comparer les émissions de CO₂ et l'intensité carbone de l'électricité entre pays, et simuler l'empreinte selon le lieu d'hébergement.",
  openGraph: {
    title: "Émissions de CO₂ par pays",
    description:
      "Comparer les émissions de CO₂ et l'intensité carbone de l'électricité entre pays.",
    type: "article",
  },
};

export default function EmissionsParPaysPage() {
  const dataYearLabel = getDataYearLabel(countries);

  return (
    <main className="emissions-page">
      <Section asChild size="1">
        <Container asChild size="4">
          <div className="emissions-layout">
            <ScrollReveal>
              <header className="emissions-hero">
                <Text
                  as="p"
                  size="2"
                  weight="bold"
                  color="brown"
                  className="section-eyebrow"
                >
                  Green IT Insights
                </Text>
                <Heading
                  as="h1"
                  size="8"
                  className="hero-title"
                >
                  Mix énergétique et émissions carbone par pays
                </Heading>
                <Text
                  as="p"
                  size="4"
                  color="brown"
                  className="hero-lead"
                >
                  Le pays qui héberge un service numérique influence
                  directement son empreinte carbone. Une même consommation
                  électrique ne génère pas le même volume de CO2 selon le mix
                  utilisé pour produire l&apos;électricité.
                </Text>
                <Text
                  as="p"
                  size="2"
                  color="brown"
                  className="hero-meta"
                >
                  Données locales issues du dataset Energy d&apos;Our World in
                  Data: {countries.length} pays disponibles, dernière année
                  disponible: {dataYearLabel}.
                </Text>
              </header>
            </ScrollReveal>

            <ScrollReveal>
              <section className="content-card indicator-card section-stack">
                <Box className="indicator-copy">
                  <Badge
                    size="2"
                    color="grass"
                    variant="soft"
                    className="section-eyebrow"
                  >
                    Comprendre l&apos;indicateur
                  </Badge>
                  <Heading as="h2" size="7">
                    Qu&apos;est-ce que l&apos;intensité énergétique ?
                  </Heading>
                  <Text
                    as="p"
                    size="3"
                    color="brown"
                    className="indicator-description"
                  >
                    L&apos;intensité énergétique mesure la quantité d&apos;énergie
                    nécessaire pour produire un résultat donné: une page servie,
                    une heure de calcul, un service hébergé ou une unité de
                    richesse produite. Plus elle est faible, plus le service
                    est efficace énergétiquement.
                  </Text>
                </Box>

                <div className="indicator-grid">
                  <Box className="muted-card indicator-item">
                    <Text as="p" weight="bold" color="grass">
                      Son rôle
                    </Text>
                    <Text
                      as="p"
                      size="2"
                      color="brown"
                      className="indicator-item-text"
                    >
                      Elle aide à comparer des usages très différents avec une
                      base commune: combien de kWh sont nécessaires pour rendre
                      le même service numérique.
                    </Text>
                  </Box>

                  <Box className="muted-card indicator-item">
                    <Text as="p" weight="bold" color="grass">
                      Son intérêt
                    </Text>
                    <Text
                      as="p"
                      size="2"
                      color="brown"
                      className="indicator-item-text"
                    >
                      Elle permet d&apos;identifier les leviers d&apos;optimisation:
                      sobriété fonctionnelle, code plus léger, serveurs mieux
                      dimensionnés et limitation des traitements inutiles.
                    </Text>
                  </Box>

                  <Box className="muted-card indicator-item">
                    <Text as="p" weight="bold" color="grass">
                      Exemples
                    </Text>
                    <Text
                      as="p"
                      size="2"
                      color="brown"
                      className="indicator-item-text"
                    >
                      Un site rapide qui transfère peu de données, une API qui
                      évite les calculs redondants ou un serveur mutualisé ont
                      généralement une intensité énergétique plus faible.
                    </Text>
                  </Box>
                </div>

                <Text
                  as="p"
                  size="2"
                  color="brown"
                  className="indicator-note"
                >
                  Dans cette page, cette notion est complétée par l&apos;intensité
                  carbone de l&apos;électricité: une fois la consommation en kWh
                  connue, le pays d&apos;hébergement détermine la quantité de CO2
                  associée à cette énergie.
                </Text>
              </section>
            </ScrollReveal>

            <EmissionsParPaysClient countries={countries} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
