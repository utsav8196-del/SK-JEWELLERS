import api from './api.js';

export const newsletterService = {
  subscribe: async (email) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  },

  unsubscribe: async (email) => {
    const response = await api.post('/newsletter/unsubscribe', { email });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/newsletter');
    return response.data;
  }
};
