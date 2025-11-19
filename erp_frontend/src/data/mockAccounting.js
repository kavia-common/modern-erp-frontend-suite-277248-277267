// PUBLIC_INTERFACE
/**
 * Mock accounting data for development and testing
 */

export const mockAccounting = [
  {
    id: 'acc-001',
    entry_type: 'credit',
    amount: 15119.78,
    account: 'Revenue - Sales',
    description: 'Sale to Tech Solutions Inc - SO-2024-001',
    transaction_date: '2024-01-20T10:00:00Z',
    reference_number: 'SO-2024-001',
    status: 'completed',
    created_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'acc-002',
    entry_type: 'debit',
    amount: 59400.00,
    account: 'Expenses - Inventory Purchase',
    description: 'Purchase from Dell Technologies - PO-2024-001',
    transaction_date: '2024-01-18T10:00:00Z',
    reference_number: 'PO-2024-001',
    status: 'completed',
    created_at: '2024-01-18T10:00:00Z'
  },
  {
    id: 'acc-003',
    entry_type: 'credit',
    amount: 20519.57,
    account: 'Revenue - Sales',
    description: 'Sale to Global Marketing Ltd - SO-2024-002',
    transaction_date: '2024-01-21T14:30:00Z',
    reference_number: 'SO-2024-002',
    status: 'completed',
    created_at: '2024-01-21T14:30:00Z'
  },
  {
    id: 'acc-004',
    entry_type: 'debit',
    amount: 16848.00,
    account: 'Expenses - Inventory Purchase',
    description: 'Purchase from Office Supplies Inc - PO-2024-002',
    transaction_date: '2024-01-19T11:30:00Z',
    reference_number: 'PO-2024-002',
    status: 'completed',
    created_at: '2024-01-19T11:30:00Z'
  },
  {
    id: 'acc-005',
    entry_type: 'debit',
    amount: 3500.00,
    account: 'Expenses - Office Rent',
    description: 'Monthly office rent payment',
    transaction_date: '2024-01-01T09:00:00Z',
    reference_number: 'RENT-JAN-2024',
    status: 'completed',
    created_at: '2024-01-01T09:00:00Z'
  },
  {
    id: 'acc-006',
    entry_type: 'debit',
    amount: 15000.00,
    account: 'Expenses - Payroll',
    description: 'Employee salaries - January 2024',
    transaction_date: '2024-01-31T10:00:00Z',
    reference_number: 'PAY-JAN-2024',
    status: 'pending',
    created_at: '2024-01-31T10:00:00Z'
  }
];

export default mockAccounting;
