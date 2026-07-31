import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAdminAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white dark:bg-[#1A1A1A] p-8 border border-[var(--border)] rounded-sm shadow-xl"
        >
          <div className="flex justify-center mb-8">
            <div className="p-3 bg-[#C8A951]/10 rounded-sm">
              <UserPlus className="text-[#C8A951]" size={24} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2">Create Admin Account</h2>
            <p className="text-gray-500 text-sm">
              Register for SK Jewellers admin access
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">Username</label>
              <input 
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">Email Address</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">Password</label>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">Confirm Password</label>
              <input 
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-10 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-[#C8A951] dark:hover:bg-[#C8A951] hover:text-white transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-[var(--border)] pt-6">
            <p className="text-sm text-gray-500">
              Already have an account?
              <Link to="/admin/login" className="ml-1 text-[#C8A951] font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-xs text-gray-400">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminRegister;
