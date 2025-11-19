import React from 'react';
import './Spinner.css';

// PUBLIC_INTERFACE
/**
 * Reusable Spinner component
 */
const Spinner = ({
  size = 'md',
  color = 'primary',
  className = ''
}) => {
  const classNames = [
    'spinner',
    `spinner-${size}`,
    `spinner-${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
