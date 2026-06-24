import { ContactForm } from '@/components/forms/ContactForm'
import { Reveal } from '@/components/ui/Reveal'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function ContactPage() {
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? ''}`

  return (
    <PageTransition><div className="pt-24">
      <section className="section-padding-sm bg-espresso text-cream">
        <div className="container-lp">
          <p className="label-caps text-gold mb-4">Contact</p>
          <h1 className="heading-h1 max-w-2xl">Start the conversation about your next move.</h1>
        </div>
      </section>

      <Reveal as="section" className="section-padding bg-cream">
        <div className="container-lp grid gap-10 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-card border border-border-soft bg-white p-6 shadow-card">
              <p className="label-caps text-terracotta mb-3">Office Information</p>
              <h2 className="heading-h3 text-espresso mb-6">Speak with our team directly.</h2>

              <div className="space-y-5 text-body-md text-text-body">
                <div>
                  <p className="text-body-sm font-semibold text-espresso mb-1.5">Address</p>
                  <p className="text-text-muted">Abuja, Federal Capital Territory, Nigeria</p>
                </div>

                <div>
                  <p className="text-body-sm font-semibold text-espresso mb-1.5">Phone</p>
                  <a href="tel:+2341234567890" className="text-text-muted transition-colors duration-200 hover:text-terracotta">
                    +234 123 456 7890
                  </a>
                </div>

                <div>
                  <p className="text-body-sm font-semibold text-espresso mb-1.5">Email</p>
                  <a href="mailto:hello@legitimateproperties.ng" className="text-text-muted transition-colors duration-200 hover:text-terracotta">
                    hello@legitimateproperties.ng
                  </a>
                </div>

                <div>
                  <p className="text-body-sm font-semibold text-espresso mb-1.5">Hours</p>
                  <p className="text-text-muted">Monday to Friday, 9:00 AM to 5:00 PM</p>
                </div>
              </div>

              <div className="mt-8 border-t border-border-soft pt-6">
                <p className="text-body-sm text-text-muted mb-4">Prefer WhatsApp? Reach us there for a faster response.</p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-terracotta px-6 py-3 text-body-sm font-semibold text-white transition-colors duration-200 hover:bg-terracotta/90"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Reveal>
    </div></PageTransition>
  )
}
