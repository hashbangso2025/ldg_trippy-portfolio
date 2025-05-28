"use client"

import { motion } from "framer-motion"

interface OrnateBorderProps {
  className?: string
}

export default function OrnateBorder({ className = "" }: OrnateBorderProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top left corner */}
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 opacity-70"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <path d="M0 0C0 44.1828 35.8172 80 80 80V60C46.8629 60 20 33.1371 20 0H0Z" fill="url(#gold-gradient)" />
        <defs>
          <linearGradient id="gold-gradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d4af37" />
            <stop offset="0.5" stopColor="#f0e68c" />
            <stop offset="1" stopColor="#d4af37" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Top right corner */}
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0 opacity-70"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ transform: "scaleX(-1)" }}
      >
        <path d="M0 0C0 44.1828 35.8172 80 80 80V60C46.8629 60 20 33.1371 20 0H0Z" fill="url(#gold-gradient-2)" />
        <defs>
          <linearGradient id="gold-gradient-2" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d4af37" />
            <stop offset="0.5" stopColor="#f0e68c" />
            <stop offset="1" stopColor="#d4af37" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Bottom left corner */}
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 opacity-70"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ transform: "scaleY(-1)" }}
      >
        <path d="M0 0C0 44.1828 35.8172 80 80 80V60C46.8629 60 20 33.1371 20 0H0Z" fill="url(#gold-gradient-3)" />
        <defs>
          <linearGradient id="gold-gradient-3" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d4af37" />
            <stop offset="0.5" stopColor="#f0e68c" />
            <stop offset="1" stopColor="#d4af37" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Bottom right corner */}
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0 opacity-70"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{ transform: "scale(-1)" }}
      >
        <path d="M0 0C0 44.1828 35.8172 80 80 80V60C46.8629 60 20 33.1371 20 0H0Z" fill="url(#gold-gradient-4)" />
        <defs>
          <linearGradient id="gold-gradient-4" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d4af37" />
            <stop offset="0.5" stopColor="#f0e68c" />
            <stop offset="1" stopColor="#d4af37" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Horizontal filigree lines */}
      <div className="absolute top-4 left-[80px] right-[80px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
      <div className="absolute bottom-4 left-[80px] right-[80px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

      {/* Vertical filigree lines */}
      <div className="absolute left-4 top-[80px] bottom-[80px] w-[1px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-50"></div>
      <div className="absolute right-4 top-[80px] bottom-[80px] w-[1px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-50"></div>
    </div>
  )
}
