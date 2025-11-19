import api from './api';

// PUBLIC_INTERFACE
/**
 * Purchases service for managing purchase orders
 */
const purchasesService = {
  getAll: (params = {}) => {
    // Convert frontend pagination params to backend format
    const backendParams = {
      skip: params.skip || 0,
      limit: params.limit || 10,
      payment_status: params.payment_status,
      delivery_status: params.delivery_status,
      supplier_name: params.supplier_name
    };
    return api.get('/api/v1/purchases', { params: backendParams });
  },
  getById: (id) => api.get(`/api/v1/purchases/${id}`),
  create: (data) => api.post('/api/v1/purchases', data),
  update: (id, data) => api.put(`/api/v1/purchases/${id}`, data),
  delete: (id) => api.delete(`/api/v1/purchases/${id}`),
  bulkDelete: async (ids) => {
    // Backend doesn't support bulk delete, delete one by one
    const promises = ids.map(id => api.delete(`/api/v1/purchases/${id}`));
    return Promise.all(promises);
  }
};

export default purchasesService;
