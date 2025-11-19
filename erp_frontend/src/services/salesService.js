import api from './api';

// PUBLIC_INTERFACE
/**
 * Sales service for managing sales orders
 */
const salesService = {
  getAll: (params = {}) => {
    // Convert frontend pagination params to backend format
    const backendParams = {
      skip: params.skip || 0,
      limit: params.limit || 10,
      status: params.status,
      customer_name: params.customer_name
    };
    return api.get('/api/v1/sales', { params: backendParams });
  },
  getById: (id) => api.get(`/api/v1/sales/${id}`),
  create: (data) => api.post('/api/v1/sales', data),
  update: (id, data) => api.put(`/api/v1/sales/${id}`, data),
  delete: (id) => api.delete(`/api/v1/sales/${id}`),
  bulkDelete: async (ids) => {
    // Backend doesn't support bulk delete, delete one by one
    const promises = ids.map(id => api.delete(`/api/v1/sales/${id}`));
    return Promise.all(promises);
  }
};

export default salesService;
