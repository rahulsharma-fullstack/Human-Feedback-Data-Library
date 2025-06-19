import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_DATASETS } from '../constants';
import DatasetCard from '../components/DatasetCard';
import DatasetListItem from '../components/DatasetListItem';
import DatasetModal from '../components/DatasetModal';
import FilterPanel from '../components/FilterPanel';
import { ListIcon } from '../components/icons/ListIcon';
import { GridIcon } from '../components/icons/GridIcon';
import { SearchIcon } from '../components/icons/SearchIcon';

const defaultInitialFilters = {
  searchTerm: '',
  dateSort: 'newest',
  language: '',
  dataFormat: '',
  fileType: '',
  licensing: '',
};

const DatasetsPage = () => {
  const [datasets, setDatasets] = useState(MOCK_DATASETS);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [filters, setFilters] = useState(defaultInitialFilters);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.searchCriteria) {
      const searchCriteria = location.state.searchCriteria;
      setFilters(searchCriteria);
      
      if (searchInputRef.current && searchCriteria.searchTerm) {
        searchInputRef.current.value = searchCriteria.searchTerm;
      }
      
      // Clear the navigation state to prevent reapplying on future navigations
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

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
      searchInputRef.current.value = '';
    }
  }, []);

  const filteredDatasets = useMemo(() => {
    let filtered = [...datasets];

    // Apply search term filter
    if (filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(dataset =>
        dataset.name.toLowerCase().includes(searchLower) ||
        dataset.description.toLowerCase().includes(searchLower) ||
        dataset.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply other filters
    if (filters.language) {
      filtered = filtered.filter(dataset => dataset.language === filters.language);
    }
    if (filters.dataFormat) {
      filtered = filtered.filter(dataset => dataset.dataFormat === filters.dataFormat);
    }
    if (filters.fileType) {
      filtered = filtered.filter(dataset => dataset.fileType === filters.fileType);
    }
    if (filters.licensing) {
      filtered = filtered.filter(dataset => dataset.licensing === filters.licensing);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.datePosted);
      const dateB = new Date(b.datePosted);
      return filters.dateSort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [datasets, filters]);

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
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? 's' : ''}
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
      </div>

      {filteredDatasets.length === 0 ? (
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
          {filteredDatasets.map(dataset => (
            viewMode === 'grid' ? (
              <DatasetCard 
                key={dataset.id} 
                dataset={dataset} 
                onViewDetails={handleViewDetails} 
              />
            ) : (
              <DatasetListItem 
                key={dataset.id} 
                dataset={dataset} 
                onViewDetails={handleViewDetails} 
              />
            )
          ))}
        </div>
      )}

      {selectedDataset && (
        <DatasetModal 
          dataset={selectedDataset} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default DatasetsPage;
