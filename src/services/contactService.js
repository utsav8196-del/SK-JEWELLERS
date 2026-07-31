import api from './api.js';

export const contactService = {
  submit: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  },

  update: async (id, contactData) => {
    const response = await api.put(`/contact/${id}`, contactData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  }
};
