import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    return await api.get('/auth/me');
  },

  // Verify token
  verifyToken: async () => {
    return await api.post('/auth/verify-token');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve({ success: true });
  },
};
