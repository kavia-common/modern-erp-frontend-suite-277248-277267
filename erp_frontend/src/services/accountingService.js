import api from './api';

// PUBLIC_INTERFACE
/**
 * Accounting service for managing ledger entries and transactions
 */
const accountingService = {
  getAll: (params = {}) => api.get('/api/v1/accounting', { params }),
  getById: (id) => api.get(`/api/v1/accounting/${id}`),
  create: (data) => api.post('/api/v1/accounting', data),
  update: (id, data) => api.put(`/api/v1/accounting/${id}`, data),
  delete: (id) => api.delete(`/api/v1/accounting/${id}`),
  getBalance: () => api.get('/api/v1/accounting/balance')
};

export default accountingService;
