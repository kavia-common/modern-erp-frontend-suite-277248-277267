import React, { useState } from 'react';
import './Table.css';

// PUBLIC_INTERFACE
/**
 * Reusable Table component with sorting and selection
 */
const Table = ({
  columns,
  data,
  onSort,
  sortBy,
  sortOrder,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  emptyMessage = 'No data available',
  className = ''
}) => {
  const [localSortBy, setLocalSortBy] = useState(sortBy || '');
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder || 'asc');

  const handleSort = (columnKey) => {
    const newOrder = localSortBy === columnKey && localSortOrder === 'asc' ? 'desc' : 'asc';
    setLocalSortBy(columnKey);
    setLocalSortOrder(newOrder);
    
    if (onSort) {
      onSort(columnKey, newOrder);
    }
  };

  const handleSelectAll = (e) => {
    if (onSelectionChange) {
      if (e.target.checked) {
        onSelectionChange(data.map(row => row.id));
      } else {
        onSelectionChange([]);
      }
    }
  };

  const handleSelectRow = (rowId) => {
    if (onSelectionChange) {
      if (selectedRows.includes(rowId)) {
        onSelectionChange(selectedRows.filter(id => id !== rowId));
      } else {
        onSelectionChange([...selectedRows, rowId]);
      }
    }
  };

  const allSelected = selectable && data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectable && selectedRows.length > 0 && selectedRows.length < data.length;

  return (
    <div className={`table-container ${className}`}>
      <table className="table" role="table">
        <thead className="table-header">
          <tr>
            {selectable && (
              <th className="table-cell table-cell-checkbox" style={{ width: '50px' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => input && (input.indeterminate = someSelected)}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`table-cell ${column.sortable ? 'table-cell-sortable' : ''}`}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="table-cell-content">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <span className="sort-icon">
                      {localSortBy === column.key && (
                        localSortOrder === 'asc' ? '↑' : '↓'
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className={`table-row ${selectedRows.includes(row.id) ? 'table-row-selected' : ''}`}
              >
                {selectable && (
                  <td className="table-cell table-cell-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
