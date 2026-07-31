import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new AppError('No token provided', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', 401));
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    throw new AppError('Admin access only', 403);
  }
  next();
};
