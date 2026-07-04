import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.slug },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
  })
  if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(property)
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    await prisma.propertyImage.deleteMany({ where: { propertyId: params.slug } })
    const property = await prisma.property.update({
      where: { id: params.slug },
      data: {
        slug: body.slug,
        title: body.title,
        type: body.type,
        status: body.status,
        locationArea: body.locationArea,
        locationCity: body.locationCity,
        locationState: body.locationState,
        price: body.price ? parseFloat(body.price) : null,
        priceOnRequest: body.priceOnRequest ?? false,
        specsBedrooms: body.specsBedrooms ? parseInt(body.specsBedrooms) : null,
        specsBathrooms: body.specsBathrooms ? parseInt(body.specsBathrooms) : null,
        specsSqm: body.specsSqm ? parseFloat(body.specsSqm) : null,
        specsParking: body.specsParking ? parseInt(body.specsParking) : null,
        description: body.description ?? '',
        highlights: body.highlights ?? '[]',
        featured: body.featured ?? false,
        published: body.published ?? true,
        images: body.images?.length ? {
          create: body.images.map((img: { url: string; alt?: string; caption?: string }, i: number) => ({
            url: img.url,
            alt: img.alt ?? null,
            caption: img.caption ?? null,
            sortOrder: i,
          })),
        } : undefined,
      },
      include: { images: true },
    })
    return NextResponse.json(property)
  } catch (error) {
    console.error('Update property error:', error)
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await prisma.property.delete({ where: { id: params.slug } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete property error:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
