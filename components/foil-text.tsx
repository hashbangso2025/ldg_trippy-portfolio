"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FoilTextProps {
  children: ReactNode
  className?: string
  animationDuration?: number
  gradientColors?: string[]
}

export default function FoilText({
  children,
  className = "",
  animationDuration = 6,
  gradientColors = ["#ffd700", "#fff8dc", "#ffd700", "#daa520"],
}: FoilTextProps) {
  return (
    <motion.div
      className={`foil-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(60deg, ${gradientColors.join(", ")})`,
        backgroundSize: "400% 400%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        textShadow: "0 0 1px rgba(255, 215, 0, 0.3)",
        filter: "contrast(1.2) brightness(1.1)",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      {children}
    </motion.div>
  )
}
