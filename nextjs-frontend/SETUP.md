# Next.js Frontend Setup

## Quick Start

```bash
# Create Next.js app
npx create-next-app@latest nextjs-frontend --typescript --tailwind --app --no-src-dir

cd nextjs-frontend

# Install dependencies
npm install @strapi/blocks-react-renderer marked
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app
STRAPI_API_TOKEN=your-strapi-read-token
```

## Project Structure

```
nextjs-frontend/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── [slug]/
│   │   └── page.tsx            # Dynamic tool pages
│   ├── compare/
│   │   └── [slug]/page.tsx     # Comparison pages
│   └── best/
│       └── [slug]/page.tsx     # Category pages
├── components/
│   ├── ArticleContent.tsx      # Article renderer
│   ├── ComparisonTable.tsx     # Tool comparison
│   ├── ToolCard.tsx            # Tool preview card
│   └── SEO.tsx                 # SEO metadata
└── lib/
    ├── strapi.ts               # Strapi API client
    └── seo.ts                  # SEO utilities
```

## Key Features to Implement

1. **Dynamic Routes**: Generate pages from Strapi content
2. **SEO Optimization**: Metadata, Open Graph, Schema markup
3. **Static Generation**: ISR for fast loading
4. **Sitemap**: Auto-generated from Strapi content
5. **Analytics**: Track page views and conversions

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Performance Targets

- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Core Web Vitals: All green

## Next Steps

1. Set up the basic Next.js structure
2. Create reusable components
3. Implement Strapi API integration
4. Add SEO optimization
5. Deploy to Vercel
