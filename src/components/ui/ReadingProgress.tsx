'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-18 left-0 right-0 h-0.5 bg-terracotta origin-left z-40"
      style={{ scaleX }}
    />
  )
}
