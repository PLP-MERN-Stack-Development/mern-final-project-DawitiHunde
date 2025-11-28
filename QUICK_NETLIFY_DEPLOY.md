# Quick Netlify Deploy - Manual Method

Since you're seeing "Deploy logs unavailable", try this manual approach:

## Step 1: Build Your Frontend Locally

Open PowerShell in your project directory and run:

```powershell
cd client
npm install
npm run build
```

This creates a `client/dist` folder.

## Step 2: Deploy to Netlify

1. Go to: https://app.netlify.com/drop
2. Drag and drop the **entire `client/dist` folder** onto the page
3. Your site will deploy instantly!

## Step 3: Add Environment Variable

After deployment:

1. Click on your deployed site
2. Go to: **Site settings** → **Environment variables**
3. Click **"Add a variable"**
4. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-app.onrender.com` (your Render backend URL)

## Step 4: Rebuild with Environment Variable

Since you added an environment variable after the initial deploy:

1. Go to: **Deploys** tab
2. Click: **"Trigger deploy"** → **"Deploy site"**

## Alternative: Fix GitHub Deploy

If you want to use GitHub integration instead:

1. Make sure your code is pushed:
   ```powershell
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. In Netlify, click **"Deploy settings"**

3. Verify these settings:
   - **Build command**: `cd client && npm install && npm run build`
   - **Publish directory**: `client/dist`
   - **Base directory**: (leave empty)

4. Click **"Retry deploy"**

## Troubleshooting

If the "Deploy logs unavailable" error persists:
- This is a Netlify platform issue
- Try again in 5-10 minutes
- Use the manual drag-and-drop method above as a workaround
