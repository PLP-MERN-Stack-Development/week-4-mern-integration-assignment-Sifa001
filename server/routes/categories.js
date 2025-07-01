const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    // Handle duplicate category name error
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Category name must be unique' });
    }
    next(err);
  }
});

module.exports = router;
