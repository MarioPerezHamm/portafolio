"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  offset?: number
}

export function Reveal({ children, className, delay = 0, offset = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
