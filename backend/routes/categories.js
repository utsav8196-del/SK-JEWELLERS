import express from 'express';
import Category from '../models/Category.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find({ status: 'active' }).sort({ order: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
});

// Get category by ID
router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    res.json({ success: true, category });
  } catch (error) {
    next(error);
  }
});

// Create category (admin)
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ success: true, message: 'Category created', category });
  } catch (error) {
    next(error);
  }
});

// Update category (admin)
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    res.json({ success: true, message: 'Category updated', category });
  } catch (error) {
    next(error);
  }
});

// Delete category (admin)
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
