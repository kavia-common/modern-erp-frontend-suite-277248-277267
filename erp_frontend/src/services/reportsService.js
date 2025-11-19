import api from './api';

// PUBLIC_INTERFACE
/**
 * Reports service for generating and managing reports
 * Backend provides: summary, sales, inventory, and financial reports
 */
const reportsService = {
  getSummary: () => api.get('/api/v1/reports/summary'),
  getSalesReport: () => api.get('/api/v1/reports/sales'),
  getInventoryReport: () => api.get('/api/v1/reports/inventory'),
  getFinancialReport: () => api.get('/api/v1/reports/financial')
};

export default reportsService;
