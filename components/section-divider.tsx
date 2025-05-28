"use client"

import { motion } from "framer-motion"

export default function SectionDivider() {
  return (
    <motion.div
      className="my-12 w-full flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="h-px w-4/5 max-w-3xl bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
    </motion.div>
  )
}
