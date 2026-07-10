"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type UseGeologicalScrollAnimationParams = {
  panelCount: number;
  sectionRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
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
  sectionRef,
  trackRef,
}: UseGeologicalScrollAnimationParams) {
  const [scrollState, setScrollState] = useState(INITIAL_STATE);
  const lastStateRef = useRef(INITIAL_STATE);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track || panelCount < 1) {
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

    const context = gsap.context(() => {
      gsap.set(track, { xPercent: 0 });

      gsap.to(track, {
        xPercent: -100 * (panelCount - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * panelCount, 3600)}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = Number(self.progress.toFixed(3));
            const activeIndex =
              progress >= 1
                ? panelCount - 1
                : Math.min(panelCount - 1, Math.floor(progress * panelCount));
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
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, [panelCount, sectionRef, trackRef]);

  return scrollState;
}
