import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-espresso">
      {/* Background image placeholder — replace src with Sanity/Cloudinary image */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/75 via-espresso/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center" />

      {/* Content */}
      <div className="relative z-20 container-lp w-full">
        <p className="label-caps text-gold mb-4 animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards', opacity: 0 }}>
          Premium Real Estate · Nigeria
        </p>
        <h1 className="heading-display-xl text-cream max-w-3xl animate-fade-up"
          style={{ animationDelay: '200ms', animationFillMode: 'forwards', opacity: 0 }}>
          Where Homes<br />
          <em className="text-gold not-italic">Tell Stories.</em>
        </h1>
        <p className="text-cream/70 text-body-lg max-w-xl mt-6 mb-10 animate-fade-up"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards', opacity: 0 }}>
          Discover exceptional properties built for quality living — residential, commercial, and investment opportunities across Nigeria.
        </p>
        <div className="flex flex-wrap gap-4 animate-fade-up"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards', opacity: 0 }}>
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-cream/50 animate-bounce">
        <div className="w-px h-10 bg-cream/30" />
        <span className="label-caps text-[10px]">Scroll</span>
      </div>
    </section>
  )
}
