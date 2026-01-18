# 📝 Quick Start: Generate & Publish Content

**Run this AFTER you've deployed Strapi to Railway**

## Prerequisites

✅ Strapi deployed on Railway  
✅ Strapi admin account created  
✅ API token generated (Full access)  
✅ OpenAI API key (or Claude API key)

---

## Step 1: Configure Content Generator (2 minutes)

```bash
cd content-generator

# Create .env file from example
cp .env.example .env

# Edit .env with your credentials
nano .env
```

Add your credentials:
```bash
OPENAI_API_KEY=sk-your-actual-openai-key
STRAPI_URL=https://your-app.railway.app
STRAPI_API_TOKEN=your-actual-strapi-token
```

Save and exit (Ctrl+X, Y, Enter)

## Step 2: Install Dependencies (1 minute)

```bash
npm install
```

## Step 3: Generate Test Articles (5-10 minutes)

Start with just 3 articles to test everything works:

```bash
# This will generate 3 test articles (one from each category)
node generate-articles.js --test
```

You should see:
```
Generating tool pages...
Generating: ai image generator
✓ Article generated (1/3)
Generating: ai video generator
✓ Article generated (2/3)
...
```

Generated files will be in: `./output/`

## Step 4: Review Generated Content (2 minutes)

```bash
# Check what was generated
ls -la output/

# Look at one article
cat output/tool-pages.json | head -50
```

Make sure the content looks good!

## Step 5: Import to Strapi (2 minutes)

```bash
node import-to-strapi.js
```

You should see:
```
Connecting to Strapi...
✓ Connected successfully
Importing tool pages...
✓ Imported: AI Image Generator (1/3)
✓ Imported: AI Video Generator (2/3)
...
✅ Import complete!
```

## Step 6: Verify in Strapi Admin (1 minute)

1. Open your Strapi admin: `https://your-app.railway.app/admin`
2. Go to **Content Manager** → **Tool Page**
3. You should see your imported articles!
4. Click on one to view it
5. Click **"Publish"** to make it live

## Step 7: Generate More Content (30-60 minutes)

Once the test works, generate more:

```bash
# Generate 50 articles (adjust number as needed)
node generate-articles.js --limit 50

# Import them
node import-to-strapi.js
```

**Tip**: Start small (10-20 articles), test, then scale up!

---

## Content Types Available

Your keyword data includes **60+ keywords** across 8 categories:

### Image Generators (11 keywords)
- ai image generator
- free ai image generator  
- best ai image generator
- bing ai image generator
- ... and more

### Video Generators (4 keywords)
- ai video generator
- free ai video generator
- ... and more

### Text Generators (7 keywords)
- ai text generator
- ai paragraph generator
- ai story generator
- ... and more

### Audio Generators (5 keywords)
- ai voice generator
- ai music generator
- ... and more

### Design Generators (5 keywords)
- ai logo generator
- ai drawing generator
- ai tattoo generator
- ... and more

### Character & Names (3 keywords)
- ai character generator
- ai name generator
- ... and more

### Photo Tools (2 keywords)
- ai headshot generator
- free ai headshot generator

### Other (4 keywords)
- ai generator
- free ai generator
- ... and more

**Total**: 41+ unique keywords to create content for!

---

## Customizing Content Generation

### Generate specific categories only:

```bash
# Just image generators
node generate-articles.js --category image --limit 10

# Just video generators  
node generate-articles.js --category video --limit 5
```

### Adjust AI model (in generate-articles.js):

```javascript
// Line 89 - Change the model
model: 'gpt-4-turbo-preview'  // More expensive, better quality
// OR
model: 'gpt-3.5-turbo'  // Cheaper, faster, good quality
```

### Adjust content length (in generate-articles.js):

```javascript
// Line 101 - Increase max_tokens for longer articles
max_tokens: 4000  // Default
max_tokens: 6000  // Longer, more detailed articles
```

---

## Publishing Workflow

### Option 1: Auto-publish (Risky)
Set all articles to "published" during import

### Option 2: Review then publish (Recommended)
1. Import as "draft"
2. Review in Strapi admin
3. Manually publish good ones
4. Edit/improve questionable ones

### Option 3: Batch publish
1. Import everything as draft
2. Review a batch (10-20)
3. Bulk publish in Strapi

---

## Cost Estimates

### Using GPT-4 Turbo
- ~$0.02-0.04 per article
- 100 articles = $2-4
- 1000 articles = $20-40

### Using GPT-3.5 Turbo
- ~$0.005-0.01 per article  
- 100 articles = $0.50-1
- 1000 articles = $5-10

**Tip**: Start with GPT-3.5 for initial batch, use GPT-4 for important keywords!

---

## Monitoring & Quality Control

### Check generated content quality:

1. **Read a few articles** - Do they make sense?
2. **Check facts** - Are tool descriptions accurate?
3. **SEO check** - Are keywords naturally included?
4. **Uniqueness** - Run through plagiarism checker if concerned

### Common issues:

- **Repetitive content**: Adjust temperature (make it higher for more variety)
- **Too generic**: Make prompts more specific
- **Factual errors**: Use GPT-4 instead of 3.5, or manually review
- **Poor SEO**: Update prompt template to emphasize keyword usage

---

## Next Steps After Content Import

1. ✅ **Verify content in Strapi** - Check it looks good
2. ✅ **Publish first articles** - Start with best keywords
3. ✅ **Set up Next.js frontend** - Display content on website
4. ✅ **Deploy to Vercel** - Make it live
5. ✅ **Submit sitemap to Google** - Get indexed
6. ✅ **Monitor & iterate** - Generate more content

---

## Troubleshooting

### "OpenAI API key not found"
- Check .env file exists in content-generator/
- Check API key is correct
- Try: `echo $OPENAI_API_KEY` to verify it's loaded

### "Cannot connect to Strapi"
- Check STRAPI_URL is correct (include https://)
- Check API token is correct
- Verify Strapi is running (visit /admin)

### "Import failed"
- Check content types exist in Strapi
- Verify API token has "Full access"
- Check Strapi logs in Railway

### Rate limits
- Add delays between requests (adjust RATE_LIMIT_MS in .env)
- Use smaller batches
- Upgrade OpenAI tier if needed

---

**Ready to generate content?** Follow the steps above! 🚀

Questions? Check logs or reach out for help!
