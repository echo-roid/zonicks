"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(1 - t, 4)),
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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

  // Function to scroll the global Lenis instance manually
  const scrollGlobal = (delta: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(lenisRef.current.scroll + delta, {
        immediate: false,
        duration: 0.1, // Small duration for smooth transition
      });
    }
  };

  const applyToDiv = (element: HTMLElement | null) => {
    if (lenisRef.current && element) {
      // Stop the default Lenis instance from controlling the page
      lenisRef.current.stop();

      const divLenis = new Lenis({
        wrapper: element,
        content: element.querySelector(".scroll-content") || element,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(1 - t, 4)),
        smooth: true,
        direction: "vertical",
        gestureDirection: "vertical",
        smoothTouch: false,
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
        lenisRef.current?.start(); // Resume global Lenis when div-specific instance is destroyed
      };
    }
  };

  return { applyToDiv, scrollGlobal, lenis: lenisRef.current };
};