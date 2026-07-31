import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ShoppingCart, DollarSign, PackageOpen, LayoutDashboard, Settings, Activity, LogOut } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, admin, logout } = useAdminAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pt-24 min-h-screen bg-[#FAF8F5] dark:bg-[#111]">
      <div className="flex h-[calc(100vh-6rem)]">
        
        {/* Admin Sidebar */}
        <div className="w-64 bg-white dark:bg-[#1A1A1A] border-r border-[var(--border)] overflow-y-auto hidden md:block flex flex-col">
          <div className="p-6 flex-1">
            <h2 className="text-lg font-serif font-bold tracking-wider text-[#C8A951] mb-8">ADMIN PANEL</h2>
            <ul className="space-y-2">
              {[
                { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
                { name: 'Orders', icon: <ShoppingCart size={18} /> },
                { name: 'Products', icon: <PackageOpen size={18} /> },
                { name: 'Customers', icon: <Users size={18} /> },
                { name: 'Analytics', icon: <Activity size={18} /> },
                { name: 'Settings', icon: <Settings size={18} /> },
              ].map(item => (
                <li key={item.name}>
                  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors ${item.name === 'Dashboard' ? 'bg-[#C8A951]/10 text-[#C8A951] font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-[#C8A951]'}`}>
                    {item.icon} {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Admin Info & Logout */}
          <div className="p-6 border-t border-[var(--border)]">
            <div className="mb-4 pb-4 border-b border-[var(--border)]">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Logged in as</p>
              <p className="font-semibold text-sm">{admin?.username || 'Admin'}</p>
              <p className="text-xs text-gray-400">{admin?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-sm transition-colors text-sm font-medium"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Admin Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-serif font-bold mb-8">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Total Revenue', value: '₹45,67,890', icon: <DollarSign size={24} />, trend: '+12.5%' },
              { title: 'Total Orders', value: '342', icon: <ShoppingCart size={24} />, trend: '+5.2%' },
              { title: 'Active Customers', value: '1,204', icon: <Users size={24} />, trend: '+18.1%' },
              { title: 'Total Products', value: '86', icon: <PackageOpen size={24} />, trend: '0%' },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-[#1A1A1A] p-6 border border-[var(--border)] rounded-sm shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#FAF8F5] dark:bg-[#222] text-[#C8A951] rounded-sm">
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders Table Mock */}
          <div className="bg-white dark:bg-[#1A1A1A] border border-[var(--border)] rounded-sm shadow-sm">
            <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold">Recent Orders</h2>
              <button className="text-[#C8A951] text-sm hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] dark:bg-[#222] text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 border-b border-[var(--border)]">Order ID</th>
                    <th className="p-4 border-b border-[var(--border)]">Customer</th>
                    <th className="p-4 border-b border-[var(--border)]">Date</th>
                    <th className="p-4 border-b border-[var(--border)]">Amount</th>
                    <th className="p-4 border-b border-[var(--border)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="p-4 border-b border-[var(--border)] font-medium text-[#C8A951]">#SR-{1000 + item}</td>
                      <td className="p-4 border-b border-[var(--border)]">John Doe</td>
                      <td className="p-4 border-b border-[var(--border)] text-gray-500">Oct {15 - item}, 2023</td>
                      <td className="p-4 border-b border-[var(--border)]">₹1,25,000</td>
                      <td className="p-4 border-b border-[var(--border)]">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-sm uppercase tracking-wider">Completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
