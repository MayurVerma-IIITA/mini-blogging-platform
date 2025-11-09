import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useBlogStore } from '../../store/blogStore';
import { useAuthStore } from '../../store/authStore';
import api from '../../hooks/useApi';
import './Blogs.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs } = useBlogStore();
  const { user, isAuthenticated } = useAuthStore();

  // Find blog in store or fetch it
  const blog = blogs.find(b => b.id === parseInt(id));
  
  const { loading, error, execute } = useApi('/blogs', {
    method: 'GET',
    autoFetch: !blog, // Only fetch if blog not in store
    storeKey: 'blogs',
  });

  // If blog not in store, try to fetch all blogs
  useEffect(() => {
    if (!blog && !loading) {
      execute();
    }
  }, [blog, loading, execute]);

  const currentBlog = blog || blogs.find(b => b.id === parseInt(id));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOwner = isAuthenticated && user && currentBlog?.authorId === user.id;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (error || !currentBlog) {
    return (
      <div className="blog-detail-container">
        <div className="error-container">
          <p>Blog not found</p>
          <Link to="/blogs" className="btn-secondary">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-card">
        <Link to="/blogs" className="back-link">← Back to All Blogs</Link>
        
        <h1 className="blog-detail-title">{currentBlog.title}</h1>
        
        <div className="blog-detail-meta">
          <span className="blog-detail-author">
            By <strong>{currentBlog.author?.email || 'Unknown'}</strong>
          </span>
          <span className="blog-detail-date">
            {formatDate(currentBlog.createdAt)}
          </span>
        </div>

        {isOwner && (
          <div className="blog-detail-actions">
            <button 
              onClick={() => navigate(`/edit/${currentBlog.id}`)}
              className="btn-edit"
            >
              Edit
            </button>
            <button 
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this blog?')) {
                  try {
                    await api.delete(`/blogs/${currentBlog.id}`);
                    navigate('/blogs');
                  } catch (err) {
                    alert(err.response?.data?.message || 'Error deleting blog');
                  }
                }
              }}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        )}

        <div className="blog-detail-content">
          {currentBlog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="blog-paragraph">
              {paragraph || '\u00A0'}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

