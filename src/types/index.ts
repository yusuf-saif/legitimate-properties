// ── Property ─────────────────────────────────────────────────────────────────
export type PropertyType = 'residential' | 'commercial' | 'land' | 'mixed-use'
export type PropertyStatus = 'available' | 'sold' | 'reserved' | 'off-plan'

export interface PropertySpec {
  bedrooms?: number
  bathrooms?: number
  sqm?: number
  parking?: number
}

export interface Property {
  _id: string
  slug: string
  title: string
  type: PropertyType
  status: PropertyStatus
  location: {
    area: string
    city: string
    state: string
  }
  price?: number
  priceOnRequest: boolean
  specs: PropertySpec
  description: string  // portable text
  highlights: string[]
  gallery: SanityImage[]
  featured: boolean
  createdAt: string
}

// ── Team Member ───────────────────────────────────────────────────────────────
export interface TeamMember {
  _id: string
  name: string
  title: string
  bio: string
  photo: SanityImage
  order: number
}

// ── News / Blog ───────────────────────────────────────────────────────────────
export type NewsCategory = 'market-insight' | 'company-news' | 'development-update' | 'investment'

export interface NewsPost {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: NewsCategory
  featuredImage: SanityImage
  author: string
  publishedAt: string
  body: unknown  // Sanity portable text
}

// ── Sanity ────────────────────────────────────────────────────────────────────
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
  caption?: string
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

// ── Forms ─────────────────────────────────────────────────────────────────────
export interface EnquiryFormData {
  name: string
  email: string
  phone: string
  message: string
  propertySlug?: string
  propertyTitle?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: 'general' | 'property-enquiry' | 'investment' | 'partnership' | 'other'
  message: string
  consent: boolean
}

// ── Navigation ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
