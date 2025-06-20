import { validationResult } from 'express-validator';
import { defaultPagination } from './constants.js';

/**
 * Check validation results and return formatted errors
 */
export const checkValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return {
      hasErrors: true,
      errors: errors.array(),
      message: 'Validation failed'
    };
  }
  return { hasErrors: false };
};

/**
 * Create standardized API response
 */
export const createResponse = (success, message, data = null, errors = null) => {
  const response = {
    success,
    message,
    timestamp: new Date().toISOString()
  };

  if (data) response.data = data;
  if (errors) response.errors = errors;

  return response;
};

/**
 * Create pagination metadata
 */
export const createPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null
  };
};

/**
 * Parse and validate pagination parameters
 */
export const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || defaultPagination.page);
  const limit = Math.min(
    defaultPagination.maxLimit,
    Math.max(1, parseInt(query.limit) || defaultPagination.limit)
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Parse search query and build MongoDB search criteria
 */
export const buildSearchCriteria = (query, baseQuery = {}) => {
  const searchCriteria = { ...baseQuery };

  // Text search
  if (query.searchTerm && query.searchTerm.trim()) {
    searchCriteria.$text = { $search: query.searchTerm.trim() };
  }

  // Exact field matches
  const exactFields = ['language', 'dataFormat', 'fileType', 'licensing', 'status', 'role'];
  exactFields.forEach(field => {
    if (query[field] && query[field] !== '') {
      searchCriteria[field] = query[field];
    }
  });

  // Array field matches
  if (query.tags && Array.isArray(query.tags) && query.tags.length > 0) {
    searchCriteria.tags = { $in: query.tags };
  }

  // Boolean field matches
  if (typeof query.isPublic === 'boolean') {
    searchCriteria.isPublic = query.isPublic;
  }
  if (typeof query.isFeatured === 'boolean') {
    searchCriteria.isFeatured = query.isFeatured;
  }
  if (typeof query.isActive === 'boolean') {
    searchCriteria.isActive = query.isActive;
  }

  // Date range filters
  if (query.dateFrom || query.dateTo) {
    searchCriteria.createdAt = {};
    if (query.dateFrom) {
      searchCriteria.createdAt.$gte = new Date(query.dateFrom);
    }
    if (query.dateTo) {
      searchCriteria.createdAt.$lte = new Date(query.dateTo);
    }
  }

  return searchCriteria;
};

/**
 * Parse sort parameters and return MongoDB sort object
 */
export const parseSort = (sortBy, validSortOptions) => {
  if (!sortBy || !validSortOptions) {
    return { createdAt: -1 }; // Default sort
  }

  const sortOption = validSortOptions.find(option => option.value === sortBy);
  if (!sortOption) {
    return { createdAt: -1 }; // Default sort
  }

  return { [sortOption.field]: sortOption.order };
};

/**
 * Sanitize user input by removing sensitive fields
 */
export const sanitizeUserData = (userData, allowedFields) => {
  const sanitized = {};
  allowedFields.forEach(field => {
    if (userData.hasOwnProperty(field)) {
      sanitized[field] = userData[field];
    }
  });
  return sanitized;
};

/**
 * Generate random string for testing purposes
 */
export const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Clean and normalize tags
 */
export const normalizeTags = (tags) => {
  if (!Array.isArray(tags)) return [];
  
  return tags
    .map(tag => tag.toString().trim().toLowerCase())
    .filter(tag => tag.length > 0)
    .filter((tag, index, arr) => arr.indexOf(tag) === index) // Remove duplicates
    .slice(0, 20); // Limit to 20 tags
};

/**
 * Calculate average rating from ratings array
 */
export const calculateAverageRating = (ratings) => {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0;
  }
  
  const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10; // Round to 1 decimal place
};

/**
 * Get time ago string
 */
export const getTimeAgo = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  const diffInDay = Math.floor(diffInHour / 24);
  const diffInMonth = Math.floor(diffInDay / 30);
  const diffInYear = Math.floor(diffInMonth / 12);

  if (diffInYear > 0) return `${diffInYear} year${diffInYear > 1 ? 's' : ''} ago`;
  if (diffInMonth > 0) return `${diffInMonth} month${diffInMonth > 1 ? 's' : ''} ago`;
  if (diffInDay > 0) return `${diffInDay} day${diffInDay > 1 ? 's' : ''} ago`;
  if (diffInHour > 0) return `${diffInHour} hour${diffInHour > 1 ? 's' : ''} ago`;
  if (diffInMin > 0) return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
  return 'Just now';
};

/**
 * Async error handler wrapper
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
