import { FileText } from 'lucide-react'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { PageTransition } from '@/components/ui/PageTransition'

const METRICS = [
  { value: '₦12B+', label: 'Portfolio Value' },
  { value: '300+', label: 'Units Delivered' },
  { value: '12+', label: 'Years Operating' },
  { value: '6', label: 'Cities Active' },
]

const INVESTOR_BENEFITS = [
  'Dedicated relationship manager',
  'Quarterly performance reports',
  'Early access to off-plan opportunities',
]

const DOCUMENTS = [
  {
    title: 'Company Profile',
    description: 'A concise overview of our operating model, portfolio mix, and development outlook.',
  },
  {
    title: 'Investment Brief',
    description: 'A summary of current opportunities, target markets, and the value proposition for new investors.',
  },
]

export default async function InvestorsPage() {
  return (
    <PageTransition><div className="pt-24">
      <section className="section-padding-sm bg-espresso text-cream">
        <div className="container-lp">
          <p className="label-caps text-gold mb-4">Investor Relations</p>
          <h1 className="heading-h1 max-w-2xl mb-4">Invest With Confidence</h1>
          <p className="text-body-lg text-cream/70 max-w-2xl">
            We work with investors who value disciplined execution, local market insight, and a partner committed to long-term quality.
          </p>
        </div>
      </section>

      <Reveal as="section" className="section-padding-sm bg-white border-y border-border-soft">
        <StaggerGrid className="container-lp grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map(metric => (
            <StaggerItem key={metric.label}>
              <div className="rounded-card border border-border-soft bg-cream p-6">
                <p className="font-display text-h1 font-semibold text-terracotta mb-1">{metric.value}</p>
                <p className="text-body-sm text-text-muted">{metric.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Reveal>

      <Reveal as="section" className="section-padding bg-cream">
        <div className="container-lp grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="label-caps text-terracotta mb-3">Investment Case</p>
            <h2 className="heading-h2 text-espresso mb-6">Why Legitimate Properties</h2>
            <ul className="space-y-4 text-body-md text-text-muted">
              <li>Transparent communication and reporting throughout the investment cycle.</li>
              <li>A track record built on delivered units, disciplined sourcing, and measured growth.</li>
              <li>Deep local expertise across Nigerian markets where timing, context, and relationships matter.</li>
            </ul>
          </div>

          <div className="rounded-card border border-border-soft bg-white p-6 shadow-card">
            <p className="label-caps text-terracotta mb-3">What You Receive</p>
            <h3 className="heading-h3 text-espresso mb-6">A relationship built for clarity.</h3>
            <ul className="space-y-3 text-body-sm text-text-muted">
              {INVESTOR_BENEFITS.map(benefit => (
                <li key={benefit} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gold" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section-padding-sm bg-white">
        <div className="container-lp">
          <div className="mb-10 text-center">
            <p className="label-caps text-terracotta mb-3">Documents</p>
            <h2 className="heading-h2 text-espresso">Materials for your review.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {DOCUMENTS.map(document => (
              <div key={document.title} className="rounded-card border border-border-soft bg-cream p-6 shadow-card">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                  <FileText size={22} />
                </div>
                <h3 className="heading-h4 text-espresso mb-2">{document.title}</h3>
                <p className="text-body-sm text-text-muted mb-5">{document.description}</p>
                <a href="#" className="inline-flex">
                  <Button variant="secondary" type="button">Download PDF</Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section-padding bg-espresso">
        <div className="container-lp text-center">
          <p className="label-caps text-gold mb-3">Request Information</p>
          <h2 className="heading-h2 text-cream mb-4">Request an Investor Pack</h2>
          <p className="text-body-lg text-cream/70 max-w-2xl mx-auto mb-10">
            Tell us about your interests and our team will share the right materials and next steps.
          </p>
          <div className="mx-auto max-w-lg text-left">
            <EnquiryForm propertyTitle="Investor Pack Request" />
          </div>
        </div>
      </Reveal>
    </div></PageTransition>
  )
}
