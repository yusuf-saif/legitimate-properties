import Link from 'next/link'
import { PropertyCard } from '@/components/property/PropertyCard'
import type { Property } from '@/types'

export function FeaturedProperties({ properties }: { properties: Property[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-lp">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-caps text-terracotta mb-3">Featured Listings</p>
            <h2 className="heading-h2 text-espresso">Handpicked For You</h2>
          </div>
          <Link href="/properties" className="hidden sm:inline text-terracotta font-semibold text-body-sm hover:underline underline-offset-4">
            View All Properties →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map(p => <PropertyCard key={p._id} property={p} />)}
        </div>
        <div className="mt-8 sm:hidden text-center">
          <Link href="/properties" className="text-terracotta font-semibold text-body-sm hover:underline underline-offset-4">
            View All Properties →
          </Link>
        </div>
      </div>
    </section>
  )
}
