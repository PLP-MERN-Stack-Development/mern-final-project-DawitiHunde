# Deploying Frontend to Netlify

This guide will help you deploy your React frontend to Netlify.

## Prerequisites

- Your backend must be deployed on Render first
- You need the backend URL from Render (e.g., `https://your-app.onrender.com`)
- A GitHub account (recommended) or you can drag-and-drop deploy

## Option 1: Deploy via GitHub (Recommended)

### Step 1: Push Your Code to GitHub

If you haven't already:

```bash
git add .
git commit -m "Prepare frontend for Netlify deployment"
git push origin main
```

### Step 2: Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up or log in with your GitHub account
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Authorize Netlify to access your repositories
6. Select your repository: `mern-final-project-DawitiHunde`

### Step 3: Configure Build Settings

Netlify should auto-detect your settings from `netlify.toml`, but verify:

- **Base directory**: `client`
- **Build command**: `npm run build`
- **Publish directory**: `client/dist`

### Step 4: Add Environment Variables

Before deploying, add your environment variable:

1. Click **"Add environment variables"** or go to **Site settings** → **Environment variables**
2. Add the following:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://your-backend-app.onrender.com`)
   
   > **Important**: Do NOT include a trailing slash in the URL

### Step 5: Deploy

1. Click **"Deploy site"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Once deployed, you'll get a URL like `https://random-name-123.netlify.app`

### Step 6: Update Backend CORS

Your backend needs to allow requests from your Netlify URL:

1. Go to your Render dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Add or update the `CORS_ORIGIN` variable:
   - **Key**: `CORS_ORIGIN`
   - **Value**: Your Netlify URL (e.g., `https://random-name-123.netlify.app`)

5. Update your backend code to use this environment variable in CORS settings

---

## Option 2: Manual Deploy (Drag & Drop)

### Step 1: Build Your Frontend Locally

```bash
cd client
npm install
npm run build
```

This creates a `dist` folder with your production build.

### Step 2: Deploy to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Drag and drop the `client/dist` folder onto the Netlify dashboard
3. Your site will be deployed instantly!

### Step 3: Add Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Render backend URL

3. **Important**: After adding environment variables, you need to rebuild:
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## Troubleshooting

### Issue: "Page Not Found" on Refresh

**Solution**: This is already handled by the `netlify.toml` redirect rules. If you still see this:
1. Check that `netlify.toml` is in the `client` folder
2. Redeploy your site

### Issue: API Calls Failing

**Possible causes**:
1. `VITE_API_URL` not set correctly in Netlify
2. Backend CORS not configured for your Netlify URL
3. Backend not running on Render

**Solution**:
1. Check Netlify environment variables
2. Update backend CORS settings
3. Check Render logs for backend errors

### Issue: Build Fails

**Common causes**:
1. Missing dependencies
2. Build command incorrect
3. Node version mismatch

**Solution**:
1. Check build logs in Netlify
2. Verify `netlify.toml` settings
3. Try building locally first: `npm run build`

---

## Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your DNS

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL from Render | `https://your-app.onrender.com` |

---

## Next Steps

After deployment:

1. ✅ Test your deployed site
2. ✅ Verify all API calls work
3. ✅ Test user registration and login
4. ✅ Test event creation and registration
5. ✅ Update your README with the live URLs

---

## Your Deployment URLs

Once deployed, save these URLs:

- **Frontend (Netlify)**: `https://your-site.netlify.app`
- **Backend (Render)**: `https://your-backend.onrender.com`
