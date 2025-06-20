import api from './api';

export const datasetService = {
  // Get all approved datasets with filters
  getDatasets: async (params = {}) => {
    const response = await api.get('/supabase/datasets', { params });
    return response;
  },

  // Get single dataset by ID
  getDataset: async (id) => {
    const response = await api.get(`/supabase/dataset/${id}`);
    return response;
  },

  // Submit new dataset for approval
  submitDataset: async (data) => {
    const response = await api.post('/supabase/submit', data);
    return response;
  },

  // Get pending submissions (admin function)
  getPendingSubmissions: async () => {
    const response = await api.get('/supabase/pending');
    return response;
  },

  // Approve a submission (admin function)
  approveSubmission: async (id, submissionData = {}) => {
    const response = await api.post(`/supabase/approve/${id}`, submissionData);
    return response;
  },

  // Reject a submission (admin function)
  rejectSubmission: async (id, reason = '') => {
    const response = await api.post(`/supabase/reject/${id}`, { reason });
    return response;
  },

  // Update dataset (admin function)
  updateDataset: async (id, data) => {
    const response = await api.put(`/supabase/dataset/${id}`, data);
    return response;
  },

  // Delete dataset (admin function)
  deleteDataset: async (id) => {
    const response = await api.delete(`/supabase/dataset/${id}`);
    return response;
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get('/supabase/stats');
    return response;
  },

  // Check service health
  checkHealth: async () => {
    const response = await api.get('/supabase/health');
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
    };

    return await api.get('/supabase/datasets', { params });
  },
};
