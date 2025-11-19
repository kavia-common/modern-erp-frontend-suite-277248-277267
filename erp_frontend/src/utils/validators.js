// PUBLIC_INTERFACE
/**
 * Validation utility functions
 */

export const validators = {
  /**
   * Validate required field
   */
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  /**
   * Validate email format
   */
  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  /**
   * Validate minimum length
   */
  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  /**
   * Validate maximum length
   */
  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },

  /**
   * Validate number range
   */
  numberRange: (min, max) => (value) => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    if (isNaN(num)) {
      return 'Please enter a valid number';
    }
    if (num < min || num > max) {
      return `Must be between ${min} and ${max}`;
    }
    return null;
  },

  /**
   * Validate positive number
   */
  positive: (value) => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      return 'Must be a positive number';
    }
    return null;
  },

  /**
   * Validate non-negative number
   */
  nonNegative: (value) => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    if (isNaN(num) || num < 0) {
      return 'Must be a non-negative number';
    }
    return null;
  },

  /**
   * Validate pattern match
   */
  pattern: (regex, message) => (value) => {
    if (!value) return null;
    if (!regex.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  }
};

// PUBLIC_INTERFACE
/**
 * Combine multiple validators
 */
export const combineValidators = (...validatorFuncs) => {
  return (value) => {
    for (const validator of validatorFuncs) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
};

// PUBLIC_INTERFACE
/**
 * Validate entire form object
 */
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
    const value = values[field];
    
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });
  
  return errors;
};

export default validators;
