import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId)
      return res.status(400).json({ message: "Missing required fields" });

    const blog = await prisma.blog.create({
      data: { title, content, authorId: parseInt(authorId) },
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Blog creation failed" });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: true },
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};
