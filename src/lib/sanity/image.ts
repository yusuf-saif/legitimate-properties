import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const hasValidProjectId = typeof projectId === 'string' && /^[a-z0-9-]+$/.test(projectId)

const builder = hasValidProjectId
  ? imageUrlBuilder({ projectId, dataset })
  : null

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error('Sanity project ID is not configured')
  }

  return builder.image(source)
}
