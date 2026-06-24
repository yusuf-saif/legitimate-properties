import type { Metadata } from 'next'
import { notFound }        from 'next/navigation'
import { prisma }          from '@/lib/prisma'
import { mapProperty }     from '@/lib/mappers'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { PropertyInfo }    from '@/components/property/PropertyInfo'
import { EnquiryForm }     from '@/components/forms/EnquiryForm'
import { PropertyCard }    from '@/components/property/PropertyCard'
import { PageTransition }  from '@/components/ui/PageTransition'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await prisma.property.findUnique({ where: { slug: params.slug } })
  if (!property) return { title: 'Property Not Found' }
  return {
    title: property.title,
    description: `${property.specsBedrooms ?? ''} bedroom ${property.type} in ${property.locationArea}, ${property.locationCity}.`,
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const raw = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: { images: true },
  })
  if (!raw) notFound()
  const property = mapProperty(raw)

  const relatedRaw = await prisma.property.findMany({
    where: {
      slug: { not: params.slug },
      AND: [
        { OR: [{ type: property.type }, { locationCity: property.location.city }] },
      ],
    },
    include: { images: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })
  const related = relatedRaw.map(mapProperty)

  return (
    <PageTransition>
      <div className="pt-24">
        <PropertyGallery images={property.gallery} title={property.title} />

        <div className="container-lp section-padding">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <PropertyInfo property={property} />
            </div>
            <aside className="lg:col-span-1">
              <div className="sticky top-28">
                <EnquiryForm propertySlug={property.slug} propertyTitle={property.title} />
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <p className="label-caps text-taupe mb-2">You Might Also Like</p>
              <h2 className="heading-h2 text-espresso mb-10">Similar Properties</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
