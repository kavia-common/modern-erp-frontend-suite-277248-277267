import api from './api';

// PUBLIC_INTERFACE
/**
 * HR service for managing employees
 */
const hrService = {
  getAll: (params = {}) => api.get('/api/v1/hr', { params }),
  getById: (id) => api.get(`/api/v1/hr/${id}`),
  create: (data) => api.post('/api/v1/hr', data),
  update: (id, data) => api.put(`/api/v1/hr/${id}`, data),
  delete: (id) => api.delete(`/api/v1/hr/${id}`),
  bulkDelete: (ids) => api.post('/api/v1/hr/bulk-delete', { ids })
};

export default hrService;
