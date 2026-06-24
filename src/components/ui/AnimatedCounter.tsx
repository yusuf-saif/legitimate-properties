'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'

interface Props {
  target: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({ target, suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref as any, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 20 })
  const rounded = useTransform(springValue, val => Math.round(val))

  useEffect(() => {
    if (inView) motionValue.set(target)
  }, [inView, target, motionValue])

  return (
    <motion.span ref={ref} className={className}>
      {inView ? <motion.span>{rounded}</motion.span> : 0}{suffix}
    </motion.span>
  )
}
