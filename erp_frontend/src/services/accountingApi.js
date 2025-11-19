"use strict";

import { getJson, postJson, putJson, deleteJson } from "./apiClient";

/**
 * Accounting API service aligned with FastAPI OpenAPI spec.
 * Endpoints:
 *  - GET /api/v1/accounting/ (list with filters)
 *  - POST /api/v1/accounting/ (create)
 *  - GET /api/v1/accounting/{entry_id}
 *  - PUT /api/v1/accounting/{entry_id}
 *  - DELETE /api/v1/accounting/{entry_id}
 */

// PUBLIC_INTERFACE
export async function listAccountingEntries({ skip = 0, limit = 10, transaction_type, category, account_name } = {}) {
  return getJson("/api/v1/accounting/", { skip, limit, transaction_type, category, account_name });
}

// PUBLIC_INTERFACE
export async function createAccountingEntry(payload) {
  return postJson("/api/v1/accounting/", payload);
}

// PUBLIC_INTERFACE
export async function getAccountingEntry(entryId) {
  return getJson(`/api/v1/accounting/${encodeURIComponent(entryId)}`);
}

// PUBLIC_INTERFACE
export async function updateAccountingEntry(entryId, payload) {
  return putJson(`/api/v1/accounting/${encodeURIComponent(entryId)}`, payload);
}

// PUBLIC_INTERFACE
export async function deleteAccountingEntry(entryId) {
  return deleteJson(`/api/v1/accounting/${encodeURIComponent(entryId)}`);
}
