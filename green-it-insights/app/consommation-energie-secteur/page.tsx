import { Heading, Container, Box } from "@radix-ui/themes";
import ConsommationSecteurChart from "../../components/consommation-energie-secteur/ConsommationSecteurChart";
import EvolutionNumeriqueChart from "@/components/consommation-energie-secteur/EvolutionNumeriqueChart";
import EvolutionNumeriqueDetails from "@/components/consommation-energie-secteur/EvolutionNumeriqueDetails";
// import SecteurExplications from "@/components/consommation-energie-secteur/SecteurExplications";
import { ScrollReveal } from "@/components/consommation-energie-secteur/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consommation d'énergie par secteur d'activité",
  description:
    "Comment se répartit la consommation d'énergie entre les grands secteurs d'activité, et quelle place y occupe le numérique ? Données et visualisations.",
  openGraph: {
    title: "Consommation d'énergie par secteur d'activité",
    description:
      "La répartition de la consommation d'énergie par secteur et la place du numérique.",
    type: "article",
  },
};

export default function ConsommationEnergiePage() {
  return (
    <Container size="4">
      <main>

        <Heading size="8" mt="4">
          Consommation globale d&apos;énergie par secteur d&apos;activité
        </Heading>

        <Box mt="8">

          <Box mb="8">
            <ScrollReveal>
              <ConsommationSecteurChart />
            </ScrollReveal>
          </Box>

          {/* <ScrollReveal>
            <SecteurExplications />
          </ScrollReveal> */}

          <ScrollReveal>
            <EvolutionNumeriqueChart />
          </ScrollReveal>

          <ScrollReveal>
            <EvolutionNumeriqueDetails />
          </ScrollReveal>

        </Box>

      </main>
    </Container>
  );
}