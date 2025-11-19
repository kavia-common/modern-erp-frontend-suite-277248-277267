import React from 'react';
import './Button.css';

// PUBLIC_INTERFACE
/**
 * Reusable Button component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, tertiary, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.fullWidth - Full width button
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full-width',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner" aria-label="Loading"></span>}
      <span className={loading ? 'btn-content-loading' : ''}>{children}</span>
    </button>
  );
};

export default Button;
