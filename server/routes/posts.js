const express = require('express');
const Post = require('../models/Post');
const Category = require('../models/Category');

const router = express.Router();

// GET /api/posts - Get all blog posts
router.get('/', async (req, res, next) => {
  try {
    // Populate category field with category details
    const posts = await Post.find().populate('category').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:id - Get a specific blog post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// POST /api/posts - Create a new blog post
router.post('/', async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Title, content, and category are required' });
    }
    // Optionally, check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    const post = new Post({ title, content, category });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// PUT /api/posts/:id - Update an existing blog post
router.put('/:id', async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: 'Invalid category' });
      }
      post.category = category;
    }
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/posts/:id - Delete a blog post
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
