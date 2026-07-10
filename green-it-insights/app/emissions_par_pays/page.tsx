import {
  Badge,
  Box,
  Container,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EmissionsParPaysClient } from "./EmissionsParPaysClient";
import { countries } from "./data";
import { getDataYearLabel } from "./country-utils";

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
                  Mix energetique et emissions carbone par pays
                </Heading>
                <Text
                  as="p"
                  size="4"
                  color="brown"
                  className="hero-lead"
                >
                  Le pays qui heberge un service numerique influence
                  directement son empreinte carbone. Une meme consommation
                  electrique ne genere pas le meme volume de CO2 selon le mix
                  utilise pour produire l&apos;electricite.
                </Text>
                <Text
                  as="p"
                  size="2"
                  color="brown"
                  className="hero-meta"
                >
                  Donnees locales issues du dataset Energy d&apos;Our World in
                  Data: {countries.length} pays disponibles, derniere annee
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
                    Qu&apos;est-ce que l&apos;intensite energetique ?
                  </Heading>
                  <Text
                    as="p"
                    size="3"
                    color="brown"
                    className="indicator-description"
                  >
                    L&apos;intensite energetique mesure la quantite d&apos;energie
                    necessaire pour produire un resultat donne: une page servie,
                    une heure de calcul, un service heberge ou une unite de
                    richesse produite. Plus elle est faible, plus le service
                    est efficace energetiquement.
                  </Text>
                </Box>

                <div className="indicator-grid">
                  <Box className="muted-card indicator-item">
                    <Text as="p" weight="bold" color="grass">
                      Son role
                    </Text>
                    <Text
                      as="p"
                      size="2"
                      color="brown"
                      className="indicator-item-text"
                    >
                      Elle aide a comparer des usages tres differents avec une
                      base commune: combien de kWh sont necessaires pour rendre
                      le meme service numerique.
                    </Text>
                  </Box>

                  <Box className="muted-card indicator-item">
                    <Text as="p" weight="bold" color="grass">
                      Son interet
                    </Text>
                    <Text
                      as="p"
                      size="2"
                      color="brown"
                      className="indicator-item-text"
                    >
                      Elle permet d&apos;identifier les leviers d&apos;optimisation:
                      sobriete fonctionnelle, code plus leger, serveurs mieux
                      dimensionnes et limitation des traitements inutiles.
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
                      Un site rapide qui transfere peu de donnees, une API qui
                      evite les calculs redondants ou un serveur mutualise ont
                      generalement une intensite energetique plus faible.
                    </Text>
                  </Box>
                </div>

                <Text
                  as="p"
                  size="2"
                  color="brown"
                  className="indicator-note"
                >
                  Dans cette page, cette notion est completee par l&apos;intensite
                  carbone de l&apos;electricite: une fois la consommation en kWh
                  connue, le pays d&apos;hebergement determine la quantite de CO2
                  associee a cette energie.
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
