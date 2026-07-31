import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (token && adminData) {
      try {
        setAdmin(JSON.parse(adminData));
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      if (response.success) {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminData', JSON.stringify(response.admin));
        setAdmin(response.admin);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await authService.register(username, email, password);
      if (response.success) {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminData', JSON.stringify(response.admin));
        setAdmin(response.admin);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
