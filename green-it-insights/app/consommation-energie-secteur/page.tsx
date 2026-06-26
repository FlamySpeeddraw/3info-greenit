import { Heading, Text, Badge, Container, Box } from "@radix-ui/themes";
import ConsommationSecteurChart from "../../components/consommation-energie-secteur/ConsommationSecteurChart";
import EvolutionNumeriqueChart from "@/components/consommation-energie-secteur/EvolutionNumeriqueChart";
import EvolutionNumeriqueDetails from "@/components/consommation-energie-secteur/EvolutionNumeriqueDetails";

export default function ConsommationEnergiePage() {
  return (
    <Container size="4">
      <main>

        <Heading size="8" mt="4">
          Consommation globale d'energie par secteur activité
        </Heading>

        <Box mt="8">
          <ConsommationSecteurChart />
        </Box>

        <Box mt="8">
          <EvolutionNumeriqueChart />
        </Box>

        <Box mt="8">
            <EvolutionNumeriqueDetails />
        </Box>

      </main>
    </Container>
  );
}