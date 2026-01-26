# 🚀 Deploy to Railway - Step by Step

Your code is ready! Follow these steps to deploy Strapi to Railway.

## Step 1: Create Railway Project (2 minutes)

1. Go to **https://railway.app**
2. Click **"Login"** (sign in with GitHub)
3. Click **"New Project"**
4. Select **"Deploy PostgreSQL"**
5. Wait for database to deploy (~1 minute)

## Step 2: Get Database URL (1 minute)

1. Click on the **PostgreSQL** service in your project
2. Go to **"Variables"** tab
3. Find **`DATABASE_URL`** - you'll use this in Step 4

## Step 3: Add Strapi Service (2 minutes)

1. In your Railway project, click **"New"** → **"GitHub Repo"**
2. Select your repository: **`freeaigenerator-pseo`**
3. Railway will ask which service to deploy
4. Click **"Add variables"** (we'll add them next)

## Step 4: Configure Strapi Service (3 minutes)

### 4a. Set Root Directory

1. Click on your Strapi service
2. Go to **"Settings"** tab
3. Find **"Root Directory"**
4. Enter: `strapi-backend`
5. Click **"Save"**

### 4b. Add Environment Variables

Click on **"Variables"** tab and add these (copy-paste each line):

```bash
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
DATABASE_SSL=false
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=eKXkFWikFp9aUYjpXrzLvYrNkKWP6j4xfevVZqYokok=
API_TOKEN_SALT=HGsglCsx2GysWEkWg9Xg2GbqXoP2FHZJxvxVwxN8zqE=
ADMIN_JWT_SECRET=VsA8U3hdMve8eVOl8tbMXh+nzRck53qwl99GPzQZYFI=
JWT_SECRET=a0wtEbnICuBySiTUVotl3tWR/j4ixpVW1VGNGC7vcgE=
TRANSFER_TOKEN_SALT=r/8HSfVYeQJHOtEETRCp+H9Vev32HXkHsXSbMF+aHDI=
```

**Note**: `${{Postgres.DATABASE_URL}}` automatically links to your PostgreSQL service

## Step 5: Deploy (5 minutes)

1. Railway will automatically start deploying
2. Watch the **"Deployments"** tab for progress
3. Build takes ~3-5 minutes (this is normal)
4. Look for **"SUCCESS"** status

## Step 6: Get Your Strapi URL (1 minute)

1. Click on your Strapi service
2. Go to **"Settings"** tab
3. Scroll to **"Networking"**
4. Click **"Generate Domain"**
5. Copy the URL (something like `your-app-production.up.railway.app`)

## Step 7: Access Strapi Admin (2 minutes)

1. Open your Strapi URL in browser
2. Add `/admin` to the end (e.g., `https://your-app.railway.app/admin`)
3. **Create admin account**:
   - Email: your-email@example.com
   - Password: (choose a strong password)
   - Name: Your Name
4. Click **"Create"**

## Step 8: Create API Token (2 minutes)

1. In Strapi admin, click **"Settings"** (bottom left)
2. Under "Global Settings", click **"API Tokens"**
3. Click **"Create new API Token"**
4. Settings:
   - **Name**: `Content Generator`
   - **Token duration**: `Unlimited`
   - **Token type**: `Full access`
5. Click **"Save"**
6. **⚠️ COPY THE TOKEN NOW** - it only shows once!
7. Save it somewhere safe (you'll need it in the next step)

## Step 9: Test Strapi (1 minute)

1. In Strapi admin, go to **"Content Manager"** (top left)
2. You should see three content types:
   - ✅ Tool Page
   - ✅ Comparison Page
   - ✅ Category Page

If you see these, **Strapi is working!** 🎉

---

## What's Next?

Once Strapi is deployed and you have your API token, we'll:
1. Configure the content generator
2. Generate test articles
3. Import them to Strapi
4. Start publishing!

## Troubleshooting

### Build fails
- Check **Deployments** → **View Logs** for errors
- Verify root directory is `strapi-backend`
- Check all environment variables are set

### Can't access /admin
- Make sure deployment shows "SUCCESS"
- Check the domain is generated
- Wait 1-2 minutes after deployment completes

### Database connection error
- Verify `DATABASE_URL=${{Postgres.DATABASE_URL}}`
- Make sure PostgreSQL service is running
- Check DATABASE_CLIENT=postgres is set

---

**Ready?** Open Railway and follow the steps above! 🚀

When you're done, you'll have:
- ✅ Strapi running on Railway
- ✅ PostgreSQL database connected
- ✅ Admin account created
- ✅ API token ready for content generation

Let me know your Strapi URL and API token when ready!
