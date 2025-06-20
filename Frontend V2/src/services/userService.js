import api from './api';

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response;
  },

  // Update user profile
  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response;
  },

  // Get user's submitted datasets
  getUserDatasets: async (params = {}) => {
    const response = await api.get('/users/datasets', { params });
    return response;
  },

  // Get user statistics
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response;
  },

  // Get public user profile
  getPublicProfile: async (userId) => {
    const response = await api.get(`/users/${userId}/public`);
    return response;
  },

  // Deactivate account
  deactivateAccount: async () => {
    const response = await api.delete('/users/account');
    return response;
  },
};
