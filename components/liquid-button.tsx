"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface LiquidButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  fillDirection?: "left" | "right" | "top" | "bottom"
  fillColor?: string
  textColor?: string
  hoverTextColor?: string
}

export default function LiquidButton({
  children,
  href,
  onClick,
  className = "",
  fillDirection = "left",
  fillColor = "hsl(var(--gold))",
  textColor = "white",
  hoverTextColor = "black",
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  // Determine fill animation properties based on direction
  const getFillVariants = () => {
    switch (fillDirection) {
      case "right":
        return {
          initial: { left: "-100%", right: "100%" },
          hover: { left: "0%", right: "0%" },
        }
      case "top":
        return {
          initial: { top: "-100%", bottom: "100%" },
          hover: { top: "0%", bottom: "0%" },
        }
      case "bottom":
        return {
          initial: { top: "100%", bottom: "-100%" },
          hover: { top: "0%", bottom: "0%" },
        }
      case "left":
      default:
        return {
          initial: { left: "100%", right: "-100%" },
          hover: { left: "0%", right: "0%" },
        }
    }
  }

  const fillVariants = getFillVariants()
  const isHorizontal = fillDirection === "left" || fillDirection === "right"

  const ButtonComponent = href ? "a" : "button"
  const buttonProps = href ? { href } : { onClick }

  return (
    <ButtonComponent
      {...buttonProps}
      ref={buttonRef as any}
      className={`relative overflow-hidden border gold-border px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ color: textColor }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        variants={fillVariants}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          background: fillColor,
          transformOrigin: isHorizontal ? "center left" : "top center",
        }}
      />
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={{ color: isHovered ? hoverTextColor : textColor }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
    </ButtonComponent>
  )
}
