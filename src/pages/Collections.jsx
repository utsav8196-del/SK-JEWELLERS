import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const collections = [
  { name: 'Bridal Collection', image: '/images/pendant.jpg', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2' },
  { name: 'Gold Jewellery', image: '/images/ring.jpg', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { name: 'Diamond Jewellery', image: '/images/necklace.jpg', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { name: 'Platinum Jewellery', image: '/images/bangle.jpg', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { name: 'Temple Jewellery', image: '/images/earrings.jpg', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
];

const Collections = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Curated Collections
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-1 bg-[#C8A951] mx-auto mb-6"
          ></motion.div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover pieces grouped by style, occasion, and craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
          {collections.map((col, index) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${col.colSpan} ${col.rowSpan} relative group overflow-hidden rounded-sm cursor-pointer min-h-[250px]`}
            >
              <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 group-hover:bg-black/50 transition-colors">
                <h3 className="text-white text-2xl font-serif font-semibold mb-4 text-center">{col.name}</h3>
                <Link to="/shop" className="bg-transparent border border-white text-white px-6 py-2 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-colors opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
                  View Collection
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
