import Link from 'next/link'
import Image from 'next/image'
import { BedDouble, Bath, Maximize2, MapPin, ParkingCircle, Home, ArrowRight } from 'lucide-react'
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

const STATUS_LABELS: Record<string, string> = {
  available: 'Available',
  sold:      'Sold',
  reserved:  'Reserved',
  'off-plan':'Off Plan',
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
        'hover:-translate-y-1 transition-[box-shadow,transform] duration-250 overflow-hidden',
        className
      )}>
      <div className="relative aspect-[16/10] overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt ?? title}
            fill className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-2">
            <Home size={32} className="text-border-soft" />
            <span className="text-text-muted text-body-sm">No images yet</span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-cream text-taupe label-caps px-2.5 py-1 rounded">
          {TYPE_LABELS[type]}
        </span>
        {status !== 'available' && (
          <span className={cn('absolute top-3 right-3 text-white label-caps px-2.5 py-1 rounded', STATUS_STYLES[status])}>
            {STATUS_LABELS[status]}
          </span>
        )}
        <div className="absolute bottom-3 left-3 bg-terracotta text-white font-semibold text-body-sm px-3 py-1.5 rounded">
          {priceOnRequest ? 'Price on Request' : price ? formatPrice(price, true) : '—'}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="heading-h4 text-espresso group-hover:text-terracotta transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="flex items-center gap-1.5 text-text-muted text-body-sm mt-1">
            <MapPin size={13} />
            {location.area}, {location.city}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-taupe text-body-sm">
          {specs.bedrooms  != null && <span className="flex items-center gap-1"><BedDouble size={15} />{specs.bedrooms} Bed</span>}
          {specs.bathrooms != null && <span className="flex items-center gap-1"><Bath size={15} />{specs.bathrooms} Bath</span>}
          {specs.sqm       != null && <span className="flex items-center gap-1"><Maximize2 size={15} />{specs.sqm} m²</span>}
          {specs.parking   != null && <span className="flex items-center gap-1"><ParkingCircle size={15} />{specs.parking}</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border-soft mt-auto">
          <span className="text-body-sm text-terracotta font-semibold group-hover:underline underline-offset-4 transition-all">
            View Property
          </span>
          <ArrowRight size={15} className="text-terracotta transition-transform duration-250 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
