# Enable Strapi API Access - Step by Step

## Problem
You created content in Strapi but it returns 404 when accessing via API because the permissions aren't enabled.

## Solution - Enable Public API Access

### Step 1: Go to Settings
1. In Strapi admin panel (https://freeaigenerator-pseo-production.up.railway.app/admin)
2. Click **⚙️ Settings** in the left sidebar (bottom)

### Step 2: Navigate to Roles
1. Under "USERS & PERMISSIONS PLUGIN" section
2. Click **Roles**
3. Click on **Public** role

### Step 3: Enable Tool Page Permissions
1. Scroll down to find **TOOL-PAGE** section
2. Check these boxes:
   - ☑️ **find** (allows GET /api/tool-pages)
   - ☑️ **findOne** (allows GET /api/tool-pages/:id)
3. Click **Save** button (top right)

### Step 4: Test the API
Run this command to test:
```bash
curl https://freeaigenerator-pseo-production.up.railway.app/api/tool-pages
```

You should see JSON data with your "AI Image Generator" content!

### Step 5: Enable for Other Content Types (Optional)
Repeat Step 3 for:
- **COMPARISON-PAGE** (find, findOne)
- **CATEGORY-PAGE** (find, findOne)

---

## Why This is Needed
Strapi protects all content by default. You must explicitly enable public access for each content type to make it available via the API.
