"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

interface InteractiveMemoji {
  imageSrc: string
  alt: string
  className?: string
}

export default function InteractiveMemoji({ imageSrc, alt, className = "" }: InteractiveMemoji) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [theme, setTheme] = useState("default")
  const [animationVariant, setAnimationVariant] = useState(0)
  const controls = useAnimation()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Themes for different animations
  const themes = {
    default: "Click me!",
    entrepreneur: "Innovation!",
    tech: "Technology!",
    science: "Science!",
    math: "Mathematics!",
    engineering: "Engineering!",
    creative: "Creativity!",
    sports: "Athletics!",
    music: "Rhythm!",
  }

  // Emojis that can appear around the memoji (removed rainbow emoji)
  const emojis = ["🚀", "💡", "⚡", "🔥", "✨", "🎯", "🧠", "🌟", "🏆", "🎵", "💻", "🔍", "🎨"]

  // Cycle through themes on every 2 clicks
  useEffect(() => {
    const themeKeys = Object.keys(themes) as Array<keyof typeof themes>
    if (clickCount > 0 && clickCount % 2 === 0) {
      const newThemeIndex = (Math.floor(clickCount / 2) % (themeKeys.length - 1)) + 1
      setTheme(themeKeys[newThemeIndex])
      // Randomly select an animation variant for this theme
      setAnimationVariant(Math.floor(Math.random() * 3))
    }
  }, [clickCount, themes])

  // Auto-animation effect when idle
  useEffect(() => {
    // Start a gentle breathing animation when idle
    const startIdleAnimation = () => {
      intervalRef.current = setInterval(() => {
        controls.start({
          scale: [1, 1.03, 1],
          transition: { duration: 3, ease: "easeInOut" },
        })
      }, 4000)
    }

    startIdleAnimation()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [controls])

  useEffect(() => { setMounted(true) }, [])

  // Memoize random burst positions for the 8 theme burst particles
  const burstParticles = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 8 }, () => ({
      x: (Math.random() - 0.5) * 150,
      y: (Math.random() - 0.5) * 150,
    }))
  }, [mounted])

  // Memoize random burst positions and emoji choices for the 4 emoji burst
  const burstEmojis = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 4 }, () => ({
      x: (Math.random() - 0.5) * 100,
      y: Math.random() * -100 - 20,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
  }, [mounted, emojis])

  const handleClick = () => {
    // Clear any running idle animations
    if (intervalRef.current) clearInterval(intervalRef.current)

    setIsClicked(true)
    setClickCount((prev) => prev + 1)
    setShowEmoji(true)

    // Get the current theme animation
    const currentAnimation = getThemeAnimation(theme, animationVariant)

    // Run the animation
    controls.start(currentAnimation)

    // Reset click state after animation completes
    setTimeout(() => {
      setIsClicked(false)
      setShowEmoji(false)

      // Restart idle animations
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        controls.start({
          scale: [1, 1.03, 1],
          transition: { duration: 3, ease: "easeInOut" },
        })
      }, 4000)
    }, 1000)
  }

  // Different animations based on theme and variant
  const getThemeAnimation = (currentTheme: string, variant: number) => {
    switch (currentTheme) {
      case "entrepreneur":
        // Growth and expansion animations
        return variant === 0
          ? {
              scale: [1, 1.3, 1],
              transition: { duration: 0.7, ease: "easeInOut" },
            }
          : variant === 1
            ? {
                scale: [1, 1.2, 0.9, 1.1, 1],
                y: [0, -10, 0],
                transition: { duration: 0.8 },
              }
            : {
                rotate: [0, 5, -5, 0],
                scale: [1, 1.15, 1],
                transition: { duration: 0.7 },
              }

      case "tech":
        // Digital glitch effects
        return variant === 0
          ? {
              x: [0, -5, 5, -5, 5, 0],
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
              transition: { duration: 0.5 },
            }
          : variant === 1
            ? {
                scale: [1, 1.05, 0.95, 1],
                x: [0, 3, -3, 0],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
                transition: { duration: 0.6 },
              }
            : {
                y: [0, -3, 3, -2, 0],
                x: [0, 2, -2, 0],
                filter: ["hue-rotate(0deg)", "hue-rotate(15deg)", "hue-rotate(0deg)"],
                transition: { duration: 0.5 },
              }

      case "science":
        // Experimental bubbling effects
        return variant === 0
          ? {
              y: [0, -10, 0],
              x: [0, 5, -5, 5, 0],
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.7 },
            }
          : variant === 1
            ? {
                scale: [1, 1.1, 0.95, 1.05, 1],
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.8, ease: "easeInOut" },
              }
            : {
                y: [0, -5, 5, -5, 0],
                scale: [1, 1.05, 0.98, 1],
                transition: { duration: 0.7 },
              }

      case "math":
        // Precise, calculated movements
        return variant === 0
          ? {
              rotate: [0, 90, 180, 270, 360],
              transition: { duration: 0.8, ease: "linear" },
            }
          : variant === 1
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, 180, 0],
                transition: { duration: 0.7 },
              }
            : {
                scale: [1, 0.9, 1.1, 1],
                x: [0, 10, -10, 0],
                transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] },
              }

      case "engineering":
        // Construction/building animations
        return variant === 0
          ? {
              y: [0, -20],
              scale: [1, 1.1],
              rotateY: [0, 180, 0],
              transition: { duration: 0.8 },
            }
          : variant === 1
            ? {
                y: [0, -10, 0],
                scale: [1, 1.15, 1],
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.7 },
              }
            : {
                scale: [1, 1.2, 0.9, 1],
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.8 },
              }

      case "creative":
        // Artistic, fluid movements
        return variant === 0
          ? {
              rotate: [0, 10, -10, 5, -5, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
              transition: { duration: 0.8, ease: "easeInOut" },
            }
          : variant === 1
            ? {
                scale: [1, 1.15, 0.9, 1.1, 1],
                filter: ["hue-rotate(0deg)", "hue-rotate(30deg)", "hue-rotate(0deg)"],
                transition: { duration: 0.7 },
              }
            : {
                y: [0, -15, 0],
                x: [0, 10, -10, 0],
                rotate: [0, 15, -15, 0],
                transition: { duration: 0.9 },
              }

      case "sports":
        // Dynamic, energetic movements
        return variant === 0
          ? {
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              transition: { duration: 0.5, ease: "backOut" },
            }
          : variant === 1
            ? {
                rotate: [0, 20, -20, 10, -10, 0],
                scale: [1, 1.1, 1],
                transition: { duration: 0.6 },
              }
            : {
                y: [0, -10, 5, -5, 0],
                x: [0, 5, -5, 0],
                scale: [1, 1.15, 0.95, 1],
                transition: { duration: 0.7 },
              }

      case "music":
        // Rhythmic movements
        return variant === 0
          ? {
              rotate: [0, 5, -5, 5, -5, 0],
              y: [0, -5, 0, -5, 0],
              transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
            }
          : variant === 1
            ? {
                scale: [1, 1.1, 0.95, 1.05, 1],
                rotate: [0, -3, 3, -3, 0],
                transition: { duration: 0.7, ease: "easeInOut" },
              }
            : {
                y: [0, -3, 0, -3, 0],
                scale: [1, 1.05, 0.98, 1.05, 1],
                rotate: [0, 2, -2, 2, 0],
                transition: { duration: 0.6 },
              }

      default:
        // Default bounce animations
        return variant === 0
          ? {
              scale: [1, 1.2, 1],
              y: [0, -10, 0],
              transition: { duration: 0.5 },
            }
          : variant === 1
            ? {
                scale: [1, 1.1, 0.9, 1],
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.6 },
              }
            : {
                y: [0, -15, 0],
                scale: [1, 1.05, 1],
                transition: { duration: 0.5, ease: "backOut" },
              }
    }
  }

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      animate={controls}
      initial={{ scale: 1 }}
      whileHover={
        !isClicked
          ? {
              scale: 1.05,
              y: -5,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            }
          : {}
      }
      whileTap={{ scale: 0.95 }}
    >
      <img src={imageSrc || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />

      {/* Tooltip that appears on hover */}
      <motion.div
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -5,
        }}
        transition={{ duration: 0.2 }}
      >
        {themes[theme as keyof typeof themes] || "Click me!"}
      </motion.div>

      {/* Themed particles that appear on click */}
      <AnimatePresence>
        {isClicked && theme !== "default" && (
          <>
            {burstParticles.map((burst, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [1, 0],
                  scale: [0, 1],
                  x: burst.x,
                  y: burst.y,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  top: "50%",
                  left: "50%",
                  backgroundColor:
                    theme === "entrepreneur"
                      ? "#10B981"
                      : theme === "tech"
                        ? "#3B82F6"
                        : theme === "science"
                          ? "#8B5CF6"
                          : theme === "math"
                            ? "#F59E0B"
                            : theme === "engineering"
                              ? "#EC4899"
                              : theme === "creative"
                                ? "#F472B6"
                                : theme === "sports"
                                  ? "#EF4444"
                                  : theme === "music"
                                    ? "#6366F1"
                                    : "#60A5FA",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Emoji burst effect */}
      <AnimatePresence>
        {showEmoji && (
          <>
            {burstEmojis.map((burst, i) => (
                <motion.div
                  key={`emoji-${i}`}
                  className="absolute text-xl pointer-events-none"
                  initial={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 1],
                  x: burst.x,
                  y: burst.y,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    top: "40%",
                    left: "50%",
                  }}
                >
                {burst.emoji}
                </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `0 0 20px 10px ${
            theme === "entrepreneur"
              ? "#10B981"
              : theme === "tech"
                ? "#3B82F6"
                : theme === "science"
                  ? "#8B5CF6"
                  : theme === "math"
                    ? "#F59E0B"
                    : theme === "engineering"
                      ? "#EC4899"
                      : theme === "creative"
                        ? "#F472B6"
                        : theme === "sports"
                          ? "#EF4444"
                          : theme === "music"
                            ? "#6366F1"
                            : "#60A5FA"
          }`,
          pointerEvents: "none",
        }}
      />
    </motion.div>
  )
}
