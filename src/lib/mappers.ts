import type { Property, ImageField, TeamMember, NewsPost } from '@/types'

interface PrismaProperty {
  id: string
  slug: string
  title: string
  type: string
  status: string
  locationArea: string
  locationCity: string
  locationState: string
  price: number | null
  priceOnRequest: boolean
  specsBedrooms: number | null
  specsBathrooms: number | null
  specsSqm: number | null
  specsParking: number | null
  description: string
  highlights: string
  featured: boolean
  createdAt: Date
  images?: { url: string; alt: string | null; caption: string | null; sortOrder: number }[]
}

export function mapProperty(p: PrismaProperty): Property {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    type: p.type as Property['type'],
    status: p.status as Property['status'],
    location: {
      area: p.locationArea,
      city: p.locationCity,
      state: p.locationState,
    },
    price: p.price ?? undefined,
    priceOnRequest: p.priceOnRequest,
    specs: {
      bedrooms: p.specsBedrooms ?? undefined,
      bathrooms: p.specsBathrooms ?? undefined,
      sqm: p.specsSqm ?? undefined,
      parking: p.specsParking ?? undefined,
    },
    description: p.description,
    highlights: JSON.parse(p.highlights || '[]'),
    gallery: (p.images ?? [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(img => ({
        url: img.url,
        alt: img.alt ?? undefined,
        caption: img.caption ?? undefined,
      })),
    featured: p.featured,
    createdAt: p.createdAt.toISOString(),
  }
}

interface PrismaTeamMember {
  id: string
  name: string
  title: string
  bio: string | null
  photoUrl: string | null
  photoAlt: string | null
  order: number
}

export function mapTeamMember(m: PrismaTeamMember): TeamMember {
  return {
    id: m.id,
    name: m.name,
    title: m.title,
    bio: m.bio ?? undefined,
    photo: m.photoUrl ? { url: m.photoUrl, alt: m.photoAlt ?? undefined } : null,
    order: m.order,
  }
}

interface PrismaNewsPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  publishedAt: Date
  body: string
  featuredImageUrl: string | null
  featuredImageAlt: string | null
}

export function mapNewsPost(p: PrismaNewsPost): NewsPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category as NewsPost['category'],
    author: p.author,
    publishedAt: p.publishedAt.toISOString(),
    body: p.body,
    featuredImage: p.featuredImageUrl ? { url: p.featuredImageUrl, alt: p.featuredImageAlt ?? undefined } : null,
  }
}
