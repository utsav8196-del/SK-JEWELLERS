import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Contact from '../models/Contact.js';
import Review from '../models/Review.js';

const router = express.Router();

// Dashboard stats
router.get('/dashboard/stats', protect, adminOnly, async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const pendingReviews = await Review.countDocuments({ isApproved: false });

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const ordersThisMonth = await Order.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(1)),
        $lte: new Date()
      }
    });

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalContacts,
        pendingReviews,
        totalRevenue: totalRevenue[0]?.total || 0,
        ordersThisMonth
      }
    });
  } catch (error) {
    next(error);
  }
});

// Recent orders
router.get('/dashboard/orders', protect, adminOnly, async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('items.product')
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
});

// Recent contacts
router.get('/dashboard/contacts', protect, adminOnly, async (req, res, next) => {
  try {
    const contacts = await Contact.find({ status: 'new' })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, contacts });
  } catch (error) {
    next(error);
  }
});

// Pending reviews
router.get('/dashboard/reviews', protect, adminOnly, async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: false })
      .populate('product')
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
});

export default router;
