"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Controls smoothness (lower values = smoother)
      smoothWheel: true, // Enables smooth scrolling for mouse wheel
      wheelMultiplier: 1, // Adjust wheel scroll speed
      touchMultiplier: 2, // Adjust touch scroll speed
      infinite: false, // Disable infinite scrolling
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollGlobal = (delta: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(lenisRef.current.scroll + delta, {
        immediate: false,
        duration: 0.1,
      });
    }
  };

  const applyToDiv = (element: HTMLElement | null) => {
    if (lenisRef.current && element) {
      lenisRef.current.stop();

      const divLenis = new Lenis({
        wrapper: element,
       
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function rafDiv(time: number) {
        divLenis.raf(time);
        requestAnimationFrame(rafDiv);
      }

      requestAnimationFrame(rafDiv);

      return () => {
        divLenis.destroy();
        lenisRef.current?.start();
      };
    }
  };

  return { applyToDiv, scrollGlobal, lenis: lenisRef.current };
};