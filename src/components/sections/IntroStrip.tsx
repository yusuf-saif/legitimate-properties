'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/lib/hooks/useInView'

function CountUp({ target, suffix = '' }: { target: number, suffix: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!inView) return

    let start = 0
    const step = target / 40
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 25)

    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref as any}>{count}{suffix}</span>
}

export function IntroStrip() {
  return (
    <section className="section-padding-sm bg-white border-y border-border-soft">
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
            <p className="font-display text-h1 font-semibold text-terracotta mb-1"><CountUp target={12} suffix="+" /></p>
            <p className="text-text-muted text-body-sm">Years in Real Estate</p>
          </div>
          <div className="p-6 bg-cream rounded-card border border-border-soft">
            <p className="font-display text-h1 font-semibold text-terracotta mb-1"><CountUp target={300} suffix="+" /></p>
            <p className="text-text-muted text-body-sm">Properties Delivered</p>
          </div>
          <div className="p-6 bg-cream rounded-card border border-border-soft">
            <p className="font-display text-h1 font-semibold text-terracotta mb-1"><CountUp target={6} suffix="" /></p>
            <p className="text-text-muted text-body-sm">Cities Covered</p>
          </div>
          <div className="p-6 bg-cream rounded-card border border-border-soft">
            <p className="font-display text-h1 font-semibold text-terracotta mb-1"><CountUp target={98} suffix="%" /></p>
            <p className="text-text-muted text-body-sm">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
