import { Building2, Home, Key, TrendingUp } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { PageTransition } from '@/components/ui/PageTransition'
import { FooterCTA } from '@/components/sections/FooterCTA'

const SERVICES = [
  {
    icon: Home,
    title: 'Residential Sales',
    description: 'Guidance for buying and selling premium homes with a process built on clarity, care, and strong market judgment.',
  },
  {
    icon: Building2,
    title: 'Commercial Leasing',
    description: 'Support for office and retail space decisions, from location strategy to negotiation and final occupancy planning.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisory',
    description: 'Portfolio strategy, market insight, and off-plan opportunities tailored to long-term value creation.',
  },
  {
    icon: Key,
    title: 'Property Management',
    description: 'End-to-end management for landlords who want dependable oversight, tenant coordination, and asset care.',
  },
]

const PROCESS = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin with your goals, timeline, and priorities.',
  },
  {
    number: '02',
    title: 'Property Match',
    description: 'We narrow the field to the right opportunities quickly.',
  },
  {
    number: '03',
    title: 'Due Diligence',
    description: 'We verify details, documents, and commercial terms carefully.',
  },
  {
    number: '04',
    title: 'Completion',
    description: 'We guide the final steps through close and handover.',
  },
]

export default async function ServicesPage() {
  return (
    <PageTransition><div className="pt-24">
      <section className="section-padding-sm bg-espresso text-cream">
        <div className="container-lp">
          <p className="label-caps text-gold mb-4">What We Do</p>
          <h1 className="heading-h1 max-w-2xl">Our Services</h1>
        </div>
      </section>

      <Reveal as="section" className="section-padding bg-white">
        <div className="container-lp">
          <div className="mb-10 text-center">
            <p className="label-caps text-terracotta mb-3">Service Lines</p>
            <h2 className="heading-h2 text-espresso">Real estate support with depth and discretion.</h2>
          </div>
          <StaggerGrid className="grid gap-6 lg:grid-cols-2">
            {SERVICES.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <article className="rounded-card bg-cream p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                    <Icon size={24} />
                  </div>
                  <h3 className="heading-h3 text-espresso mb-3">{title}</h3>
                  <p className="text-body-md text-text-muted">{description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Reveal>

      <Reveal as="section" className="section-padding bg-cream">
        <div className="container-lp">
          <div className="mb-10 text-center">
            <p className="label-caps text-terracotta mb-3">Process</p>
            <h2 className="heading-h2 text-espresso">How We Work</h2>
          </div>
          <StaggerGrid className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PROCESS.map(step => (
              <StaggerItem key={step.number}>
                <article className="relative overflow-hidden rounded-card border border-border-soft bg-white p-6">
                  <span className="pointer-events-none absolute right-4 top-2 font-display text-display-lg text-terracotta/20">
                    {step.number}
                  </span>
                  <h3 className="heading-h4 text-espresso relative mb-3 mt-8">{step.title}</h3>
                  <p className="text-body-sm text-text-muted relative">{step.description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Reveal>

      <FooterCTA />
    </div></PageTransition>
  )
}
