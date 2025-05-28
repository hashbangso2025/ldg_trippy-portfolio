"use client"

import { motion } from "framer-motion"

interface LensFlareProps {
  className?: string
}

export default function LensFlare({ className = "" }: LensFlareProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
        mixBlendMode: "screen",
      }}
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        rotate: {
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
        scale: {
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
        opacity: {
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
    />
  )
}
