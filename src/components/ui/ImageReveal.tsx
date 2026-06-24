'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { clipRevealVertical } from '@/lib/animations/variants'

interface Props {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export function ImageReveal({ src, alt, className, width, height, fill, sizes, priority }: Props) {
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ''}`}
      variants={clipRevealVertical}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="w-full h-full scale-110 transition-transform duration-700 group-hover:scale-100">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </motion.div>
  )
}
