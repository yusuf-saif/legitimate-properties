import type { Metadata } from 'next'
import { HeroSection }        from '@/components/sections/HeroSection'
import { IntroStrip }         from '@/components/sections/IntroStrip'
import { FeaturedProperties } from '@/components/sections/FeaturedProperties'
import { ValueProps }         from '@/components/sections/ValueProps'
import { Testimonials }       from '@/components/sections/Testimonials'
import { LatestNews }         from '@/components/sections/LatestNews'
import { FooterCTA }          from '@/components/sections/FooterCTA'
import { sanityClient }       from '@/lib/sanity/client'
import { FEATURED_PROPERTIES_QUERY, NEWS_QUERY } from '@/lib/sanity/queries'
import type { Property, NewsPost } from '@/types'

export const metadata: Metadata = {
  title: 'Legitimate Properties — Premium Real Estate in Nigeria',
}

export const revalidate = 3600 // ISR — revalidate every hour

export default async function HomePage() {
  const [featured, news] = await Promise.all([
    sanityClient.fetch<Property[]>(FEATURED_PROPERTIES_QUERY),
    sanityClient.fetch<NewsPost[]>(NEWS_QUERY + ' [0..2]'),
  ])

  return (
    <>
      <HeroSection />
      <IntroStrip />
      <FeaturedProperties properties={featured} />
      <ValueProps />
      <Testimonials />
      <LatestNews posts={news} />
      <FooterCTA />
    </>
  )
}
