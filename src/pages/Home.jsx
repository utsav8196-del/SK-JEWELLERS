import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import BestSellers from '../components/home/BestSellers';
import AboutPreview from '../components/home/AboutPreview';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <AboutPreview />
      <Features />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
