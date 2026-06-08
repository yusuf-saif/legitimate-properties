# Product Requirements Document
> Legitimate Properties — Corporate Website
> See full PRD in `Legitimate_Properties_Website_PRD.docx` (delivered separately)

## TL;DR
Premium real estate website for Legitimate Properties (Nigeria). World-class, warm, earthy aesthetic. Four goals: browse & enquire on properties, build investor credibility, showcase portfolio, generate leads.

## Primary Goals
1. **Browse & Enquire** — clean property listings with filters + detail pages with sticky enquiry form
2. **Investor Credibility** — dedicated `/investors` page with downloads, key metrics, lead capture
3. **Showcase Brand** — editorial-quality homepage, about page with team + story
4. **Lead Generation** — WhatsApp float, enquiry forms, contact page, CTA strips throughout

## Pages (Priority)
| Page | Route | Status |
|------|-------|--------|
| Home | `/` | ✅ Built |
| Properties Listing | `/properties` | ✅ Built |
| Property Detail | `/properties/[slug]` | ✅ Built |
| About | `/about` | 🔲 TODO |
| Services | `/services` | 🔲 TODO |
| Investor Relations | `/investors` | 🔲 TODO |
| News Listing | `/news` | 🔲 TODO |
| News Detail | `/news/[slug]` | 🔲 TODO |
| Contact | `/contact` | 🔲 TODO |
| 404 | `/*` | 🔲 TODO |

## Audiences
- **HNW Buyers** — visual richness, easy browse, direct contact
- **Diaspora Investors** — trust signals, downloadable docs, transparency
- **Corporate Clients** — professional tone, spec detail, fast response
- **Regulators / Partners** — company info, compliance signals

## Success Metrics
- Time-on-site ≥ 2.5min avg
- Lead conversion ≥ 3% of unique monthly visitors
- Property listing engagement ≥ 40% view at least one detail page
- Mobile bounce rate < 45%
- Core Web Vitals: all green (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- WCAG 2.1 AA compliance
