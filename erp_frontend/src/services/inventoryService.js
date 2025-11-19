import api from './api';

// PUBLIC_INTERFACE
/**
 * Inventory service for managing inventory items
 */
const inventoryService = {
  /**
   * Get all inventory items
   * @param {Object} params - Query parameters (page, pageSize, etc.)
   * @returns {Promise} API response
   */
  getAll: (params = {}) => {
    return api.get('/api/v1/inventory', { params });
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
   * @param {Array} ids - Array of item IDs
   * @returns {Promise} API response
   */
  bulkDelete: (ids) => {
    return api.post('/api/v1/inventory/bulk-delete', { ids });
  }
};

export default inventoryService;
