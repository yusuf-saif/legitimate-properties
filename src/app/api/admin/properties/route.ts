import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const properties = await prisma.property.findMany({
    include: { images: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(properties)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const property = await prisma.property.create({
      data: {
        slug: body.slug,
        title: body.title,
        type: body.type,
        status: body.status ?? 'available',
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
    console.error('Create property error:', error)
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
  }
}
