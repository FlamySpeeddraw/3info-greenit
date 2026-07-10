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
import styles from "./geological-ghg.module.css";

export function GeologicalGhgSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { activeIndex, progress, isReducedMotion } =
    useGeologicalScrollAnimation({
      panelCount: geologicalPeriods.length,
      sectionRef,
      trackRef,
    });

  useLenisScroll(!isReducedMotion);

  const activePeriod = geologicalPeriods[activeIndex] ?? geologicalPeriods[0];
  const isFinalScrollStep =
    activeIndex === geologicalPeriods.length - 1 && progress >= 0.985;

  return (
    <section
      className={styles.section}
      data-reduced-motion={isReducedMotion}
      ref={sectionRef}
    >
      <div className={styles.pinShell}>
        <header className={styles.sectionHeader}>
          <Text as="p" className={styles.sectionEyebrow} size="2" weight="bold">
            Climat et temps long
          </Text>
          <Heading as="h2" className={styles.sectionTitle} size="7">
            Évolution des gaz à effet de serre depuis les temps géologiques
          </Heading>
          <GeologicalTimeline
            activeIndex={activeIndex}
            periods={geologicalPeriods}
            progress={progress}
          />
        </header>

        <div className={styles.slideViewport}>
          <div className={styles.slideTrack} ref={trackRef}>
            {geologicalPeriods.map((period, index) => (
              <GeologicalPeriodSlide
                isActive={isReducedMotion || index === activeIndex}
                key={period.id}
                period={period}
              />
            ))}
          </div>
        </div>

        <Co2EvolutionChart
          activePeriodId={activePeriod.id}
          data={co2EvolutionPoints}
          dangerExplanation={co2DangerExplanation}
          healthThresholds={co2HealthThresholds}
          note={co2DataNote}
          progress={progress}
        />

        <GeologicalFinalCta isVisible={isFinalScrollStep || isReducedMotion} />
      </div>
    </section>
  );
}
