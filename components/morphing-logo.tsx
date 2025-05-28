"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

interface MorphingLogoProps {
  src: string
  alt: string
  className?: string
}

export default function MorphingLogo({ src, alt, className = "" }: MorphingLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Memoize random values for gold particles
  const particles = useMemo(() => {
    if (!isLoaded) return []
    return Array.from({ length: 6 }, () => ({
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 80,
      delay: 0.5 + Math.random() * 0.5,
      left: 50 + (Math.random() - 0.5) * 8,
      top: 50 + (Math.random() - 0.5) * 8,
    }))
  }, [isLoaded])

  // Animation variants for the logo
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "brightness(0.5) blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "brightness(1) blur(0px)",
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
    glow: {
      boxShadow: [
        "0 0 0px rgba(212, 175, 55, 0)",
        "0 0 20px rgba(212, 175, 55, 0.7)",
        "0 0 40px rgba(212, 175, 55, 0.5)",
        "0 0 20px rgba(212, 175, 55, 0.3)",
        "0 0 0px rgba(212, 175, 55, 0)",
      ],
      transition: {
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        delay: 1,
      },
    },
  }

  return (
    <motion.div
      className={`relative rounded-full border-4 border-yellow-300 shadow-[0_0_32px_8px_rgba(212,175,55,0.18)] bg-black/80 overflow-hidden ${className}`}
      initial="hidden"
      animate={isLoaded ? ["visible", "glow"] : "hidden"}
      variants={logoVariants}
      style={{ aspectRatio: '1/1' }}
    >
      {/* Gold particles that sweep in (keep subtle) */}
      {isLoaded && (
        <>
          {particles.map((particle: { x: number; y: number; delay: number; left: number; top: number }, i: number) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#d4af37]"
              initial={{
                opacity: 0,
                x: particle.x,
                y: particle.y,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                x: 0,
                y: 0,
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 1.2,
                delay: particle.delay,
                ease: "easeInOut",
              }}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
            />
          ))}
        </>
      )}
      {/* The actual logo image, clipped to a circle */}
      <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-contain rounded-full relative z-10" />
      {/* Glow effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-full z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 2,
          delay: 1,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.5) 0%, rgba(212,175,55,0) 70%)",
        }}
      />
    </motion.div>
  )
}
