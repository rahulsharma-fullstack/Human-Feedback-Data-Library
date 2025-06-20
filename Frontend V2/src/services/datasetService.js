import api from './api';

export const datasetService = {
  // Get all datasets with filters
  getDatasets: async (params = {}) => {
    const response = await api.get('/datasets', { params });
    return response;
  },

  // Get single dataset
  getDataset: async (id) => {
    const response = await api.get(`/datasets/${id}`);
    return response;
  },

  // Submit new dataset
  submitDataset: async (data) => {
    const response = await api.post('/datasets', data);
    return response;
  },

  // Update dataset
  updateDataset: async (id, data) => {
    const response = await api.put(`/datasets/${id}`, data);
    return response;
  },

  // Delete dataset
  deleteDataset: async (id) => {
    const response = await api.delete(`/datasets/${id}`);
    return response;
  },

  // Rate dataset
  rateDataset: async (id, rating, comment = '') => {
    const response = await api.post(`/datasets/${id}/rate`, { rating, comment });
    return response;
  },

  // Track download
  trackDownload: async (id) => {
    const response = await api.post(`/datasets/${id}/download`);
    return response;
  },

  // Get featured datasets
  getFeaturedDatasets: async () => {
    const response = await api.get('/datasets/featured');
    return response;
  },

  // Search datasets (helper function)
  searchDatasets: async (searchCriteria) => {
    const params = {
      searchTerm: searchCriteria.searchTerm || '',
      language: searchCriteria.language || '',
      dataFormat: searchCriteria.dataFormat || '',
      fileType: searchCriteria.fileType || '',
      licensing: searchCriteria.licensing || '',
      dateSort: searchCriteria.dateSort || 'newest',
      page: 1,
      limit: 20,
    };

    return await api.get('/datasets', { params });
  },
};
