"use strict";

import { getJson, postJson, putJson, deleteJson } from "./apiClient";

/**
 * HR API service aligned with FastAPI OpenAPI spec.
 * Endpoints:
 *  - GET /api/v1/hr/employees (list with filters)
 *  - POST /api/v1/hr/employees (create)
 *  - GET /api/v1/hr/employees/{employee_id}
 *  - PUT /api/v1/hr/employees/{employee_id}
 *  - DELETE /api/v1/hr/employees/{employee_id}
 */

// PUBLIC_INTERFACE
export async function listEmployees({ skip = 0, limit = 10, department, status, search } = {}) {
  return getJson("/api/v1/hr/employees", { skip, limit, department, status, search });
}

// PUBLIC_INTERFACE
export async function createEmployee(payload) {
  return postJson("/api/v1/hr/employees", payload);
}

// PUBLIC_INTERFACE
export async function getEmployee(employeeId) {
  return getJson(`/api/v1/hr/employees/${encodeURIComponent(employeeId)}`);
}

// PUBLIC_INTERFACE
export async function updateEmployee(employeeId, payload) {
  return putJson(`/api/v1/hr/employees/${encodeURIComponent(employeeId)}`, payload);
}

// PUBLIC_INTERFACE
export async function deleteEmployee(employeeId) {
  return deleteJson(`/api/v1/hr/employees/${encodeURIComponent(employeeId)}`);
}
