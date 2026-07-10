"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type UseGeologicalScrollAnimationParams = {
  panelCount: number;
  /* Liste verticale des étapes (une par période) qui pilote la progression. */
  stepsRef: RefObject<HTMLElement | null>;
};

type GeologicalScrollState = {
  activeIndex: number;
  progress: number;
  isReducedMotion: boolean;
};

const INITIAL_STATE: GeologicalScrollState = {
  activeIndex: 0,
  progress: 0,
  isReducedMotion: false,
};

export function useGeologicalScrollAnimation({
  panelCount,
  stepsRef,
}: UseGeologicalScrollAnimationParams) {
  const [scrollState, setScrollState] = useState(INITIAL_STATE);
  const lastStateRef = useRef(INITIAL_STATE);

  useEffect(() => {
    const steps = stepsRef.current;

    if (!steps || panelCount < 1) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      const reducedState = {
        activeIndex: 0,
        progress: 1,
        isReducedMotion: true,
      };
      lastStateRef.current = reducedState;
      const frame = window.requestAnimationFrame(() => {
        setScrollState(reducedState);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: steps,
      start: "top 60%",
      end: "bottom 55%",
      invalidateOnRefresh: true,
      /* Stoppe le défilement sur chaque période pour laisser le temps de lire. */
      snap:
        panelCount > 1
          ? {
              snapTo: 1 / (panelCount - 1),
              duration: { min: 0.2, max: 0.5 },
              delay: 0.1,
              ease: "power2.out",
            }
          : undefined,
      onUpdate: (self) => {
        const progress = Number(self.progress.toFixed(3));
        const activeIndex = Math.min(
          panelCount - 1,
          Math.max(0, Math.round(progress * (panelCount - 1))),
        );
        const previous = lastStateRef.current;

        if (
          previous.activeIndex !== activeIndex ||
          Math.abs(previous.progress - progress) >= 0.004
        ) {
          const nextState = {
            activeIndex,
            progress,
            isReducedMotion: false,
          };
          lastStateRef.current = nextState;
          setScrollState(nextState);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [panelCount, stepsRef]);

  return scrollState;
}
