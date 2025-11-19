import React, { useState, useEffect } from 'react';
import PageLayout from '../../layout/PageLayout/PageLayout';
import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import Spinner from '../../common/Spinner/Spinner';
import useMockData from '../../../hooks/useMockData';
import { formatters } from '../../../utils/formatters';
import mockHR from '../../../data/mockHR';

// PUBLIC_INTERFACE
/**
 * HR List module component
 */
const HRList = () => {
  const { data, loading, list } = useMockData('hr', mockHR);
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
      active: 'success',
      inactive: 'error',
      on_leave: 'warning'
    };
    return <Badge variant={variants[status] || 'default'}>{status.replace('_', ' ')}</Badge>;
  };

  const columns = [
    { key: 'employee_name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value) => getStatusBadge(value)
    },
    { 
      key: 'join_date', 
      label: 'Join Date', 
      render: (value) => formatters.date(value)
    }
  ];

  return (
    <PageLayout
      title="Human Resources"
      subtitle="Manage employees, payroll, and HR operations"
      actions={<Button variant="primary">+ Add Employee</Button>}
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <Table columns={columns} data={displayData} emptyMessage="No employees found" />
      )}
    </PageLayout>
  );
};

export default HRList;
