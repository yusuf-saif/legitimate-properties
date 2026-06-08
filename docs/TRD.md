# Technical Requirements Document
> Legitimate Properties — Corporate Website

## Stack
| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 (App Router) | SSR/ISR for SEO, server components for perf |
| Language | TypeScript (strict) | Type safety across Sanity ↔ components |
| Styling | Tailwind CSS | Design token system, purged CSS |
| CMS | Sanity.io (headless) | Flexible schemas, great media handling |
| Fonts | next/font (Google) | Zero CLS, self-hosted |
| Animation | Framer Motion | Spring physics, interruptible, gesture support |
| Forms | React Hook Form + Zod | Performant, typed validation |
| Images | Next/Image + Cloudinary | WebP, lazy, responsive, blur placeholder |
| Hosting | Vercel | Edge CDN, ISR, automatic deploys |
| Analytics | GA4 + GSC | Standard Nigerian market stack |

## Architecture — App Router
```
src/app/
  layout.tsx              ← root: fonts, metadata, analytics
  (marketing)/
    layout.tsx            ← adds Navbar + Footer + WhatsApp float
    page.tsx              ← Home
    properties/page.tsx   ← Properties listing
    about/page.tsx
    contact/page.tsx
    investors/page.tsx
    news/page.tsx
    services/page.tsx
  properties/[slug]/
    page.tsx              ← Property detail (dynamic)
  news/[slug]/
    page.tsx              ← News article (dynamic)
  api/
    enquiry/route.ts      ← POST: form submission → email
    contact/route.ts      ← POST: contact form → email
```

## Data Flow
```
Sanity Studio (CMS editor)
  → Sanity CDN
    → Next.js server component (fetch via GROQ)
      → Page renders with data
        → ISR revalidates every 3600s
          → On-demand revalidate via webhook (future)
```

## Performance Targets
- LCP < 2.5s (hero image preloaded, above-fold only)
- CLS = 0 (all images with explicit dimensions, no layout shift fonts)
- Bundle size < 200KB JS (server components for data fetching)
- Images: WebP via Next/Image + Cloudinary, blur placeholder

## SEO Implementation
- Metadata API (generateMetadata per page)
- Structured data: Organization + RealEstateListing schemas
- Auto XML sitemap (next-sitemap)
- robots.txt
- OG + Twitter Card meta on all pages
- Canonical URLs

## Security
- CSP headers via next.config.ts
- reCAPTCHA v3 on all forms
- NDPR consent checkbox on forms
- No PII logged server-side
- Sanity API token server-only (never client)

## Environment Variables
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=   # Sanity project
NEXT_PUBLIC_SANITY_DATASET=      # production
SANITY_API_TOKEN=                # server-only write token
NEXT_PUBLIC_APP_URL=             # https://legitimateproperties.ng
NEXT_PUBLIC_WA_NUMBER=           # WhatsApp business number
RESEND_API_KEY=                  # Email sending
CONTACT_EMAIL=                   # Destination for form emails
```
