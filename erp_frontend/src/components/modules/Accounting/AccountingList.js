import React, { useState, useEffect } from 'react';
import PageLayout from '../../layout/PageLayout/PageLayout';
import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import Spinner from '../../common/Spinner/Spinner';
import useMockData from '../../../hooks/useMockData';
import { formatters } from '../../../utils/formatters';
import mockAccounting from '../../../data/mockAccounting';

// PUBLIC_INTERFACE
/**
 * Accounting List module component
 */
const AccountingList = () => {
  const { data, loading, list } = useMockData('accounting', mockAccounting);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await list({ pageSize: 50 });
    setDisplayData(result.data);
  };

  const columns = [
    { 
      key: 'transaction_date', 
      label: 'Date', 
      sortable: true,
      render: (value) => formatters.date(value)
    },
    { 
      key: 'entry_type', 
      label: 'Type', 
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'credit' ? 'success' : 'warning'}>
          {value}
        </Badge>
      )
    },
    { key: 'account', label: 'Account', sortable: true },
    { key: 'description', label: 'Description' },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value) => formatters.currency(value)
    },
    { key: 'reference_number', label: 'Reference' }
  ];

  return (
    <PageLayout
      title="Accounting"
      subtitle="Manage ledger entries, invoices, and financial transactions"
      actions={<Button variant="primary">+ New Transaction</Button>}
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <Table columns={columns} data={displayData} emptyMessage="No transactions found" />
      )}
    </PageLayout>
  );
};

export default AccountingList;
