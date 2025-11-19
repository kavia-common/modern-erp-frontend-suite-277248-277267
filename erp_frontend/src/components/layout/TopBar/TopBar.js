import React, { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { useTheme } from '../../../contexts/ThemeContext';
import './TopBar.css';

// PUBLIC_INTERFACE
/**
 * Top navigation bar component
 */
const TopBar = ({ onMenuToggle }) => {
  const { currentUser, changeRole } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roles = ['Admin', 'Manager', 'Staff', 'ReadOnly'];

  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        <button
          className="topbar-menu-btn"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1 className="topbar-title">Modern ERP</h1>
      </div>
      
      <div className="topbar-right">
        <button
          className="topbar-icon-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        
        <button className="topbar-icon-btn" aria-label="Notifications">
          🔔
        </button>
        
        <div className="topbar-user">
          <button
            className="topbar-user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-expanded={showUserMenu}
            aria-haspopup="true"
          >
            <div className="topbar-user-avatar">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="topbar-user-info">
              <div className="topbar-user-name">{currentUser.name}</div>
              <div className="topbar-user-role">{currentUser.role}</div>
            </div>
          </button>
          
          {showUserMenu && (
            <div className="topbar-user-menu">
              <div className="topbar-user-menu-section">
                <div className="topbar-user-menu-label">Switch Role</div>
                {roles.map(role => (
                  <button
                    key={role}
                    className={`topbar-user-menu-item ${currentUser.role === role ? 'active' : ''}`}
                    onClick={() => {
                      changeRole(role);
                      setShowUserMenu(false);
                    }}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
