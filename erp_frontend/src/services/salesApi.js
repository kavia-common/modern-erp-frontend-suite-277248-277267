"use strict";

import { getJson, postJson, putJson, deleteJson } from "./apiClient";

/**
 * Sales API service aligned with FastAPI OpenAPI spec.
 * Endpoints:
 *  - GET /api/v1/sales/ (list with filters)
 *  - POST /api/v1/sales/ (create)
 *  - GET /api/v1/sales/{sale_id}
 *  - PUT /api/v1/sales/{sale_id}
 *  - DELETE /api/v1/sales/{sale_id}
 */

// PUBLIC_INTERFACE
export async function listSales({ skip = 0, limit = 10, status, customer_name } = {}) {
  return getJson("/api/v1/sales/", { skip, limit, status, customer_name });
}

// PUBLIC_INTERFACE
export async function createSale(payload) {
  return postJson("/api/v1/sales/", payload);
}

// PUBLIC_INTERFACE
export async function getSale(saleId) {
  return getJson(`/api/v1/sales/${encodeURIComponent(saleId)}`);
}

// PUBLIC_INTERFACE
export async function updateSale(saleId, payload) {
  return putJson(`/api/v1/sales/${encodeURIComponent(saleId)}`, payload);
}

// PUBLIC_INTERFACE
export async function deleteSale(saleId) {
  return deleteJson(`/api/v1/sales/${encodeURIComponent(saleId)}`);
}
