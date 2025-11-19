import api from './api';

// PUBLIC_INTERFACE
/**
 * Reports service for generating and managing reports
 */
const reportsService = {
  getAll: (params = {}) => api.get('/api/v1/reports', { params }),
  getById: (id) => api.get(`/api/v1/reports/${id}`),
  generate: (data) => api.post('/api/v1/reports/generate', data),
  export: (id, format) => api.get(`/api/v1/reports/${id}/export?format=${format}`, {
    responseType: 'blob'
  })
};

export default reportsService;
