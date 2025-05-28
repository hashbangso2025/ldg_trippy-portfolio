"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down"
  offset?: number
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
  offset = 0,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on scroll position
  const yValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [offset, -100 * speed + offset] : [offset, 100 * speed + offset],
  )

  return (
    <motion.div ref={ref} style={{ y: yValue }} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  )
}
