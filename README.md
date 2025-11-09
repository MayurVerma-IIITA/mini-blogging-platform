# Mini Blogging Platform

A full-stack blogging platform with React frontend and Node.js/Express backend, featuring user authentication and blog management.

## 🚀 Features

- **User Authentication**: Sign up and login with email and password
- **Blog Management**: Create, view, and manage blog posts
- **State Management**: Zustand for global state management
- **Custom API Hook**: Reusable `useApi` hook for API requests
- **Secure**: JWT-based authentication with password hashing
- **Modern UI**: Clean and responsive design

## 📁 Project Structure

```
mini-blogging-platform/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication middleware
│   ├── routes/            # API routes
│   ├── prisma/            # Database schema and migrations
│   └── server.js          # Express server
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Auth/      # Authentication components
│   │   │   ├── Blogs/     # Blog components
│   │   │   └── Layout/    # Layout components
│   │   ├── hooks/         # Custom hooks (useApi)
│   │   ├── store/         # Zustand stores
│   │   └── App.jsx        # Main app component
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Backend
- Node.js & Express
- Prisma ORM
- SQLite Database
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React 18
- Vite
- React Router
- Zustand (State Management)
- Axios (HTTP Client)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL="file:./prisma/dev.db"
PORT=5000
JWT_SECRET=your-secret-key-here
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file in the `frontend` directory if you need to change the API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
  - Body: `{ email: string, password: string }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ email: string, password: string }`
  - Returns: `{ token: string, user: { id, email } }`

### Blogs
- `GET /api/blogs` - Get all blogs (public)
  - Returns: Array of blogs with author info

- `POST /api/blogs` - Create a new blog (authenticated)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title: string, content: string }`

## 🔐 Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token
3. Token is stored in Zustand store (persisted in localStorage)
4. Token is automatically included in API requests via axios interceptor
5. Protected routes check authentication status

## 📝 Usage

1. **Sign Up**: Create a new account at `/signup`
2. **Login**: Login at `/login`
3. **View Blogs**: Browse all blogs at `/blogs`
4. **Create Blog**: Authenticated users can create blogs at `/create`

## 🧪 State Management

### Auth Store (`authStore.js`)
- Manages user authentication state
- Persists token and user info in localStorage
- Provides `login()`, `logout()`, and `setUser()` methods

### Blog Store (`blogStore.js`)
- Manages blog list state
- Provides methods to add, update, and remove blogs
- Handles loading and error states

### Custom Hook (`useApi.js`)
- Handles API requests with automatic token injection
- Manages loading and error states
- Auto-updates Zustand stores based on endpoint
- Supports GET and POST methods

## 🚢 Deployment

### Backend Deployment
1. Set environment variables in your hosting platform
2. Run database migrations: `npx prisma migrate deploy`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder to your hosting platform (Vercel, Netlify, etc.)
3. Set the `VITE_API_URL` environment variable to your backend URL

## 📄 License

ISC

## 👤 Author

Mini Blogging Platform - Full Stack Project

