import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { datasetService } from '../src/services/datasetService';
import DatasetCard from '../src/components/DatasetCard';
import DatasetListItem from '../src/components/DatasetListItem';
import DatasetModal from '../src/components/DatasetModal';
import FilterPanel from '../src/components/FilterPanel';
import { ListIcon } from '../src/components/icons/ListIcon';
import { GridIcon } from '../src/components/icons/GridIcon';
import { SearchIcon } from '../src/components/icons/SearchIcon';

const defaultInitialFilters = {
  searchTerm: '',
  dateSort: 'newest',
  language: '',
  dataFormat: '',
  fileType: '',
  licensing: '',
};

const DatasetsPage = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [filters, setFilters] = useState(defaultInitialFilters);  const [pagination, setPagination] = useState(null);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();  // Fetch datasets from API or Supabase
  const fetchDatasets = useCallback(async (searchFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        searchTerm: searchFilters.searchTerm,
        language: searchFilters.language,
        dataFormat: searchFilters.dataFormat,
        fileType: searchFilters.fileType,
        licensing: searchFilters.licensing,
        sortBy: searchFilters.dateSort,
        page: 1,        limit: 20,
      };

      const response = await datasetService.getDatasets(params);
      
      if (response.success) {
        setDatasets(response.data.datasets);
        setPagination(response.data.pagination || { total: response.data.total });
      } else {
        setError('Failed to load datasets from Supabase');
      }
    } catch (err) {
      console.error('Error fetching datasets:', err);
      setError(err.message || 'Failed to load datasets from Supabase');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial data fetch
  useEffect(() => {
    fetchDatasets();
  }, []);

  // Handle search criteria from navigation
  useEffect(() => {
    if (location.state?.searchCriteria) {
      const searchCriteria = location.state.searchCriteria;
      setFilters(searchCriteria);
      
      if (searchInputRef.current && searchCriteria.searchTerm) {
        searchInputRef.current.value = searchCriteria.searchTerm;
      }
      
      // Clear the navigation state to prevent reapplying on future navigations
      navigate(location.pathname, { replace: true, state: {} });
      
      // Fetch data with new criteria
      fetchDatasets(searchCriteria);
    }
  }, [location.state, navigate, location.pathname, fetchDatasets]);

  // Refetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDatasets();
    }, 500); // Debounce API calls

    return () => clearTimeout(timeoutId);
  }, [filters, fetchDatasets]);

  const handleViewDetails = (dataset) => {
    setSelectedDataset(dataset);
  };

  const handleCloseModal = () => {
    setSelectedDataset(null);
  };

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);
  const handleResetFilters = useCallback(() => {
    setFilters(defaultInitialFilters);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Explore Datasets</h1>
      
      <div className="mb-6 relative">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search datasets by name, description, or tags..."
          className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          defaultValue={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          aria-label="Search datasets"
        />
        <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <FilterPanel 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onResetFilters={handleResetFilters} 
      />
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg dark:bg-red-900 dark:border-red-600 dark:text-red-300">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {loading ? 'Loading...' : (
            <>
              Showing {datasets.length} dataset{datasets.length !== 1 ? 's' : ''}
              {pagination && ` (${pagination.totalDatasets} total)`}
            </>
          )}
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label="Grid view"
          >
            <GridIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-300'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label="List view"
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading datasets...</p>
        </div>
      ) : datasets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No datasets found matching your criteria.</p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {datasets.map(dataset => (
            viewMode === 'grid' ? (
              <DatasetCard 
                key={dataset._id || dataset.id} 
                dataset={dataset} 
                onViewDetails={handleViewDetails} 
              />
            ) : (
              <DatasetListItem 
                key={dataset._id || dataset.id} 
                dataset={dataset} 
                onViewDetails={handleViewDetails} 
              />
            )
          ))}
        </div>
      )}

      {selectedDataset && (        <DatasetModal 
          dataset={selectedDataset} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default DatasetsPage;
