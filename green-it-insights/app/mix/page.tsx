"use client";

import { EnergyMap } from "@/components/EnergyMap";
import { Header } from "@/components/Header";
import { Container, Heading, Text } from "@radix-ui/themes";
// Remplace par le bon chemin vers le fichier que tu viens de me montrer
import { useTheme } from "@/app/theme-provider"; 

export default function MixPage() {
  const { useDarkMode } = useTheme();

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

        <EnergyMap theme={useDarkMode ? "dark" : "light"} />
      </Container>
    </main>
  );
}