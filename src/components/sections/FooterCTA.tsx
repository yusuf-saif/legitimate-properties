import Link from 'next/link'

export function FooterCTA() {
  return (
    <section className="section-padding bg-terracotta">
      <div className="container-lp text-center">
        <h2 className="heading-display-lg text-white mb-4">
          Ready to Find Your Property?
        </h2>
        <p className="text-white/80 text-body-lg max-w-xl mx-auto mb-10">
          Whether you are buying, investing, or just exploring — our team is here to guide you every step of the way.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/properties"
            className="px-8 py-4 bg-white text-terracotta font-semibold rounded-lg hover:bg-cream transition-colors text-body-md">
            Browse Listings
          </Link>
          <Link href="/contact"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-body-md">
            Schedule a Call
          </Link>
        </div>
      </div>
    </section>
  )
}
