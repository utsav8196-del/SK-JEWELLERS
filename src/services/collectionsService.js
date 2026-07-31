import api from './api.js';

export const collectionsService = {
  getAll: async () => {
    const response = await api.get('/collections');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/collections/${id}`);
    return response.data;
  },

  create: async (collectionData) => {
    const response = await api.post('/collections', collectionData);
    return response.data;
  },

  update: async (id, collectionData) => {
    const response = await api.put(`/collections/${id}`, collectionData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/collections/${id}`);
    return response.data;
  }
};
