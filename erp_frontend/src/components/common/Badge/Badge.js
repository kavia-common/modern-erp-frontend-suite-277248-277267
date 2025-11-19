import React from 'react';
import './Badge.css';

// PUBLIC_INTERFACE
/**
 * Reusable Badge component
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const classNames = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {children}
    </span>
  );
};

export default Badge;
