import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useBlogStore } from '../store/blogStore';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useApi = (endpoint, options = {}) => {
  const { method = 'GET', data: initialData = null, autoFetch = true, storeKey = null } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);
  
  const authStore = useAuthStore();
  const blogStore = useBlogStore();

  const execute = async (requestData = null) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url: endpoint,
        ...(requestData || initialData ? { data: requestData || initialData } : {}),
      };

      const response = await api(config);
      const responseData = response.data;

      setData(responseData);

      // Auto-update stores based on endpoint
      if (storeKey === 'blogs' || endpoint.includes('/blogs')) {
        if (method === 'GET') {
          blogStore.setBlogs(responseData);
        } else if (method === 'POST') {
          blogStore.addBlog(responseData);
        } else if (method === 'PUT') {
          // Extract blog ID from endpoint (e.g., '/blogs/1')
          const blogId = parseInt(endpoint.split('/').pop());
          blogStore.updateBlog(blogId, responseData);
        } else if (method === 'DELETE') {
          // Extract blog ID from endpoint (e.g., '/blogs/1')
          const blogId = parseInt(endpoint.split('/').pop());
          blogStore.removeBlog(blogId);
        }
      }

      if (storeKey === 'auth' || endpoint.includes('/auth/login')) {
        if (responseData.token && responseData.user) {
          authStore.login(responseData.user, responseData.token);
        }
      }

      return responseData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      blogStore.setError(errorMessage);
      
      // Handle auth errors
      if (err.response?.status === 401 || err.response?.status === 403) {
        authStore.logout();
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && method === 'GET') {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, autoFetch, method]);

  return { data, loading, error, execute };
};

export default api;

