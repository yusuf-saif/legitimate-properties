'use client'

import { Reveal } from '@/components/ui/Reveal'

const MILESTONES = [
  { year: '2012', title: 'Founded in Abuja', description: 'Legitimate Properties launched with a focus on trusted advisory and carefully selected residential listings.' },
  { year: '2015', title: 'First Development Completed', description: 'We delivered our first signature project and established the quality benchmark that still guides our work.' },
  { year: '2019', title: 'Expanded to a Second City', description: 'Our portfolio grew beyond Abuja, opening access to clients seeking opportunities in another key market.' },
  { year: '2024', title: 'Operating at Scale', description: 'Today we support buyers, investors, and partners with a broader portfolio and a stronger advisory team.' },
]

export function MilestonesTimeline() {
  return (
    <Reveal as="section" className="section-padding bg-white">
      <div className="container-lp">
        <Reveal className="mb-14 text-center">
          <p className="label-caps text-terracotta mb-3">Milestones</p>
          <h2 className="heading-h2 text-espresso">A steady record of growth.</h2>
        </Reveal>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-border-soft md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-0">
            {MILESTONES.map((milestone, index) => {
              const isRight = index % 2 === 1

              return (
                <Reveal key={milestone.year} delay={index * 0.1}
                  className="relative md:grid md:grid-cols-2 md:gap-12">
                  <div className={isRight ? 'md:col-start-2' : ''}>
                    <article className="relative ml-12 rounded-card border border-border-soft bg-cream p-6 md:ml-0">
                      <div className="absolute left-[-2.25rem] top-8 h-3 w-3 rounded-full bg-terracotta md:left-auto md:right-auto md:top-10" />
                      <p className="heading-h2 text-terracotta mb-2">{milestone.year}</p>
                      <h3 className="heading-h4 text-espresso mb-2">{milestone.title}</h3>
                      <p className="text-body-sm text-text-muted">{milestone.description}</p>
                    </article>
                  </div>
                  <div className={isRight ? 'hidden md:block' : 'hidden md:block'} />
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
