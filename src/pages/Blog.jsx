import { motion } from 'framer-motion';

const articles = [
  { title: "The Ultimate Guide to Buying Diamonds", category: "Guide", date: "Oct 12, 2023", image: "/images/necklace.jpg" },
  { title: "How to Care for Your Gold Jewellery", category: "Care", date: "Sep 28, 2023", image: "/images/bangle.jpg" },
  { title: "Top Wedding Jewelry Trends This Year", category: "Trends", date: "Sep 15, 2023", image: "/images/earrings.jpg" },
];

const Blog = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            The SK JEWELLERS Journal
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-1 bg-[#C8A951] mx-auto mb-6"
          ></motion.div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Insights, guides, and stories from the world of fine jewelry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#1A1A1A] border border-[var(--border)] rounded-sm overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest mb-3">
                  <span className="text-[#C8A951] font-semibold">{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-[#C8A951] transition-colors">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  Discover everything you need to know about {article.title.toLowerCase()} in our comprehensive guide designed for jewelry enthusiasts.
                </p>
                <button className="text-sm font-semibold uppercase tracking-widest border-b border-[#1A1A1A] dark:border-white pb-1 group-hover:border-[#C8A951] transition-colors">
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
