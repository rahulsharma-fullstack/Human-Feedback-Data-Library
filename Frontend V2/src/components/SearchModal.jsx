import React, { useState, useEffect, useRef } from 'react';
import FilterPanel from './FilterPanel';
import { CloseIcon } from './icons/CloseIcon';
import { SearchIcon } from './icons/SearchIcon';

const SearchModal = ({ isOpen, onClose, onPerformSearch, initialFilters }) => {
  const [currentFilters, setCurrentFilters] = useState(initialFilters);
  const modalContentRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentFilters(initialFilters); 
      // Focus the search input when modal opens
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [isOpen, initialFilters]);

  const handleFilterChange = (key, value) => {
    setCurrentFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFiltersInModal = () => {
    setCurrentFilters(initialFilters);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    onPerformSearch(currentFilters);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div 
        ref={modalContentRef}
        tabIndex={-1} 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="search-modal-title" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
            Search Datasets
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close search modal"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmitSearch}>
          <div className="mb-6 relative">
            <label htmlFor="modalSearchTerm" className="sr-only">Search by name, description, or tags</label>
            <input
              ref={searchInputRef}
              id="modalSearchTerm"
              type="text"
              placeholder="Search by name, description, or tags..."
              className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={currentFilters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              aria-label="Search datasets by name, description, or tags"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          
          <FilterPanel 
            filters={currentFilters} 
            onFilterChange={handleFilterChange} 
            onResetFilters={handleResetFiltersInModal} 
          />
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-semibold rounded-md transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-300 flex items-center"
            >
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
