import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// PUBLIC_INTERFACE
/**
 * Custom hook to access theme context
 * @returns {Object} Theme context value with theme state and toggle function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// PUBLIC_INTERFACE
/**
 * ThemeProvider component
 * Manages application theme state (light/dark mode placeholder)
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document and save preference
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
