"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface GemButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

export default function GemButton({ children, href, onClick, className = "" }: GemButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const ButtonComponent = href ? "a" : "button"
  const buttonProps = href ? { href } : { onClick }

  return (
    <ButtonComponent
      {...buttonProps}
      className={`relative overflow-hidden border gold-border px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>

      {/* Gem */}
      <motion.div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20"
        animate={{
          rotateY: isHovered ? 180 : 0,
          rotateX: isHovered ? 30 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M12 2L2 9L12 16L22 9L12 2Z"
            fill="url(#gem-gradient-top)"
            animate={{
              fill: isHovered ? "url(#gem-gradient-top-hover)" : "url(#gem-gradient-top)",
            }}
          />
          <motion.path
            d="M12 16L2 9L12 22L22 9L12 16Z"
            fill="url(#gem-gradient-bottom)"
            animate={{
              fill: isHovered ? "url(#gem-gradient-bottom-hover)" : "url(#gem-gradient-bottom)",
            }}
          />
          <defs>
            <linearGradient id="gem-gradient-top" x1="2" y1="2" x2="22" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f0e68c" />
              <stop offset="1" stopColor="#d4af37" />
            </linearGradient>
            <linearGradient id="gem-gradient-bottom" x1="2" y1="9" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#d4af37" />
              <stop offset="1" stopColor="#b8860b" />
            </linearGradient>
            <linearGradient id="gem-gradient-top-hover" x1="2" y1="2" x2="22" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#f0e68c" />
            </linearGradient>
            <linearGradient id="gem-gradient-bottom-hover" x1="2" y1="9" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f0e68c" />
              <stop offset="1" stopColor="#d4af37" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Button background effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: "linear-gradient(45deg, #d4af37, #f0e68c)" }}
      />
    </ButtonComponent>
  )
}
