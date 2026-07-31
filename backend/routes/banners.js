import express from 'express';
import Banner from '../models/Banner.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { position } = req.query;
    let query = { isActive: true };
    if (position) query.position = position;
    
    const banners = await Banner.find(query).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.status(201).json({ success: true, message: 'Banner created', banner });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!banner) {
      throw new AppError('Banner not found', 404);
    }
    res.json({ success: true, message: 'Banner updated', banner });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      throw new AppError('Banner not found', 404);
    }
    res.json({ success: true, message: 'Banner deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
