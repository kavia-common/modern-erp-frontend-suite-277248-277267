// PUBLIC_INTERFACE
/**
 * Helper utility functions
 */

export const helpers = {
  /**
   * Generate unique ID
   */
  generateId: () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Debounce function
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Deep clone object
   */
  deepClone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Check if object is empty
   */
  isEmpty: (obj) => {
    return Object.keys(obj).length === 0;
  },

  /**
   * Sort array of objects by property
   */
  sortBy: (array, property, order = 'asc') => {
    return [...array].sort((a, b) => {
      const aVal = a[property];
      const bVal = b[property];
      const multiplier = order === 'asc' ? 1 : -1;
      
      if (aVal < bVal) return -1 * multiplier;
      if (aVal > bVal) return 1 * multiplier;
      return 0;
    });
  },

  /**
   * Filter array by search term
   */
  searchFilter: (array, searchTerm, fields = []) => {
    if (!searchTerm) return array;
    
    const term = searchTerm.toLowerCase();
    return array.filter(item => {
      if (fields.length === 0) {
        // Search all string fields
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(term)
        );
      } else {
        // Search specific fields
        return fields.some(field => 
          String(item[field]).toLowerCase().includes(term)
        );
      }
    });
  },

  /**
   * Group array by property
   */
  groupBy: (array, property) => {
    return array.reduce((acc, item) => {
      const key = item[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  },

  /**
   * Calculate percentage
   */
  calculatePercentage: (value, total) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  },

  /**
   * Download file
   */
  downloadFile: (data, filename, mimeType = 'text/plain') => {
    const blob = new Blob([data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  /**
   * Get initials from name
   */
  getInitials: (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
};

export default helpers;
