import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// PUBLIC_INTERFACE
/**
 * Axios instance configured with base URL and interceptors
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('auth-token');
          // window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: Insufficient permissions');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network error: No response received');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
