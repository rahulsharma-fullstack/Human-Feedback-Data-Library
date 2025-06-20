# API Configuration for Frontend

## Base URL
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Frontend Integration

### 1. Install HTTP Client
```bash
npm install axios
# or
npm install fetch
```

### 2. Create API Service (src/services/api.js)
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
```

### 3. API Service Functions (src/services/datasetService.js)
```javascript
import api from './api';

export const datasetService = {
  // Get all datasets with filters
  getDatasets: (params = {}) => 
    api.get('/datasets', { params }),

  // Get single dataset
  getDataset: (id) => 
    api.get(`/datasets/${id}`),

  // Submit new dataset
  submitDataset: (data) => 
    api.post('/datasets', data),

  // Update dataset
  updateDataset: (id, data) => 
    api.put(`/datasets/${id}`, data),

  // Delete dataset
  deleteDataset: (id) => 
    api.delete(`/datasets/${id}`),

  // Rate dataset
  rateDataset: (id, rating, comment) => 
    api.post(`/datasets/${id}/rate`, { rating, comment }),

  // Track download
  trackDownload: (id) => 
    api.post(`/datasets/${id}/download`),

  // Get featured datasets
  getFeaturedDatasets: () => 
    api.get('/datasets/featured'),
};
```

### 4. Auth Service (src/services/authService.js)
```javascript
import api from './api';

export const authService = {
  // Register
  register: (userData) => 
    api.post('/auth/register', userData),

  // Login
  login: (credentials) => 
    api.post('/auth/login', credentials),

  // Get current user
  getCurrentUser: () => 
    api.get('/auth/me'),

  // Verify token
  verifyToken: () => 
    api.post('/auth/verify-token'),

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};
```

### 5. User Service (src/services/userService.js)
```javascript
import api from './api';

export const userService = {
  // Get profile
  getProfile: () => 
    api.get('/users/profile'),

  // Update profile
  updateProfile: (data) => 
    api.put('/users/profile', data),

  // Get user datasets
  getUserDatasets: (params = {}) => 
    api.get('/users/datasets', { params }),

  // Get user stats
  getUserStats: () => 
    api.get('/users/stats'),

  // Get public profile
  getPublicProfile: (userId) => 
    api.get(`/users/${userId}/public`),
};
```

## Update Your Frontend

### 1. Replace Mock Data
Replace your `constants.js` MOCK_DATASETS with API calls:

```javascript
// Before (constants.js)
export const MOCK_DATASETS = [...];

// After (use API service)
import { datasetService } from './services/datasetService';

// In your component
const [datasets, setDatasets] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDatasets = async () => {
    try {
      const response = await datasetService.getDatasets();
      setDatasets(response.data.datasets);
    } catch (error) {
      console.error('Error fetching datasets:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchDatasets();
}, []);
```

### 2. Update AuthContext
```javascript
// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.getCurrentUser();
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    setUser(user);
    setIsAuthenticated(true);
    
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. Update Dataset Submission
```javascript
// pages/SubmitDatasetPage.jsx
import { datasetService } from '../services/datasetService';
import { useAuth } from '../contexts/AuthContext';

const SubmitDatasetPage = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please login to submit a dataset');
      return;
    }

    setLoading(true);
    try {
      const response = await datasetService.submitDataset(formData);
      alert('Dataset submitted successfully!');
      // Reset form or redirect
    } catch (error) {
      alert('Error submitting dataset: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
};
```

## Environment Variables for Frontend

Create `.env` in your frontend root:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Human Feedback Data Library
```

Then use in your API service:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

## CORS Configuration

The backend is already configured for CORS with your frontend URLs:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (React default)

If you use a different port, update the `CORS_ORIGINS` in backend `.env`.

## Testing the Connection

1. Start the backend: `npm run dev` (in backend folder)
2. Start the frontend: `npm run dev` (in frontend folder)
3. Check the browser network tab for API calls
4. Test authentication, dataset listing, and submission

## Error Handling

The API returns standardized responses:
```javascript
// Success
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2025-06-19T..."
}

// Error
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ],
  "timestamp": "2025-06-19T..."
}
```
