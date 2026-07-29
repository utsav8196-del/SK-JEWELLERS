import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="group bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 hover:luxury-shadow transition-all duration-300 rounded-sm overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && <span className="bg-[#1A1A1A] text-white text-xs px-2 py-1 uppercase tracking-wider">New</span>}
          {product.isBestSeller && <span className="bg-[#C8A951] text-white text-xs px-2 py-1 uppercase tracking-wider">Best</span>}
        </div>

        {/* Hover Actions */}
        <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4 group-hover:bottom-6 transition-all duration-300">
          <button className="bg-white text-[#1A1A1A] p-3 rounded-full hover:bg-[#C8A951] hover:text-white transition-colors shadow-lg">
            <Heart size={18} />
          </button>
          <button 
            onClick={() => addToCart(product)}
            className="bg-white text-[#1A1A1A] p-3 rounded-full hover:bg-[#C8A951] hover:text-white transition-colors shadow-lg"
          >
            <ShoppingCart size={18} />
          </button>
          <button className="bg-white text-[#1A1A1A] p-3 rounded-full hover:bg-[#C8A951] hover:text-white transition-colors shadow-lg">
            <Eye size={18} />
          </button>
        </div>
      </div>

      <div className="p-6 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-serif font-medium mb-2 hover:text-[#C8A951] transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex justify-center items-center mb-3 text-[#C8A951]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
          ))}
          <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
        </div>
        <p className="text-[#C8A951] font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
