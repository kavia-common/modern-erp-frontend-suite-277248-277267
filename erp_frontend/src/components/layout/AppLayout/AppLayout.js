import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import Sidebar from '../Sidebar/Sidebar';
import './AppLayout.css';

// PUBLIC_INTERFACE
/**
 * Main application layout component
 */
const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopBar onMenuToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <main id="main-content" className="app-main" role="main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
