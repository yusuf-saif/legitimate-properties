# Build Phases
> Legitimate Properties — Verified build status only

## Completed
- App routes: `/`, `/about`, `/contact`, `/investors`, `/news`, `/news/[slug]`, `/properties`, `/properties/[slug]`, `/services`, `/404`
- API routes: `/api/enquiry`, `/api/contact`
- All planned code work completed and verified on disk
- Design tokens and global utility classes
- TypeScript types in `src/types/index.ts`
- Sanity client, image helper, and GROQ queries
- Utility functions: `cn`, `formatPrice`, `formatDate`, `slugify`
- Hooks: `useScrolled`, `useInView`
- Layout components: `Navbar`, `Footer`, `WhatsAppButton`
- UI components: `Button`
- Property components: `PropertyCard`, `PropertyGrid`, `PropertyFilters`, `PropertyGallery`, `PropertyInfo`
- Section components: `HeroSection`, `IntroStrip`, `FeaturedProperties`, `ValueProps`, `Testimonials`, `LatestNews`, `FooterCTA`, `BrandStory`, `TeamGrid`, `MilestonesTimeline`
- Form components: `EnquiryForm`, `ContactForm`
- Property filters wired to URL search params and server-side filtering
- Email sending guarded with Resend integration for enquiry and contact routes
- CSS/Tailwind confirmed working; unstyled rendering was caused by a stale dev process, not a code bug
- Sanity schemas: `property`, `newsPost`, `teamMember`
- Sanity config files: `sanity.config.ts`, `sanity.cli.ts`

## Commands
```bash
npm install
npm run dev
npm run sanity
npm run build
npm run lint
```
