import { BedDouble, Bath, Maximize2, ParkingCircle, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils/format'
import type { Property } from '@/types'

export function PropertyInfo({ property }: { property: Property }) {
  const { title, location, price, priceOnRequest, specs, description, highlights } = property
  return (
    <div>
      {/* Specs */}
      <div className="flex flex-wrap gap-6 py-6 border-y border-border-soft mb-10">
        {specs.bedrooms  != null && <div className="flex items-center gap-2 text-text-body"><BedDouble size={20} className="text-taupe" /><span className="font-semibold">{specs.bedrooms}</span><span className="text-text-muted">Bedrooms</span></div>}
        {specs.bathrooms != null && <div className="flex items-center gap-2 text-text-body"><Bath size={20} className="text-taupe" /><span className="font-semibold">{specs.bathrooms}</span><span className="text-text-muted">Bathrooms</span></div>}
        {specs.sqm       != null && <div className="flex items-center gap-2 text-text-body"><Maximize2 size={20} className="text-taupe" /><span className="font-semibold">{specs.sqm}</span><span className="text-text-muted">m²</span></div>}
        {specs.parking   != null && <div className="flex items-center gap-2 text-text-body"><ParkingCircle size={20} className="text-taupe" /><span className="font-semibold">{specs.parking}</span><span className="text-text-muted">Parking</span></div>}
      </div>

      {/* Description */}
      {description && (
        <div className="mb-10">
          <h2 className="heading-h3 text-espresso mb-4">Property Description</h2>
          <div
            className="[&_h2]:heading-h2 [&_h2]:text-espresso [&_h2]:mb-4 [&_h2]:mt-10 [&_h3]:heading-h3 [&_h3]:text-espresso [&_h3]:mb-3 [&_h3]:mt-8 [&_p]:text-body-md [&_p]:mb-4 [&_p]:text-text-body [&_ul]:text-body-md [&_ul]:text-text-body [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:text-body-md [&_ol]:text-text-body [&_ol]:mb-4 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:mb-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-terracotta [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:mb-4 [&_blockquote]:text-body-md [&_blockquote]:text-text-muted [&_blockquote]:italic"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

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
