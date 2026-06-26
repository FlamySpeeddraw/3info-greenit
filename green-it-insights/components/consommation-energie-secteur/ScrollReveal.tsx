"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


type ScrollRevealProps = {
  children: React.ReactNode;
};


export function ScrollReveal({ children }: ScrollRevealProps) {

  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {

    if (!ref.current) return;


    const animation = gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions:
            "play reverse play reverse",
        },
      }
    );


    return () => {
      animation.kill();
    };

  }, []);


  return (
    <div ref={ref}>
      {children}
    </div>
  );
}