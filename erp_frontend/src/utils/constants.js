// PUBLIC_INTERFACE
/**
 * Application constants
 */

export const USER_ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  STAFF: 'Staff',
  READ_ONLY: 'ReadOnly'
};

export const STATUS_TYPES = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
};

export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  ISO: 'YYYY-MM-DD'
};

export const MODULE_ROUTES = {
  DASHBOARD: '/dashboard',
  INVENTORY: '/inventory',
  SALES: '/sales',
  PURCHASES: '/purchases',
  ACCOUNTING: '/accounting',
  HR: '/hr',
  REPORTS: '/reports'
};

export const API_ENDPOINTS = {
  INVENTORY: '/api/v1/inventory',
  SALES: '/api/v1/sales',
  PURCHASES: '/api/v1/purchases',
  ACCOUNTING: '/api/v1/accounting',
  HR: '/api/v1/hr',
  REPORTS: '/api/v1/reports'
};

export default {
  USER_ROLES,
  STATUS_TYPES,
  NOTIFICATION_TYPES,
  PAGINATION,
  DATE_FORMATS,
  MODULE_ROUTES,
  API_ENDPOINTS
};
