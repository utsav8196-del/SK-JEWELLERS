import api from './api.js';

export const galleryService = {
  getAll: async () => {
    const response = await api.get('/gallery');
    return response.data;
  },

  create: async (galleryData) => {
    const response = await api.post('/gallery', galleryData);
    return response.data;
  },

  update: async (id, galleryData) => {
    const response = await api.put(`/gallery/${id}`, galleryData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  }
};
