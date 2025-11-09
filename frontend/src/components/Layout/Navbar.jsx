import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/blogs" className="navbar-brand">
          📝 Mini Blogging Platform
        </Link>
        
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/blogs" className="nav-link">Blogs</Link>
              <Link to="/create" className="nav-link">Create Blog</Link>
              <span className="nav-user">Welcome, {user?.email}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/blogs" className="nav-link">Blogs</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

