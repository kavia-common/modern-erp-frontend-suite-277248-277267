import React from 'react';
import './Card.css';

// PUBLIC_INTERFACE
/**
 * Reusable Card component
 */
const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  onClick,
  hoverable = false
}) => {
  const classNames = [
    'card',
    hoverable && 'card-hoverable',
    onClick && 'card-clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onClick={onClick}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
