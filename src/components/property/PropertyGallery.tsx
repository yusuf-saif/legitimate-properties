'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ImageField } from '@/types'

export function PropertyGallery({ images, title }: { images: ImageField[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex(i => i !== null && i > 0 ? i - 1 : i)
      if (e.key === 'ArrowRight') setLightboxIndex(i => i !== null && i < images.length - 1 ? i + 1 : i)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, images.length])

  if (!images?.length) return null

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className={`relative overflow-hidden cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}
            style={{ aspectRatio: i === 0 ? '4/3' : '16/9' }}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <Image src={img.url} alt={img.alt ?? `${title} image ${i + 1}`}
              fill className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw" priority={i === 0} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-espresso/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-cream hover:text-gold transition-colors z-10">
              <X size={28} />
            </button>

            {lightboxIndex > 0 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1) }}
                className="absolute left-6 text-cream hover:text-gold transition-colors z-10">
                <ChevronLeft size={36} />
              </button>
            )}
            {lightboxIndex < images.length - 1 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1) }}
                className="absolute right-6 text-cream hover:text-gold transition-colors z-10">
                <ChevronRight size={36} />
              </button>
            )}

            <motion.div
              key={lightboxIndex}
              className="relative w-full max-w-5xl mx-6 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={images[lightboxIndex].url}
                  alt={images[lightboxIndex].alt ?? `${title} image ${lightboxIndex + 1}`}
                  fill className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-cream/60 text-body-sm">
                  {lightboxIndex + 1} / {images.length}
                </span>
                {images[lightboxIndex].caption && (
                  <span className="text-cream/80 text-body-sm italic">
                    {images[lightboxIndex].caption}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
