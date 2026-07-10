import type { Metadata } from "next";
import { GeologicalGhgSection } from "@/components/geological-ghg/GeologicalGhgSection";

export const metadata: Metadata = {
  title: "Évolution des gaz à effet de serre",
  description:
    "L'évolution du CO₂ et des gaz à effet de serre à l'échelle géologique jusqu'à aujourd'hui : un récit visuel pour replacer le numérique dans le temps long.",
  openGraph: {
    title: "Évolution des gaz à effet de serre",
    description:
      "L'évolution du CO₂ et des gaz à effet de serre à l'échelle géologique, en récit visuel.",
    type: "article",
  },
};

export default function GreenhouseGasEvolutionPage() {
  return (
    <main className="min-h-screen bg-eco-white text-green-dark dark:bg-oled-black">
      <GeologicalGhgSection />
    </main>
  );
}
