import { create } from 'zustand';

export const useBlogStore = create((set) => ({
  blogs: [],
  loading: false,
  error: null,
  
  setBlogs: (blogs) => set({ blogs }),
  
  addBlog: (blog) => set((state) => ({ blogs: [blog, ...state.blogs] })),
  
  updateBlog: (id, updatedBlog) =>
    set((state) => ({
      blogs: state.blogs.map((blog) => (blog.id === id ? updatedBlog : blog)),
    })),
  
  removeBlog: (id) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id),
    })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));

