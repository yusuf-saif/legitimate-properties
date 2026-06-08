'use client'

import { ShieldCheck, Star, Users, MapPin } from 'lucide-react'
import { useInView } from '@/lib/hooks/useInView'

const VALUES = [
  { icon: ShieldCheck, title: 'Transparency',  desc: 'Every transaction is open, honest, and fully documented. No hidden fees, no surprises.' },
  { icon: Star,        title: 'Quality',        desc: 'We curate only properties that meet our rigorous standards for construction, location, and value.' },
  { icon: Users,       title: 'Community',      desc: 'We invest in the neighbourhoods we operate in — building connections that last beyond the sale.' },
  { icon: MapPin,      title: 'Local Expertise',desc: 'Deep knowledge of the Nigerian market means you get guidance grounded in real experience.' },
]

export function ValueProps() {
  const { ref, inView } = useInView()

  return (
    <section className="section-padding bg-cream">
      <div className="container-lp">
        <div className="text-center mb-14">
          <p className="label-caps text-terracotta mb-3">Why Choose Us</p>
          <h2 className="heading-h2 text-espresso">The Legitimate Difference</h2>
        </div>
        <div ref={ref as any} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className="p-7 bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
              style={inView ? {
                animation: `fadeUp 0.5s cubic-bezier(0.23,1,0.32,1) ${index * 80}ms both`
              } : { opacity: 0 }}
            >
              <div className="w-11 h-11 rounded-lg bg-terracotta/10 flex items-center justify-center mb-5 group-hover:bg-terracotta transition-colors duration-300">
                <Icon size={22} className="text-terracotta group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="heading-h4 text-espresso mb-2">{title}</h3>
              <p className="text-text-muted text-body-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
