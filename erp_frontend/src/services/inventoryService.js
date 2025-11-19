import api from './api';

// PUBLIC_INTERFACE
/**
 * Inventory service for managing inventory items
 */
const inventoryService = {
  /**
   * Get all inventory items with backend pagination support
   * @param {Object} params - Query parameters (skip, limit, category, search)
   * @returns {Promise} API response
   */
  getAll: (params = {}) => {
    // Convert frontend params to backend format
    const backendParams = {
      skip: params.skip || 0,
      limit: params.limit || 10,
      category: params.category,
      search: params.search
    };
    return api.get('/api/v1/inventory', { params: backendParams });
  },

  /**
   * Get inventory item by ID
   * @param {string} id - Item ID
   * @returns {Promise} API response
   */
  getById: (id) => {
    return api.get(`/api/v1/inventory/${id}`);
  },

  /**
   * Create new inventory item
   * @param {Object} data - Item data
   * @returns {Promise} API response
   */
  create: (data) => {
    return api.post('/api/v1/inventory', data);
  },

  /**
   * Update inventory item
   * @param {string} id - Item ID
   * @param {Object} data - Updated data
   * @returns {Promise} API response
   */
  update: (id, data) => {
    return api.put(`/api/v1/inventory/${id}`, data);
  },

  /**
   * Delete inventory item
   * @param {string} id - Item ID
   * @returns {Promise} API response
   */
  delete: (id) => {
    return api.delete(`/api/v1/inventory/${id}`);
  },

  /**
   * Bulk delete inventory items
   * Note: Backend doesn't support bulk delete, so we delete one by one
   * @param {Array} ids - Array of item IDs
   * @returns {Promise} API response
   */
  bulkDelete: async (ids) => {
    const promises = ids.map(id => api.delete(`/api/v1/inventory/${id}`));
    return Promise.all(promises);
  }
};

export default inventoryService;
