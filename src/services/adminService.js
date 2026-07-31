import api from './api.js';

export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  getRecentOrders: async () => {
    const response = await api.get('/admin/dashboard/orders');
    return response.data;
  },

  getRecentContacts: async () => {
    const response = await api.get('/admin/dashboard/contacts');
    return response.data;
  },

  getPendingReviews: async () => {
    const response = await api.get('/admin/dashboard/reviews');
    return response.data;
  }
};
