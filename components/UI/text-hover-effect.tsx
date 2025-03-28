"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [gradientColors, setGradientColors] = useState({
    start: "rgb(255, 0, 0)",
    end: "rgb(0, 0, 255)",
  });
  const [radius, setRadius] = useState(17);
  const [lastCursor, setLastCursor] = useState({ x: 0, y: 0 });
  const [lastTime, setLastTime] = useState(Date.now());
  const [isMoving, setIsMoving] = useState(false);
  const [svgSize, setSvgSize] = useState({ width: 400, height: 100 });

  const calculateRGB = (x: number, y: number, width: number, height: number) => {
    const r = Math.round((x / width) * 128);
    const g = Math.round((1 - y / height) * 255);
    const b = 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Calculate SVG size based on text length
  useEffect(() => {
    const baseFontSize = 48; // Approximately matches text-7xl
    const padding = 40; // Padding on each side
    const width = text.length * baseFontSize * 0.7 + padding; // Approximate character width
    const height = baseFontSize * 1.5; // Height based on font size
    setSvgSize({ width, height });
  }, [text]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastCursor.x, 2) + Math.pow(e.clientY - lastCursor.y, 2)
      );
      const speed = distance / deltaTime;

      setCursor({ x: e.clientX, y: e.clientY });
      setLastCursor({ x: e.clientX, y: e.clientY });
      setLastTime(currentTime);

      const newRadius = Math.min(18, 17 + speed * 80);
      setRadius(newRadius);
      setIsMoving(true);
    };

    const handleMouseStop = () => {
      setIsMoving(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseStop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseStop);
    };
  }, [lastCursor, lastTime]);

  useEffect(() => {
    let animationFrameId: number;

    const easeOutRadius = () => {
      if (!isMoving) {
        setRadius((prevRadius) => Math.max(17, prevRadius - 0.5));
      }
      animationFrameId = requestAnimationFrame(easeOutRadius);
    };

    easeOutRadius();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMoving]);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });

      const startColor = calculateRGB(cursor.x, cursor.y, svgRect.width, svgRect.height);
      const endColor = calculateRGB(cursor.y, cursor.x, svgRect.height, svgRect.width);
      setGradientColors({ start: startColor, end: endColor });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          <stop offset="0%" stopColor={gradientColors.start} />
          <stop offset="100%" stopColor={gradientColors.end} />
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r={`${radius}%`}
          animate={maskPosition}
          transition={{ duration: duration ?? 0.1, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="8.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-200 dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <mask id="textMask">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#revealMask)"
        />
      </mask>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.6"
        mask="url(#textMask)"
        className="font-[helvetica] font-bold fill-transparent text-7xl"
        style={{ opacity: hovered ? 1 : 0.7, filter: "url(#glow)" }}
      >
        {text}
      </text>
    </svg>
  );
};