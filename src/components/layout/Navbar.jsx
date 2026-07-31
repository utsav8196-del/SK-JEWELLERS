import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Moon, Sun, LogIn } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/collections' },
  { name: 'About Us', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { cartCount, toggleCart } = useCart();
  const { isAuthenticated, admin } = useAdminAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#1A1A1A]/95 border-black/10 dark:border-white/10 py-3 shadow-sm'
          : 'bg-white/85 dark:bg-[#1A1A1A]/85 border-black/5 dark:border-white/10 py-3.5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-12 items-center justify-between gap-3">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden grid h-10 w-10 place-items-center -ml-2 text-foreground hover:text-[#C8A951] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="min-w-0 flex-1 text-center font-serif text-xl font-bold tracking-[0.08em] text-[#C8A951] sm:text-2xl md:flex-none md:text-left md:text-3xl">
            SK JEWELLERS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm uppercase tracking-widest font-medium hover:text-[#C8A951] transition-colors relative ${
                  location.pathname === link.path ? 'text-[#C8A951]' : 'text-foreground'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C8A951]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 md:gap-6">
            <button className="text-foreground hover:text-[#C8A951] transition-colors hidden sm:block" aria-label="Search">
              <Search size={20} />
            </button>
            <button onClick={toggleTheme} className="text-foreground hover:text-[#C8A951] transition-colors" aria-label="Toggle theme">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/account" className="text-foreground hover:text-[#C8A951] transition-colors hidden sm:block" aria-label="Account">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="text-foreground hover:text-[#C8A951] transition-colors hidden sm:block" aria-label="Wishlist">
              <Heart size={20} />
            </Link>
            <button onClick={toggleCart} className="text-foreground hover:text-[#C8A951] transition-colors relative" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C8A951] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Admin Access */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`text-foreground hover:text-[#C8A951] transition-colors relative ${isAuthenticated ? 'text-[#C8A951]' : ''}`}
                aria-label="Admin"
              >
                <LogIn size={20} />
                {isAuthenticated && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </button>
              
              {/* User Menu Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1A1A] border border-[var(--border)] rounded-sm shadow-lg z-50"
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-3 border-b border-[var(--border)]">
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Logged in</p>
                          <p className="font-semibold text-sm">{admin?.username}</p>
                        </div>
                        <Link 
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/admin/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border-b border-[var(--border)] font-medium text-[#C8A951]"
                        >
                          Admin Login
                        </Link>
                        <Link 
                          to="/admin/register"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                          Admin Register
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-black/5 bg-white/95 shadow-lg dark:border-white/10 dark:bg-[#1A1A1A]/95"
          >
            <div className="flex flex-col px-4 py-5 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest font-medium ${
                    location.pathname === link.path ? 'text-[#C8A951]' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-[var(--border)] pt-4 space-y-3">
                <div className="flex space-x-6 pb-4">
                  <button className="text-foreground hover:text-[#C8A951]">
                    <Search size={20} />
                  </button>
                  <Link to="/account" className="text-foreground hover:text-[#C8A951]">
                    <User size={20} />
                  </Link>
                  <Link to="/wishlist" className="text-foreground hover:text-[#C8A951]">
                    <Heart size={20} />
                  </Link>
                </div>
                <div className="border-t border-[var(--border)] pt-3 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold px-2">Admin: {admin?.username}</p>
                      <Link 
                        to="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 rounded transition-colors font-medium"
                      >
                        Admin Dashboard
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/admin/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 rounded transition-colors font-medium text-[#C8A951]"
                      >
                        Admin Login
                      </Link>
                      <Link 
                        to="/admin/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 rounded transition-colors"
                      >
                        Admin Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
