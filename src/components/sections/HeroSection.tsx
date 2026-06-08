import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-espresso">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(75,163,211,0.10) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso/95 to-[#0f1e38]" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/75 via-espresso/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container-lp w-full">
        <p
          className="label-caps text-gold mb-4"
          style={{ animation: 'fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) 100ms both' }}
        >
          Premium Real Estate · Nigeria
        </p>
        <h1
          className="heading-display-xl text-cream max-w-3xl"
          style={{ animation: 'fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) 250ms both' }}
        >
          Where Homes<br />
          <em className="text-gold not-italic">Tell Stories.</em>
        </h1>
        <p
          className="text-cream/70 text-body-lg max-w-xl mt-6 mb-10"
          style={{ animation: 'fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) 400ms both' }}
        >
          Discover exceptional properties built for quality living — residential, commercial, and investment opportunities across Nigeria.
        </p>
        <div
          className="flex flex-wrap gap-4"
          style={{ animation: 'fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) 550ms both' }}
        >
          <Link href="/properties"
            className="inline-flex items-center px-8 py-4 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta/90 transition-colors text-body-md">
            Explore Properties
          </Link>
          <Link href="/contact"
            className="inline-flex items-center px-8 py-4 border border-cream/50 text-cream font-semibold rounded-lg hover:bg-cream/10 transition-colors text-body-md">
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  )
}
