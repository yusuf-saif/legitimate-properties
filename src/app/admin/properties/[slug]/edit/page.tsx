import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { PropertyForm } from '../../PropertyForm'

export default async function EditPropertyPage({ params }: { params: { slug: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.slug },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
  })
  if (!property) notFound()

  return (
    <PropertyForm initial={{
      id: property.id,
      slug: property.slug,
      title: property.title,
      type: property.type,
      status: property.status,
      locationArea: property.locationArea,
      locationCity: property.locationCity,
      locationState: property.locationState,
      price: property.price,
      priceOnRequest: property.priceOnRequest,
      specsBedrooms: property.specsBedrooms,
      specsBathrooms: property.specsBathrooms,
      specsSqm: property.specsSqm,
      specsParking: property.specsParking,
      description: property.description,
      highlights: property.highlights,
      featured: property.featured,
      published: property.published,
      images: property.images.map(img => ({ url: img.url, alt: img.alt ?? undefined, caption: img.caption ?? undefined })),
    }} />
  )
}
