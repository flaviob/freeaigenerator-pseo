# Railway Deployment Guide for Strapi

## Step 1: Create Railway Project

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy PostgreSQL"

## Step 2: Configure PostgreSQL Database

1. Wait for PostgreSQL to deploy (2-3 minutes)
2. Click on the PostgreSQL service
3. Go to "Variables" tab
4. Copy the `DATABASE_URL` value - you'll need this later

## Step 3: Deploy Strapi Service

1. In the same Railway project, click "New" → "Empty Service"
2. Click "Connect Repo" and select your GitHub repository
3. **IMPORTANT**: Set the root directory to `strapi-backend`
   - Go to Settings → Root Directory
   - Enter: `strapi-backend`
   - Click Save

## Step 4: Add Environment Variables

In your Strapi service, go to "Variables" tab and add these:

```bash
# Database
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
DATABASE_SSL=false

# Server
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Generated Secrets (use the values generated for you below)
APP_KEYS=eKXkFWikFp9aUYjpXrzLvYrNkKWP6j4xfevVZqYokok=
API_TOKEN_SALT=HGsglCsx2GysWEkWg9Xg2GbqXoP2FHZJxvxVwxN8zqE=
ADMIN_JWT_SECRET=VsA8U3hdMve8eVOl8tbMXh+nzRck53qwl99GPzQZYFI=
JWT_SECRET=a0wtEbnICuBySiTUVotl3tWR/j4ixpVW1VGNGC7vcgE=
TRANSFER_TOKEN_SALT=r/8HSfVYeQJHOtEETRCp+H9Vev32HXkHsXSbMF+aHDI=
```

**Note**: The `${{Postgres.DATABASE_URL}}` syntax automatically references the PostgreSQL service in your Railway project.

## Step 5: Deploy

1. Railway will automatically deploy when you push to GitHub
2. Or click "Deploy" in the Railway dashboard
3. Wait for build to complete (~5 minutes)
4. Check logs for any errors

## Step 6: Access Your Strapi Admin

1. Click on your Strapi service in Railway
2. Click "Settings" → "Generate Domain"
3. Copy the generated domain (e.g., `your-app.railway.app`)
4. Visit `https://your-app.railway.app/admin`
5. Create your admin account

## Step 7: Create API Token for Content Generator

1. Log in to Strapi admin panel
2. Go to Settings → API Tokens
3. Click "Create new API Token"
4. Name: "Content Generator"
5. Token type: "Full access"
6. Click "Save"
7. **COPY THE TOKEN** - you'll need it for the content-generator

## Troubleshooting

### Build fails with "No package.json found"
- Make sure root directory is set to `strapi-backend` in Railway settings

### Database connection errors
- Verify `DATABASE_URL` is correctly set to `${{Postgres.DATABASE_URL}}`
- Check that PostgreSQL service is running

### "Module not found" errors
- Clear build cache in Railway settings
- Redeploy

### Port binding errors
- Make sure `PORT` is set to `1337`
- Make sure `HOST` is set to `0.0.0.0`

## Next Steps

After Strapi is deployed:

1. Configure content types in Strapi admin
2. Set up the content-generator with your Strapi URL and API token
3. Generate and import content
4. Deploy Next.js frontend to Vercel

## Cost Estimate

- PostgreSQL: ~$5/month
- Strapi service: ~$5/month
- **Total: ~$10/month**

Railway offers $5 free credit per month, so initial costs may be lower.
