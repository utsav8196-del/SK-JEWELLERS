import express from 'express';
import Newsletter from '../models/Newsletter.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      throw new AppError('Email is required', 400);
    }

    let subscriber = await Newsletter.findOne({ email });
    
    if (subscriber) {
      if (subscriber.isSubscribed) {
        throw new AppError('Already subscribed', 400);
      }
      subscriber.isSubscribed = true;
      subscriber.subscriptionDate = new Date();
      subscriber.unsubscriptionDate = null;
      await subscriber.save();
    } else {
      subscriber = new Newsletter({ email });
      await subscriber.save();
    }

    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/unsubscribe', async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      throw new AppError('Email is required', 400);
    }

    const subscriber = await Newsletter.findOneAndUpdate(
      { email },
      { isSubscribed: false, unsubscriptionDate: new Date() },
      { new: true }
    );

    if (!subscriber) {
      throw new AppError('Subscriber not found', 404);
    }

    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    next(error);
  }
});

router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscriptionDate: -1 });
    res.json({ success: true, subscribers });
  } catch (error) {
    next(error);
  }
});

export default router;
