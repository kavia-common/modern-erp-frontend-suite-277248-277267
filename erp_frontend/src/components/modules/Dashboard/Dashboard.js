import React, { useEffect, useState } from 'react';
import PageLayout from '../../layout/PageLayout/PageLayout';
import Card from '../../common/Card/Card';
import Badge from '../../common/Badge/Badge';
import { useUser } from '../../../contexts/UserContext';
import { formatters } from '../../../utils/formatters';
import './Dashboard.css';

// PUBLIC_INTERFACE
/**
 * Dashboard module component
 */
const Dashboard = () => {
  const { currentUser } = useUser();
  const [stats, setStats] = useState({
    totalSales: 47089.30,
    totalInventory: 210,
    lowStockItems: 2,
    pendingOrders: 3,
    activeEmployees: 6,
    monthlyRevenue: 35639.35
  });

  const recentActivities = [
    { id: 1, type: 'sale', message: 'New sale order SO-2024-004 created', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'inventory', message: 'Low stock alert: Office Chair', time: '4 hours ago', status: 'warning' },
    { id: 3, type: 'purchase', message: 'Purchase order PO-2024-003 placed', time: '1 day ago', status: 'info' },
    { id: 4, type: 'hr', message: 'David Wilson marked as on leave', time: '2 days ago', status: 'info' }
  ];

  return (
    <PageLayout
      title="Dashboard"
      subtitle={`Welcome back, ${currentUser.name}! Here's what's happening with your business today.`}
    >
      <div className="dashboard-grid">
        <Card className="dashboard-stat-card" hoverable>
          <div className="dashboard-stat">
            <div className="dashboard-stat-icon" style={{ background: 'var(--primary)' }}>💰</div>
            <div className="dashboard-stat-content">
              <div className="dashboard-stat-label">Total Sales</div>
              <div className="dashboard-stat-value">{formatters.currency(stats.totalSales)}</div>
              <Badge variant="success" size="sm">+12.5%</Badge>
            </div>
          </div>
        </Card>

        <Card className="dashboard-stat-card" hoverable>
          <div className="dashboard-stat">
            <div className="dashboard-stat-icon" style={{ background: 'var(--success)' }}>📦</div>
            <div className="dashboard-stat-content">
              <div className="dashboard-stat-label">Inventory Items</div>
              <div className="dashboard-stat-value">{stats.totalInventory}</div>
              <Badge variant="warning" size="sm">{stats.lowStockItems} low stock</Badge>
            </div>
          </div>
        </Card>

        <Card className="dashboard-stat-card" hoverable>
          <div className="dashboard-stat">
            <div className="dashboard-stat-icon" style={{ background: 'var(--warning)' }}>🛒</div>
            <div className="dashboard-stat-content">
              <div className="dashboard-stat-label">Pending Orders</div>
              <div className="dashboard-stat-value">{stats.pendingOrders}</div>
              <Badge variant="info" size="sm">Awaiting action</Badge>
            </div>
          </div>
        </Card>

        <Card className="dashboard-stat-card" hoverable>
          <div className="dashboard-stat">
            <div className="dashboard-stat-icon" style={{ background: 'var(--info)' }}>👥</div>
            <div className="dashboard-stat-content">
              <div className="dashboard-stat-label">Active Employees</div>
              <div className="dashboard-stat-value">{stats.activeEmployees}</div>
              <Badge variant="success" size="sm">All active</Badge>
            </div>
          </div>
        </Card>
      </div>

      <div className="dashboard-section">
        <Card title="Recent Activities" className="dashboard-activities-card">
          <div className="dashboard-activities">
            {recentActivities.map(activity => (
              <div key={activity.id} className="dashboard-activity-item">
                <div className="dashboard-activity-content">
                  <div className="dashboard-activity-message">{activity.message}</div>
                  <div className="dashboard-activity-time">{activity.time}</div>
                </div>
                <Badge variant={activity.status} size="sm">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Quick Stats" className="dashboard-quick-stats-card">
          <div className="dashboard-quick-stats">
            <div className="dashboard-quick-stat-item">
              <div className="dashboard-quick-stat-label">Monthly Revenue</div>
              <div className="dashboard-quick-stat-value">{formatters.currency(stats.monthlyRevenue)}</div>
            </div>
            <div className="dashboard-quick-stat-divider"></div>
            <div className="dashboard-quick-stat-item">
              <div className="dashboard-quick-stat-label">Avg Order Value</div>
              <div className="dashboard-quick-stat-value">{formatters.currency(stats.totalSales / 4)}</div>
            </div>
            <div className="dashboard-quick-stat-divider"></div>
            <div className="dashboard-quick-stat-item">
              <div className="dashboard-quick-stat-label">Inventory Value</div>
              <div className="dashboard-quick-stat-value">{formatters.currency(125000)}</div>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
