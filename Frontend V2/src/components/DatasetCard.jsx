import React from 'react';

const DatasetCard = ({ dataset, onViewDetails }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between h-full"
      onClick={() => onViewDetails(dataset)}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{dataset.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 h-20 overflow-hidden text-ellipsis">
          {dataset.description}
        </p>        <div className="mb-3">
          {Array.isArray(dataset.tags) && dataset.tags.slice(0, 3).map(tag => (
            <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-1">
              #{tag}
            </span>
          ))}
          {Array.isArray(dataset.tags) && dataset.tags.length > 3 && (
             <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-1">
              +{dataset.tags.length - 3} more
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
          <p><strong className="text-gray-700 dark:text-gray-300">Format:</strong> {dataset.dataFormat}</p>
          <p><strong className="text-gray-700 dark:text-gray-300">Language:</strong> {dataset.language}</p>
          {dataset.numRows && <p><strong className="text-gray-700 dark:text-gray-300">Rows:</strong> {dataset.numRows.toLocaleString()}</p>}
          <p><strong className="text-gray-700 dark:text-gray-300">Size:</strong> {dataset.dataSize}</p>
          <p><strong className="text-gray-700 dark:text-gray-300">License:</strong> {dataset.licensing}</p>
           <p><strong className="text-gray-700 dark:text-gray-300">Posted:</strong> {new Date(dataset.datePosted).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
         <button 
            onClick={(e) => { e.stopPropagation(); onViewDetails(dataset); }}
            className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
          >
            View Details
          </button>
      </div>
    </div>
  );
};

export default DatasetCard;
