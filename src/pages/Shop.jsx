import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bangles', 'Bridal Collection', 'Pendants'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling'];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Newest');

  // Filter and Sort Logic
  let filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'Price: Low to High') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-[#1A1A1A] text-white py-16 mb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pendant.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-wider"
          >
            The Collection
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-1 bg-[#C8A951] mx-auto mb-6"
          ></motion.div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore our meticulously curated selection of fine jewellery.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar / Filters (Desktop) */}
          <div className="hidden lg:block w-1/4">
            <div className="sticky top-32">
              <h3 className="text-xl font-serif font-semibold mb-6 border-b border-[var(--border)] pb-4">Categories</h3>
              <ul className="space-y-4 mb-10">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`text-sm tracking-wider uppercase transition-colors ${
                        activeCategory === category ? 'text-[#C8A951] font-semibold' : 'text-gray-500 hover:text-[#C8A951]'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-serif font-semibold mb-6 border-b border-[var(--border)] pb-4">Price Range</h3>
              {/* Dummy Price Slider */}
              <div className="px-2">
                <input type="range" className="w-full accent-[#C8A951]" min="0" max="500000" />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>₹0</span>
                  <span>₹5,00,000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <input 
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[var(--border)] bg-transparent focus:outline-none focus:border-[#C8A951] rounded-sm text-sm"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filter Toggle */}
                <button 
                  className="lg:hidden flex items-center gap-2 border border-[var(--border)] px-4 py-2 text-sm uppercase tracking-wider rounded-sm hover:border-[#C8A951]"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={16} /> Filters
                </button>

                {/* Sort */}
                <div className="relative group">
                  <button className="flex items-center gap-2 border border-[var(--border)] px-4 py-2 text-sm uppercase tracking-wider rounded-sm hover:border-[#C8A951]">
                    Sort By: {sortBy} <ChevronDown size={16} />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#1A1A1A] border border-[var(--border)] shadow-xl rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                    {sortOptions.map(option => (
                      <button 
                        key={option}
                        onClick={() => setSortBy(option)}
                        className="block w-full text-left px-4 py-3 text-sm hover:bg-[#FAF8F5] dark:hover:bg-gray-800 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-serif mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
            
            {/* Pagination Mock */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-12 gap-2">
                <button className="w-10 h-10 border border-[#C8A951] bg-[#C8A951] text-white flex items-center justify-center rounded-sm">1</button>
                <button className="w-10 h-10 border border-[var(--border)] hover:border-[#C8A951] flex items-center justify-center rounded-sm transition-colors">2</button>
                <button className="w-10 h-10 border border-[var(--border)] hover:border-[#C8A951] flex items-center justify-center rounded-sm transition-colors">3</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
