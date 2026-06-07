import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils/format'
import type { Property } from '@/types'

export function PropertyInfo({ property }: { property: Property }) {
  const { title, location, price, priceOnRequest, specs, highlights } = property
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="heading-h1 text-espresso mb-2">{title}</h1>
          <p className="flex items-center gap-2 text-text-muted text-body-md">
            <MapPin size={16} className="text-terracotta" />
            {location.area}, {location.city}, {location.state}
          </p>
        </div>
        <div className="text-right">
          <p className="label-caps text-text-muted mb-1">Price</p>
          <p className="font-display text-h2 font-semibold text-terracotta">
            {priceOnRequest ? 'Price on Request' : price ? formatPrice(price) : '—'}
          </p>
        </div>
      </div>

      {/* Specs */}
      <div className="flex flex-wrap gap-6 py-6 border-y border-border-soft mb-8">
        {specs.bedrooms  != null && <div className="flex items-center gap-2 text-text-body"><BedDouble size={20} className="text-taupe" /><span className="font-semibold">{specs.bedrooms}</span><span className="text-text-muted">Bedrooms</span></div>}
        {specs.bathrooms != null && <div className="flex items-center gap-2 text-text-body"><Bath size={20} className="text-taupe" /><span className="font-semibold">{specs.bathrooms}</span><span className="text-text-muted">Bathrooms</span></div>}
        {specs.sqm       != null && <div className="flex items-center gap-2 text-text-body"><Maximize2 size={20} className="text-taupe" /><span className="font-semibold">{specs.sqm}</span><span className="text-text-muted">m²</span></div>}
      </div>

      {/* Highlights */}
      {highlights?.length > 0 && (
        <div className="mb-8">
          <h2 className="heading-h3 text-espresso mb-4">Key Features</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {highlights.map(h => (
              <li key={h} className="flex items-start gap-2 text-body-md text-text-body">
                <span className="text-gold mt-1">✦</span> {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
