"use strict";

import { getJson } from "./apiClient";

/**
 * Reports API service aligned with FastAPI OpenAPI spec.
 * Endpoints:
 *  - GET /api/v1/reports/summary
 *  - GET /api/v1/reports/sales
 *  - GET /api/v1/reports/inventory
 *  - GET /api/v1/reports/financial
 */

// PUBLIC_INTERFACE
export async function getDashboardSummary() {
  return getJson("/api/v1/reports/summary");
}

// PUBLIC_INTERFACE
export async function getSalesReport() {
  return getJson("/api/v1/reports/sales");
}

// PUBLIC_INTERFACE
export async function getInventoryReport() {
  return getJson("/api/v1/reports/inventory");
}

// PUBLIC_INTERFACE
export async function getFinancialReport() {
  return getJson("/api/v1/reports/financial");
}
