"use client"

import { motion, useSpring } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  size = 400,
  rotate = 0,
  gradient = "from-[#1E1B4B] to-[#4A00E0]",
  mousePosition,
}: {
  className?: string
  delay?: number
  size?: number
  rotate?: number
  gradient?: string
  mousePosition: { x: number; y: number }
}) {
  const shapeRef = useRef<HTMLDivElement>(null)
  const springConfig = { stiffness: 150, damping: 25 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    if (!shapeRef.current) return

    const rect = shapeRef.current.getBoundingClientRect()
    const elementCenterX = rect.left + size / 2
    const elementCenterY = rect.top + size / 2

    const dx = mousePosition.x - elementCenterX
    const dy = mousePosition.y - elementCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = size * 1.2

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 25
      const angle = Math.atan2(dy, dx)
      const repelX = -Math.cos(angle) * force
      const repelY = -Math.sin(angle) * force

      const maxMove = size * 0.2
      x.set(Math.max(-maxMove, Math.min(maxMove, repelX)))
      y.set(Math.max(-maxMove, Math.min(maxMove, repelY)))
    } else {
      x.set(0)
      y.set(0)
    }
  }, [mousePosition, size, x, y])

  return (
    <motion.div
      ref={shapeRef}
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute will-change-transform", className)}
      style={{ 
        width: size,
        height: size,
      }}
    >
      <motion.div
        style={{
          x,
          y,
        }}
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[8px] border-2 border-[#4A00E0]/[0.2]",
            "shadow-[0_15px_50px_0_rgba(74,0,224,0.3)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(74,0,224,0.3),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroGeometric({
  title1 = "",
  title2 = "",
}: {
  title1?: string
  title2?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const [windowWidth, setWindowWidth] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          size={windowWidth * 0.28}
          rotate={0}
          gradient="from-[#1E1B4B] to-[#4A00E0]"
          className="left-[-7%] top-[5vh]"
          mousePosition={mousePosition}
        />

        <ElegantShape
          delay={0.5}
          size={windowWidth * 0.23}
          rotate={0}
          gradient="from-[#1E1B4B] to-[#4A00E0]"
          className="right-[-2%] top-[1vh]"
          mousePosition={mousePosition}
        />

        <ElegantShape
          delay={0.4}
          size={windowWidth * 0.15}
          rotate={0}
          gradient="from-[#1E1B4B] to-[#4A00E0]"
          className="left-[5%] top-[52vh]"
          mousePosition={mousePosition}
        />

        <ElegantShape
          delay={0.6}
          size={windowWidth * 0.1}
          rotate={0}
          gradient="from-[#1E1B4B] to-[#4A00E0]"
          className="right-[15%] top-[50vh]"
          mousePosition={mousePosition}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{title1}</span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#1E1B4B] via-white/90 to-[#4A00E0]",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>
          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto">
              {/* Empty paragraph kept for layout consistency */}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}