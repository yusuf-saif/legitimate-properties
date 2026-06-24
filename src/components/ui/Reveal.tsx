'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations/variants'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: typeof fadeUp
  as?: 'div' | 'section' | 'article' | 'span'
}

export function Reveal({ children, className, delay = 0, variant = fadeUp, as = 'div' }: Props) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
    >
      {children}
    </Component>
  )
}
