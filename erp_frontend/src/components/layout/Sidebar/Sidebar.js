import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// PUBLIC_INTERFACE
/**
 * Sidebar navigation component
 */
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/inventory', icon: '📦', label: 'Inventory' },
    { path: '/sales', icon: '💰', label: 'Sales' },
    { path: '/purchases', icon: '🛒', label: 'Purchases' },
    { path: '/accounting', icon: '💳', label: 'Accounting' },
    { path: '/hr', icon: '👥', label: 'HR' },
    { path: '/reports', icon: '📈', label: 'Reports' }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <nav
        className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar-content">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
              onClick={onClose}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
