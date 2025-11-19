"use strict";

import { getJson, postJson, putJson, deleteJson } from "./apiClient";

/**
 * Inventory API service aligned with FastAPI OpenAPI spec.
 * Endpoints:
 *  - GET /api/v1/inventory/ (list with filters)
 *  - POST /api/v1/inventory/ (create)
 *  - GET /api/v1/inventory/{item_id}
 *  - PUT /api/v1/inventory/{item_id}
 *  - DELETE /api/v1/inventory/{item_id}
 */

// PUBLIC_INTERFACE
export async function listInventory({ skip = 0, limit = 10, category, search } = {}) {
  /** List inventory items with optional filters. */
  return getJson("/api/v1/inventory/", { skip, limit, category, search });
}

// PUBLIC_INTERFACE
export async function createInventoryItem(payload) {
  /** Create new inventory item. See InventoryItemCreate schema. */
  return postJson("/api/v1/inventory/", payload);
}

// PUBLIC_INTERFACE
export async function getInventoryItem(itemId) {
  /** Get a single inventory item by ID. */
  return getJson(`/api/v1/inventory/${encodeURIComponent(itemId)}`);
}

// PUBLIC_INTERFACE
export async function updateInventoryItem(itemId, payload) {
  /** Update existing inventory item. */
  return putJson(`/api/v1/inventory/${encodeURIComponent(itemId)}`, payload);
}

// PUBLIC_INTERFACE
export async function deleteInventoryItem(itemId) {
  /** Delete inventory item by ID. */
  return deleteJson(`/api/v1/inventory/${encodeURIComponent(itemId)}`);
}
