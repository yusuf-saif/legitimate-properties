# Design System
> Legitimate Properties — verified tokens and patterns in the current codebase

## Colour Tokens
| Token | Hex | Use |
|-------|-----|-----|
| `espresso` | `#2C2416` | Primary dark surfaces and headings |
| `taupe` | `#7C6A50` | Secondary text and accents |
| `gold` | `#B59A6A` | Highlights and focus accents |
| `cream` | `#F5F0E8` | Page and section backgrounds |
| `terracotta` | `#C47C50` | Primary CTA colour |
| `text-body` | `#3D3326` | Body copy |
| `text-muted` | `#8C7B69` | Metadata and placeholder text |
| `border-soft` | `#D6C8B4` | Borders and dividers |

## Typography
| Class | Font | Size | Weight | Use |
|-------|------|------|--------|-----|
| `heading-display-xl` | Cormorant | 72px | 300 | Large hero headline |
| `heading-display-lg` | Cormorant | 56px | 400 | Display heading |
| `heading-h1` | Cormorant | 40px | 600 | Page title |
| `heading-h2` | Cormorant | 32px | 600 | Section heading |
| `heading-h3` | Inter | 22px | 700 | Card or subsection title |
| `heading-h4` | Inter | 18px | 600 | Small heading |
| `body-lg` | Inter | 18px | 400 | Lead body copy |
| `body-md` | Inter | 16px | 400 | Default body copy |
| `body-sm` | Inter | 14px | 400 | Metadata and captions |
| `label-caps` | Inter | 12px | 600 | Uppercase labels |

## Layout Utilities
| Class | Use |
|-------|-----|
| `container-lp` | Main responsive content container |
| `section-padding` | Standard vertical section spacing |
| `section-padding-sm` | Reduced section spacing |
| `max-w-text` | Constrained prose width |

## Shadows
| Token | Value | Use |
|-------|-------|-----|
| `shadow-card` | `0 4px 24px rgba(44, 36, 22, 0.08)` | Card default |
| `shadow-card-hover` | `0 12px 40px rgba(44, 36, 22, 0.14)` | Card hover |
| `shadow-nav` | `0 2px 20px rgba(44, 36, 22, 0.12)` | Scrolled navbar |

## Component Patterns
### Button
```tsx
<Button variant="primary|secondary|ghost" size="sm|md|lg" fullWidth>
  Label
</Button>
```
- Uses `rounded-lg`, `font-semibold`, and `transition-all duration-200`
- Supports `disabled` and full-width states

### PropertyCard
```tsx
<PropertyCard property={property} className="optional" />
```
- Uses `aspect-[16/10]` imagery, `rounded-card`, and card shadows
- Hover state lifts the card and scales the image

### PropertyGrid
```tsx
<PropertyGrid properties={properties} />
```
- Renders a 1/2/3-column responsive grid
- Uses staggered `animate-fade-up` entry states

### EnquiryForm
```tsx
<EnquiryForm propertySlug={property.slug} propertyTitle={property.title} />
```
- Client-side form with inline validation and success state

### Section Pattern
```tsx
<section className="section-padding bg-cream">
  <div className="container-lp">
    <p className="label-caps text-terracotta mb-3">Category Label</p>
    <h2 className="heading-h2 text-espresso mb-8">Section Heading</h2>
  </div>
</section>
```

### Page Hero Pattern
```tsx
<section className="pt-24 section-padding-sm bg-espresso text-cream">
  <div className="container-lp">
    <p className="label-caps text-gold mb-4">Category</p>
    <h1 className="heading-h1 max-w-2xl">Page Title</h1>
  </div>
</section>
```

## Existing Utilities
| Utility | Path | Purpose |
|---------|------|---------|
| `cn` | `src/lib/utils/cn.ts` | Merge Tailwind class names |
| `formatPrice` | `src/lib/utils/format.ts` | Format NGN prices |
| `formatDate` | `src/lib/utils/format.ts` | Format dates |
| `slugify` | `src/lib/utils/format.ts` | Create slugs |
| `useScrolled` | `src/lib/hooks/useScrolled.ts` | Navbar scroll state |
| `useInView` | `src/lib/hooks/useInView.ts` | One-time intersection state |
