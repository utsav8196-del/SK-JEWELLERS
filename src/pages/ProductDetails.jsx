import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Truck, RefreshCw, Heart, Share2, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#C8A951]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-[#C8A951]">Shop</Link>
          <span className="mx-2">/</span>
          <Link to={`/collections`} className="hover:text-[#C8A951]">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A] dark:text-white truncate">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Images */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24 flex-shrink-0">
              {[product.image, product.image, product.image].map((img, idx) => (
                <button key={idx} className="w-20 h-20 md:w-full md:h-24 border border-[var(--border)] hover:border-[#C8A951] p-1 rounded-sm transition-colors flex-shrink-0">
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="w-full aspect-square bg-gray-50 dark:bg-gray-900 border border-[var(--border)] rounded-sm overflow-hidden group">
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 origin-center cursor-zoom-in"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-[#C8A951]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">(128 Reviews)</span>
            </div>

            <p className="text-3xl font-semibold text-[#C8A951] mb-6">₹{product.price.toLocaleString('en-IN')}</p>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Exquisitely crafted to perfection, this piece represents the pinnacle of SK JEWELLERS' artisan heritage. Every detail has been meticulously refined to offer unparalleled brilliance and timeless elegance.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-[var(--border)] rounded-sm justify-between sm:justify-start w-full sm:w-auto">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:text-[#C8A951]"><Minus size={16}/></button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:text-[#C8A951]"><Plus size={16}/></button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] uppercase tracking-widest text-sm font-semibold hover:bg-[#C8A951] dark:hover:bg-[#C8A951] hover:text-white transition-colors py-4 rounded-sm"
              >
                Add to Cart
              </button>
              <div className="flex gap-4">
                <button className="flex-1 sm:flex-none p-4 flex justify-center border border-[var(--border)] rounded-sm hover:border-[#C8A951] hover:text-[#C8A951] transition-colors">
                  <Heart size={20} />
                </button>
                <button className="flex-1 sm:flex-none p-4 flex justify-center border border-[var(--border)] rounded-sm hover:border-[#C8A951] hover:text-[#C8A951] transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <ShieldCheck className="text-[#C8A951]" size={20} /> Lifetime Warranty
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Truck className="text-[#C8A951]" size={20} /> Free Insured Shipping
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <RefreshCw className="text-[#C8A951]" size={20} /> 15-Day Easy Returns
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Star className="text-[#C8A951]" size={20} /> BIS Hallmarked
              </div>
            </div>

            {/* Accordion / Tabs for Details */}
            <div className="border-t border-[var(--border)] pt-8">
              <div className="flex gap-8 border-b border-[var(--border)] mb-6 overflow-x-auto whitespace-nowrap">
                {['description', 'specifications', 'shipping'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm uppercase tracking-wider font-medium transition-colors relative ${activeTab === tab ? 'text-[#1A1A1A] dark:text-white' : 'text-gray-500 hover:text-[#C8A951]'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8A951]" />
                    )}
                  </button>
                ))}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {activeTab === 'description' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    This breathtaking design is a testament to the skill of our master artisans. Crafted with precision, it features ethically sourced gemstones set in premium metal. Perfect for making a statement at any special occasion.
                  </motion.p>
                )}
                {activeTab === 'specifications' && (
                  <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                    <li><strong className="text-foreground font-medium">Metal:</strong> 18K Yellow Gold</li>
                    <li><strong className="text-foreground font-medium">Diamond Clarity:</strong> VVS-VS</li>
                    <li><strong className="text-foreground font-medium">Diamond Color:</strong> E-F</li>
                    <li><strong className="text-foreground font-medium">Weight:</strong> 12.5 Grams</li>
                    <li><strong className="text-foreground font-medium">Certification:</strong> IGI Certified</li>
                  </motion.ul>
                )}
                {activeTab === 'shipping' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    All orders are shipped via secure, fully insured carriers. Standard delivery takes 5-7 business days. Expedited shipping options are available at checkout. A signature is required upon delivery for all orders.
                  </motion.p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
