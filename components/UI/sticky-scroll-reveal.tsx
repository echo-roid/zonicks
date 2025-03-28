"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Lenis from "@studio-freight/lenis";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: ContentItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const backgroundColors = useMemo(() => [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ], []);

  const linearGradients = useMemo(() => [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ], []);

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  // Initialize Lenis for the specific container
  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const lenis = new Lenis({
      wrapper: container,
      content: container,
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const onScroll = () => {
      if (!container || !lenis) return;

      const scrollProgress = lenis.scroll / (container.scrollHeight - container.clientHeight);
      const cardLength = content.length;
      const cardsBreakpoints = content.map((_, index) => index / cardLength);

      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(scrollProgress - breakpoint);
          if (distance < Math.abs(scrollProgress - cardsBreakpoints[acc])) {
            return index;
          }
          return acc;
        },
        0
      );

      setActiveCard(closestBreakpointIndex);
    };

    lenis.on("scroll", onScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [content]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[25rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 w-2xl scrollbar-hide"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={`${item.title}-${index}`} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
};