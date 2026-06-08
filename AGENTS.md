# Legitimate Properties — Website
> OpenCode reads this automatically every session.

## Quick Context
Premium real estate website for Legitimate Properties (Nigeria). Next.js 14 + Sanity + Tailwind. Warm, earthy, editorial aesthetic. See `docs/` for full specs.

## Active Work
Check `docs/BUILD_PHASES.md` for current status. Phase 1 complete. Phase 2 (remaining pages) is next.

**Pages remaining:** `/about`, `/contact`, `/investors`, `/news`, `/news/[slug]`, `/services`, `/404`

Use `/new-page [name]` to build any remaining page.

---

## Stack
- Next.js 14 (App Router, TypeScript strict)
- Tailwind CSS with custom tokens (see `docs/DESIGN_SYSTEM.md`)
- Sanity.io — headless CMS
- Framer Motion — animations
- React Hook Form + Zod — forms
- Lucide Icons
- Vercel — hosting

## Code Rules (non-negotiable)
1. All pages are **server components** by default — `async`, fetch from Sanity
2. `'use client'` only when using hooks, events, or browser APIs
3. `export const revalidate = 3600` on all pages (ISR, 1-hour)
4. No hardcoded hex colours — use Tailwind design tokens only
5. No `transition: all` — specify exact properties (Emil principle)
6. Never `any` type — define in `src/types/index.ts`
7. Images always have meaningful `alt` text
8. Forms: client-side Zod validation + server API route + success state

## Design System (always follow — full ref in `docs/DESIGN_SYSTEM.md`)

### Colours
`espresso` `taupe` `gold` `cream` `terracotta` `text-body` `text-muted` `border-soft`

### Typography Classes
`heading-display-xl` `heading-display-lg` `heading-h1` `heading-h2` `heading-h3` `heading-h4` `label-caps`

### Layout Classes
`container-lp` `section-padding` `section-padding-sm` `max-w-text`

### Section Pattern
```tsx
<section className="section-padding bg-[cream|white|espresso]">
  <div className="container-lp">
    <p className="label-caps text-terracotta mb-3">Category</p>
    <h2 className="heading-h2 text-espresso mb-8">Heading</h2>
  </div>
</section>
```

### Page Hero Pattern (all interior pages)
```tsx
<section className="pt-24 section-padding-sm bg-espresso text-cream">
  <div className="container-lp">
    <p className="label-caps text-gold mb-4">Category</p>
    <h1 className="heading-h1 max-w-2xl">Page Title</h1>
  </div>
</section>
```

## Component Map
| Component | Path | Notes |
|-----------|------|-------|
| `Button` | `@/components/ui/Button` | variant: primary\|secondary\|ghost |
| `PropertyCard` | `@/components/property/PropertyCard` | needs `property: Property` |
| `PropertyGrid` | `@/components/property/PropertyGrid` | needs `properties: Property[]` |
| `EnquiryForm` | `@/components/forms/EnquiryForm` | propertySlug + propertyTitle props |
| `Navbar` | `@/components/layout/Navbar` | auto-included in (marketing)/layout |
| `Footer` | `@/components/layout/Footer` | auto-included in (marketing)/layout |
| `WhatsAppButton` | `@/components/ui/WhatsAppButton` | auto-included in (marketing)/layout |

## Key Lib
| Util | Import | Use |
|------|--------|-----|
| `cn` | `@/lib/utils/cn` | merge Tailwind classes |
| `formatPrice` | `@/lib/utils/format` | NGN prices |
| `formatDate` | `@/lib/utils/format` | human dates |
| `urlFor` | `@/lib/sanity/image` | Sanity image URLs |
| `sanityClient` | `@/lib/sanity/client` | data fetching |
| queries | `@/lib/sanity/queries` | GROQ strings |
| `useScrolled` | `@/lib/hooks/useScrolled` | navbar bg toggle |
| `useInView` | `@/lib/hooks/useInView` | scroll animations |

## Skills Loaded
- **`emil-design-eng`** (`.claude/skills/emil-design-eng/SKILL.md`) — animation decisions, interaction polish, review checklist. Reference before writing any motion code.
- **`frontend-design`** — available in global skills. Invoke when building new UI.

## Environment Variables
Fill `.env.local` (copy from `.env.example`):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_WA_NUMBER=
```

## Docs Reference
- `docs/PRD.md` — goals, pages, audiences, metrics
- `docs/TRD.md` — full stack spec, architecture, security
- `docs/DESIGN_SYSTEM.md` — full token reference, component patterns
- `docs/DESIGN_GUIDE.md` — when to animate, typography tips, premium code checklist
- `docs/BUILD_PHASES.md` — what's built, what's next, launch checklist
