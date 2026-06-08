# Design Engineering Guide
> Practical motion and polish guidance for the current codebase

## The Standard
The site should feel warm, spacious, and editorial. Interactions should stay restrained and support clarity rather than draw attention to themselves.

## When to Animate
| Interaction | Guidance | Current reference in `src/` |
|-------------|----------|-----------------------------|
| Hero and section reveal | Use fade-up sparingly for first-impression content | `HeroSection`, section patterns, `animate-fade-up` |
| Property cards entering the grid | Stagger by 80ms to guide the eye | `PropertyGrid` |
| Property card hover | Lift slightly and deepen shadow | `PropertyCard` |
| Image hover | Scale the image only | `PropertyCard`, `PropertyGallery` |
| Nav link hover | Colour change only | `Navbar` |
| Mobile menu open | Motion is appropriate for the full-screen overlay | `Navbar` |
| Button press | Give immediate feedback on press | `Button` |
| Form submission state | Keep loading and success states explicit | `EnquiryForm` |
| Persistent floating action | Avoid entrance animation for always-visible UI | `WhatsAppButton` |

## Motion Rules
- Prefer `transform`, `opacity`, and `color` transitions.
- Do not use `transition: all`.
- Keep common UI transitions around 150ms to 250ms.
- Use longer durations only for larger layout changes like the mobile menu.
- Respect `prefers-reduced-motion`; the current global CSS already reduces animation and transition duration.

## Component Polish Checklist
- [ ] Hover state is clear but restrained.
- [ ] Press state gives immediate feedback.
- [ ] `:focus-visible` is obvious for keyboard users.
- [ ] Disabled state is visually distinct.
- [ ] Loading state is explicit where async work happens.
- [ ] Empty state reads as intentional, not broken.
- [ ] Layout still works at mobile widths.
- [ ] Motion degrades cleanly when reduced motion is preferred.

## Typography Feel
- Use Cormorant for display and page-heading moments.
- Use Inter for body copy, labels, and UI text.
- Do not introduce a third font.
- Keep Cormorant at larger sizes; Inter carries smaller UI text more reliably.

## Section Rhythm
Alternate dark, light, and neutral sections so long pages do not flatten into a single tone.

Current home-page sequence in `src/`:
- `HeroSection`
- `IntroStrip`
- `FeaturedProperties`
- `ValueProps`
- `Testimonials`
- `LatestNews`
- `FooterCTA`
- `Footer`

## Premium UI Checklist
- Use generous spacing before adding ornament.
- Keep icon sizing consistent within a section.
- Use `transition-colors` for text and surface colour changes.
- Avoid awkward headline wraps at small widths.
- Keep image overlays and text contrast readable.
