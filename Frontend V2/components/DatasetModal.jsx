import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

const DatasetModal = ({ dataset, onClose }) => {
  if (!dataset) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{dataset.name}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{dataset.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <strong className="block text-gray-800 dark:text-gray-200">Data Format:</strong>
            <p className="text-gray-600 dark:text-gray-400">{dataset.dataFormat}</p>
          </div>
          <div>
            <strong className="block text-gray-800 dark:text-gray-200">Language:</strong>
            <p className="text-gray-600 dark:text-gray-400">{dataset.language}</p>
          </div>
          <div>
            <strong className="block text-gray-800 dark:text-gray-200">File Type:</strong>
            <p className="text-gray-600 dark:text-gray-400">{dataset.fileType}</p>
          </div>
          <div>
            <strong className="block text-gray-800 dark:text-gray-200">Data Size:</strong>
            <p className="text-gray-600 dark:text-gray-400">{dataset.dataSize}</p>
          </div>
          {dataset.numRows && (
            <div>
              <strong className="block text-gray-800 dark:text-gray-200">Number of Rows:</strong>
              <p className="text-gray-600 dark:text-gray-400">{dataset.numRows.toLocaleString()}</p>
            </div>
          )}
          <div>
            <strong className="block text-gray-800 dark:text-gray-200">Date Posted:</strong>
            <p className="text-gray-600 dark:text-gray-400">{new Date(dataset.datePosted).toLocaleDateString()}</p>
          </div>
          <div>
            <strong className="block text-gray-800 dark:text-gray-200">Licensing:</strong>
            <p className="text-gray-600 dark:text-gray-400">{dataset.licensing}</p>
          </div>
        </div>

        <div className="mb-6">
          <strong className="block text-gray-800 dark:text-gray-200 mb-1">Tags:</strong>
          <div className="flex flex-wrap gap-2">
            {dataset.tags.map(tag => (
              <span key={tag} className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <a
            href={dataset.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
          >
            Go to Dataset Source
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-semibold rounded-md transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatasetModal;
