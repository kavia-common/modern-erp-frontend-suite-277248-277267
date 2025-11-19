// PUBLIC_INTERFACE
/**
 * Mock sales data for development and testing
 */

export const mockSales = [
  {
    id: 'sale-001',
    order_number: 'SO-2024-001',
    customer_name: 'Tech Solutions Inc',
    customer_email: 'contact@techsolutions.com',
    order_date: '2024-01-20T10:00:00Z',
    status: 'confirmed',
    items: [
      { id: 'inv-001', name: 'Laptop Computer - Dell XPS 15', quantity: 10, unit_price: 1299.99 },
      { id: 'inv-003', name: 'Wireless Mouse - Logitech MX Master 3', quantity: 10, unit_price: 99.99 }
    ],
    subtotal: 13999.80,
    tax: 1119.98,
    total: 15119.78,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z'
  },
  {
    id: 'sale-002',
    order_number: 'SO-2024-002',
    customer_name: 'Global Marketing Ltd',
    customer_email: 'orders@globalmarketing.com',
    order_date: '2024-01-21T14:30:00Z',
    status: 'shipped',
    items: [
      { id: 'inv-002', name: 'Office Chair - Ergonomic Executive', quantity: 20, unit_price: 349.99 },
      { id: 'inv-005', name: 'Desk - Standing Adjustable', quantity: 20, unit_price: 599.99 }
    ],
    subtotal: 18999.60,
    tax: 1519.97,
    total: 20519.57,
    created_at: '2024-01-21T14:30:00Z',
    updated_at: '2024-01-22T10:15:00Z'
  },
  {
    id: 'sale-003',
    order_number: 'SO-2024-003',
    customer_name: 'Creative Design Studio',
    customer_email: 'info@creativedesign.com',
    order_date: '2024-01-22T09:00:00Z',
    status: 'draft',
    items: [
      { id: 'inv-004', name: 'Monitor - 27" 4K UHD', quantity: 5, unit_price: 449.99 }
    ],
    subtotal: 2249.95,
    tax: 180.00,
    total: 2429.95,
    created_at: '2024-01-22T09:00:00Z',
    updated_at: '2024-01-22T09:00:00Z'
  },
  {
    id: 'sale-004',
    order_number: 'SO-2024-004',
    customer_name: 'Finance Corp',
    customer_email: 'procurement@financecorp.com',
    order_date: '2024-01-23T11:15:00Z',
    status: 'completed',
    items: [
      { id: 'inv-001', name: 'Laptop Computer - Dell XPS 15', quantity: 5, unit_price: 1299.99 },
      { id: 'inv-004', name: 'Monitor - 27" 4K UHD', quantity: 5, unit_price: 449.99 }
    ],
    subtotal: 8749.90,
    tax: 699.99,
    total: 9449.89,
    created_at: '2024-01-23T11:15:00Z',
    updated_at: '2024-01-24T16:00:00Z'
  }
];

export default mockSales;
