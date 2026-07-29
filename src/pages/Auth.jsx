import { useState } from 'react';
import { motion } from 'framer-motion';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white dark:bg-[#1A1A1A] p-8 border border-[var(--border)] rounded-sm shadow-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Enter your details to access your account' : 'Join the SK JEWELLERS Club for exclusive benefits'}
            </p>
          </div>

          <form onSubmit={e => e.preventDefault()} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">Full Name</label>
                <input type="text" className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors" />
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
              <input type="email" className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2 uppercase tracking-wider">Password</label>
              <input type="password" className="w-full border-b border-[var(--border)] bg-transparent py-2 focus:outline-none focus:border-[#C8A951] transition-colors" />
            </div>
            
            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-[#C8A951] hover:underline">Forgot Password?</button>
              </div>
            )}

            <button className="w-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-10 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-[#C8A951] dark:hover:bg-[#C8A951] hover:text-white transition-colors mt-6">
              {isLogin ? 'Sign In' : 'Register'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-[var(--border)] pt-6">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"} 
              <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-[#C8A951] font-semibold hover:underline">
                {isLogin ? 'Register Here' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
