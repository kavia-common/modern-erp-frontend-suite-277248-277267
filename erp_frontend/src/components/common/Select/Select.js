import React from 'react';
import './Select.css';

// PUBLIC_INTERFACE
/**
 * Reusable Select component
 */
const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder = 'Select...',
  className = '',
  ...props
}) => {
  const selectId = `select-${name}`;
  
  return (
    <div className={`select-wrapper ${className}`}>
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
          {required && <span className="select-required" aria-label="required">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`select ${error ? 'select-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${selectId}-error`} className="select-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
