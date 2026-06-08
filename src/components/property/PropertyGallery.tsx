import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types'

export function PropertyGallery({ images, title }: { images: SanityImage[]; title: string }) {
  if (!images?.length) return null
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[70vh] overflow-hidden">
      {images.slice(0, 5).map((img, i) => (
        <div key={i} className={`relative overflow-hidden ${i === 0 ? 'md:row-span-2' : ''}`} style={{ aspectRatio: i === 0 ? '4/3' : '16/9' }}>
          <Image src={urlFor(img).width(1200).auto('format').url()} alt={img.alt ?? `${title} image ${i + 1}`}
            fill className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw" priority={i === 0} />
        </div>
      ))}
    </div>
  )
}
