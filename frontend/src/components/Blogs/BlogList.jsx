import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useBlogStore } from '../../store/blogStore';
import { useAuthStore } from '../../store/authStore';
import BlogCard from './BlogCard';
import './Blogs.css';

const BlogList = () => {
  const { blogs } = useBlogStore();
  const { isAuthenticated } = useAuthStore();
  const { loading, error, execute } = useApi('/blogs', {
    method: 'GET',
    autoFetch: true,
    storeKey: 'blogs',
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => execute()} className="btn-secondary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      <div className="blog-hero">
        <h2>Discover Amazing Stories</h2>
        <p className="blog-hero-subtitle">Share your thoughts, read others' insights, and connect with the community</p>
        {isAuthenticated && (
          <Link to="/create" className="btn-create-hero">
            ✍️ Create New Blog
          </Link>
        )}
      </div>
      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>📝 No blogs yet. Be the first to publish one!</p>
          {isAuthenticated && (
            <Link to="/create" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block', textDecoration: 'none' }}>
              Create Your First Blog
            </Link>
          )}
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onUpdate={() => execute()} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;

