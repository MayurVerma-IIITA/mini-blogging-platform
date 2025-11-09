import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useAuthStore } from '../../store/authStore';
import './Blogs.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const { execute, loading, error } = useApi('/blogs', {
    method: 'POST',
    autoFetch: false,
    storeKey: 'blogs',
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await execute({ title, content });
      setTitle('');
      setContent('');
      navigate('/blogs');
    } catch (err) {
      // Error is handled by useApi hook
    }
  };

  return (
    <div className="create-blog-container">
      <div className="create-blog-card">
        <h2>Create New Blog</h2>
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
              {loading ? 'Publishing...' : 'Publish Blog'}
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

export default CreateBlog;

