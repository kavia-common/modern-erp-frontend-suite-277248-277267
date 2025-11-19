import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

// PUBLIC_INTERFACE
/**
 * Custom hook to access notification context
 * @returns {Object} Notification context value with notification functions
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// PUBLIC_INTERFACE
/**
 * NotificationProvider component
 * Manages application notifications (toast messages)
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: notification.type || 'info',
      message: notification.message,
      duration: notification.duration || 3000
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration) => {
    return addNotification({ type: 'success', message, duration });
  }, [addNotification]);

  const showError = useCallback((message, duration) => {
    return addNotification({ type: 'error', message, duration });
  }, [addNotification]);

  const showWarning = useCallback((message, duration) => {
    return addNotification({ type: 'warning', message, duration });
  }, [addNotification]);

  const showInfo = useCallback((message, duration) => {
    return addNotification({ type: 'info', message, duration });
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 'var(--z-tooltip)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: notification.type === 'success' ? 'var(--success)' : 
                                notification.type === 'error' ? 'var(--error)' :
                                notification.type === 'warning' ? 'var(--warning)' : 
                                'var(--info)',
                color: 'white',
                boxShadow: 'var(--shadow-lg)',
                minWidth: '250px',
                maxWidth: '400px',
                animation: 'slideInUp 0.3s ease-out'
              }}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
