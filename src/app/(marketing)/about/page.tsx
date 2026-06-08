import { BrandStory } from '@/components/sections/BrandStory'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { MilestonesTimeline } from '@/components/sections/MilestonesTimeline'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { ValueProps } from '@/components/sections/ValueProps'
import { sanityClient } from '@/lib/sanity/client'
import { TEAM_QUERY } from '@/lib/sanity/queries'
import type { TeamMember } from '@/types'

export const revalidate = 3600

export default async function AboutPage() {
  const team = sanityClient
    ? await sanityClient.fetch<TeamMember[]>(TEAM_QUERY)
    : []

  return (
    <div className="pt-24">
      <section className="section-padding-sm bg-espresso text-cream">
        <div className="container-lp">
          <p className="label-caps text-gold mb-4">About</p>
          <h1 className="heading-h1 max-w-2xl">Our Story</h1>
        </div>
      </section>

      <BrandStory />
      <ValueProps />
      <TeamGrid team={team} />
      <MilestonesTimeline />
      <FooterCTA />
    </div>
  )
}
