import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const gallery = await Gallery.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, gallery });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const item = new Gallery(req.body);
    await item.save();
    res.status(201).json({ success: true, message: 'Gallery item created', item });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      throw new AppError('Gallery item not found', 404);
    }
    res.json({ success: true, message: 'Gallery item updated', item });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      throw new AppError('Gallery item not found', 404);
    }
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
