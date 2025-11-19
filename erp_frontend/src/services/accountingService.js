import api from './api';

// PUBLIC_INTERFACE
/**
 * Accounting service for managing ledger entries and transactions
 */
const accountingService = {
  getAll: (params = {}) => {
    // Convert frontend pagination params to backend format
    const backendParams = {
      skip: params.skip || 0,
      limit: params.limit || 10,
      transaction_type: params.transaction_type,
      category: params.category,
      account_name: params.account_name
    };
    return api.get('/api/v1/accounting', { params: backendParams });
  },
  getById: (id) => api.get(`/api/v1/accounting/${id}`),
  create: (data) => api.post('/api/v1/accounting', data),
  update: (id, data) => api.put(`/api/v1/accounting/${id}`, data),
  delete: (id) => api.delete(`/api/v1/accounting/${id}`)
};

export default accountingService;
