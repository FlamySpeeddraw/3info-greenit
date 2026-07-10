import { Heading, Text, Badge, Container, Box } from "@radix-ui/themes";
import ConsommationSecteurChart from "../../components/consommation-energie-secteur/ConsommationSecteurChart";
import EvolutionNumeriqueChart from "@/components/consommation-energie-secteur/EvolutionNumeriqueChart";
import EvolutionNumeriqueDetails from "@/components/consommation-energie-secteur/EvolutionNumeriqueDetails";
import SecteurExplications from "@/components/consommation-energie-secteur/SecteurExplications";
import { ScrollReveal } from "@/components/consommation-energie-secteur/ScrollReveal";
export default function ConsommationEnergiePage() {
  return (
    <Container size="4">
      <main>

        <Heading size="8" mt="4">
          Consommation globale d'energie par secteur activité
        </Heading>

        <Box mt="8">

          <ScrollReveal>
            <ConsommationSecteurChart />
          </ScrollReveal>

          <ScrollReveal>
            <SecteurExplications />
          </ScrollReveal>

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