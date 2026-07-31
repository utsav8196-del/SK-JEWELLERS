import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
              <LogIn className="text-[#C8A951]" size={24} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2">Admin Login</h2>
            <p className="text-gray-500 text-sm">
              Access the SK Jewellers admin panel
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">Username</label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors text-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-10 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-[#C8A951] dark:hover:bg-[#C8A951] hover:text-white transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-[var(--border)] pt-6">
            <p className="text-sm text-gray-500 mb-4">
              Don&apos;t have an account?
              <Link to="/admin/register" className="ml-1 text-[#C8A951] font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-xs text-gray-500 font-semibold mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-400">Username: <span className="font-mono">admin</span></p>
            <p className="text-xs text-gray-400">Password: <span className="font-mono">admin123</span></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
