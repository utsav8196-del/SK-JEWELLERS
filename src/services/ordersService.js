import api from './api.js';

export const ordersService = {
  create: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getByNumber: async (orderNumber) => {
    const response = await api.get(`/orders/${orderNumber}`);
    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  update: async (id, orderData) => {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  }
};
