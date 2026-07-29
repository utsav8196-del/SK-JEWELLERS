import { motion } from 'framer-motion';
import { Package, Heart, MapPin, User, LogOut } from 'lucide-react';

const UserDashboard = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-[#1A1A1A] border border-[var(--border)] rounded-sm p-6 sticky top-32">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--border)]">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-xl font-serif text-[#C8A951]">
                  RC
                </div>
                <div>
                  <h3 className="font-bold">SK JEWELLERS Customer</h3>
                  <p className="text-sm text-gray-500">customer@skjewellers.com</p>
                </div>
              </div>

              <ul className="space-y-2">
                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#FAF8F5] dark:bg-gray-900 text-[#C8A951] font-semibold rounded-sm">
                    <Package size={18} /> My Orders
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAF8F5] dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-[#C8A951] rounded-sm transition-colors">
                    <Heart size={18} /> Wishlist
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAF8F5] dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-[#C8A951] rounded-sm transition-colors">
                    <MapPin size={18} /> Addresses
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAF8F5] dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-[#C8A951] rounded-sm transition-colors">
                    <User size={18} /> Account Details
                  </button>
                </li>
                <li className="pt-4 mt-4 border-t border-[var(--border)]">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-sm transition-colors">
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white dark:bg-[#1A1A1A] border border-[var(--border)] rounded-sm p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Recent Orders</h2>
              
              <div className="border border-[var(--border)] rounded-sm mb-6">
                <div className="bg-[#FAF8F5] dark:bg-[#222] p-4 border-b border-[var(--border)] flex flex-wrap gap-6 justify-between items-center text-sm">
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs mb-1">Order Placed</p>
                    <p className="font-semibold">October 15, 2023</p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs mb-1">Total</p>
                    <p className="font-semibold">₹1,25,000</p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs mb-1">Ship To</p>
                    <p className="font-semibold">SK JEWELLERS Customer</p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs mb-1">Order #</p>
                    <p className="font-semibold">SR-7890123</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                  <img src="/images/ring.jpg" alt="Ring" className="w-24 h-24 object-cover border border-[var(--border)] rounded-sm" />
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-semibold mb-2">Classic Diamond Solitaire Ring</h4>
                    <p className="text-sm text-gray-500">Qty: 1 | Size: 14</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-6 py-2 uppercase tracking-widest text-xs font-semibold hover:bg-[#C8A951] dark:hover:bg-[#C8A951] hover:text-white transition-colors">
                      Track Order
                    </button>
                    <button className="border border-[var(--border)] px-6 py-2 uppercase tracking-widest text-xs font-semibold hover:border-[#C8A951] hover:text-[#C8A951] transition-colors">
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center py-12 text-gray-500">
                No more orders to show.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
