import api from './api';

// PUBLIC_INTERFACE
/**
 * Sales service for managing sales orders
 */
const salesService = {
  getAll: (params = {}) => api.get('/api/v1/sales', { params }),
  getById: (id) => api.get(`/api/v1/sales/${id}`),
  create: (data) => api.post('/api/v1/sales', data),
  update: (id, data) => api.put(`/api/v1/sales/${id}`, data),
  delete: (id) => api.delete(`/api/v1/sales/${id}`),
  bulkDelete: (ids) => api.post('/api/v1/sales/bulk-delete', { ids })
};

export default salesService;
