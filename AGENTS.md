# Legitimate Properties — Website
> OpenCode reads this automatically every session.

## Quick Context
Premium real estate website for Legitimate Properties (Nigeria). Next.js 14 + Prisma/SQLite + Tailwind. Warm, earthy, editorial aesthetic. See `docs/` for full specs.

## Stack
- Next.js 14 (App Router, TypeScript strict)
- Tailwind CSS with custom tokens (see `docs/DESIGN_SYSTEM.md`)
- Prisma + SQLite — local database
- Framer Motion — animations
- React Hook Form + Zod — forms
- TipTap — rich text editor (admin)
- Lucide Icons
- Vercel — hosting

## Code Rules (non-negotiable)
1. Pages are **server components** by default — `async`, fetch from Prisma
2. `'use client'` only when using hooks, events, or browser APIs
3. No hardcoded hex colours — use Tailwind design tokens only
4. No `transition: all` — specify exact properties (Emil principle)
5. Never `any` type — define in `src/types/index.ts`
6. Images always have meaningful `alt` text
7. Forms: client-side Zod validation + server API route + success state

## Design System (always follow — full ref in `docs/DESIGN_SYSTEM.md`)

### Colours
`espresso` `taupe` `gold` `cream` `terracotta` `text-body` `text-muted` `border-soft`

### Typography Classes
`heading-display-xl` `heading-display-lg` `heading-h1` `heading-h2` `heading-h3` `heading-h4` `label-caps`

### Layout Classes
`container-lp` `section-padding` `section-padding-sm` `max-w-text`

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
| `Reveal` | `@/components/ui/Reveal` | scroll-triggered fade-up wrapper |
| `StaggerGrid` | `@/components/ui/StaggerGrid` | staggered grid animation |

## Key Lib
| Util | Import | Use |
|------|--------|-----|
| `cn` | `@/lib/utils/cn` | merge Tailwind classes |
| `formatPrice` | `@/lib/utils/format` | NGN prices |
| `formatDate` | `@/lib/utils/format` | human dates |
| `prisma` | `@/lib/prisma` | database client |
| `mapProperty` | `@/lib/mappers` | Prisma → app type |
| `useScrolled` | `@/lib/hooks/useScrolled` | navbar bg toggle |
| `useInView` | `@/lib/hooks/useInView` | scroll animations |

## Admin
| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard |
| `/admin/properties` | Manage properties |
| `/admin/news` | Manage news articles |
| `/admin/team` | Manage team members |

Image uploads go to `public/uploads/` via `/api/upload`.

## Environment Variables
Fill `.env.local` (copy from `.env.example`):
```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WA_NUMBER=
```

## Docs Reference
- `docs/PRD.md` — goals, pages, audiences, metrics
- `docs/TRD.md` — full stack spec, architecture, security
- `docs/DESIGN_SYSTEM.md` — full token reference, component patterns
- `docs/DESIGN_GUIDE.md` — when to animate, typography tips, premium code checklist
- `docs/BUILD_PHASES.md` — what's built, what's next, launch checklist
