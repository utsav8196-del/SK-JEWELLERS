import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-1 bg-[#C8A951] mx-auto mb-6"
          ></motion.div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
          <div className="w-full lg:w-1/2">
            <img src="/images/ring.jpg" alt="Heritage" className="w-full aspect-[4/3] object-cover rounded-sm shadow-xl" />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-serif font-bold mb-6">A Legacy of Excellence</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Founded over 25 years ago, SK JEWELLERS began as a small boutique with a big dream: to create jewelry that captures the essence of life's most precious moments. Today, we are recognized globally for our commitment to quality and artistry.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our master craftsmen blend traditional techniques passed down through generations with cutting-edge technology to bring visionary designs to life. Every stone is ethically sourced, every metal rigorously tested, and every piece meticulously inspected.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-24">
          <div className="p-8 border border-[var(--border)] rounded-sm">
            <h3 className="text-xl font-serif font-bold mb-4 text-[#C8A951]">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400">To inspire and celebrate love through timeless, handcrafted luxury jewelry that can be passed down for generations.</p>
          </div>
          <div className="p-8 border border-[var(--border)] rounded-sm">
            <h3 className="text-xl font-serif font-bold mb-4 text-[#C8A951]">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-400">To be the most trusted and recognized name in fine jewelry, known for our ethical practices and unmatched artistry.</p>
          </div>
          <div className="p-8 border border-[var(--border)] rounded-sm">
            <h3 className="text-xl font-serif font-bold mb-4 text-[#C8A951]">Our Values</h3>
            <p className="text-gray-600 dark:text-gray-400">Integrity, craftsmanship, sustainability, and an unwavering commitment to customer satisfaction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
