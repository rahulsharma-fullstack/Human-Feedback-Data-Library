import api from './api';

export const supabaseService = {
  // Get all approved datasets from Supabase
  async getDatasets(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/supabase/datasets?${queryString}` : '/supabase/datasets';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching datasets from Supabase:', error);
      throw error;
    }
  },

  // Get pending submissions (Admin only)
  async getPendingSubmissions() {
    try {
      const response = await api.get('/supabase/pending');
      return response.data;
    } catch (error) {
      console.error('Error fetching pending submissions:', error);
      throw error;
    }
  },

  // Submit a new dataset to Supabase
  async submitDataset(datasetData) {
    try {
      const response = await api.post('/supabase/submit', datasetData);
      return response.data;
    } catch (error) {
      console.error('Error submitting dataset to Supabase:', error);
      throw error;
    }
  },

  // Approve a pending submission (Admin only)
  async approveSubmission(submissionId, submissionData) {
    try {
      const response = await api.post(`/supabase/approve/${submissionId}`, submissionData);
      return response.data;
    } catch (error) {
      console.error('Error approving submission:', error);
      throw error;
    }
  },

  // Reject a pending submission (Admin only)
  async rejectSubmission(submissionId, reason = '') {
    try {
      const response = await api.post(`/supabase/reject/${submissionId}`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error rejecting submission:', error);
      throw error;
    }
  },

  // Get submission statistics (Admin only)
  async getStats() {
    try {
      const response = await api.get('/supabase/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats from Supabase:', error);
      throw error;
    }
  },

  // Check Supabase service health
  async checkHealth() {
    try {
      const response = await api.get('/supabase/health');
      return response.data;
    } catch (error) {
      console.error('Supabase service health check failed:', error);
      throw error;
    }
  }
};
