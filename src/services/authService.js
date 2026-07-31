import api from './api.js';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue logout even if API call fails
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  },

  getCurrentAdmin: () => {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  }
};
