"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  delay: number
  duration: number
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const colors = ["#3B82F6", "#8B5CF6", "EC4899", "#F59E0B", "#10B981"]
    const newShapes: Shape[] = []
    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
        duration: Math.random() * 20 + 15,
      })
    }
    setShapes(newShapes)
  }, [mounted])

  // Memoize random animation values for each shape
  const shapeAnims = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 15 }, () => ({
      x: [0, Math.random() * 100 - 50, 0],
      y: [0, Math.random() * 100 - 50, 0],
    }))
  }, [mounted])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape: Shape, i: number) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full opacity-[0.03]"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            rotate: `${shape.rotation}deg`,
          }}
          animate={{
            x: shapeAnims[i]?.x || [0, 0, 0],
            y: shapeAnims[i]?.y || [0, 0, 0],
            rotate: [shape.rotation, shape.rotation + 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
