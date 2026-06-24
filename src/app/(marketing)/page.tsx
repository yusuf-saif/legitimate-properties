import type { Metadata } from 'next'
import { HeroSection }        from '@/components/sections/HeroSection'
import { IntroStrip }         from '@/components/sections/IntroStrip'
import { FeaturedProperties } from '@/components/sections/FeaturedProperties'
import { ValueProps }         from '@/components/sections/ValueProps'
import { Testimonials }       from '@/components/sections/Testimonials'
import { LatestNews }         from '@/components/sections/LatestNews'
import { FooterCTA }          from '@/components/sections/FooterCTA'
import { PageTransition }     from '@/components/ui/PageTransition'
import { prisma }             from '@/lib/prisma'
import { mapProperty, mapNewsPost } from '@/lib/mappers'

export const metadata: Metadata = {
  title: 'Legitimate Properties — Premium Real Estate in Nigeria',
}

export default async function HomePage() {
  const [featuredRaw, newsRaw] = await Promise.all([
    prisma.property.findMany({
      where: { featured: true },
      take: 3,
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.newsPost.findMany({
      take: 3,
      orderBy: { publishedAt: 'desc' },
    }),
  ])

  const featured = featuredRaw.map(mapProperty)
  const news = newsRaw.map(mapNewsPost)

  return (
    <PageTransition>
      <HeroSection />
      <IntroStrip />
      <FeaturedProperties properties={featured} />
      <ValueProps />
      <Testimonials />
      <LatestNews posts={news} />
      <FooterCTA />
    </PageTransition>
  )
}
