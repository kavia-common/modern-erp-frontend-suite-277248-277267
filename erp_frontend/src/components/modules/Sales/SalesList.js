import React, { useState, useEffect } from 'react';
import PageLayout from '../../layout/PageLayout/PageLayout';
import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import Spinner from '../../common/Spinner/Spinner';
import Pagination from '../../common/Pagination/Pagination';
import useMockData from '../../../hooks/useMockData';
import useUserRole from '../../../hooks/useUserRole';
import { useNotification } from '../../../contexts/NotificationContext';
import { formatters } from '../../../utils/formatters';
import mockSales from '../../../data/mockSales';

// PUBLIC_INTERFACE
/**
 * Sales List module component
 */
const SalesList = () => {
  const { data, loading, remove, list } = useMockData('sales', mockSales);
  const { canDelete } = useUserRole();
  const { showSuccess, showError } = useNotification();
  
  const [displayData, setDisplayData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    try {
      const result = await list({ page: currentPage, pageSize });
      setDisplayData(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      showError('Failed to load sales data');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      draft: 'default',
      confirmed: 'info',
      shipped: 'warning',
      completed: 'success'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const columns = [
    { key: 'order_number', label: 'Order #', sortable: true },
    { key: 'customer_name', label: 'Customer', sortable: true },
    { 
      key: 'order_date', 
      label: 'Order Date', 
      sortable: true,
      render: (value) => formatters.date(value)
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value) => getStatusBadge(value)
    },
    { 
      key: 'total', 
      label: 'Total', 
      sortable: true,
      render: (value) => formatters.currency(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="table-actions">
          <Button size="sm" variant="tertiary">View</Button>
          <Button 
            size="sm" 
            variant="danger" 
            onClick={() => handleDelete(row.id)}
            disabled={!canDelete()}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        await remove(id);
        showSuccess('Sale deleted successfully');
        loadData();
      } catch (error) {
        showError('Failed to delete sale');
      }
    }
  };

  return (
    <PageLayout
      title="Sales Management"
      subtitle="Track and manage your sales orders and customer transactions"
      actions={
        <Button variant="primary">+ New Sale</Button>
      }
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            data={displayData}
            selectable={canDelete()}
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            emptyMessage="No sales found"
          />
          
          {totalPages > 1 && (
            <div style={{ marginTop: 'var(--spacing-6)' }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </PageLayout>
  );
};

export default SalesList;
