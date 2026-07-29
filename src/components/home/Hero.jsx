import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/necklace.jpg" 
          alt="Luxury Jewellery" 
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/65"></div>
      </div>
      
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#E8D28A] sm:text-sm"
          >
            Luxury Jewellery Studio
          </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl"
        >
          SK JEWELLERS
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 max-w-xl text-base leading-7 text-gray-100 sm:text-lg md:text-xl"
        >
          Handcrafted gold, diamond, and bridal jewellery designed for your most precious moments.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
            <Link to="/collections" className="w-full bg-[#C8A951] px-7 py-3.5 text-center text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#B8860B] sm:w-auto">
            Explore Collection
          </Link>
            <Link to="/contact" className="w-full border border-white/80 bg-white/10 px-7 py-3.5 text-center text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:w-auto">
            Book Appointment
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
