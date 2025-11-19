import { useState, useCallback } from 'react';

// PUBLIC_INTERFACE
/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function
 * @returns {Object} Form state and handlers
 */
const useFormValidation = (initialValues = {}, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    if (validate) {
      const fieldErrors = validate({ [name]: values[name] });
      if (fieldErrors[name]) {
        setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
      }
    }
  }, [validate, values]);

  const handleSubmit = useCallback(async (onSubmit) => {
    return async (e) => {
      if (e) {
        e.preventDefault();
      }
      
      setIsSubmitting(true);
      
      // Validate all fields
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length > 0) {
          setIsSubmitting(false);
          return;
        }
      }
      
      try {
        await onSubmit(values);
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        throw error;
      }
    };
  }, [values, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    setValues
  };
};

export default useFormValidation;
