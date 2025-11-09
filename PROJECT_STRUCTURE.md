# Project Structure - Mini Blogging Platform

## Complete Directory Layout

```
mini-blogging-platform/
│
├── backend/
│   ├── controllers/
│   │   ├── blogController.js      # Blog CRUD operations (unused, logic in routes)
│   │   └── userController.js      # User registration and login
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT token verification
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/* routes (signup, login)
│   │   ├── blogRoutes.js          # /api/blogs/* routes (CRUD)
│   │   └── userRoutes.js          # Legacy routes (kept for compatibility)
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema (User, Blog models)
│   │   ├── migrations/            # Database migrations
│   │   └── dev.db                 # SQLite database file
│   ├── server.js                  # Express server entry point
│   ├── package.json               # Backend dependencies
│   └── .env                       # Environment variables (create this)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── SignUp.jsx     # User registration form
│   │   │   │   ├── Login.jsx      # User login form
│   │   │   │   └── Auth.css       # Auth component styles
│   │   │   ├── Blogs/
│   │   │   │   ├── BlogList.jsx   # Display all blogs
│   │   │   │   ├── BlogCard.jsx   # Individual blog card
│   │   │   │   ├── CreateBlog.jsx # Blog creation form
│   │   │   │   └── Blogs.css      # Blog component styles
│   │   │   └── Layout/
│   │   │       ├── Navbar.jsx     # Navigation bar
│   │   │       ├── Navbar.css     # Navbar styles
│   │   │       └── ProtectedRoute.jsx # Route protection component
│   │   ├── hooks/
│   │   │   └── useApi.js          # Custom API hook (GET, POST, loading, error)
│   │   ├── store/
│   │   │   ├── authStore.js       # Zustand store for authentication
│   │   │   └── blogStore.js       # Zustand store for blogs
│   │   ├── App.jsx                # Main app component with routing
│   │   ├── App.css                # App-level styles
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML template
│   ├── vite.config.js             # Vite configuration
│   ├── package.json               # Frontend dependencies
│   └── .gitignore                 # Git ignore rules
│
├── README.md                      # Main project documentation
├── PROJECT_STRUCTURE.md           # This file
└── .gitignore                     # Root git ignore (optional)
```

## Backend API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup` - Register new user
  - Body: `{ email: string, password: string }`
  - Response: `{ message: string, user: object }`

- `POST /api/auth/login` - Authenticate user
  - Body: `{ email: string, password: string }`
  - Response: `{ message: string, token: string, user: { id, email } }`

### Blog Routes (`/api/blogs`)
- `GET /api/blogs` - Get all blogs (public)
  - Response: `Array<{ id, title, content, authorId, author: { email }, createdAt }>`

- `POST /api/blogs` - Create blog (authenticated)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title: string, content: string }`
  - Response: `{ id, title, content, authorId, createdAt }`

- `PUT /api/blogs/:id` - Update blog (authenticated, author only)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title: string, content: string }`

- `DELETE /api/blogs/:id` - Delete blog (authenticated, author only)
  - Headers: `Authorization: Bearer <token>`

## Frontend Routes

- `/` - Redirects to `/blogs`
- `/signup` - User registration page
- `/login` - User login page
- `/blogs` - Blog list page (public)
- `/create` - Create blog page (protected, requires authentication)

## State Management

### Auth Store (Zustand)
- `user`: Current logged-in user object
- `token`: JWT token
- `isAuthenticated`: Boolean authentication status
- `login(user, token)`: Set user and token
- `logout()`: Clear user and token
- `setUser(user)`: Update user info
- **Persistence**: Stored in localStorage

### Blog Store (Zustand)
- `blogs`: Array of blog objects
- `loading`: Loading state
- `error`: Error message
- `setBlogs(blogs)`: Replace blogs array
- `addBlog(blog)`: Add new blog to array
- `updateBlog(id, blog)`: Update existing blog
- `removeBlog(id)`: Remove blog from array
- `setLoading(loading)`: Set loading state
- `setError(error)`: Set error state

## Custom Hook: useApi

### Parameters
- `endpoint`: API endpoint string (e.g., '/blogs')
- `options`: Configuration object
  - `method`: HTTP method ('GET' | 'POST', default: 'GET')
  - `data`: Request body data (for POST)
  - `autoFetch`: Automatically fetch on mount (default: true)
  - `storeKey`: Key for auto-updating store ('blogs' | 'auth')

### Returns
- `data`: Response data
- `loading`: Loading state
- `error`: Error message
- `execute(data)`: Manually execute request

### Features
- Automatic JWT token injection
- Auto-updates Zustand stores
- Handles loading and error states
- Automatic logout on 401/403 errors

## Component Hierarchy

```
App
├── Navbar
└── Routes
    ├── SignUp
    ├── Login
    ├── BlogList
    │   └── BlogCard (multiple)
    └── ProtectedRoute
        └── CreateBlog
```

## Data Flow

1. **Authentication Flow**:
   - User submits login/signup form
   - `useApi` hook makes POST request
   - Response contains token and user
   - `useApi` auto-updates `authStore`
   - Token stored in localStorage (via Zustand persist)
   - User redirected to `/blogs`

2. **Blog Creation Flow**:
   - Authenticated user navigates to `/create`
   - User fills form and submits
   - `useApi` hook makes POST request with token
   - New blog added to `blogStore`
   - User redirected to `/blogs`

3. **Blog List Flow**:
   - Component mounts, `useApi` auto-fetches
   - Response updates `blogStore`
   - Component renders blogs from store

## Security Features

- JWT tokens for authentication
- Password hashing with bcrypt (10 rounds)
- Protected routes (client-side)
- Token verification middleware (server-side)
- Automatic token injection in API requests
- Auto-logout on authentication errors

## Environment Variables

### Backend (.env)
```
DATABASE_URL="file:./prisma/dev.db"
PORT=5000
JWT_SECRET=your-secret-key-here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

