import React from 'react';

const DatasetListItem = ({ dataset, onViewDetails }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 cursor-pointer mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
      onClick={() => onViewDetails(dataset)}
    >
      <div className="flex-grow mb-4 sm:mb-0">
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">{dataset.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Posted: {new Date(dataset.datePosted).toLocaleDateString()} | Language: {dataset.language} | Format: {dataset.dataFormat} | Size: {dataset.dataSize} {dataset.numRows ? `| Rows: ${dataset.numRows.toLocaleString()}` : ''}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{dataset.description}</p>
        <div className="mt-2">
          {dataset.tags.slice(0, 3).map(tag => (
            <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 mr-1">
              #{tag}
            </span>
          ))}
          {dataset.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">+{dataset.tags.length - 3} more</span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        <button 
          onClick={(e) => { e.stopPropagation(); onViewDetails(dataset); }}
          className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default DatasetListItem;
