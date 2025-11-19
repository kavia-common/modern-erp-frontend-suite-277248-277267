// PUBLIC_INTERFACE
/**
 * Mock reports data for development and testing
 */

export const mockReports = [
  {
    id: 'rep-001',
    name: 'Monthly Sales Report',
    module: 'sales',
    report_type: 'summary',
    parameters: {
      date_range: 'current_month',
      groupBy: 'customer'
    },
    schedule: null,
    created_at: '2024-01-01T00:00:00Z',
    last_run: '2024-01-24T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'rep-002',
    name: 'Inventory Status Report',
    module: 'inventory',
    report_type: 'detail',
    parameters: {
      includeOutOfStock: true,
      includeLowStock: true
    },
    schedule: '0 9 * * 1',
    created_at: '2024-01-01T00:00:00Z',
    last_run: '2024-01-22T09:00:00Z',
    status: 'completed'
  },
  {
    id: 'rep-003',
    name: 'Financial Summary',
    module: 'accounting',
    report_type: 'analytics',
    parameters: {
      date_range: 'current_quarter',
      includeCharts: true
    },
    schedule: null,
    created_at: '2024-01-01T00:00:00Z',
    last_run: '2024-01-23T14:30:00Z',
    status: 'completed'
  },
  {
    id: 'rep-004',
    name: 'Purchase Orders Report',
    module: 'purchases',
    report_type: 'detail',
    parameters: {
      date_range: 'last_30_days',
      status: 'all'
    },
    schedule: null,
    created_at: '2024-01-05T00:00:00Z',
    last_run: '2024-01-24T11:00:00Z',
    status: 'completed'
  },
  {
    id: 'rep-005',
    name: 'Employee Directory',
    module: 'hr',
    report_type: 'summary',
    parameters: {
      includeSalary: false,
      groupBy: 'department'
    },
    schedule: null,
    created_at: '2024-01-01T00:00:00Z',
    last_run: '2024-01-20T08:00:00Z',
    status: 'completed'
  }
];

export default mockReports;
