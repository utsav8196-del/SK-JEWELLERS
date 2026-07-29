import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <section className="py-24 bg-background relative border-b border-[var(--border)]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif font-bold mb-4"
        >
          Join The SK JEWELLERS Club
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 mb-10 max-w-2xl mx-auto"
        >
          Subscribe to our newsletter to receive exclusive updates on new collections, private sales, and jewellery care tips.
        </motion.p>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-grow px-6 py-4 bg-transparent border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-[#C8A951] transition-colors rounded-sm"
            required
          />
          <button 
            type="submit" 
            className="bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-[#C8A951] dark:hover:bg-[#C8A951] hover:text-white transition-colors whitespace-nowrap rounded-sm"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
