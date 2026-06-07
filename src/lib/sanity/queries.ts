import { groq } from 'next-sanity'

// ── Image projection helper ───────────────────────────────────────────────────
const imageFields = groq`
  asset->{ _id, url, metadata { dimensions, lqip } },
  alt, caption, hotspot, crop
`

// ── Property queries ──────────────────────────────────────────────────────────
export const PROPERTIES_QUERY = groq`
  *[_type == "property" && !(_id in path("drafts.**"))] | order(featured desc, createdAt desc) {
    _id, slug, title, type, status, location,
    price, priceOnRequest, specs, highlights, featured, createdAt,
    "gallery": gallery[0..0]{ ${imageFields} }
  }
`

export const FEATURED_PROPERTIES_QUERY = groq`
  *[_type == "property" && featured == true && !(_id in path("drafts.**"))] | order(createdAt desc) [0..2] {
    _id, slug, title, type, status, location,
    price, priceOnRequest, specs, featured,
    "heroImage": gallery[0]{ ${imageFields} }
  }
`

export const PROPERTY_BY_SLUG_QUERY = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id, slug, title, type, status, location,
    price, priceOnRequest, specs, description, highlights,
    "gallery": gallery[]{ ${imageFields} }
  }
`

export const RELATED_PROPERTIES_QUERY = groq`
  *[_type == "property" && slug.current != $slug && (type == $type || location.city == $city) && !(_id in path("drafts.**"))] | order(createdAt desc) [0..2] {
    _id, slug, title, type, status, location,
    price, priceOnRequest, specs,
    "heroImage": gallery[0]{ ${imageFields} }
  }
`

// ── News queries ──────────────────────────────────────────────────────────────
export const NEWS_QUERY = groq`
  *[_type == "newsPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id, slug, title, excerpt, category, author, publishedAt,
    "featuredImage": featuredImage{ ${imageFields} }
  }
`

export const NEWS_BY_SLUG_QUERY = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id, slug, title, excerpt, category, author, publishedAt, body,
    "featuredImage": featuredImage{ ${imageFields} }
  }
`

// ── Team query ────────────────────────────────────────────────────────────────
export const TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, title, bio,
    "photo": photo{ ${imageFields} }
  }
`
