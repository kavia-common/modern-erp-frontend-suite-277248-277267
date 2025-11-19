import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AppLayout from './components/layout/AppLayout/AppLayout';
import Dashboard from './components/modules/Dashboard/Dashboard';
import InventoryList from './components/modules/Inventory/InventoryList';
import SalesList from './components/modules/Sales/SalesList';
import PurchasesList from './components/modules/Purchases/PurchasesList';
import AccountingList from './components/modules/Accounting/AccountingList';
import HRList from './components/modules/HR/HRList';
import ReportsList from './components/modules/Reports/ReportsList';
import NotFound from './components/common/NotFound/NotFound';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Main application component
 * Sets up routing, context providers, and error boundaries
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <NotificationProvider>
            <Router>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="inventory" element={<InventoryList />} />
                  <Route path="sales" element={<SalesList />} />
                  <Route path="purchases" element={<PurchasesList />} />
                  <Route path="accounting" element={<AccountingList />} />
                  <Route path="hr" element={<HRList />} />
                  <Route path="reports" element={<ReportsList />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Router>
          </NotificationProvider>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
