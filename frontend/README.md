# Frontend - Mini Blogging Platform

React-based frontend for the Mini Blogging Platform.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Auth/          # SignUp, Login components
│   ├── Blogs/         # BlogList, CreateBlog, BlogCard
│   └── Layout/        # Navbar, ProtectedRoute
├── hooks/
│   └── useApi.js      # Custom API hook
├── store/
│   ├── authStore.js  # Authentication state
│   └── blogStore.js  # Blog state
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point
```

## Environment Variables

Create a `.env` file (optional):
```
VITE_API_URL=http://localhost:5000/api
```

## Features

- ✅ React Router for navigation
- ✅ Zustand for state management
- ✅ Custom useApi hook for API calls
- ✅ JWT token management
- ✅ Protected routes
- ✅ Responsive design
- ✅ Error and loading states

