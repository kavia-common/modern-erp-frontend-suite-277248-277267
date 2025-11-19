// PUBLIC_INTERFACE
/**
 * Formatting utility functions
 */

export const formatters = {
  /**
   * Format currency
   */
  currency: (value, currency = 'USD') => {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(value);
  },

  /**
   * Format number with commas
   */
  number: (value, decimals = 0) => {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  },

  /**
   * Format date
   */
  date: (value, format = 'short') => {
    if (!value) return '-';
    const date = new Date(value);
    if (isNaN(date.getTime())) return '-';
    
    const options = format === 'long' 
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  },

  /**
   * Format datetime
   */
  datetime: (value) => {
    if (!value) return '-';
    const date = new Date(value);
    if (isNaN(date.getTime())) return '-';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  },

  /**
   * Format percentage
   */
  percentage: (value, decimals = 1) => {
    if (value === null || value === undefined) return '-';
    return `${Number(value).toFixed(decimals)}%`;
  },

  /**
   * Truncate text
   */
  truncate: (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  /**
   * Capitalize first letter
   */
  capitalize: (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  /**
   * Format phone number
   */
  phone: (value) => {
    if (!value) return '-';
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return value;
  }
};

export default formatters;
