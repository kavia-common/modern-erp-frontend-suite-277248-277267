import React from 'react';
import './Alert.css';

// PUBLIC_INTERFACE
/**
 * Reusable Alert component
 */
const Alert = ({
  children,
  type = 'info',
  onClose,
  className = ''
}) => {
  const classNames = [
    'alert',
    `alert-${type}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="alert">
      <div className="alert-content">
        {children}
      </div>
      {onClose && (
        <button
          className="alert-close"
          onClick={onClose}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
