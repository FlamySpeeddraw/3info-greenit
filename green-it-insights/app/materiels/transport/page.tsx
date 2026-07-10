import { Container, Box, Heading, Text, Badge, Grid, Card } from "@radix-ui/themes";
import { TransportMap } from "@/components/transport/TransportMap";
import { TransportCarbonChart } from "@/components/transport/TransportCarbonChart";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Transport des matériels IT",
  description:
    "Localisation des centres de production mondiaux et comparaison du coût carbone par mode de transport des équipements numériques.",
};

const METRICS = [
  {
    value: "80%",
    label: "des composants IT fabriqués en Asie de l'Est",
    detail: "Taïwan, Corée du Sud et Chine concentrent la quasi-totalité de la production mondiale de semi-conducteurs et d'écrans.",
  },
  {
    value: "x80",
    label: "le fret aérien émet plus que le maritime",
    detail: "Transporter 1 tonne de matériel IT par avion émet 0,602 kgCO₂e/km contre seulement 0,01 par cargo maritime.",
  },
  {
    value: "15 000 km",
    label: "parcourus en moyenne avant d'arriver chez vous",
    detail: "Un smartphone produit en Asie du Sud-Est traverse plusieurs continents avant d'atterrir dans votre poche.",
  },
];

const ACTIONS = [
  {
    icon: "♻️",
    title: "Acheter reconditionné",
    text: "Un appareil reconditionné évite l'intégralité du coût carbone de fabrication et de transport d'un produit neuf.",
  },
  {
    icon: "🏭",
    title: "Privilégier les produits locaux",
    text: "Certains fabricants européens proposent des équipements assemblés localement, réduisant considérablement l'empreinte logistique.",
  },
  {
    icon: "🚢",
    title: "Éviter la livraison express",
    text: "La livraison express recourt massivement au fret aérien. Privilégier la livraison standard permet de choisir le transport maritime.",
  },
];

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

        {/* METRICS */}
        <ScrollReveal>
          <section className="mb-16">
            <Grid columns={{ initial: "1", sm: "3" }} gap="6">
              {METRICS.map((metric) => (
                <Card key={metric.value} variant="surface" className="p-6">
                  <Heading size="8" className="text-green-dark dark:text-eco-white mb-2">
                    {metric.value}
                  </Heading>
                  <Text size="2" weight="bold" className="block mb-2 text-green-dark dark:text-eco-white">
                    {metric.label}
                  </Text>
                  <Text size="1" color="gray">
                    {metric.detail}
                  </Text>
                </Card>
              ))}
            </Grid>
          </section>
        </ScrollReveal>

        {/* SECTION EXPLICATIVE */}
        <ScrollReveal>
          <section className="mb-16">
            <Box className="p-8 rounded-2xl border border-brown-dark/10 dark:border-eco-white/5 bg-eco-gray dark:bg-oled-gray">
              <Badge size="2" color="grass" variant="soft" className="uppercase tracking-wider font-semibold mb-4">
                Pourquoi ça compte ?
              </Badge>
              <Heading size="6" className="font-sans text-green-dark dark:text-eco-white mb-4">
                Le transport, une part invisible du bilan carbone
              </Heading>
              <Text size="3" className="block leading-relaxed text-green-dark dark:text-eco-white mb-4">
                Quand on parle de l'empreinte carbone d'un appareil numérique, on pense souvent à sa consommation électrique. 
                Pourtant, <strong>78% des émissions ont lieu avant même que l'appareil soit allumé</strong> — durant sa fabrication et son transport.
              </Text>
              <Text size="3" className="block leading-relaxed text-green-dark dark:text-eco-white">
                La concentration de la production en Asie du Sud-Est impose des chaînes logistiques mondiales. 
                Le choix du mode de transport — imposé par les délais commerciaux — peut multiplier par 80 l'empreinte carbone 
                d'un même trajet. Un enjeu majeur que les consommateurs et les entreprises peuvent influencer.
              </Text>
            </Box>
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
                Les principaux pays producteurs de matériels IT et leur spécialisation. Survolez un marqueur pour le détail.
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

        {/* ACTIONS */}
        <ScrollReveal>
          <section className="mb-16">
            <Box className="mb-6">
              <Badge size="2" color="brown" variant="soft" className="uppercase tracking-wider font-semibold mb-4">
                Agir concrètement
              </Badge>
              <Heading size="6" className="font-sans text-green-dark dark:text-eco-white mb-2">
                Réduire son impact logistique
              </Heading>
              <Text size="2" color="gray">
                Quelques gestes simples pour limiter l'empreinte carbone liée au transport des équipements IT.
              </Text>
            </Box>
            <Grid columns={{ initial: "1", sm: "3" }} gap="6">
              {ACTIONS.map((action) => (
                <Card key={action.title} variant="surface" className="p-6">
                  <Text size="6" className="block mb-3">{action.icon}</Text>
                  <Heading size="3" className="text-green-dark dark:text-eco-white mb-2">
                    {action.title}
                  </Heading>
                  <Text size="2" color="gray" className="leading-relaxed">
                    {action.text}
                  </Text>
                </Card>
              ))}
            </Grid>
          </section>
        </ScrollReveal>

        {/* FOOTER SOURCE */}
        <Box className="pt-8 border-t border-brown-dark/10 dark:border-eco-white/5">
          <Text size="1" color="gray">
            Sources : ADEME Base Carbone, Our World in Data — Données transport de fret 2023.
          </Text>
        </Box>

      </Container>
    </div>
  );
}