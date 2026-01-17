# FreeAIGenerator - Complete Deployment Guide

## Overview
This guide walks through deploying your pSEO project from scratch. Total timeline: ~4-6 hours.

---

## Phase 1: Railway Setup (30 minutes)

### 1.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Add payment method (required even for free tier)
4. Create new project

### 1.2 Deploy PostgreSQL
1. In Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Wait for deployment (2-3 minutes)
4. Copy `DATABASE_URL` from Variables tab

### 1.3 Deploy Strapi
1. In same project, click "New" → "Empty Service"
2. Connect to GitHub repository
3. Set root directory to `strapi-cms`
4. Add environment variables:

```bash
DATABASE_URL=<from PostgreSQL service>
DATABASE_CLIENT=postgres
DATABASE_SSL=false

# Generate these with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
APP_KEYS=<generated-key>
API_TOKEN_SALT=<generated-key>
ADMIN_JWT_SECRET=<generated-key>
JWT_SECRET=<generated-key>
TRANSFER_TOKEN_SALT=<generated-key>

NODE_ENV=production
HOST=0.0.0.0
PORT=1337
```

5. Deploy and wait for build (~5 minutes)
6. Get your Strapi URL from Railway dashboard

### 1.4 Configure Strapi
1. Visit your Strapi URL
2. Create admin account
3. Go to Settings → API Tokens
4. Create new token with "Full access"
5. Copy token for later use

---

## Phase 2: Content Generation (2-4 hours)

### 2.1 Setup Content Generator
```bash
cd content-generator
npm install

# Create .env file
cp .env.example .env

# Edit .env with your keys
nano .env
```

Add to .env:
```
OPENAI_API_KEY=sk-your-key
STRAPI_URL=https://your-strapi.railway.app
STRAPI_API_TOKEN=your-token-from-strapi
```

### 2.2 Generate Content
```bash
# Test with 5 articles first
npm run test

# If successful, generate all content
npm run generate
```

Expected output:
- Tool pages: ~50-100 articles
- Comparison pages: ~100-200 articles  
- Category pages: ~50-100 articles
- Time: 2-4 hours (depends on API rate limits)

### 2.3 Import to Strapi
```bash
npm run import
```

This will:
- Upload all generated articles to Strapi
- Show progress bar
- Report any errors
- Time: 10-30 minutes

---

## Phase 3: Frontend Deployment (30 minutes)

### 3.1 Setup Next.js
```bash
cd nextjs-frontend
npm install

# Create .env.local
cp .env.example .env.local
```

Add to .env.local:
```
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app
STRAPI_API_TOKEN=your-read-token
```

### 3.2 Test Locally
```bash
npm run dev
# Visit http://localhost:3000
```

Verify:
- Homepage loads
- Dynamic pages work (e.g., /ai-image-generator)
- SEO metadata is correct
- No console errors

### 3.3 Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Or use Vercel Dashboard:
1. Go to https://vercel.com
2. Import GitHub repository
3. Select `nextjs-frontend` directory
4. Add environment variables
5. Deploy

### 3.4 Configure Domain
1. In Vercel, go to Project Settings → Domains
2. Add `freeaigenerator.com`
3. Update DNS records (instructions provided by Vercel)
4. Wait for SSL certificate (5-10 minutes)

---

## Phase 4: SEO & Indexing (30 minutes)

### 4.1 Submit Sitemap
```bash
# Generate sitemap
npm run build

# Submit to Google
# Go to: https://search.google.com/search-console
# Add property: freeaigenerator.com
# Submit sitemap: freeaigenerator.com/sitemap.xml
```

### 4.2 Submit to Bing
1. Go to: https://www.bing.com/webmasters
2. Add site
3. Submit sitemap

### 4.3 Index Priority Pages
Use Google Search Console "Request Indexing" for:
- Homepage
- Top 20 target keywords
- High-volume pages

---

## Post-Launch Checklist

### Technical
- [ ] All pages load correctly
- [ ] No 404 errors
- [ ] SSL certificate active
- [ ] Sitemap accessible
- [ ] Robots.txt configured
- [ ] Analytics installed (Google Analytics, Plausible, etc.)

### SEO
- [ ] Meta titles unique and optimized
- [ ] Meta descriptions under 160 chars
- [ ] H1 tags on every page
- [ ] Schema markup present
- [ ] Images have alt text
- [ ] Internal linking working
- [ ] Canonical tags set

### Content
- [ ] No duplicate content
- [ ] Articles are readable
- [ ] CTAs present
- [ ] No lorem ipsum
- [ ] Grammar checked

### Performance
- [ ] Lighthouse score 90+
- [ ] Images optimized
- [ ] Lazy loading enabled
- [ ] CDN configured

---

## Monitoring & Updates

### Weekly Tasks
1. Check Google Search Console for errors
2. Monitor traffic in analytics
3. Check for indexing issues
4. Review top-performing pages

### Monthly Tasks
1. Update content (refresh dates, add new tools)
2. Add new articles for trending keywords
3. Fix broken links
4. Improve low-performing pages

### Content Updates
```bash
# Generate new articles
cd content-generator
npm run generate -- --keywords="new,keywords,here"

# Import to Strapi
npm run import

# Rebuild frontend
cd ../nextjs-frontend
vercel --prod
```

---

## Troubleshooting

### Strapi Won't Deploy
- Check Railway logs
- Verify DATABASE_URL is correct
- Ensure all env vars are set
- Check build logs for errors

### Content Generation Fails
- Verify OpenAI API key is valid
- Check rate limits
- Reduce batch size
- Use Claude API as alternative

### Pages Not Indexing
- Submit sitemap to GSC
- Check robots.txt
- Verify pages are public
- Use "Request Indexing" in GSC
- Wait 2-4 weeks for organic indexing

### Low Traffic
- Research better keywords
- Improve content quality
- Add more internal links
- Build backlinks
- Share on social media

---

## Scaling Strategy

### Phase 1 (Month 1-2): Foundation
- 100-200 pages live
- Basic keyword coverage
- Focus on indexed pages

### Phase 2 (Month 3-4): Expansion
- Add 500+ more pages
- Target long-tail keywords
- Build topical authority

### Phase 3 (Month 5-6): Optimization
- Update top performers
- Add conversion optimization
- Build email list
- Add monetization

### Phase 4 (Month 6+): Growth
- 1000+ pages indexed
- Consistent traffic growth
- Multiple revenue streams
- Team expansion

---

## Cost Breakdown

### Infrastructure
- Railway (Strapi + PostgreSQL): $5-20/mo
- Vercel (Frontend): $0-20/mo (free tier sufficient initially)
- Domain: $10-15/year
- **Total: ~$15-40/mo**

### Content Generation
- OpenAI API: $0.01-0.03 per article
- 1000 articles: $10-30 one-time
- Monthly updates: $5-10/mo

### Optional
- Monitoring (Plausible, etc.): $9-19/mo
- Email marketing: $0-50/mo
- Backlink tools: $0-100/mo

---

## Next Steps

1. ✅ Complete Railway setup
2. ✅ Generate first 100 articles
3. ✅ Deploy to Vercel
4. ✅ Submit sitemap
5. ⏳ Wait for indexing (2-4 weeks)
6. 📈 Monitor and optimize

**Questions? Issues? Contact: flavio@swatseo.com**
