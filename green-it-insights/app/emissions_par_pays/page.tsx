import {
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EmissionsParPaysClient } from "./EmissionsParPaysClient";
import { countries } from "./data";
import { getDataYearLabel } from "./country-utils";

export default function EmissionsParPaysPage() {
  const dataYearLabel = getDataYearLabel(countries);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--background)] px-5 py-12 text-[var(--foreground)] sm:px-8 lg:px-12 lg:py-16">
        <Section asChild size="1">
          <Container asChild size="4">
            <div className="flex flex-col gap-14 lg:gap-20">
              <ScrollReveal>
                <header className="max-w-3xl">
                  <Text
                    as="p"
                    size="2"
                    weight="bold"
                    color="brown"
                    className="mb-3 uppercase tracking-[0.18em]"
                  >
                    Green IT Insights
                  </Text>
                  <Heading
                    as="h1"
                    size="8"
                    className="leading-tight sm:text-5xl"
                  >
                    Mix energetique et emissions carbone par pays
                  </Heading>
                  <Text
                    as="p"
                    size="4"
                    color="brown"
                    className="mt-5 leading-8"
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
                    className="mt-3 leading-6"
                  >
                    Donnees locales issues du dataset Energy d&apos;Our World in
                    Data: {countries.length} pays disponibles, derniere annee
                    disponible: {dataYearLabel}.
                  </Text>
                </header>
              </ScrollReveal>

              <ScrollReveal>
                <section className="space-y-7 rounded-lg border border-green-dark/15 bg-eco-white p-6 shadow-sm dark:border-brown-accent/20 dark:bg-oled-gray sm:p-8">
                  <Box className="max-w-3xl">
                    <Badge
                      size="2"
                      color="grass"
                      variant="soft"
                      className="mb-4 uppercase tracking-[0.14em]"
                    >
                      Comprendre l&apos;indicateur
                    </Badge>
                    <Heading as="h2" size="7">
                      Qu&apos;est-ce que l&apos;intensite energetique ?
                    </Heading>
                    <Text as="p" size="3" color="brown" className="mt-4 leading-7">
                      L&apos;intensite energetique mesure la quantite d&apos;energie
                      necessaire pour produire un resultat donne: une page servie,
                      une heure de calcul, un service heberge ou une unite de
                      richesse produite. Plus elle est faible, plus le service
                      est efficace energetiquement.
                    </Text>
                  </Box>

                  <Grid columns={{ initial: "1", md: "3" }} gap="5">
                    <Box className="rounded-md border border-brown-dark/10 bg-brown-bg p-5 dark:border-eco-white/10 dark:bg-brown-dark/20">
                      <Text as="p" weight="bold" color="grass">
                        Son role
                      </Text>
                      <Text as="p" size="2" color="brown" className="mt-3 leading-6">
                        Elle aide a comparer des usages tres differents avec une
                        base commune: combien de kWh sont necessaires pour rendre
                        le meme service numerique.
                      </Text>
                    </Box>

                    <Box className="rounded-md border border-brown-dark/10 bg-brown-bg p-5 dark:border-eco-white/10 dark:bg-brown-dark/20">
                      <Text as="p" weight="bold" color="grass">
                        Son interet
                      </Text>
                      <Text as="p" size="2" color="brown" className="mt-3 leading-6">
                        Elle permet d&apos;identifier les leviers d&apos;optimisation:
                        sobriete fonctionnelle, code plus leger, serveurs mieux
                        dimensionnes et limitation des traitements inutiles.
                      </Text>
                    </Box>

                    <Box className="rounded-md border border-brown-dark/10 bg-brown-bg p-5 dark:border-eco-white/10 dark:bg-brown-dark/20">
                      <Text as="p" weight="bold" color="grass">
                        Exemples
                      </Text>
                      <Text as="p" size="2" color="brown" className="mt-3 leading-6">
                        Un site rapide qui transfere peu de donnees, une API qui
                        evite les calculs redondants ou un serveur mutualise ont
                        generalement une intensite energetique plus faible.
                      </Text>
                    </Box>
                  </Grid>

                  <Text as="p" size="2" color="brown" className="leading-6">
                    Dans cette page, cette notion est completee par l&apos;intensite
                    carbone de l&apos;electricite: une fois la consommation en kWh
                    connue, le pays d&apos;hebergement determine la quantite de CO2
                    associee a cette energie.
                  </Text>
                </section>
              </ScrollReveal>

              <EmissionsParPaysClient countries={countries} />

              <ScrollReveal>
                <Card
                  asChild
                  variant="surface"
                  className="border border-brown-dark/20 bg-brown-bg p-5 dark:border-brown-accent/20 dark:bg-oled-gray sm:p-6"
                >
                  <section>
                    <Heading as="h2" size="7">
                      Conclusion
                    </Heading>
                    <Text as="p" color="brown" className="mt-3 leading-7">
                      A consommation identique, le lieu d&apos;hebergement
                      change fortement les emissions de CO2 d&apos;un service
                      numerique. Choisir un pays dont l&apos;electricite est
                      moins carbonee permet donc de reduire directement
                      l&apos;empreinte carbone liee a l&apos;usage des serveurs.
                    </Text>
                  </section>
                </Card>
              </ScrollReveal>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
