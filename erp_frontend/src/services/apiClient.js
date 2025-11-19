"use strict";

/**
 * Centralized API client for the ERP frontend.
 * - Uses environment variables for base URLs
 * - Adds robust error handling and JSON parsing
 * - Exposes helper methods for GET/POST/PUT/DELETE
 *
 * Required env vars (to be set by orchestrator in .env):
 * - REACT_APP_API_BASE (e.g., https://example.com) OR REACT_APP_BACKEND_URL
 * - Optional: REACT_APP_WS_URL for websockets
 */

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /**
   * Determine the API base URL from environment variables.
   * Priority: REACT_APP_API_BASE -> REACT_APP_BACKEND_URL -> window.location.origin
   * Returns a string without a trailing slash.
   */
  const envBase =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    "";

  const derived =
    envBase && envBase.trim().length > 0
      ? envBase.trim()
      : (typeof window !== "undefined" ? window.location.origin : "");

  // Remove trailing slash for safe concatenation
  return derived.replace(/\/+$/, "");
}

// PUBLIC_INTERFACE
export function buildUrl(path) {
  /**
   * Build a fully-qualified URL for API requests.
   * Ensures single slash between base and path and that path begins with /api.
   */
  const base = getApiBaseUrl();
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${safePath}`;
}

// PUBLIC_INTERFACE
export async function apiRequest(path, options = {}) {
  /**
   * Perform a fetch request with sensible defaults and error handling.
   * - Automatically sets JSON headers for bodies
   * - Parses JSON responses when content-type is application/json
   * - Throws an error object with {status, message, details} for non-2xx
   *
   * @param {string} path - API path (e.g., /api/v1/inventory/)
   * @param {object} options - fetch options (method, headers, body, etc.)
   * @returns {Promise<any>} Parsed response data or null for 204
   */
  const url = buildUrl(path);
  const defaultHeaders = {
    Accept: "application/json",
  };

  const hasBody = options && options.body !== undefined && options.body !== null;
  const mergedHeaders = {
    ...defaultHeaders,
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const safeOptions = {
    method: options.method || "GET",
    headers: mergedHeaders,
    body: hasBody && typeof options.body !== "string" ? JSON.stringify(options.body) : options.body,
    credentials: "include", // allow cookies if backend uses them
    mode: "cors",
  };

  let response;
  try {
    response = await fetch(url, safeOptions);
  } catch (networkErr) {
    // Network-level failure
    const err = new Error("Network error while contacting the API");
    err.cause = networkErr;
    err.status = 0;
    err.details = { url, message: String(networkErr?.message || networkErr) };
    throw err;
  }

  // Try to parse JSON when present
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  let data = null;
  try {
    if (response.status !== 204) {
      data = isJson ? await response.json() : await response.text();
    }
  } catch (parseErr) {
    // Parsing failed; keep raw text in details
    data = null;
  }

  if (!response.ok) {
    // Standardize backend error body when possible (FastAPI sends detail/validation)
    const error = new Error(
      (data && (data.message || data.detail)) ||
      `Request failed with status ${response.status}`
    );
    error.status = response.status;
    error.details = data || { url, statusText: response.statusText };
    throw error;
  }

  return data;
}

// PUBLIC_INTERFACE
export async function getJson(path, params) {
  /**
   * Convenience helper for GET requests with query parameters.
   * @param {string} path - API path
   * @param {Record<string, any>} params - optional query params
   */
  let finalPath = path;
  if (params && typeof params === "object") {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        qs.append(k, String(v));
      }
    });
    if (Array.from(qs.keys()).length > 0) {
      finalPath += (path.includes("?") ? "&" : "?") + qs.toString();
    }
  }
  return apiRequest(finalPath, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function postJson(path, body) {
  /**
   * Convenience helper for POST JSON body.
   */
  return apiRequest(path, { method: "POST", body });
}

// PUBLIC_INTERFACE
export async function putJson(path, body) {
  /**
   * Convenience helper for PUT JSON body.
   */
  return apiRequest(path, { method: "PUT", body });
}

// PUBLIC_INTERFACE
export async function deleteJson(path) {
  /**
   * Convenience helper for DELETE.
   */
  return apiRequest(path, { method: "DELETE" });
}
