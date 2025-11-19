// PUBLIC_INTERFACE
/**
 * Mock purchases data for development and testing
 */

export const mockPurchases = [
  {
    id: 'pur-001',
    order_number: 'PO-2024-001',
    vendor_name: 'Dell Technologies',
    vendor_email: 'sales@dell.com',
    order_date: '2024-01-18T10:00:00Z',
    expected_delivery: '2024-02-01T10:00:00Z',
    status: 'placed',
    items: [
      { name: 'Laptop Computer - Dell XPS 15', quantity: 50, unit_price: 1100.00 }
    ],
    subtotal: 55000.00,
    tax: 4400.00,
    total: 59400.00,
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T14:30:00Z'
  },
  {
    id: 'pur-002',
    order_number: 'PO-2024-002',
    vendor_name: 'Office Supplies Inc',
    vendor_email: 'orders@officesupplies.com',
    order_date: '2024-01-19T11:30:00Z',
    expected_delivery: '2024-01-28T11:30:00Z',
    status: 'received',
    items: [
      { name: 'Office Chair - Ergonomic Executive', quantity: 30, unit_price: 280.00 },
      { name: 'Desk - Standing Adjustable', quantity: 15, unit_price: 480.00 }
    ],
    subtotal: 15600.00,
    tax: 1248.00,
    total: 16848.00,
    created_at: '2024-01-19T11:30:00Z',
    updated_at: '2024-01-28T09:00:00Z'
  },
  {
    id: 'pur-003',
    order_number: 'PO-2024-003',
    vendor_name: 'Logitech',
    vendor_email: 'b2b@logitech.com',
    order_date: '2024-01-20T14:00:00Z',
    expected_delivery: '2024-01-30T14:00:00Z',
    status: 'draft',
    items: [
      { name: 'Wireless Mouse - Logitech MX Master 3', quantity: 100, unit_price: 75.00 }
    ],
    subtotal: 7500.00,
    tax: 600.00,
    total: 8100.00,
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-01-20T14:00:00Z'
  }
];

export default mockPurchases;
