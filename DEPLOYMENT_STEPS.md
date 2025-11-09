# Step-by-Step Deployment Instructions

## 🎯 Quick Overview

We'll deploy:
- **Backend** → Render (free)
- **Frontend** → Vercel (free)

---

## 📦 Step 1: Prepare Your Code

### 1.1 Check Your Project Structure

Make sure you have:
- ✅ `backend/` folder with all backend code
- ✅ `frontend/` folder with all frontend code
- ✅ `.gitignore` file in root
- ✅ All code committed to Git

### 1.2 Initialize Git (if not done)

```bash
# In your project root
git init
git add .
git commit -m "Ready for deployment"
```

---

## 📤 Step 2: Push to GitHub

### 2.1 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `mini-blogging-platform`)
3. **Don't** initialize with README (you already have one)

### 2.2 Push Your Code

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Tell me when this is done, and I'll give you the next step!**

---

## 🔧 Step 3: Deploy Backend to Render

### 3.1 Sign Up for Render

1. Go to https://render.com
2. Sign up with GitHub (recommended)

### 3.2 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account if not already connected
3. Select your repository
4. Click **"Connect"**

### 3.3 Configure Backend

Fill in these settings:

**Basic Settings:**
- **Name:** `mini-blogging-backend`
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main`

**Build & Deploy:**
- **Root Directory:** `backend` (IMPORTANT!)
- **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
- **Start Command:** `npm start`

**Environment Variables:**
Click "Add Environment Variable" and add:

1. **DATABASE_URL**
   - Value: `file:./prisma/prod.db`

2. **JWT_SECRET**
   - Value: Generate a random string (use: `openssl rand -hex 32` or any random string generator)
   - Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`

3. **NODE_ENV**
   - Value: `production`

4. **FRONTEND_URL** (we'll update this after frontend deployment)
   - Value: `*` (for now, we'll update later)

### 3.4 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for first deployment
3. Copy your backend URL (e.g., `https://mini-blogging-backend.onrender.com`)

**⚠️ Important:** Save your backend URL! You'll need it for frontend deployment.

**Tell me when backend is deployed and share the URL!**

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 4.1 Sign Up for Vercel

1. Go to https://vercel.com
2. Sign up with GitHub (recommended)

### 4.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Click **"Import"**

### 4.3 Configure Frontend

**Project Settings:**
- **Framework Preset:** Vite (should auto-detect)
- **Root Directory:** `frontend` (IMPORTANT!)
- **Build Command:** `npm run build` (should auto-fill)
- **Output Directory:** `dist` (should auto-fill)

**Environment Variables:**
Click "Add" and add:

1. **VITE_API_URL**
   - Value: `https://YOUR-BACKEND-URL.onrender.com/api`
   - Replace `YOUR-BACKEND-URL` with your actual Render backend URL

### 4.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Copy your frontend URL (e.g., `https://mini-blogging-platform.vercel.app`)

**Tell me when frontend is deployed and share the URL!**

---

## 🔗 Step 5: Connect Backend and Frontend

### 5.1 Update Backend CORS

1. Go back to Render dashboard
2. Find your backend service
3. Go to **"Environment"** tab
4. Update **FRONTEND_URL**:
   - Value: `https://YOUR-FRONTEND-URL.vercel.app`
   - Replace with your actual Vercel frontend URL
5. Click **"Save Changes"**
6. Render will automatically redeploy

### 5.2 Update Frontend (if needed)

If you need to update the API URL:
1. Go to Vercel dashboard
2. Find your project
3. Go to **"Settings"** → **"Environment Variables"**
4. Update **VITE_API_URL** if needed
5. Redeploy (or it will auto-redeploy)

---

## ✅ Step 6: Test Your Deployment

Test these features:

1. ✅ Visit frontend URL
2. ✅ Sign up a new user
3. ✅ Login
4. ✅ Create a blog post
5. ✅ View all blogs
6. ✅ Click on a blog to view details
7. ✅ Edit your own blog
8. ✅ Delete your own blog

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Build fails
- **Solution:** Check build logs in Render dashboard
- Make sure Root Directory is set to `backend`

**Problem:** Database errors
- **Solution:** Make sure `npx prisma migrate deploy` is in build command

**Problem:** CORS errors
- **Solution:** Update FRONTEND_URL in Render environment variables

### Frontend Issues

**Problem:** Can't connect to API
- **Solution:** Check VITE_API_URL is correct (should end with `/api`)

**Problem:** Build fails
- **Solution:** Check Vercel build logs
- Make sure Root Directory is set to `frontend`

---

## 📝 Notes

- **Render free tier:** Spins down after 15 min inactivity (first request may be slow)
- **Vercel free tier:** Always on, excellent performance
- **Database:** SQLite file persists in Render's filesystem

---

## 🎉 You're Done!

Once everything is working, you have:
- ✅ Live backend API
- ✅ Live frontend application
- ✅ Fully functional blogging platform

**Share your deployed URLs in your submission!**

