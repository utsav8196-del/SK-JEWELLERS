import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-50 flex flex-col border-l border-[var(--border)]"
          >
            <div className="p-6 flex items-center justify-between border-b border-[var(--border)]">
              <h2 className="text-xl font-serif font-bold uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag size={20} /> Your Cart
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={toggleCart}
                    className="text-[#C8A951] uppercase tracking-wider font-semibold text-sm hover:underline mt-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-[var(--border)] pb-6">
                      <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-sm overflow-hidden flex-shrink-0 border border-[var(--border)]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm line-clamp-2 pr-4">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[#C8A951] font-semibold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border border-[var(--border)] rounded-sm">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:text-[#C8A951]"><Minus size={14}/></button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:text-[#C8A951]"><Plus size={14}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[var(--border)] bg-[#FAF8F5] dark:bg-[#151515]">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between mb-6 text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-500 font-medium">Free Delivery</span>
                </div>
                
                <Link 
                  to="/checkout"
                  onClick={toggleCart}
                  className="w-full block text-center bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] uppercase tracking-widest text-sm font-semibold hover:bg-[#C8A951] dark:hover:bg-[#C8A951] hover:text-white transition-colors py-4 rounded-sm"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
