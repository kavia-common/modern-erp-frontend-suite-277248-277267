"use strict";

import { getJson, postJson, putJson, deleteJson } from "./apiClient";

/**
 * Purchases API service aligned with FastAPI OpenAPI spec.
 * Endpoints:
 *  - GET /api/v1/purchases/ (list with filters)
 *  - POST /api/v1/purchases/ (create)
 *  - GET /api/v1/purchases/{purchase_id}
 *  - PUT /api/v1/purchases/{purchase_id}
 *  - DELETE /api/v1/purchases/{purchase_id}
 */

// PUBLIC_INTERFACE
export async function listPurchases({ skip = 0, limit = 10, payment_status, delivery_status, supplier_name } = {}) {
  return getJson("/api/v1/purchases/", { skip, limit, payment_status, delivery_status, supplier_name });
}

// PUBLIC_INTERFACE
export async function createPurchase(payload) {
  return postJson("/api/v1/purchases/", payload);
}

// PUBLIC_INTERFACE
export async function getPurchase(purchaseId) {
  return getJson(`/api/v1/purchases/${encodeURIComponent(purchaseId)}`);
}

// PUBLIC_INTERFACE
export async function updatePurchase(purchaseId, payload) {
  return putJson(`/api/v1/purchases/${encodeURIComponent(purchaseId)}`, payload);
}

// PUBLIC_INTERFACE
export async function deletePurchase(purchaseId) {
  return deleteJson(`/api/v1/purchases/${encodeURIComponent(purchaseId)}`);
}
