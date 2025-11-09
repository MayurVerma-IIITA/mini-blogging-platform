import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import api from '../../hooks/useApi';
import { useAuthStore } from '../../store/authStore';
import { useBlogStore } from '../../store/blogStore';
import './Blogs.css';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { blogs } = useBlogStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loadingBlog, setLoadingBlog] = useState(true);

  const { execute: updateBlog, loading, error } = useApi(`/blogs/${id}`, {
    method: 'PUT',
    autoFetch: false,
    storeKey: 'blogs',
  });

  // Load blog data and check ownership
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Find the blog in store
    const blog = blogs.find(b => b.id === parseInt(id));
    
    if (!blog) {
      // If blog not in store, try fetching all blogs
      if (blogs.length === 0) {
        // Fetch all blogs first
        api.get('/blogs')
          .then(response => {
            const allBlogs = response.data;
            const foundBlog = allBlogs.find(b => b.id === parseInt(id));
            if (foundBlog) {
              if (foundBlog.authorId !== user?.id) {
                alert('You are not authorized to edit this blog');
                navigate('/blogs');
                return;
              }
              setTitle(foundBlog.title);
              setContent(foundBlog.content);
              setLoadingBlog(false);
            } else {
              alert('Blog not found');
              navigate('/blogs');
            }
          })
          .catch(() => {
            navigate('/blogs');
          });
        return;
      } else {
        // Blog not found
        alert('Blog not found');
        navigate('/blogs');
        return;
      }
    }

    // Check ownership
    if (blog.authorId !== user?.id) {
      alert('You are not authorized to edit this blog');
      navigate('/blogs');
      return;
    }

    setTitle(blog.title);
    setContent(blog.content);
    setLoadingBlog(false);
  }, [id, blogs, isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await updateBlog({ title, content });
      navigate('/blogs');
    } catch (err) {
      // Error is handled by useApi hook
    }
  };

  if (!isAuthenticated || loadingBlog) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="create-blog-container">
      <div className="create-blog-card">
        <h2>Edit Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter blog title"
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your blog content here..."
              rows={12}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Blog'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/blogs')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;

