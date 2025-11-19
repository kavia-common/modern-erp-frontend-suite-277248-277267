import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// PUBLIC_INTERFACE
/**
 * Custom hook to access user context
 * @returns {Object} User context value with current user and role functions
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// PUBLIC_INTERFACE
/**
 * UserProvider component
 * Manages current user state and role-based permissions
 */
export const UserProvider = ({ children }) => {
  // Placeholder user with role (Admin, Manager, Staff, ReadOnly)
  const [currentUser, setCurrentUser] = useState({
    id: '1',
    name: 'Admin User',
    email: 'admin@erp.local',
    role: 'Admin',
    avatar: null
  });

  useEffect(() => {
    // Load user from localStorage (placeholder)
    const savedUser = localStorage.getItem('current-user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    }
  }, []);

  const updateUser = (userData) => {
    setCurrentUser(prev => ({ ...prev, ...userData }));
    localStorage.setItem('current-user', JSON.stringify({ ...currentUser, ...userData }));
  };

  const changeRole = (newRole) => {
    const updatedUser = { ...currentUser, role: newRole };
    setCurrentUser(updatedUser);
    localStorage.setItem('current-user', JSON.stringify(updatedUser));
  };

  const hasPermission = (requiredRole) => {
    const roleHierarchy = {
      'Admin': 4,
      'Manager': 3,
      'Staff': 2,
      'ReadOnly': 1
    };
    return roleHierarchy[currentUser.role] >= roleHierarchy[requiredRole];
  };

  const value = {
    currentUser,
    updateUser,
    changeRole,
    hasPermission,
    isAdmin: currentUser.role === 'Admin',
    isManager: currentUser.role === 'Manager',
    isStaff: currentUser.role === 'Staff',
    isReadOnly: currentUser.role === 'ReadOnly'
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
