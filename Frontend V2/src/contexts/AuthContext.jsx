import React, { createContext, useContext, useState, useEffect } from 'react';
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
    // For now, simulate authentication without making API calls
    setUser({ id: 1, email: 'admin@example.com', role: 'admin' });
    setIsAuthenticated(true);
    setLoading(false);
  }, []);
  const login = async (credentials) => {
    // Simulate successful login for testing
    setUser({ id: 1, email: 'admin@example.com', role: 'admin' });
    setIsAuthenticated(true);
    return { success: true, data: { user: { id: 1, email: 'admin@example.com', role: 'admin' } } };
  };

  const register = async (userData) => {
    // Simulate successful registration for testing
    setUser({ id: 1, email: userData.email, role: 'user' });
    setIsAuthenticated(true);
    return { success: true, data: { user: { id: 1, email: userData.email, role: 'user' } } };
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
