import type { Metadata } from 'next'
import { notFound }        from 'next/navigation'
import { sanityClient }    from '@/lib/sanity/client'
import { PROPERTY_BY_SLUG_QUERY, RELATED_PROPERTIES_QUERY } from '@/lib/sanity/queries'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { PropertyInfo }    from '@/components/property/PropertyInfo'
import { EnquiryForm }     from '@/components/forms/EnquiryForm'
import { PropertyCard }    from '@/components/property/PropertyCard'
import type { Property } from '@/types'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await sanityClient.fetch<Property>(PROPERTY_BY_SLUG_QUERY, { slug: params.slug })
  if (!property) return { title: 'Property Not Found' }
  return {
    title: property.title,
    description: `${property.specs.bedrooms ?? ''} bedroom ${property.type} in ${property.location.area}, ${property.location.city}.`,
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await sanityClient.fetch<Property>(PROPERTY_BY_SLUG_QUERY, { slug: params.slug })
  if (!property) notFound()

  const related = await sanityClient.fetch<Property[]>(RELATED_PROPERTIES_QUERY, {
    slug: params.slug, type: property.type, city: property.location.city,
  })

  return (
    <div className="pt-24">
      <PropertyGallery images={property.gallery} title={property.title} />

      <div className="container-lp section-padding">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <PropertyInfo property={property} />
          </div>
          {/* Sticky sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <EnquiryForm propertySlug={property.slug} propertyTitle={property.title} />
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <p className="label-caps text-taupe mb-2">You Might Also Like</p>
            <h2 className="heading-h2 text-espresso mb-10">Similar Properties</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <PropertyCard key={p._id} property={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
