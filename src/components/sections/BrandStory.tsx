'use client'

import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/Reveal'

export function BrandStory() {
  return (
    <Reveal as="section" className="section-padding bg-white">
      <div className="container-lp grid gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="heading-display-lg text-espresso max-w-lg">
            Built on trust,
            <br />
            driven by quality.
          </h2>
        </motion.div>

        <motion.div
          className="max-w-text space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        >
          <p className="text-body-lg text-text-muted">
            Legitimate Properties was shaped by a simple belief: real estate should feel clear, grounded, and dependable from the first conversation to the final handover.
          </p>
          <p className="text-body-lg text-text-muted">
            We focus on homes, developments, and investment opportunities that reflect long-term value, thoughtful curation, and a standard of service clients can return to with confidence.
          </p>
        </motion.div>
      </div>
    </Reveal>
  )
}
