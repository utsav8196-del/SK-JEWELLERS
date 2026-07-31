import express from 'express';
import Review from '../models/Review.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

router.get('/product/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId, isApproved: true });
    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ success: true, message: 'Review submitted', review });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    res.json({ success: true, message: 'Review updated', review });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      throw new AppError('Review not found', 404);
    }
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
