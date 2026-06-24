'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    title: 'Where Homes Tell Stories.',
    subtitle: 'Discover exceptional properties built for quality living — residential, commercial, and investment opportunities across Nigeria.',
    cta: 'Explore Properties',
    ctaLink: '/properties',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    title: 'Luxury Redefined.',
    subtitle: 'World-class residences in Nigeria\'s most sought-after locations, crafted for those who demand the finest.',
    cta: 'View Luxury Homes',
    ctaLink: '/properties?type=residential',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    title: 'Invest with Confidence.',
    subtitle: 'Strategic real estate investments backed by local expertise, transparent reporting, and a proven track record.',
    cta: 'Investment Opportunities',
    ctaLink: '/investors',
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753086-00f18f6bae2c?w=1920&q=80',
    title: 'Your Vision, Our Expertise.',
    subtitle: 'From consultation to completion — we guide you through every step of your property journey with care and precision.',
    cta: 'Talk to Us',
    ctaLink: '/contact',
  },
  {
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80',
    title: 'Premium Living Awaits.',
    subtitle: 'Experience the finest in Nigerian real estate — where quality, trust, and elegance come together.',
    cta: 'Browse All Properties',
    ctaLink: '/properties',
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, 150])
  const contentY = useTransform(scrollY, [0, 600], [0, -80])
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.4])

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % SLIDES.length)
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, 6000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused, next])

  const slide = SLIDES[current]

  return (
    <section
      className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-espresso"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0" style={{ y: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          />
        </AnimatePresence>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-espresso/80 via-espresso/50 to-espresso/30"
        style={{ y: bgY }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-espresso/75 via-espresso/30 to-transparent z-10"
        style={{ y: bgY }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent z-10"
        style={{ opacity: overlayOpacity }}
      />

      {[0.75, 0.5, 0.25].map((opacity, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[160px] pointer-events-none"
          style={{
            top: '33%',
            left: `${25 + i * 20}%`,
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, rgba(37,99,235,${opacity * 0.08}) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <motion.div className="relative z-20 container-lp w-full" style={{ y: contentY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="label-caps text-gold mb-4">
              Premium Real Estate · Nigeria
            </p>
            <h1 className="heading-display-xl text-cream max-w-3xl mb-6">
              {slide.title}
            </h1>
            <p className="text-cream/70 text-body-lg max-w-xl mb-10">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center px-8 py-4 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta/90 transition-colors text-body-md"
              >
                {slide.cta}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-cream/50 text-cream font-semibold rounded-lg hover:bg-cream/10 transition-colors text-body-md"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-12">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current
                  ? 'w-10 bg-gold'
                  : 'w-4 bg-cream/30 hover:bg-cream/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
