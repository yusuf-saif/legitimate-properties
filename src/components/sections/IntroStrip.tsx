'use client'

import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Reveal } from '@/components/ui/Reveal'

export function IntroStrip() {
  return (
    <Reveal as="section" className="section-padding-sm bg-white border-y border-border-soft">
      <div className="container-lp grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="label-caps text-terracotta mb-3">About Us</p>
          <h2 className="heading-h2 text-espresso mb-4">
            Built on trust. Driven by quality.
          </h2>
          <p className="text-body-md text-text-muted max-w-prose">
            Legitimate Properties has spent over a decade earning the trust of homebuyers, investors, and communities across Nigeria. We do not just sell properties — we create lasting homes and reliable investment opportunities.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-cream rounded-card border border-border-soft">
            <p className="font-display text-h1 font-semibold text-terracotta mb-1"><AnimatedCounter target={12} suffix="+" /></p>
            <p className="text-text-muted text-body-sm">Years in Real Estate</p>
          </div>
          <div className="p-6 bg-cream rounded-card border border-border-soft">
            <p className="font-display text-h1 font-semibold text-terracotta mb-1"><AnimatedCounter target={300} suffix="+" /></p>
            <p className="text-text-muted text-body-sm">Properties Delivered</p>
          </div>
          <div className="p-6 bg-cream rounded-card border border-border-soft">
            <p className="font-display text-h1 font-semibold text-terracotta mb-1"><AnimatedCounter target={6} /></p>
            <p className="text-text-muted text-body-sm">Cities Covered</p>
          </div>
          <div className="p-6 bg-cream rounded-card border border-border-soft">
            <p className="font-display text-h1 font-semibold text-terracotta mb-1"><AnimatedCounter target={98} suffix="%" /></p>
            <p className="text-text-muted text-body-sm">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
