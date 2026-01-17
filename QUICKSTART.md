# Quick Start Guide - Get Live in 2 Hours

## Prerequisites
- [x] Railway account created
- [x] GitHub account
- [x] OpenAI API key
- [x] Domain ready (freeaigenerator.com)

---

## Step-by-Step (2 Hour Timeline)

### Hour 1: Infrastructure

#### Minute 0-10: Railway + Strapi
```bash
# 1. Create Railway project
# 2. Add PostgreSQL database
# 3. Generate secrets:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Run this 5 times, save outputs

# 4. Create new service in Railway, add env vars:
DATABASE_URL=<from postgres>
DATABASE_CLIENT=postgres
APP_KEYS=<generated>
API_TOKEN_SALT=<generated>
ADMIN_JWT_SECRET=<generated>
JWT_SECRET=<generated>
TRANSFER_TOKEN_SALT=<generated>
NODE_ENV=production
```

#### Minute 10-15: Initialize Strapi
```bash
cd strapi-cms
chmod +x setup-strapi.sh
./setup-strapi.sh

# Push to GitHub
git init
git add .
git commit -m "Initial Strapi setup"
git remote add origin <your-repo>
git push -u origin main
```

#### Minute 15-25: Deploy to Railway
- Connect Railway to GitHub repo
- Select `strapi-cms` directory
- Wait for build (~5 min)
- Visit Strapi URL, create admin account
- Create API token (Settings → API Tokens → Full Access)

#### Minute 25-40: Content Generator Setup
```bash
cd content-generator
npm install

# Create .env
echo "OPENAI_API_KEY=sk-your-key" > .env
echo "STRAPI_URL=https://your-strapi.railway.app" >> .env
echo "STRAPI_API_TOKEN=your-token" >> .env

# Test with 3 articles (1 min)
npm run test
```

#### Minute 40-60: Generate Content (20 min)
```bash
# This will run for ~20-30 minutes
# Generate ~100 articles to start
npm run generate
```

---

### Hour 2: Frontend & Launch

#### Minute 60-70: Import to Strapi
```bash
# Import all generated content
npm run import
# Takes ~5-10 minutes
```

#### Minute 70-80: Next.js Setup
```bash
cd nextjs-frontend
npm install

# Create .env.local
echo "NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app" > .env.local
echo "STRAPI_API_TOKEN=your-token" >> .env.local

# Test locally
npm run dev
# Verify at http://localhost:3000
```

#### Minute 80-95: Deploy to Vercel
```bash
# Option 1: CLI
vercel --prod

# Option 2: Dashboard
# 1. Go to vercel.com
# 2. Import GitHub repo
# 3. Select nextjs-frontend directory
# 4. Add env vars
# 5. Deploy
```

#### Minute 95-110: Domain & SEO
```bash
# 1. Add domain in Vercel
# 2. Update DNS (A record or CNAME)
# 3. Wait for SSL (~5 min)

# 4. Submit to Google
# https://search.google.com/search-console
# Add property → Submit sitemap

# 5. Request indexing for top 10 pages
```

#### Minute 110-120: Final Checks
- [ ] All pages load
- [ ] Meta tags correct
- [ ] Analytics installed
- [ ] No errors in console
- [ ] Mobile responsive
- [ ] SSL active

---

## You're Live! 🚀

Your site is now:
- ✅ Hosted on Railway (Strapi) + Vercel (Frontend)
- ✅ ~100 SEO-optimized pages
- ✅ Schema markup
- ✅ Submitted to search engines
- ✅ Ready to rank

---

## Next 24 Hours

### Immediate (Today)
1. Request indexing for top 20 target keywords
2. Share site on social media
3. Submit to relevant directories
4. Check for any broken links

### Tomorrow
1. Generate 500 more articles
2. Set up analytics dashboard
3. Create content update schedule
4. Start monitoring rankings

### Week 1
1. Monitor Google Search Console
2. Fix any indexing issues
3. Add internal linking
4. Start building backlinks

---

## Scaling to 1000+ Pages

```bash
# Generate more content
cd content-generator

# Edit data/keywords.js to add more keywords
# Then run:
npm run generate
npm run import

# Rebuild frontend
cd ../nextjs-frontend
vercel --prod
```

---

## Common Issues & Fixes

**Strapi won't build on Railway**
- Check env vars are all set
- Verify DATABASE_URL format
- Check Railway build logs

**Content generation slow**
- Use Claude API instead (faster)
- Reduce batch size
- Run overnight

**Pages not indexing**
- Wait 2-4 weeks
- Submit sitemap again
- Request indexing manually
- Build some backlinks

**Low traffic initially**
- Normal! SEO takes 2-3 months
- Focus on content quality
- Keep adding pages
- Build topical authority

---

## Support

**Deployment issues?**
- Check DEPLOYMENT.md for detailed guide
- Review Railway/Vercel logs
- Verify all env vars

**Need help?**
- Email: flavio@swatseo.com
- Include: error messages, screenshots, logs

---

## Metrics to Track

**Week 1-4:**
- Pages indexed
- Impressions in GSC
- Click-through rate

**Month 2-3:**
- Organic traffic growth
- Keyword rankings
- Top performing pages

**Month 4+:**
- Conversion rate
- Email signups
- Revenue (if monetized)

---

**Remember:** SEO is a marathon, not a sprint. First rankings in 4-8 weeks, significant traffic in 3-6 months. Stay consistent! 💪
