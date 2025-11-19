import React from 'react';
import './PageLayout.css';

// PUBLIC_INTERFACE
/**
 * Page layout wrapper component
 */
const PageLayout = ({
  title,
  subtitle,
  actions,
  children,
  className = ''
}) => {
  return (
    <div className={`page-layout ${className}`}>
      {(title || subtitle || actions) && (
        <div className="page-header">
          <div className="page-header-text">
            {title && <h1 className="page-title">{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          {actions && (
            <div className="page-actions">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
