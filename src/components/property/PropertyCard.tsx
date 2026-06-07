import Link from 'next/link'
import Image from 'next/image'
import { BedDouble, Bath, Maximize2 } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import { formatPrice } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'
import type { Property } from '@/types'

interface Props { property: Property; className?: string }

const TYPE_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial:  'Commercial',
  land:        'Land',
  'mixed-use': 'Mixed Use',
}

const STATUS_STYLES: Record<string, string> = {
  available: 'bg-green-700/80',
  sold:      'bg-espresso/80',
  reserved:  'bg-taupe/80',
  'off-plan':'bg-gold/80',
}

export function PropertyCard({ property, className }: Props) {
  const { slug, title, type, status, location, price, priceOnRequest, specs, gallery } = property
  const heroImage = gallery?.[0]

  return (
    <Link href={`/properties/${slug}`}
      className={cn(
        'group block bg-white rounded-card shadow-card hover:shadow-card-hover',
        'hover:-translate-y-1 transition-all duration-250 overflow-hidden',
        className
      )}>
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {heroImage ? (
          <Image
            src={urlFor(heroImage).width(600).height(375).auto('format').url()}
            alt={heroImage.alt ?? title}
            fill className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-cream flex items-center justify-center">
            <span className="text-text-muted text-body-sm">No image</span>
          </div>
        )}
        {/* Type badge */}
        <span className="absolute top-3 left-3 bg-cream text-taupe label-caps px-2.5 py-1 rounded">
          {TYPE_LABELS[type]}
        </span>
        {/* Status badge */}
        {status !== 'available' && (
          <span className={cn('absolute top-3 right-3 text-white label-caps px-2.5 py-1 rounded', STATUS_STYLES[status])}>
            {status}
          </span>
        )}
        {/* Price */}
        <div className="absolute bottom-3 left-3 bg-terracotta text-white font-semibold text-body-sm px-3 py-1.5 rounded">
          {priceOnRequest ? 'Price on Request' : price ? formatPrice(price, true) : '—'}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="heading-h4 text-espresso group-hover:text-terracotta transition-colors line-clamp-1 mb-1">
          {title}
        </h3>
        <p className="text-text-muted text-body-sm mb-4">
          {location.area}, {location.city}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 text-taupe text-body-sm">
          {specs.bedrooms  != null && <span className="flex items-center gap-1"><BedDouble size={15} />{specs.bedrooms} Bed</span>}
          {specs.bathrooms != null && <span className="flex items-center gap-1"><Bath size={15} />{specs.bathrooms} Bath</span>}
          {specs.sqm       != null && <span className="flex items-center gap-1"><Maximize2 size={15} />{specs.sqm} m²</span>}
        </div>
      </div>
    </Link>
  )
}
