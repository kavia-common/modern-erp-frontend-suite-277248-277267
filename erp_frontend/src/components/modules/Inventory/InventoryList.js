import React, { useState, useEffect } from 'react';
import PageLayout from '../../layout/PageLayout/PageLayout';
import Table from '../../common/Table/Table';
import Button from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import Input from '../../common/Input/Input';
import Badge from '../../common/Badge/Badge';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';
import Pagination from '../../common/Pagination/Pagination';
import useMockData from '../../../hooks/useMockData';
import useUserRole from '../../../hooks/useUserRole';
import useFormValidation from '../../../hooks/useFormValidation';
import { useNotification } from '../../../contexts/NotificationContext';
import { validators, validateForm } from '../../../utils/validators';
import { formatters } from '../../../utils/formatters';
import mockInventory from '../../../data/mockInventory';
import './Inventory.css';

// PUBLIC_INTERFACE
/**
 * Inventory List module component
 */
const InventoryList = () => {
  const { data, loading, create, update, remove, bulkDelete, list } = useMockData('inventory', mockInventory);
  const { canCreate, canEdit, canDelete } = useUserRole();
  const { showSuccess, showError } = useNotification();
  
  const [displayData, setDisplayData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Form validation rules
  const validationRules = {
    name: validators.required,
    sku: validators.required,
    quantity: [validators.required, validators.nonNegative],
    category: validators.required,
    unit_price: [validators.required, validators.positive],
    reorder_level: validators.nonNegative
  };

  const initialFormValues = {
    name: '',
    sku: '',
    quantity: 0,
    category: '',
    supplier_name: '',
    unit_price: 0,
    reorder_level: 10
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  } = useFormValidation(initialFormValues, (vals) => validateForm(vals, validationRules));

  // Load data
  useEffect(() => {
    loadData();
  }, [currentPage, searchTerm]);

  const loadData = async () => {
    try {
      const result = await list({
        page: currentPage,
        pageSize,
        filter: searchTerm ? (item) => {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 item.category.toLowerCase().includes(searchTerm.toLowerCase());
        } : null
      });
      setDisplayData(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      showError('Failed to load inventory data');
    }
  };

  const handleCreate = () => {
    if (!canCreate()) {
      showError('You do not have permission to create items');
      return;
    }
    resetForm();
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    if (!canEdit()) {
      showError('You do not have permission to edit items');
      return;
    }
    setEditingItem(item);
    setValues(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!canDelete()) {
      showError('You do not have permission to delete items');
      return;
    }
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await remove(id);
        showSuccess('Item deleted successfully');
        loadData();
      } catch (error) {
        showError('Failed to delete item');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (!canDelete()) {
      showError('You do not have permission to delete items');
      return;
    }
    if (selectedRows.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} items?`)) {
      try {
        await bulkDelete(selectedRows);
        showSuccess(`${selectedRows.length} items deleted successfully`);
        setSelectedRows([]);
        loadData();
      } catch (error) {
        showError('Failed to delete items');
      }
    }
  };

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      if (editingItem) {
        await update(editingItem.id, formValues);
        showSuccess('Item updated successfully');
      } else {
        await create(formValues);
        showSuccess('Item created successfully');
      }
      setIsModalOpen(false);
      resetForm();
      loadData();
    } catch (error) {
      showError('Failed to save item');
    }
  });

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'sku', label: 'SKU', sortable: true },
    { 
      key: 'quantity', 
      label: 'Quantity', 
      sortable: true,
      render: (value, row) => (
        <span>
          {value} {row.quantity <= row.reorder_level && (
            <Badge variant="warning" size="sm">Low</Badge>
          )}
        </span>
      )
    },
    { key: 'category', label: 'Category', sortable: true },
    { 
      key: 'unit_price', 
      label: 'Unit Price', 
      sortable: true,
      render: (value) => formatters.currency(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="table-actions">
          <Button
            size="sm"
            variant="tertiary"
            onClick={() => handleEdit(row)}
            disabled={!canEdit()}
          >
            Edit
          </Button>
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

  return (
    <PageLayout
      title="Inventory Management"
      subtitle="Manage your inventory items, stock levels, and suppliers"
      actions={
        <>
          {selectedRows.length > 0 && (
            <Button
              variant="danger"
              onClick={handleBulkDelete}
              disabled={!canDelete()}
            >
              Delete Selected ({selectedRows.length})
            </Button>
          )}
          <Button variant="primary" onClick={handleCreate} disabled={!canCreate()}>
            + Add Item
          </Button>
        </>
      }
    >
      <div className="inventory-filters">
        <Input
          placeholder="Search by name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="inventory-search"
        />
      </div>

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
            emptyMessage="No inventory items found"
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
        size="md"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form className="inventory-form">
          <Input
            label="Item Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            required
          />
          <Input
            label="SKU"
            name="sku"
            value={values.sku}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.sku}
            required
          />
          <div className="form-row">
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.quantity}
              required
            />
            <Input
              label="Reorder Level"
              name="reorder_level"
              type="number"
              value={values.reorder_level}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.reorder_level}
            />
          </div>
          <Input
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.category}
            required
          />
          <Input
            label="Supplier Name"
            name="supplier_name"
            value={values.supplier_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            label="Unit Price"
            name="unit_price"
            type="number"
            step="0.01"
            value={values.unit_price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.unit_price}
            required
          />
        </form>
      </Modal>
    </PageLayout>
  );
};

export default InventoryList;
