export * from './inventoryService';
export * from './salesService';
export * from './purchasesService';
export * from './accountingService';
export * from './hrService';
export * from './reportsService';

// PUBLIC_INTERFACE
/**
 * This module re-exports all service-level API functions as the app's public API surface.
 * Consumers may import from 'src/services/api' to access typed, backend-backed operations.
 * All service functions internally use apiClient.js, which reads the base URL from:
 * - REACT_APP_API_BASE or REACT_APP_BACKEND_URL (environment variables)
 */
