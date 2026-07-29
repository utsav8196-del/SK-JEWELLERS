import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Aarti Patel",
    location: "Surat, Gujarat",
    text: "I have been purchasing jewellery from them for over a decade. Their commitment to purity and customer service is what keeps me coming back. The designs are always unique and timeless."
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A951] rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C8A951] rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
          >
            Client Stories
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-[#C8A951] mx-auto"
          ></motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex flex-col items-center text-center px-4 md:px-12">
                  <Quote size={48} className="text-[#C8A951] mb-8 opacity-50" />
                  <p className="text-xl md:text-2xl font-serif leading-relaxed mb-8 italic">
                    "{testimonial.text}"
                  </p>
                  <h4 className="text-lg font-semibold uppercase tracking-widest text-[#C8A951]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{testimonial.location}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
