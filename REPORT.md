# Legitimate Properties — Website Report

## Overview

**Project**: Premium real estate platform for Legitimate Properties (Nigeria). Warm, earthy, editorial aesthetic targeting HNW buyers, diaspora investors, and corporate clients.

**Repository**: `github.com/yusuf-saif/legitimate-properties.git` — 10 commits, latest focused on bulk image upload.

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router, TypeScript strict) |
| Styling | Tailwind CSS with custom design tokens (`espresso`, `taupe`, `gold`, `cream`, `terracotta`) |
| Database | Prisma + PostgreSQL (`Property`, `PropertyImage`, `NewsPost`, `TeamMember`) |
| Animation | Framer Motion (Reveal, StaggerGrid, lightbox) |
| Forms | React Hook Form + Zod |
| Rich Text | TipTap (admin property/news body editor) |
| Image Processing | Sharp (resize to 1920px, quality 85) |
| Icons | Lucide React |
| Email | Resend |
| Hosting | Render |

---

## Pages

### Marketing Site

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Built |
| About | `/about` | Built |
| Services | `/services` | Built |
| Properties Listing | `/properties` | Built |
| Property Detail | `/properties/[slug]` | Built |
| Investor Relations | `/investors` | Built |
| News Listing | `/news` | Built |
| News Detail | `/news/[slug]` | Built |
| Contact | `/contact` | Built |
| 404 | `/*` | Built |

### Admin

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard |
| `/admin/properties` | Manage properties (title, specs, description, highlights, gallery) |
| `/admin/news` | Manage news articles with TipTap editor |
| `/admin/team` | Manage team members |

---

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/upload` | POST | Upload images (single or multiple) to `public/uploads/` via Sharp |
| `/api/enquiry` | POST | Property enquiry form submission |
| `/api/contact` | POST | General contact form submission |
| `/api/admin/properties` | GET, POST | List / create properties |
| `/api/admin/properties/[id]` | GET, PUT, DELETE | Read / update / delete property |
| `/api/admin/news` | GET, POST | List / create news |
| `/api/admin/news/[id]` | GET, PUT, DELETE | Read / update / delete news |
| `/api/admin/team` | GET, POST | List / create team members |
| `/api/admin/team/[id]` | GET, PUT, DELETE | Read / update / delete team member |

---

## Database Schema (Prisma)

```
Property (id, slug, title, type, status, location*, price, specs*, description,
          highlights, featured, timestamps)
  └── PropertyImage (id, url, alt, caption, sortOrder, propertyId) ← 1:N

NewsPost (id, slug, title, excerpt, category, author, body, featuredImageUrl,
          featuredImageAlt, timestamps)

TeamMember (id, name, title, bio, photoUrl, photoAlt, order, timestamps)
```

---

## Key Components

| Component | Path | Purpose |
|-----------|------|---------|
| `Button` | `@/components/ui/Button` | Primary, secondary, ghost variants |
| `PropertyCard` | `@/components/property/PropertyCard` | Listing card with image, specs, price |
| `PropertyGrid` | `@/components/property/PropertyGrid` | Responsive grid with staggered entry |
| `PropertyGallery` | `@/components/property/PropertyGallery` | Lightbox-enabled image grid (up to 5) |
| `EnquiryForm` | `@/components/forms/EnquiryForm` | Property-specific lead form |
| `ImageUploader` | `@/components/admin/ImageUploader` | Single image upload (news, team) |
| `MultiImageUploader` | `@/components/admin/MultiImageUploader` | Bulk image upload (property gallery) |
| `RichTextEditor` | `@/components/admin/RichTextEditor` | TipTap-based editor |
| `Navbar` | `@/components/layout/Navbar` | Responsive with glassmorphism scroll state |
| `Footer` | `@/components/layout/Footer` | Site footer with links |
| `WhatsAppButton` | `@/components/ui/WhatsAppButton` | Floating WhatsApp CTA |
| `Reveal` | `@/components/ui/Reveal` | Scroll-triggered fade-up wrapper |
| `StaggerGrid` | `@/components/ui/StaggerGrid` | Staggered grid animation |

---

## Design System

**Colour palette**: `espresso (#2C2416)` / `taupe (#7C6A50)` / `gold (#B59A6A)` / `cream (#F5F0E8)` / `terracotta (#C47C50)`

**Typography**: Cormorant (display/headings) + Inter (body/UI) via `next/font`

**Layout utilities**: `container-lp`, `section-padding`, `section-padding-sm`, `max-w-text`

**Card shadows**: `shadow-card` / `shadow-card-hover` / `shadow-nav`

---

## Known Issues

- **Image persistence on Render**: Uploaded files go to `public/uploads/` (local filesystem) — data lost on every deploy. Needs Cloudinary, S3, or Render Disk for production.
- **No README or CONTRIBUTING.md**
- **Seed script exists** at `prisma/seed.ts` but data must be manually restored on fresh database

---

## Environment Variables

```
DATABASE_URL         — PostgreSQL connection string (Render)
NEXT_PUBLIC_APP_URL  — Public site URL
NEXT_PUBLIC_WA_NUMBER — WhatsApp business number
```

---

## Scripts

| Script | Command |
|--------|---------|
| Dev | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Seed | `npm run seed` |
| DB Push | `npm run db:push` |
| DB Setup | `npm run db:setup` (push + seed) |
| E2E Tests | `npm run test:e2e` (Playwright) |
