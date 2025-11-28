# Netlify Deployment Troubleshooting

## Quick Fix Checklist

I've fixed the main configuration issue:
- ✅ Moved `netlify.toml` to the root directory
- ✅ Updated build paths to be correct
- ✅ Verified local build works

## Common Netlify Deployment Issues & Solutions

### Issue 1: "Build Failed" Error

**Symptoms**: Netlify shows build failed in the deploy logs

**Solutions**:

1. **Check Node Version**
   - Netlify uses Node 18 by default (configured in `netlify.toml`)
   - If you need a different version, update `NODE_VERSION` in `netlify.toml`

2. **Missing Dependencies**
   - Make sure `package-lock.json` is committed to git
   - Try: `git add client/package-lock.json && git commit -m "Add package-lock" && git push`

3. **Build Command Issues**
   - The build command should be: `cd client && npm install && npm run build`
   - This is already configured in `netlify.toml`

### Issue 2: "Deploy Failed" - Can't Find Files

**Symptoms**: Build succeeds but deploy fails, or site shows 404

**Solution**: 
- Publish directory must be `client/dist` (already configured)
- Make sure `netlify.toml` is in the **root** directory (I just moved it there)

### Issue 3: Environment Variables Not Working

**Symptoms**: API calls fail, getting `undefined` errors

**Solution**:
1. In Netlify dashboard, go to: **Site settings** → **Environment variables**
2. Add: `VITE_API_URL` = `https://your-backend.onrender.com`
3. **Important**: After adding variables, you MUST rebuild:
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Issue 4: "Page Not Found" on Refresh

**Symptoms**: Homepage works, but refreshing on `/events` or other routes shows 404

**Solution**: 
- Already handled by redirect rules in `netlify.toml`
- If still happening, make sure `netlify.toml` is in root directory

### Issue 5: Git Push Issues

**Symptoms**: Can't push to GitHub or Netlify can't access repo

**Solution**:
```bash
# Make sure all changes are committed
git add .
git commit -m "Fix Netlify configuration"
git push origin main
```

## Step-by-Step Deployment (Updated)

### Method 1: GitHub Integration (Recommended)

1. **Commit and Push Your Changes**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Go to Netlify**
   - Visit: https://app.netlify.com
   - Click: **"Add new site"** → **"Import an existing project"**

3. **Connect Repository**
   - Choose: **"Deploy with GitHub"**
   - Select: `mern-final-project-DawitiHunde`

4. **Configure Build** (should auto-detect from netlify.toml)
   - **Build command**: `cd client && npm install && npm run build`
   - **Publish directory**: `client/dist`
   - Click: **"Deploy site"**

5. **Add Environment Variables**
   - Go to: **Site settings** → **Environment variables**
   - Add: `VITE_API_URL` with your Render backend URL
   - Trigger a new deploy

### Method 2: Netlify CLI (Alternative)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd client
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Method 3: Manual Drag & Drop

1. **Build Locally**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy**
   - Go to: https://app.netlify.com/drop
   - Drag the `client/dist` folder
   - Done!

## What to Check If Still Not Working

1. **Check Netlify Deploy Logs**
   - Go to: **Deploys** tab in Netlify
   - Click on the failed deploy
   - Read the error message carefully

2. **Common Error Messages**:

   - **"Command failed with exit code 1"**
     - Check if build works locally: `npm run build`
     - Look for specific error in logs

   - **"No such file or directory"**
     - Wrong publish directory
     - Make sure `netlify.toml` is in root

   - **"Module not found"**
     - Missing dependencies
     - Run: `npm install` and commit `package-lock.json`

3. **Verify File Structure**
   ```
   mern-final-project-DawitiHunde/
   ├── netlify.toml          ← Must be here (root)
   ├── client/
   │   ├── package.json
   │   ├── vite.config.js
   │   └── dist/             ← Created after build
   └── server/
   ```

## Need More Help?

If you're still having issues, please share:
1. The error message from Netlify deploy logs
2. Screenshot of the error
3. Your Netlify build settings

I can then provide specific guidance!
