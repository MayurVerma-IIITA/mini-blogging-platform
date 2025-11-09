# Setup Instructions - Mini Blogging Platform

## Quick Start Guide

### Step 1: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Initialize database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ```
   
   Backend will run on `http://localhost:5000`

### Step 2: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Optional - Create environment file:**
   Create a `.env` file in the `frontend` directory (only if you need to change API URL):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start frontend development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

### Step 3: Access the Application

1. Open your browser and go to `http://localhost:3000`
2. Sign up for a new account
3. Login with your credentials
4. Create your first blog post!

## Verification Checklist

### Backend Verification
- [ ] Backend server starts without errors
- [ ] Database migrations completed successfully
- [ ] API responds at `http://localhost:5000`
- [ ] Test endpoint: `GET http://localhost:5000/` returns success message

### Frontend Verification
- [ ] Frontend server starts without errors
- [ ] Application loads at `http://localhost:3000`
- [ ] Can navigate to Sign Up page
- [ ] Can navigate to Login page
- [ ] Can view Blogs page (even without login)

### Integration Verification
- [ ] Can sign up a new user
- [ ] Can login with credentials
- [ ] Token is stored in localStorage
- [ ] Can create a blog post (when logged in)
- [ ] Can view all blogs
- [ ] Navigation works correctly

## Troubleshooting

### Backend Issues

**Problem: Database connection error**
- Solution: Make sure `DATABASE_URL` in `.env` points to the correct path
- Run `npx prisma generate` and `npx prisma migrate dev` again

**Problem: Port already in use**
- Solution: Change `PORT` in `.env` to a different port (e.g., 5001)
- Update frontend `.env` to match: `VITE_API_URL=http://localhost:5001/api`

**Problem: JWT errors**
- Solution: Make sure `JWT_SECRET` is set in `.env` file

### Frontend Issues

**Problem: Cannot connect to API**
- Solution: Check that backend is running
- Verify `VITE_API_URL` in frontend `.env` matches backend URL
- Check browser console for CORS errors (backend should have CORS enabled)

**Problem: Authentication not persisting**
- Solution: Check browser localStorage for `auth-storage` key
- Clear localStorage and try logging in again

**Problem: Build errors**
- Solution: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Production Deployment

### Backend Deployment

1. Set environment variables in your hosting platform
2. Run production migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Build and start:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting platform
3. Set `VITE_API_URL` environment variable to your production backend URL

## Development Tips

- Use `npm run dev` for both backend and frontend during development
- Backend uses nodemon for auto-restart on file changes
- Frontend uses Vite HMR (Hot Module Replacement) for instant updates
- Check browser DevTools console for frontend errors
- Check terminal for backend errors
- Use Postman or similar tool to test API endpoints directly

