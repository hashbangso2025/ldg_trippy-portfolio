"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface ActivityCardProps {
  title: string
  description: string
  icon: ReactNode
}

export default function ActivityCard({ title, description, icon }: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group perspective-1000">
      <motion.div
        className="w-full h-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0,
          z: isHovered ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 bg-black border-gray-800 transform-gpu">
          <CardContent className="pt-6 flex-grow flex flex-col justify-center">
            <div className="flex flex-col items-center text-center">
              <motion.div
                className="mb-4 p-3 rounded-full bg-gray-800"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  y: isHovered ? -5 : 0,
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                {icon}
              </motion.div>

              <motion.h3
                className="text-xl font-bold mb-2"
                animate={{
                  y: isHovered ? -3 : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {title}
              </motion.h3>

              <motion.p
                className="text-gray-400"
                animate={{
                  opacity: isHovered ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {description}
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Shadow effect */}
      <motion.div
        className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          duration: 0.4,
        }}
        style={{ zIndex: -1 }}
      />
    </div>
  )
}
