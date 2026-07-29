import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Gold Jewellery', image: '/images/bangle.jpg' },
  { id: 2, name: 'Diamond Jewellery', image: '/images/earrings.jpg' },
  { id: 3, name: 'Bridal Collection', image: '/images/pendant.jpg' },
  { id: 4, name: 'Rings', image: '/images/ring.jpg' },
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
          >
            Shop By Category
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#C8A951] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-sm"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-serif font-semibold mb-2">{category.name}</h3>
                <Link to={`/collections`} className="text-[#C8A951] uppercase text-sm tracking-wider font-medium flex items-center group-hover:translate-x-2 transition-transform">
                  Explore <span className="ml-2">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
