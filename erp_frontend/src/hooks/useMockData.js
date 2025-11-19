import { useState, useEffect, useCallback } from 'react';

// PUBLIC_INTERFACE
/**
 * Custom hook for managing mock data with CRUD operations
 * Simulates API calls with delays and in-memory storage
 * @param {string} key - Storage key for the data
 * @param {Array} initialData - Initial data array
 * @returns {Object} Data and CRUD operation functions
 */
const useMockData = (key, initialData = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from localStorage or use initial data
  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem(`mock-data-${key}`);
        if (stored) {
          setData(JSON.parse(stored));
        } else {
          setData(initialData);
          localStorage.setItem(`mock-data-${key}`, JSON.stringify(initialData));
        }
      } catch (err) {
        console.error(`Failed to load mock data for ${key}:`, err);
        setData(initialData);
      }
    };
    loadData();
  }, [key, initialData]);

  // Save data to localStorage whenever it changes
  const saveData = useCallback((newData) => {
    try {
      localStorage.setItem(`mock-data-${key}`, JSON.stringify(newData));
      setData(newData);
    } catch (err) {
      console.error(`Failed to save mock data for ${key}:`, err);
      setError(err);
    }
  }, [key]);

  // Simulate API delay
  const simulateDelay = () => {
    return new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
  };

  // CREATE operation
  const create = useCallback(async (item) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      const newItem = {
        ...item,
        id: item.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created_at: item.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      const newData = [...data, newItem];
      saveData(newData);
      setLoading(false);
      return newItem;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [data, saveData]);

  // READ operation (get by ID)
  const read = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      const item = data.find(d => d.id === id);
      setLoading(false);
      return item || null;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [data]);

  // UPDATE operation
  const update = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      const newData = data.map(item => 
        item.id === id 
          ? { ...item, ...updates, updated_at: new Date().toISOString() }
          : item
      );
      saveData(newData);
      setLoading(false);
      return newData.find(item => item.id === id);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [data, saveData]);

  // DELETE operation
  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      const newData = data.filter(item => item.id !== id);
      saveData(newData);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [data, saveData]);

  // LIST operation with filtering and pagination
  const list = useCallback(async (options = {}) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      let result = [...data];

      // Apply filters
      if (options.filter) {
        result = result.filter(options.filter);
      }

      // Apply sorting
      if (options.sortBy) {
        result.sort((a, b) => {
          const aVal = a[options.sortBy];
          const bVal = b[options.sortBy];
          const order = options.sortOrder === 'desc' ? -1 : 1;
          if (aVal < bVal) return -1 * order;
          if (aVal > bVal) return 1 * order;
          return 0;
        });
      }

      // Apply pagination
      const page = options.page || 1;
      const pageSize = options.pageSize || 20;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = result.slice(startIndex, endIndex);

      setLoading(false);
      return {
        data: paginatedResult,
        pagination: {
          page,
          pageSize,
          total: result.length,
          totalPages: Math.ceil(result.length / pageSize),
          hasNext: endIndex < result.length,
          hasPrev: page > 1
        }
      };
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [data]);

  // Bulk operations
  const bulkDelete = useCallback(async (ids) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      const newData = data.filter(item => !ids.includes(item.id));
      saveData(newData);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [data, saveData]);

  return {
    data,
    loading,
    error,
    create,
    read,
    update,
    remove,
    list,
    bulkDelete,
    refresh: () => setData([...data])
  };
};

export default useMockData;
