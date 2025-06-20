import React from 'react';
import { FILTER_OPTIONS } from '../../constants';

const FilterPanel = ({ filters, onFilterChange, onResetFilters }) => {
  const handleSelectChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Filter Datasets</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="dateSort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort by Date</label>
          <select
            id="dateSort"
            name="dateSort"
            value={filters.dateSort}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
          <select
            id="language"
            name="language"
            value={filters.language}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {FILTER_OPTIONS.languages.map(lang => <option key={lang} value={lang}>{lang || 'All Languages'}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="dataFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data Format</label>
          <select
            id="dataFormat"
            name="dataFormat"
            value={filters.dataFormat}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {FILTER_OPTIONS.dataFormats.map(format => <option key={format} value={format}>{format || 'All Formats'}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="fileType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Type</label>
          <select
            id="fileType"
            name="fileType"
            value={filters.fileType}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {FILTER_OPTIONS.fileTypes.map(type => <option key={type} value={type}>{type || 'All File Types'}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="licensing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Licensing</label>
          <select
            id="licensing"
            name="licensing"
            value={filters.licensing}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {FILTER_OPTIONS.licenses.map(license => <option key={license} value={license}>{license || 'All Licenses'}</option>)}
          </select>
        </div>
         <div className="flex items-end">
             <button
                onClick={onResetFilters}
                className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition-colors"
              >
                Reset Filters
            </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
