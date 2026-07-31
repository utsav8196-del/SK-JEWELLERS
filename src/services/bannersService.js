import api from './api.js';

export const bannersService = {
  getByPosition: async (position) => {
    const response = await api.get('/banners', { params: { position } });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/banners');
    return response.data;
  },

  create: async (bannerData) => {
    const response = await api.post('/banners', bannerData);
    return response.data;
  },

  update: async (id, bannerData) => {
    const response = await api.put(`/banners/${id}`, bannerData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/banners/${id}`);
    return response.data;
  }
};
