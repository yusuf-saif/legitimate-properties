import { PropertyCard } from './PropertyCard'
import type { Property } from '@/types'

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (!properties?.length) {
    return (
      <div className="py-24 text-center text-text-muted">
        <p className="heading-h3">No properties found.</p>
        <p className="text-body-md mt-2">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {properties.map((p, i) => (
        <div key={p._id}
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}>
          <PropertyCard property={p} />
        </div>
      ))}
    </div>
  )
}
