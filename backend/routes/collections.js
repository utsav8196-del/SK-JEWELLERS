import express from 'express';
import Collection from '../models/Collection.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const collections = await Collection.find({ status: 'active' }).sort({ order: 1 });
    res.json({ success: true, collections });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      throw new AppError('Collection not found', 404);
    }
    res.json({ success: true, collection });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json({ success: true, message: 'Collection created', collection });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!collection) {
      throw new AppError('Collection not found', 404);
    }
    res.json({ success: true, message: 'Collection updated', collection });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) {
      throw new AppError('Collection not found', 404);
    }
    res.json({ success: true, message: 'Collection deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
