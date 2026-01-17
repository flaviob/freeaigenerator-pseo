# FreeAIGenerator - Programmatic SEO Project

## Project Overview
Programmatic SEO site targeting 1000+ "AI generator" keywords with Strapi CMS + Next.js frontend.

## Tech Stack
- **CMS**: Strapi (self-hosted on Railway)
- **Frontend**: Next.js 14 (App Router)
- **Hosting**: Railway (Strapi) + Vercel (Frontend)
- **Content Generation**: OpenAI GPT-4 for bulk article creation

## Project Structure
```
freeaigenerator-pseo/
├── strapi-cms/          # Strapi backend
├── nextjs-frontend/     # Next.js frontend
├── content-generator/   # AI content generation scripts
└── data/               # Keyword lists, tool databases
```

## Quick Start

### 1. Deploy Strapi to Railway
```bash
cd strapi-cms
npm install
# Deploy to Railway (instructions below)
```

### 2. Generate Content
```bash
cd content-generator
npm install
node generate-articles.js
```

### 3. Deploy Frontend
```bash
cd nextjs-frontend
npm install
npm run build
# Deploy to Vercel
```

## Content Strategy

### Page Types
1. **Tool Pages** (~50 pages) - Individual AI generator tools
2. **Comparison Pages** (~300 pages) - Tool vs Tool comparisons  
3. **Category Pages** (~650 pages) - Best/Free/Top lists

### Target Keywords
- Primary: "ai image generator", "ai video generator", "ai generator"
- Long-tail: "free ai image generator", "best ai video generator"
- Total: 1000+ keyword variations

## Deployment Steps

### Railway (Strapi)
1. Connect GitHub repo
2. Select strapi-cms directory
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

### Vercel (Frontend)
1. Import GitHub repo
2. Select nextjs-frontend directory
3. Add STRAPI_API_URL environment variable
4. Deploy

## Environment Variables

### Strapi (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=...
ADMIN_JWT_SECRET=...
API_TOKEN_SALT=...
APP_KEYS=...
```

### Next.js (.env.local)
```
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app
STRAPI_API_TOKEN=...
```

## Content Generation

The content generator creates SEO-optimized articles using:
- Keyword research data
- AI tool information
- Programmatic templates
- GPT-4 for unique content

## Monetization
- Affiliate links to AI tools
- Display ads (future)
- Sponsored placements (future)

## Timeline
- Day 1: Infrastructure setup
- Day 2-3: Content generation
- Day 4: Bulk import + deployment
- Day 5: Indexing + launch

## Author
Flavio Amiel - SWAT SEO Agency
