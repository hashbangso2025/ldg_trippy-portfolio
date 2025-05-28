"use client"

import { motion } from "framer-motion"

interface GoldDividerProps {
  className?: string
  width?: string
  height?: string
}

export default function GoldDivider({ className = "", width = "100%", height = "1px" }: GoldDividerProps) {
  return (
    <motion.hr
      className={`border-none ${className}`}
      style={{
        height,
        width,
        background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
        boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)",
      }}
      initial={{ width: "0%", opacity: 0 }}
      whileInView={{ width, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    />
  )
}
