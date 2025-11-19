// PUBLIC_INTERFACE
/**
 * Mock inventory data for development and testing
 */

export const mockInventory = [
  {
    id: 'inv-001',
    name: 'Laptop Computer - Dell XPS 15',
    sku: 'LAP-XPS15-001',
    quantity: 45,
    category: 'Electronics',
    supplier_id: 'sup-001',
    supplier_name: 'Dell Technologies',
    unit_price: 1299.99,
    reorder_level: 10,
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T14:30:00Z'
  },
  {
    id: 'inv-002',
    name: 'Office Chair - Ergonomic Executive',
    sku: 'FUR-CHAIR-002',
    quantity: 8,
    category: 'Furniture',
    supplier_id: 'sup-002',
    supplier_name: 'Office Supplies Inc',
    unit_price: 349.99,
    reorder_level: 15,
    status: 'low_stock',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-22T11:15:00Z'
  },
  {
    id: 'inv-003',
    name: 'Wireless Mouse - Logitech MX Master 3',
    sku: 'ACC-MOUSE-003',
    quantity: 120,
    category: 'Accessories',
    supplier_id: 'sup-003',
    supplier_name: 'Logitech',
    unit_price: 99.99,
    reorder_level: 25,
    status: 'active',
    created_at: '2024-01-12T08:30:00Z',
    updated_at: '2024-01-18T16:45:00Z'
  },
  {
    id: 'inv-004',
    name: 'Monitor - 27" 4K UHD',
    sku: 'MON-4K27-004',
    quantity: 32,
    category: 'Electronics',
    supplier_id: 'sup-004',
    supplier_name: 'Samsung Electronics',
    unit_price: 449.99,
    reorder_level: 10,
    status: 'active',
    created_at: '2024-01-14T13:00:00Z',
    updated_at: '2024-01-21T10:00:00Z'
  },
  {
    id: 'inv-005',
    name: 'Desk - Standing Adjustable',
    sku: 'FUR-DESK-005',
    quantity: 5,
    category: 'Furniture',
    supplier_id: 'sup-002',
    supplier_name: 'Office Supplies Inc',
    unit_price: 599.99,
    reorder_level: 8,
    status: 'low_stock',
    created_at: '2024-01-16T11:30:00Z',
    updated_at: '2024-01-23T09:20:00Z'
  }
];

export default mockInventory;
