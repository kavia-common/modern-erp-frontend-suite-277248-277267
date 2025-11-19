import api from './api';

// PUBLIC_INTERFACE
/**
 * Purchases service for managing purchase orders
 */
const purchasesService = {
  getAll: (params = {}) => api.get('/api/v1/purchases', { params }),
  getById: (id) => api.get(`/api/v1/purchases/${id}`),
  create: (data) => api.post('/api/v1/purchases', data),
  update: (id, data) => api.put(`/api/v1/purchases/${id}`, data),
  delete: (id) => api.delete(`/api/v1/purchases/${id}`),
  bulkDelete: (ids) => api.post('/api/v1/purchases/bulk-delete', { ids })
};

export default purchasesService;
