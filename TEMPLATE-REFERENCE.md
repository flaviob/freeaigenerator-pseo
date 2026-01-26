# Page Template Reference

## Current Template

The production-ready page template is saved in:
- **Location**: `nextjs-frontend/page-template-reference.html`
- **Source**: `demo-article-dark-theme.html` (latest version as of Jan 17, 2026)

## Key Features

### Design
- ✅ Dark theme (#0a0a0a background)
- ✅ Sticky sidebar with table of contents
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Clean typography with system fonts

### Layout
- ✅ Two-column layout (article + sidebar)
- ✅ Sticky TOC on desktop
- ✅ Mobile-friendly TOC placement
- ✅ Breadcrumbs navigation
- ✅ Header with logo and navigation

### SEO Features
- ✅ Complete meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Canonical URL
- ✅ JSON-LD structured data:
  - Article schema
  - FAQ schema
  - Breadcrumb schema

### Content Sections
1. Header with category badge, free tag, read time
2. H1 title
3. Introduction paragraph
4. Table of Contents (sidebar + mobile)
5. Main content sections:
   - What is it?
   - How it works
   - Key features (grid layout)
   - Use cases
   - Top tools (cards)
   - Pros & Cons (side-by-side)
   - FAQ (with schema markup)
   - Conclusion
6. CTA (call-to-action)
7. Related articles
8. Social sharing buttons

## Next Steps

To convert this HTML template to Next.js:

1. **Extract styles** → Create Tailwind config or CSS modules
2. **Component structure** → Break into reusable React components
3. **Dynamic data** → Replace hardcoded content with Strapi data
4. **Schema markup** → Generate from Strapi content
5. **Images** → Add Next.js Image optimization
6. **Navigation** → Implement Next.js Link components

## Files to Update

- `nextjs-frontend/app/[slug]/page.tsx` - Main page component
- `nextjs-frontend/app/layout.tsx` - Root layout with header/footer
- `nextjs-frontend/components/` - Create reusable components
- `nextjs-frontend/lib/seo.ts` - SEO utilities for schema generation

## Template Comparison

**Old template** (simple):
- Basic Tailwind styling
- Single column
- No sidebar
- Minimal SEO

**New template** (dark-theme):
- Custom dark theme
- Sticky sidebar with TOC
- Comprehensive SEO and schema
- Mobile-optimized
- Social sharing
- Breadcrumbs
- Related articles

---

Use this HTML as the reference design when building the Next.js components.
