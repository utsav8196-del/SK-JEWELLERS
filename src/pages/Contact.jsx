import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-1 bg-[#C8A951] mx-auto mb-6"
          ></motion.div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We are here to assist you with any inquiries regarding our collections, custom designs, or your orders.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#1A1A1A] flex items-center justify-center rounded-sm text-[#C8A951] flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold mb-2">Visit Our Showroom</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Opposite JK HP Petrol Pump,<br/>
                  Navi Shakti Vijay Society, Ramdev Pir Society,<br/>
                  Mohan Nagar, Hirabaugh,<br/>
                  Surat, Gujarat 395006
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#1A1A1A] flex items-center justify-center rounded-sm text-[#C8A951] flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  +91 94268 60335
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#1A1A1A] flex items-center justify-center rounded-sm text-[#C8A951] flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  info@skjewellers.com
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FAF8F5] dark:bg-[#1A1A1A] flex items-center justify-center rounded-sm text-[#C8A951] flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold mb-2">Business Hours</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Monday - Saturday: 10:00 AM - 8:00 PM<br/>
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <form className="bg-white dark:bg-[#1A1A1A] p-8 border border-[var(--border)] rounded-sm shadow-xl" onSubmit={e => e.preventDefault()}>
              <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">Full Name</label>
                  <input type="text" className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">Subject</label>
                <input type="text" className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors" />
              </div>
              <div className="mb-8">
                <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">Message</label>
                <textarea rows="4" className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors resize-none"></textarea>
              </div>
              <button className="bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-10 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-[#C8A951] dark:hover:bg-[#C8A951] hover:text-white transition-colors w-full md:w-auto">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
