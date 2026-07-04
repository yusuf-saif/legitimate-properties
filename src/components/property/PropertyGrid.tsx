'use client'

import { motion } from 'framer-motion'
import { PropertyCard } from './PropertyCard'
import { staggerContainer, fadeUp } from '@/lib/animations/variants'
import type { Property } from '@/types'

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (!properties?.length) {
    return (
      <div className="py-24 text-center">
        <p className="heading-h3 text-espresso">No properties found</p>
        <p className="text-body-md text-text-muted mt-2">
          Try adjusting your filters to see more results.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {properties.map(p => (
        <motion.div key={p.id} variants={fadeUp}>
          <PropertyCard property={p} />
        </motion.div>
      ))}
    </motion.div>
  )
}
