import express from 'express';
import Order from '../models/Order.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const orderNumber = `ORD-${Date.now()}`;
    const order = new Order({ ...req.body, orderNumber });
    await order.save();
    res.status(201).json({ success: true, message: 'Order created', order });
  } catch (error) {
    next(error);
  }
});

router.get('/:orderNumber', async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber }).populate('items.product');
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
});

router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (status) query.orderStatus = status;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate('items.product')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      orders
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    res.json({ success: true, message: 'Order updated', order });
  } catch (error) {
    next(error);
  }
});

export default router;
