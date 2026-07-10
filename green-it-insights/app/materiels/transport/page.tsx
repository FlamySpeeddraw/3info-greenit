import { Container, Box, Heading, Text, Badge } from "@radix-ui/themes";
import { TransportMap } from "@/components/transport/TransportMap";
import { TransportCarbonChart } from "@/components/transport/TransportCarbonChart";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Transport des matériels IT — Green IT Insights",
  description:
    "Localisation des centres de production mondiaux et comparaison du coût carbone par mode de transport des équipements numériques.",
};

export default function TransportPage() {
  return (
    <div className="flex-1 min-h-screen bg-(--background) text-(--foreground) transition-colors duration-500 overflow-x-hidden">
      <Container size="4" className="px-4 py-12 sm:py-20">

        {/* HERO */}
        <ScrollReveal>
          <section className="mb-16 text-center sm:text-left">
            <Badge size="2" color="brown" variant="soft" className="uppercase tracking-wider font-semibold mb-4">
              Matériels & Logistique
            </Badge>
            <Heading size="9" weight="bold" className="tracking-tight leading-none font-sans text-green-dark dark:text-eco-white mb-4">
              Transport des matériels IT
            </Heading>
            <Text size="4" className="block max-w-2xl font-light opacity-90 leading-relaxed text-green-dark dark:text-eco-white">
              De l'usine à votre bureau, chaque équipement numérique parcourt des milliers de kilomètres.
              Découvrez où sont produits nos appareils et quel est le coût carbone de leur acheminement.
            </Text>
          </section>
        </ScrollReveal>

        {/* CARTE */}
        <ScrollReveal>
          <section className="mb-16">
            <Box className="mb-6">
              <Heading size="6" className="font-sans text-green-dark dark:text-eco-white mb-2">
                Centres de production mondiaux
              </Heading>
              <Text size="2" color="gray">
                Les principaux pays producteurs de matériels IT et leur spécialisation.
              </Text>
            </Box>
            <TransportMap />
          </section>
        </ScrollReveal>

        {/* GRAPHIQUE */}
        <ScrollReveal>
          <section className="mb-16">
            <Box className="mb-6">
              <Heading size="6" className="font-sans text-green-dark dark:text-eco-white mb-2">
                Coût carbone par mode de transport
              </Heading>
              <Text size="2" color="gray">
                Émissions en kgCO₂e par tonne-km selon le mode d'acheminement. Source : ADEME, Our World in Data.
              </Text>
            </Box>
            <TransportCarbonChart />
          </section>
        </ScrollReveal>

        {/* FOOTER SOURCE */}
        <Box className="pt-8 border-t border-brown-dark/10 dark:border-eco-white/5">
          <Text size="1" color="gray">
            Sources : ADEME Base Carbone, Our World in Data — Données transport de fret 2023. By Ouzammad Mohamed
          </Text>
        </Box>

      </Container>
    </div>
  );
}