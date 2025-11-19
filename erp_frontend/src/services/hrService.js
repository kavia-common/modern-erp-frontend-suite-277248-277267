import api from './api';

// PUBLIC_INTERFACE
/**
 * HR service for managing employees
 * Note: Backend uses /api/v1/hr/employees endpoints
 */
const hrService = {
  getAll: (params = {}) => {
    // Convert frontend pagination params to backend format
    const backendParams = {
      skip: params.skip || 0,
      limit: params.limit || 10,
      department: params.department,
      status: params.status,
      search: params.search
    };
    return api.get('/api/v1/hr/employees', { params: backendParams });
  },
  getById: (id) => api.get(`/api/v1/hr/employees/${id}`),
  create: (data) => api.post('/api/v1/hr/employees', data),
  update: (id, data) => api.put(`/api/v1/hr/employees/${id}`, data),
  delete: (id) => api.delete(`/api/v1/hr/employees/${id}`)
};

export default hrService;
