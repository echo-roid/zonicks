"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MousePosition {
  x: number | null;
  y: number | null;
}

interface MaskContainerProps {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 500,
  className,
}: MaskContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null });
  const containerRef = useRef<HTMLDivElement>(null);

  const updateMousePosition = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => updateMousePosition(e);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={cn("h-screen relative", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center text-6xl absolute bg-black bg-grid-white/[0.2] text-white [mask-image:url(/mask.svg)] [mask-size:40px] [mask-repeat:no-repeat]"
        animate={{
          maskPosition: `${mousePosition.x !== null ? mousePosition.x - maskSize / 2 : 0}px ${
            mousePosition.y !== null ? mousePosition.y - maskSize / 2 : 0
          }px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{ duration: 0 }}
      >
        <div className="absolute inset-0 bg-black h-full w-full z-0 opacity-50" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="max-w-4xl mx-auto text-center text-white text-4xl font-bold relative z-20"
        >
          {children}
        </div>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center text-white">
        {revealText}
      </div>
    </motion.div>
  );
};