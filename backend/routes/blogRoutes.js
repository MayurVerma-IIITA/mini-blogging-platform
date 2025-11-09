// routes/blogRoutes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Public: get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: { select: { email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    // Include authorId in response for frontend ownership checks
    const blogsWithAuthorId = blogs.map(blog => ({
      ...blog,
      authorId: blog.authorId,
    }));
    res.status(200).json(blogsWithAuthorId);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// Protected: create blog
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;

    const blog = await prisma.blog.create({
      data: { title, content, authorId },
      include: { author: { select: { email: true } } },
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
});

// Protected: edit blog (only author)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const { title, content } = req.body;
    const userId = req.user.id;

    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.authorId !== userId)
      return res.status(403).json({ message: 'Not authorized to edit this blog' });

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: { title, content },
      include: { author: { select: { email: true } } },
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
});

// Protected: delete blog (only author)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const userId = req.user.id;

    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.authorId !== userId)
      return res.status(403).json({ message: 'Not authorized to delete this blog' });

    await prisma.blog.delete({ where: { id: blogId } });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
});

export default router;
