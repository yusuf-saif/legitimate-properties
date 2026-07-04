import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MapPin } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { mapProperty } from '@/lib/mappers'
import { formatPrice } from '@/lib/utils/format'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { PropertyInfo } from '@/components/property/PropertyInfo'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { PropertyCard } from '@/components/property/PropertyCard'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { PageTransition } from '@/components/ui/PageTransition'

interface Props { params: { slug: string } }

const TYPE_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  land: 'Land',
  'mixed-use': 'Mixed Use',
}

const STATUS_BADGE: Record<string, string> = {
  sold: 'Sold',
  reserved: 'Reserved',
  'off-plan': 'Off Plan',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await prisma.property.findFirst({
    where: { slug: params.slug, published: true },
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
  })
  if (!property) return { title: 'Property Not Found' }
  const imageUrl = property.images[0]?.url
  return {
    title: property.title,
    description: `${property.specsBedrooms ?? ''} bedroom ${property.type} in ${property.locationArea}, ${property.locationCity}.`,
    openGraph: imageUrl ? { images: [{ url: imageUrl }] } : undefined,
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const raw = await prisma.property.findFirst({
    where: { slug: params.slug, published: true },
    include: { images: true },
  })
  if (!raw) notFound()
  const property = mapProperty(raw)

  const heroImage = property.gallery[0]
  const remainingImages = property.gallery.slice(1)

  const hasGallery = property.gallery.length > 1
  const showStatusBadge = property.status !== 'available' && STATUS_BADGE[property.status]

  const relatedRaw = await prisma.property.findMany({
    where: {
      published: true,
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
      <div>
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[400px] max-h-[650px]">
          {heroImage ? (
            <>
              <Image
                src={heroImage.url}
                alt={heroImage.alt ?? property.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {hasGallery && (
                <span className="absolute top-6 right-6 bg-espresso/70 text-cream text-body-sm px-3 py-1.5 rounded-full backdrop-blur-sm z-10">
                  {property.gallery.length} photo{property.gallery.length > 1 ? 's' : ''}
                </span>
              )}
            </>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-espresso to-taupe" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />

          <div className="absolute bottom-0 inset-x-0 pb-10 md:pb-14">
            <div className="container-lp">
              <p className="label-caps text-gold mb-3">Property</p>
              <h1 className="heading-h1 text-cream max-w-3xl mb-3">{property.title}</h1>
              <p className="flex items-center gap-2 text-cream/80 text-body-md mb-5">
                <MapPin size={16} />
                {property.location.area}, {property.location.city}, {property.location.state}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-cream/20 text-cream label-caps px-3 py-1.5 rounded">
                  {TYPE_LABELS[property.type]}
                </span>
                {showStatusBadge && (
                  <span className="bg-terracotta text-white label-caps px-3 py-1.5 rounded">
                    {STATUS_BADGE[property.status]}
                  </span>
                )}
                <span className="font-display text-h2 font-semibold text-gold">
                  {property.priceOnRequest ? 'Price on Request' : property.price ? formatPrice(property.price) : '—'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Partner gallery */}
        {hasGallery && (
          <section className="section-padding-sm bg-cream">
            <div className="container-lp">
              <PropertyGallery images={remainingImages} title={property.title} />
            </div>
          </section>
        )}

        {/* Content + enquiry */}
        <section className="section-padding bg-white">
          <div className="container-lp">
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
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="section-padding bg-cream">
            <div className="container-lp">
              <p className="label-caps text-terracotta mb-3">You Might Also Like</p>
              <h2 className="heading-h2 text-espresso mb-10">Similar Properties</h2>
              <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(p => (
                  <StaggerItem key={p.id}>
                    <PropertyCard property={p} />
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
