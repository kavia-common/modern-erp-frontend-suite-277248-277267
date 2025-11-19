import React from 'react';
import './Input.css';

// PUBLIC_INTERFACE
/**
 * Reusable Input component
 * @param {Object} props - Component props
 */
const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  placeholder,
  className = '',
  ...props
}) => {
  const inputId = `input-${name}`;
  
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required" aria-label="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={`input ${error ? 'input-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="input-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
