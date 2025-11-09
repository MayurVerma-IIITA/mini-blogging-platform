import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useApi } from '../../hooks/useApi';
import { useBlogStore } from '../../store/blogStore';
import './Blogs.css';

const BlogCard = ({ blog, onUpdate }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { removeBlog } = useBlogStore();
  
  const isOwner = isAuthenticated && user && blog.authorId === user.id;
  
  const { execute: deleteBlog, loading: deleting } = useApi(`/blogs/${blog.id}`, {
    method: 'DELETE',
    autoFetch: false,
    storeKey: 'blogs',
  });

  const preview = blog.content.length > 150 
    ? blog.content.substring(0, 150) + '...' 
    : blog.content;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = () => {
    navigate(`/edit/${blog.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog();
        removeBlog(blog.id);
        if (onUpdate) onUpdate();
      } catch (err) {
        // Error handled by useApi
      }
    }
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons
    if (e.target.closest('.blog-actions')) {
      return;
    }
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div className="blog-card" onClick={handleCardClick}>
      <h3 className="blog-title">{blog.title}</h3>
      <div className="blog-meta">
        <span className="blog-author">By {blog.author?.email || 'Unknown'}</span>
        <span className="blog-date">{formatDate(blog.createdAt)}</span>
      </div>
      <p className="blog-preview">{preview}</p>
      {isOwner && (
        <div className="blog-actions" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={handleEdit} 
            className="btn-edit"
            disabled={deleting}
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="btn-delete"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;

