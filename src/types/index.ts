// ── Property ─────────────────────────────────────────────────────────────────
export type PropertyType = 'residential' | 'commercial' | 'land' | 'mixed-use'
export type PropertyStatus = 'available' | 'sold' | 'reserved' | 'off-plan'

export interface PropertySpec {
  bedrooms?: number
  bathrooms?: number
  sqm?: number
  parking?: number
}

export interface ImageField {
  url: string
  alt?: string
  caption?: string
}

export interface Property {
  id: string
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
  description: string
  highlights: string[]
  gallery: ImageField[]
  featured: boolean
  createdAt: string
}

// ── Team Member ───────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string
  name: string
  title: string
  bio?: string
  photo?: ImageField | null
  order: number
}

// ── News / Blog ───────────────────────────────────────────────────────────────
export type NewsCategory = 'market-insight' | 'company-news' | 'development-update' | 'investment'

export interface NewsPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: NewsCategory
  featuredImage?: ImageField | null
  author: string
  publishedAt: string
  body: string
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
