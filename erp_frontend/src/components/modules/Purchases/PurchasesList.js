import React, { useState, useEffect } from 'react';
import PageLayout from '../../layout/PageLayout/PageLayout';
import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import Spinner from '../../common/Spinner/Spinner';
import useMockData from '../../../hooks/useMockData';
import { formatters } from '../../../utils/formatters';
import mockPurchases from '../../../data/mockPurchases';

// PUBLIC_INTERFACE
/**
 * Purchases List module component
 */
const PurchasesList = () => {
  const { data, loading, list } = useMockData('purchases', mockPurchases);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await list({ pageSize: 50 });
    setDisplayData(result.data);
  };

  const getStatusBadge = (status) => {
    const variants = {
      draft: 'default',
      placed: 'info',
      received: 'success',
      cancelled: 'error'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const columns = [
    { key: 'order_number', label: 'PO #', sortable: true },
    { key: 'vendor_name', label: 'Vendor', sortable: true },
    { 
      key: 'order_date', 
      label: 'Order Date', 
      render: (value) => formatters.date(value)
    },
    { 
      key: 'expected_delivery', 
      label: 'Expected Delivery', 
      render: (value) => formatters.date(value)
    },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value) => getStatusBadge(value)
    },
    { 
      key: 'total', 
      label: 'Total', 
      render: (value) => formatters.currency(value)
    }
  ];

  return (
    <PageLayout
      title="Purchases Management"
      subtitle="Manage purchase orders and vendor relationships"
      actions={<Button variant="primary">+ New Purchase Order</Button>}
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <Table columns={columns} data={displayData} emptyMessage="No purchases found" />
      )}
    </PageLayout>
  );
};

export default PurchasesList;
