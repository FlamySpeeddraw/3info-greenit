"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%", // Trigger animation when top of element is 90% down the viewport
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
