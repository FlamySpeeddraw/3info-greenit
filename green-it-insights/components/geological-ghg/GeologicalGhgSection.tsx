"use client";

import { useRef } from "react";
import { Heading, Text } from "@radix-ui/themes";
import {
  co2DataNote,
  co2DangerExplanation,
  co2EvolutionPoints,
  co2HealthThresholds,
  geologicalPeriods,
} from "@/data/geological-ghg-periods";
import { useGeologicalScrollAnimation } from "@/hooks/useGeologicalScrollAnimation";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { Co2EvolutionChart } from "./Co2EvolutionChart";
import { GeologicalFinalCta } from "./GeologicalFinalCta";
import { GeologicalPeriodSlide } from "./GeologicalPeriodSlide";
import { GeologicalTimeline } from "./GeologicalTimeline";

export function GeologicalGhgSection() {
  const stepsRef = useRef<HTMLOListElement | null>(null);
  const { activeIndex, progress, isReducedMotion } =
    useGeologicalScrollAnimation({
      panelCount: geologicalPeriods.length,
      stepsRef,
    });

  useLenisScroll(!isReducedMotion);

  const activePeriod = geologicalPeriods[activeIndex] ?? geologicalPeriods[0];

  return (
    <section className="bg-linear-to-b from-eco-white to-green-bg dark:from-oled-black dark:to-oled-gray">
      <div className="mx-auto max-w-[1400px] px-3 py-6 md:px-6 md:py-10 lg:px-9 xl:px-12">
        <header className="mb-4 grid gap-1.5 md:mb-8 md:gap-2">
          <Text
            as="p"
            className="uppercase"
            color="brown"
            size={{ initial: "1", md: "2" }}
            weight="bold"
          >
            Climat et temps long
          </Text>
          <Heading
            as="h2"
            className="max-w-[980px]"
            size={{ initial: "6", sm: "7", md: "8" }}
          >
            Évolution des gaz à effet de serre depuis les temps géologiques
          </Heading>
        </header>

        <div className="grid items-start gap-3 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-6 lg:gap-8">
          {/* Panneau sticky : la courbe reste visible pendant toute la lecture */}
          <div className="sticky top-0 z-10 -mx-3 grid gap-2 border-b border-brown-dark/10 bg-eco-white/95 px-3 py-2 backdrop-blur md:top-4 md:z-auto md:mx-0 md:gap-3 md:border-b-0 md:bg-transparent md:p-0 md:backdrop-blur-none dark:border-eco-white/10 dark:bg-oled-black/95 md:dark:bg-transparent">
            <GeologicalTimeline
              activeIndex={activeIndex}
              periods={geologicalPeriods}
              progress={progress}
            />
            <Co2EvolutionChart
              activePeriodId={activePeriod.id}
              data={co2EvolutionPoints}
              dangerExplanation={co2DangerExplanation}
              healthThresholds={co2HealthThresholds}
              note={co2DataNote}
              progress={progress}
            />
          </div>

          {/* Étapes : une carte par période, lecture au rythme de l'utilisateur */}
          <div>
            <ol className="m-0 grid list-none gap-3 p-0 md:gap-5" ref={stepsRef}>
              {geologicalPeriods.map((period, index) => (
                <GeologicalPeriodSlide
                  isActive={isReducedMotion || index === activeIndex}
                  key={period.id}
                  period={period}
                />
              ))}
            </ol>

            <GeologicalFinalCta />
          </div>
        </div>
      </div>
    </section>
  );
}
