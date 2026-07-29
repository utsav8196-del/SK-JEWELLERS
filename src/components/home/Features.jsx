import { motion } from 'framer-motion';
import { ShieldCheck, Gem, RefreshCw, Truck, CreditCard, Award } from 'lucide-react';

const featuresList = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'BIS Hallmarked Gold',
    description: '100% certified and hallmarked gold ensuring the highest purity.'
  },
  {
    icon: <Gem size={32} />,
    title: 'Certified Diamonds',
    description: 'Conflict-free diamonds certified by top gemological laboratories.'
  },
  {
    icon: <RefreshCw size={32} />,
    title: 'Lifetime Exchange',
    description: 'Easy exchange policy with guaranteed buyback value.'
  },
  {
    icon: <Truck size={32} />,
    title: 'Free Insured Shipping',
    description: 'Secure and insured delivery to your doorstep across the country.'
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Secure Payments',
    description: 'Multiple secure payment options including EMIs.'
  },
  {
    icon: <Award size={32} />,
    title: 'Award Winning Design',
    description: 'Recognized globally for exceptional design and craftsmanship.'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background border-t border-[var(--border)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
          >
            The Royal Promise
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#C8A951] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-[#FAF8F5] dark:bg-[#1A1A1A] rounded-sm hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-[#C8A951]/20 group"
            >
              <div className="w-16 h-16 bg-white dark:bg-[#222222] rounded-full flex items-center justify-center text-[#C8A951] mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
