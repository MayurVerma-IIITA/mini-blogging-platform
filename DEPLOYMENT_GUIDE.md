# Deployment Guide - Mini Blogging Platform

## 🚀 Deployment Strategy

**Backend:** Render (Free Tier)  
**Frontend:** Vercel (Free Tier)  
**Database:** SQLite (included with backend)

## 📋 Prerequisites

1. GitHub account
2. Render account (sign up at https://render.com)
3. Vercel account (sign up at https://vercel.com)
4. Your code pushed to GitHub

---

## Part 1: Prepare Your Code for Deployment

### Step 1: Update Backend for Production

1. **Create `.env.example` file** (for reference):
```env
DATABASE_URL="file:./prisma/dev.db"
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

2. **Update `backend/server.js`** to handle production database path:
   - Render will provide a different path for the database
   - We'll use environment variables

### Step 2: Update Frontend API URL

The frontend needs to know the backend URL in production. We'll set this as an environment variable in Vercel.

---

## Part 2: Deploy Backend to Render

### Step 1: Push Code to GitHub

1. Initialize git (if not done):
```bash
git init
git add .
git commit -m "Initial commit - Mini Blogging Platform"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** mini-blogging-backend
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** (leave empty, or set to `backend` if you want)

5. **Environment Variables:**
   - `DATABASE_URL` = `file:./prisma/prod.db` (or let Render handle it)
   - `PORT` = `10000` (Render sets this automatically, but you can specify)
   - `JWT_SECRET` = Generate a strong random string (use: `openssl rand -hex 32`)

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://mini-blogging-backend.onrender.com`)

### Step 3: Update CORS in Backend

Update `backend/server.js` to allow your frontend domain.

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Deploy on Vercel

1. Go to https://vercel.com and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Environment Variables:**
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Copy your frontend URL

### Step 2: Update Backend CORS

Update backend to allow your Vercel domain.

---

## Part 4: Final Configuration

1. Update backend CORS with frontend URL
2. Update frontend environment variable if needed
3. Test the deployed application

---

## 🔧 Troubleshooting

### Backend Issues
- **Database errors:** Make sure migrations run in build command
- **Port issues:** Render sets PORT automatically
- **Build fails:** Check build logs in Render dashboard

### Frontend Issues
- **API errors:** Check VITE_API_URL is correct
- **CORS errors:** Update backend CORS settings
- **Build fails:** Check Vercel build logs

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Frontend is accessible
- [ ] Can sign up new user
- [ ] Can login
- [ ] Can create blog
- [ ] Can view blogs
- [ ] Can edit/delete own blogs
- [ ] All features working

---

## 📝 Notes

- Render free tier: Spins down after 15 minutes of inactivity (first request may be slow)
- Vercel free tier: Excellent performance, no spin-down
- Database: SQLite file is stored in Render's filesystem (persists between deployments)

