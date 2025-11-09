import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import BlogList from './components/Blogs/BlogList';
import BlogDetail from './components/Blogs/BlogDetail';
import CreateBlog from './components/Blogs/CreateBlog';
import EditBlog from './components/Blogs/EditBlog';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" replace />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/blogs" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

