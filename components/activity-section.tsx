"use client"

import { motion } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import ActivityCard from "./activity-card"
import { Trophy, Utensils, Heart } from "lucide-react"

interface Category {
  name: string
}

interface Activity {
  id: number
  title: string
  description: string
  categories: Category[]
  icon: string
  link: string
}

export default function ActivitySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  interface Sparkle {
    width: number
    height: number
    left: number
    top: number
    opacity: number
    duration: number
    delay: number
  }
  const sparkles = useMemo<Sparkle[]>(() => {
    if (!mounted) return []
    return Array.from({ length: 7 }, () => ({
      width: 5 + Math.random() * 7,
      height: 5 + Math.random() * 7,
      left: 32 + Math.random() * 36,
      top: 22 + Math.random() * 56,
      opacity: 0.4 + Math.random() * 0.2,
      duration: 3.5 + Math.random() * 1.5,
      delay: Math.random() * 2,
    }))
  }, [mounted])

  const activities: Activity[] = [
    {
      id: 1,
      title: "Running",
      description:
        "Former NCAA Division I athlete with extensive experience training alongside Norwegian Olympians during elite Boston training camps. Achieved sub-3-hour Boston Marathon performance through disciplined training regimens and competitive excellence. Currently pursuing international competition opportunities while maintaining peak athletic performance in both road and trail running disciplines.",
      categories: [],
      icon: "trophy",
      link: "#",
    },
    {
      id: 0,
      title: "Florida Special Olympics Volunteer",
      description:
        "Active volunteer with Florida Special Olympics, contributing through event participation, strategic fundraising initiatives, and resource development to advance adaptive athletics and inclusive health programming. Engage in bi-weekly professional development sessions featuring healthcare industry leaders and participate in community wellness initiatives that foster teamwork, athletic development, and social integration.",
      categories: [],
      icon: "heart",
      link: "#",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="w-6 h-6" />
      case "utensils":
        return <Utensils className="w-6 h-6" />
      case "heart":
        return <Heart className="w-6 h-6" />
      default:
        return <Trophy className="w-6 h-6" />
    }
  }

  return (
    <section id="activities" className="relative py-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Softer gold gradient/vignette background */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-[110vw] h-[70vh] md:w-[90vw] md:h-[60vh] rounded-3xl bg-gradient-to-br from-yellow-100/30 via-yellow-200/20 to-yellow-50/0 blur-3xl opacity-50 shadow-xl"></div>
      </div>
      {/* Fewer, smaller, subtler gold sparkles */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.7, transition: { staggerChildren: 0.18 } },
        }}
      >
        {sparkles.map((sparkle: Sparkle, i: number) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-200 shadow"
            style={{
              width: `${sparkle.width}px`,
              height: `${sparkle.height}px`,
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              filter: 'blur(2px)',
              opacity: sparkle.opacity,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0.5, 0.7, 0],
              scale: [0, 1.1, 1, 1.15, 0],
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
            }}
          />
        ))}
      </motion.div>
      <div className="container mx-auto px-4 max-w-6xl relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-serif mb-12 text-center"
          style={{
            background: 'linear-gradient(90deg, #d4af37, #fffacd, #f0e68c, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 8px #d4af3788)',
            fontWeight: 900,
            letterSpacing: '0.04em',
          }}
        >
          ACTIVITIES
        </motion.h2>
        <div className="flex flex-wrap gap-2 mb-12">
          {Array.from(new Set(activities.flatMap((activity) => activity.categories.map((cat) => cat.name))))
            .sort()
            .map((category, index) => (
              <div
                key={index}
                className="border border-gray-700 px-2 py-1 text-sm rounded tag-text weight-transition"
                onMouseEnter={(e) => {
                  e.currentTarget.style.fontVariationSettings = '"wght" 450'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.fontVariationSettings = '"wght" 400'
                }}
              >
                {category}
              </div>
            ))}
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {activities.map((activity) => (
            <motion.div key={activity.id} variants={item} className="h-full min-h-[400px]">
              <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-black/70 border-2 border-yellow-200/40 p-8 text-center overflow-hidden z-10 h-full">
              <ActivityCard
                title={activity.title}
                description={activity.description}
                icon={getIcon(activity.icon)}
              />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
