const STATS = [
  { value: '12+', label: 'Years in Real Estate' },
  { value: '300+', label: 'Properties Delivered' },
  { value: '6',   label: 'Cities Covered' },
  { value: '98%', label: 'Client Satisfaction' },
]

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
          {STATS.map(({ value, label }) => (
            <div key={label} className="p-6 bg-cream rounded-card border border-border-soft">
              <p className="font-display text-h1 font-semibold text-terracotta mb-1">{value}</p>
              <p className="text-text-muted text-body-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
