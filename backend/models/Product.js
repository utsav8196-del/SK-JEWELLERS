import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  },
  image: {
    type: String,
    required: true
  },
  images: [String],
  purity: {
    type: String,
    enum: ['22K', '18K', '14K', '12K', '24K'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  material: {
    type: String,
    enum: ['Gold', 'Silver', 'Platinum', 'Diamond'],
    required: true
  },
  gemstone: String,
  gemstoneWeight: Number,
  stoneDetails: {
    type: String,
    description: String
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true, suppressReservedKeysWarning: true });

// Indexes for performance
productSchema.index({ category: 1, status: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ featured: 1, status: 1 });

export default mongoose.model('Product', productSchema);
