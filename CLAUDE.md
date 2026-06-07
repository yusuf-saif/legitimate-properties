# Legitimate Properties — Website Project

## Stack
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS with custom design tokens
- **CMS**: Sanity.io (headless)
- **Fonts**: Cormorant Garamond (display) + Inter (body) via next/font
- **Animation**: Framer Motion (use `motion/react` import)
- **Forms**: React Hook Form + Zod validation
- **Image optimisation**: Next.js Image + Sanity image-url builder
- **Deployment**: Vercel

## Design System (always follow these)
### Colours (Tailwind tokens)
- `espresso`   = #2C2416 — dark backgrounds, headings
- `taupe`      = #7C6A50 — secondary text, icons  
- `gold`       = #B59A6A — accents, highlights (use sparingly)
- `cream`      = #F5F0E8 — page background, sections
- `terracotta` = #C47C50 — primary CTAs, badges, hover states
- `text-body`  = #3D3326 — body copy
- `text-muted` = #8C7B69 — captions, metadata
- `border-soft`= #D6C8B4 — dividers, input borders

### Typography
- Display/headings → `font-display` (Cormorant Garamond)
- Body/UI → `font-body` (Inter)
- Use `heading-display-xl`, `heading-h1`, `heading-h2`, `heading-h3`, `heading-h4` classes
- Use `label-caps` class for uppercase label text

### Layout
- Container: `container-lp` class (max-width 1280px, auto margins, responsive padding)
- Section spacing: `section-padding` (py-16 md:py-24 lg:py-32) or `section-padding-sm`
- Text prose width: `max-w-text` (760px max)
- 8px base grid — all spacing in multiples of 8

### Components
- **Button**: `<Button variant="primary|secondary|ghost" size="sm|md|lg">` → src/components/ui/Button.tsx
- **PropertyCard**: `<PropertyCard property={p} />` → src/components/property/PropertyCard.tsx
- **EnquiryForm**: `<EnquiryForm propertySlug="" propertyTitle="" />` → src/components/forms/EnquiryForm.tsx
- **Navbar / Footer / WhatsAppButton**: → src/components/layout/

### Key Hooks
- `useScrolled(threshold)` — returns boolean, navbar bg toggle
- `useInView(options)` — returns { ref, inView } for scroll animations

### Utilities
- `cn(...classes)` — clsx + tailwind-merge
- `formatPrice(amount, compact?)` — formats NGN prices
- `formatDate(dateString)` — human-readable date
- `urlFor(sanityImage)` — Sanity image URL builder

## Data & Queries
- Sanity client → `src/lib/sanity/client.ts`
- GROQ queries → `src/lib/sanity/queries.ts`
- Types → `src/types/index.ts`

## Pages to Build (status)
- [x] Home `/` — all sections wired
- [x] Properties listing `/properties`
- [x] Property detail `/properties/[slug]`
- [ ] About `/about`
- [ ] Services `/services`
- [ ] Investors `/investors`
- [ ] News listing `/news`
- [ ] News detail `/news/[slug]`
- [ ] Contact `/contact`
- [ ] 404 page

## Environment Variables
See `.env.example`. Copy to `.env.local` and fill in values before `npm run dev`.

## Code Conventions
- All pages are **server components** by default (async, fetch from Sanity)
- Mark `'use client'` only when using hooks, events, or browser APIs
- `export const revalidate = 3600` on all pages (ISR, 1hr)
- No inline styles — use Tailwind classes only
- Images must always have meaningful `alt` text
- Forms must have proper error states and WCAG accessible labels
- Never use `any` type — define all types in `src/types/index.ts`

## Remaining Work
1. Wire `PropertyFilters` to URL search params (useSearchParams + router.push)
2. Complete remaining pages (About, Services, Investors, News, Contact)
3. Build `/api/contact` route (mirror of /api/enquiry)
4. Add Sanity `teamMember` schema and About page
5. Email sending in API routes (recommend Resend)
6. Add `PropertyGallery` lightbox (use embla-carousel-react)
7. Deploy to Vercel, connect Sanity project, set env vars
