import { BrandStory } from '@/components/sections/BrandStory'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { MilestonesTimeline } from '@/components/sections/MilestonesTimeline'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { ValueProps } from '@/components/sections/ValueProps'
import { PageTransition } from '@/components/ui/PageTransition'
import { prisma } from '@/lib/prisma'
import { mapTeamMember } from '@/lib/mappers'

export default async function AboutPage() {
  const raw = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  const team = raw.map(mapTeamMember)

  return (
    <PageTransition>
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
    </PageTransition>
  )
}
