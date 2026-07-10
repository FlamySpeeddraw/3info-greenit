import type { Metadata } from "next";
import { EnergyMap } from "@/components/EnergyMap";
import { Container, Heading, Text } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Mix énergétique & intensité carbone",
  description:
    "L'intensité carbone de l'énergie dans le monde : quels pays produisent l'électricité la plus décarbonée, et ce que cela change pour l'empreinte du numérique.",
  openGraph: {
    title: "Mix énergétique & intensité carbone",
    description:
      "L'intensité carbone de l'électricité dans le monde et son impact sur le numérique.",
    type: "article",
  },
};

export default function MixPage() {
  return (
    <main className="min-h-screen py-12 bg-background">
      <Container>
        <div className="mb-12">
          <Heading
            size={{ initial: "7", sm: "9" }}
            weight="bold"
            className="mb-6 leading-tight text-foreground"
          >
            Intensité carbone de l'énergie mondiale
          </Heading>

          <div className="mb-6">
            <Text
              size="5"
              className="block leading-relaxed text-foreground"
            >
              Toutes les sources d'énergie n'ont pas le même impact sur le climat.
              L'<strong>intensité carbone</strong> mesure les émissions de CO₂ générées
              pour produire chaque kilowattheure d'électricité — du charbon aux énergies renouvelables.
            </Text>
          </div>

          <Text
            size="3"
            className="leading-relaxed text-primary"
          >
            Cliquez sur un pays pour découvrir son mix énergétique et comprendre
            comment ses choix de production façonnent son empreinte carbone.
          </Text>
        </div>

        <EnergyMap />
      </Container>
    </main>
  );
}