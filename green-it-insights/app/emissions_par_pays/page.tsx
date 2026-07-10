import { Card, Code, Container, Heading, Section, Text } from "@radix-ui/themes";
import { Header } from "@/components/Header";
import { EmissionsParPaysClient } from "./EmissionsParPaysClient";
import { countries } from "./data";
import { getDataYearLabel } from "./country-utils";

export default function EmissionsParPaysPage() {
  const dataYearLabel = getDataYearLabel(countries);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--foreground)] sm:px-8 lg:px-12">
        <Section asChild size="1">
          <Container asChild size="4">
            <div className="flex flex-col gap-10">
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
                <Heading as="h1" size="8" className="leading-tight sm:text-5xl">
                  Mix energetique et emissions carbone par pays
                </Heading>
                <Text as="p" size="4" color="brown" className="mt-5 leading-8">
                  Le pays qui heberge un service numerique influence directement
                  son empreinte carbone. Une meme consommation electrique ne
                  genere pas le meme volume de CO2 selon le mix utilise pour
                  produire l&apos;electricite.
                </Text>
                <Text as="p" size="2" color="brown" className="mt-3 leading-6">
                  Donnees locales issues du dataset Energy d&apos;Our World in
                  Data: {countries.length} pays disponibles, derniere annee
                  disponible: {dataYearLabel}.
                </Text>
              </header>

              <EmissionsParPaysClient countries={countries} />

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
                    A consommation identique, le lieu d&apos;hebergement change
                    fortement les emissions de CO2 d&apos;un service numerique.
                    Choisir un pays dont l&apos;electricite est moins carbonee
                    permet donc de reduire directement l&apos;empreinte carbone
                    liee a l&apos;usage des serveurs.
                  </Text>
                  <Text
                    as="p"
                    size="1"
                    color="brown"
                    className="mt-4 leading-5"
                  >
                    Donnees extraites du fichier local{" "}
                    <Code color="brown">public/data/owid-energy-data.csv</Code>,
                    telecharge depuis Our World in Data. La categorie autres
                    regroupe le petrole et les autres renouvelables du dataset
                    OWID.
                  </Text>
                </section>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
