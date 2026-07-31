import Product from '../models/Product.js';
import { AppError } from '../middleware/errorHandler.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const { category, search, sort, page = 1, limit = 12, featured } = req.query;
    const skip = (page - 1) * limit;

    let query = { status: 'active' };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price-low-to-high') {
      sortOption = { price: 1 };
    } else if (sort === 'price-high-to-low') {
      sortOption = { price: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'popular') {
      sortOption = { rating: -1, createdAt: -1 };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('collection', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('collection')
      .populate('reviews');

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true, status: 'active' })
      .populate('category')
      .populate('collection')
      .limit(6);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const { limit = 12, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category: req.params.categoryId, status: 'active' })
      .populate('category')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments({ category: req.params.categoryId, status: 'active' });

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new AppError('Product SKU already exists', 400));
    }
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new AppError('Product SKU already exists', 400));
    }
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
