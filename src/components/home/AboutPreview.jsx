import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPreview = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] dark:bg-[#111111] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Images */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-4/5"
            >
              <img 
                src="/images/ring.jpg" 
                alt="Jewellery Craftsmanship" 
                className="w-full aspect-[4/5] object-cover shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-1/4 right-0 w-1/2 z-20"
            >
              <img 
                src="/images/necklace.jpg" 
                alt="Diamond Ring" 
                className="w-full aspect-square object-cover border-8 border-[#FAF8F5] dark:border-[#111111] shadow-2xl"
              />
            </motion.div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-[#C8A951] text-white w-32 h-32 rounded-full flex flex-col items-center justify-center p-4 z-30 shadow-xl"
            >
              <span className="text-3xl font-serif font-bold">25+</span>
              <span className="text-xs uppercase tracking-wider text-center mt-1">Years of<br/>Excellence</span>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#C8A951] uppercase tracking-widest text-sm font-semibold mb-4"
            >
              The SK JEWELLERS Legacy
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight"
            >
              Masterpieces Crafted With Passion & Precision
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
            >
              Since our inception, SK JEWELLERS has been synonymous with unparalleled luxury and impeccable craftsmanship. Every piece we create is a testament to our dedication to preserving traditional techniques while embracing modern design aesthetics.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
            >
              We source only the finest, ethically mined diamonds and purest metals to ensure that your jewellery not only looks extraordinary but also stands the test of time.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/about" className="inline-flex items-center text-[#1A1A1A] dark:text-white font-semibold uppercase tracking-widest text-sm hover:text-[#C8A951] dark:hover:text-[#C8A951] transition-colors group">
                Discover Our Story
                <span className="ml-3 w-10 h-[1px] bg-[#1A1A1A] dark:bg-white group-hover:w-16 group-hover:bg-[#C8A951] transition-all duration-300"></span>
              </Link>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
