import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../ui/ProductCard';

const BestSellers = () => {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
          >
            Our Best Sellers
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#C8A951] mx-auto mb-6"
          ></motion.div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover our most loved pieces, crafted with perfection and cherished by our clients worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="inline-block border-2 border-[#1A1A1A] dark:border-white text-foreground px-8 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
