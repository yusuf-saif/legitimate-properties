import type { Metadata } from 'next'
import { PropertyGrid }   from '@/components/property/PropertyGrid'
import { PropertyFilters } from '@/components/property/PropertyFilters'
import { sanityClient }   from '@/lib/sanity/client'
import { PROPERTIES_QUERY } from '@/lib/sanity/queries'
import type { Property } from '@/types'

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse our full portfolio of premium residential and commercial properties across Nigeria.',
}

export const revalidate = 3600

export default async function PropertiesPage() {
  const properties = await sanityClient.fetch<Property[]>(PROPERTIES_QUERY)

  return (
    <div className="pt-24">
      {/* Page Hero */}
      <section className="section-padding-sm bg-espresso text-cream container-lp">
        <p className="label-caps text-gold mb-4">Our Portfolio</p>
        <h1 className="heading-h1 max-w-2xl">
          Every Property, A Story Worth Living
        </h1>
      </section>

      {/* Filters + Grid */}
      <section className="section-padding container-lp">
        <PropertyFilters />
        <PropertyGrid properties={properties} />
      </section>
    </div>
  )
}
