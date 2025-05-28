"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  const [stars, setStars] = useState<any[]>([])
  const [flares, setFlares] = useState<any[]>([])

  useEffect(() => {
    // Generate random stars
    setStars(Array.from({ length: 40 }, () => ({
      width: 2 + Math.random() * 2,
      height: 2 + Math.random() * 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.5 + Math.random() * 0.2,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    })))
    // Generate random lens flares
    setFlares(Array.from({ length: 3 }, (_, i) => ({
      width: 32 + i * 12,
      height: 32 + i * 12,
      left: 20 + i * 30,
      top: 30 + i * 20,
      opacity: 0.08 + i * 0.03,
      duration: 4 + i,
      delay: i * 0.7,
    })))
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Parallax nebula layers - reduced opacity, no blur */}
      <div className="absolute w-[160vw] h-[160vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{background: 'radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.10) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(120,90,255,0.05) 0%, transparent 70%)'}} />
      <div className="absolute w-[120vw] h-[120vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{background: 'radial-gradient(ellipse at 70% 60%, rgba(255,215,0,0.05) 0%, transparent 70%)'}} />
      {/* Animated gold stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-200"
          style={{
            width: `${star.width}px`,
            height: `${star.height}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
      {/* Lens flare stars */}
      {flares.map((flare, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${flare.width}px`,
            height: `${flare.height}px`,
            left: `${flare.left}%`,
            top: `${flare.top}%`,
            background: 'radial-gradient(circle, #fffbe6 0%, #ffd700 40%, transparent 80%)',
            opacity: flare.opacity,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [flare.opacity, flare.opacity + 0.04, flare.opacity],
          }}
          transition={{
            duration: flare.duration,
            repeat: Infinity,
            delay: flare.delay,
          }}
        />
      ))}
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(circle at center, transparent 60%, #0a0a13 100%)', zIndex: 10}} />
    </div>
  )
} 