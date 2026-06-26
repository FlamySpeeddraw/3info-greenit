"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Composant d'apparition au défilement (charte §6).
 *
 * Anime uniquement `opacity` et `transform` (`y`) pour éviter tout reflow.
 *
 * Dégradation gracieuse (éco-conception / A11y) :
 *  - Le contenu est visible par défaut (opacité 1). GSAP ne le masque que
 *    lorsque le JS s'exécute → si le JS échoue ou est désactivé, le texte
 *    reste lisible.
 *  - `prefers-reduced-motion` : l'animation est désactivée, le contenu
 *    s'affiche immédiatement.
 *  - L'animation se joue une seule fois et ne re-masque pas le contenu au
 *    défilement vers le haut.
 */
export function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
