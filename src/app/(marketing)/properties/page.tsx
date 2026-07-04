import type { Metadata } from 'next'
import { PropertyGrid }   from '@/components/property/PropertyGrid'
import { PropertyFilters } from '@/components/property/PropertyFilters'
import { PageTransition } from '@/components/ui/PageTransition'
import { prisma }         from '@/lib/prisma'
import { mapProperty }    from '@/lib/mappers'
import type { Property } from '@/types'

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse our full portfolio of premium residential and commercial properties across Nigeria.',
}

interface Props {
  searchParams?: {
    type?: string
    location?: string
    priceRange?: string
  }
}

function matchesPriceRange(property: Property, priceRange?: string) {
  if (!priceRange) return true
  if (property.priceOnRequest) return true
  if (typeof property.price !== 'number') return false

  if (priceRange === '0-50m') return property.price < 50_000_000
  if (priceRange === '50m-200m') return property.price >= 50_000_000 && property.price <= 200_000_000
  if (priceRange === '200m+') return property.price > 200_000_000
  return true
}

export default async function PropertiesPage({ searchParams }: Props) {
  const allRaw = await prisma.property.findMany({
    where: { published: true },
    include: { images: true },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })
  const allProperties = allRaw.map(mapProperty)

  const type = searchParams?.type?.toLowerCase()
  const location = searchParams?.location?.toLowerCase()
  const priceRange = searchParams?.priceRange
  const hasFilters = Boolean(type || location || priceRange)

  const properties = allProperties.filter(property => {
    if (type && property.type !== type) return false
    if (location && !property.location.city.toLowerCase().includes(location)) return false
    return matchesPriceRange(property, priceRange)
  })

  return (
    <PageTransition>
      <div>
        <section className="section-padding-sm bg-espresso text-cream">
          <div className="container-lp">
            <p className="label-caps text-gold mb-4">Our Portfolio</p>
            <h1 className="heading-h1 max-w-2xl">
              Every Property, A Story Worth Living
            </h1>
          </div>
        </section>

        <section className="section-padding container-lp">
          <PropertyFilters />
          {properties.length > 0 && (
            <p className="text-body-sm text-text-muted mb-8">
              Showing {properties.length} {properties.length === 1 ? 'property' : 'properties'}
              {hasFilters ? ' — filtered' : ''}
            </p>
          )}
          <PropertyGrid properties={properties} />
        </section>
      </div>
    </PageTransition>
  )
}
