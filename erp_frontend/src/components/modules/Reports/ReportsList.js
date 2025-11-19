import React, { useState, useEffect } from 'react';
import PageLayout from '../../layout/PageLayout/PageLayout';
import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import Spinner from '../../common/Spinner/Spinner';
import useMockData from '../../../hooks/useMockData';
import { formatters } from '../../../utils/formatters';
import mockReports from '../../../data/mockReports';

// PUBLIC_INTERFACE
/**
 * Reports List module component
 */
const ReportsList = () => {
  const { data, loading, list } = useMockData('reports', mockReports);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await list({ pageSize: 50 });
    setDisplayData(result.data);
  };

  const columns = [
    { key: 'name', label: 'Report Name', sortable: true },
    { 
      key: 'module', 
      label: 'Module', 
      sortable: true,
      render: (value) => <Badge variant="primary">{value}</Badge>
    },
    { 
      key: 'report_type', 
      label: 'Type', 
      sortable: true,
      render: (value) => <Badge variant="info">{value}</Badge>
    },
    { 
      key: 'last_run', 
      label: 'Last Run', 
      sortable: true,
      render: (value) => formatters.datetime(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="table-actions">
          <Button size="sm" variant="primary">Generate</Button>
          <Button size="sm" variant="tertiary">Export</Button>
        </div>
      )
    }
  ];

  return (
    <PageLayout
      title="Reports"
      subtitle="Generate and view reports across all modules"
      actions={<Button variant="primary">+ New Report</Button>}
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        <Table columns={columns} data={displayData} emptyMessage="No reports found" />
      )}
    </PageLayout>
  );
};

export default ReportsList;
