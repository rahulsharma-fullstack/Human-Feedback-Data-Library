import api from './api';

export const sheetsService = {
  // Get all approved datasets from Google Sheets
  async getDatasets(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `/sheets/datasets?${queryString}` : '/sheets/datasets';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching datasets from Google Sheets:', error);
      throw error;
    }
  },

  // Get pending submissions (Admin only)
  async getPendingSubmissions() {
    try {
      const response = await api.get('/sheets/pending');
      return response.data;
    } catch (error) {
      console.error('Error fetching pending submissions:', error);
      throw error;
    }
  },

  // Submit a new dataset to Google Sheets
  async submitDataset(datasetData) {
    try {
      const response = await api.post('/sheets/submit', datasetData);
      return response.data;
    } catch (error) {
      console.error('Error submitting dataset to Google Sheets:', error);
      throw error;
    }
  },

  // Approve a pending submission (Admin only)
  async approveSubmission(submissionId, submissionData) {
    try {
      const response = await api.post(`/sheets/approve/${submissionId}`, submissionData);
      return response.data;
    } catch (error) {
      console.error('Error approving submission:', error);
      throw error;
    }
  },

  // Reject a pending submission (Admin only)
  async rejectSubmission(submissionId, reason = '') {
    try {
      const response = await api.post(`/sheets/reject/${submissionId}`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error rejecting submission:', error);
      throw error;
    }
  },

  // Check Google Sheets service health
  async checkHealth() {
    try {
      const response = await api.get('/sheets/health');
      return response.data;
    } catch (error) {
      console.error('Google Sheets service health check failed:', error);
      throw error;
    }
  }
};
