const TESTIMONIALS = [
  { quote: 'Working with Legitimate Properties was the smoothest property purchase I have ever made. They were honest, professional, and delivered exactly what they promised.', name: 'Amara Okafor', detail: '3-Bedroom Terrace, Maitama' },
  { quote: 'As an investor in the diaspora, I needed a team I could trust completely. Legitimate Properties exceeded my expectations at every step.', name: 'Chidi Nwosu', detail: 'Investment Portfolio, Abuja' },
  { quote: 'The quality of the finish on our home was outstanding. We visited the show unit and knew immediately — this was the standard we had been looking for.', name: 'Funke Adeyemi', detail: '4-Bedroom Detached, Gwarimpa' },
]

export function Testimonials() {
  return (
    <section className="section-padding bg-espresso">
      <div className="container-lp">
        <div className="text-center mb-14">
          <p className="label-caps text-gold mb-3">Client Stories</p>
          <h2 className="heading-h2 text-cream">Trusted by Homeowners<br />Across Nigeria</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, name, detail }) => (
            <blockquote key={name} className="p-7 bg-cream/5 border border-cream/10 rounded-card">
              <p className="text-cream/80 text-body-md leading-relaxed mb-6 italic">"{quote}"</p>
              <footer>
                <p className="text-cream font-semibold text-body-sm">{name}</p>
                <p className="text-gold text-body-sm mt-0.5">{detail}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
