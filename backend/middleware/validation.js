import { body, param, query } from 'express-validator';

// User validation
export const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and cannot exceed 50 characters'),
];

export const validateUserLogin = [
  body('identifier')
    .notEmpty()
    .withMessage('Username or email is required'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Dataset validation
export const validateDatasetSubmission = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Dataset name is required and cannot exceed 200 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('link')
    .isURL()
    .withMessage('Please provide a valid URL'),
  
  body('dataFormat')
    .isIn(['accepted/rejected', 'Scored', 'Classification', 'Multiple responses scored', 'Prompt and response', 'JSONL', 'CSV', 'JSON', 'Text', 'XML'])
    .withMessage('Invalid data format'),
  
  body('language')
    .isIn(['English', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Telugu', 'Turkish', 'German', 'Spanish', 'French', 'Multiple', 'Other'])
    .withMessage('Invalid language'),
  
  body('dataSize')
    .trim()
    .notEmpty()
    .withMessage('Data size is required'),
  
  body('numRows')
    .isInt({ min: 1 })
    .withMessage('Number of rows must be a positive integer'),
  
  body('fileType')
    .isIn(['.jsonl', '.csv', '.json', '.txt', '.zip', '.parquet', '.xlsx'])
    .withMessage('Invalid file type'),
  
  body('licensing')
    .isIn(['CC BY-NC-SA 4.0', 'Apache 2.0', 'MIT', 'GPLv3', 'CC BY 4.0', 'Custom (Research Only)', 'Other'])
    .withMessage('Invalid licensing option'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each tag must be between 1 and 50 characters'),
];

export const validateDatasetUpdate = [
  param('id')
    .isMongoId()
    .withMessage('Invalid dataset ID'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Dataset name cannot exceed 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('link')
    .optional()
    .isURL()
    .withMessage('Please provide a valid URL'),
];

// Search validation
export const validateSearch = [
  query('searchTerm')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search term cannot exceed 100 characters'),
  
  query('language')
    .optional()
    .isIn(['', 'English', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Telugu', 'Turkish', 'German', 'Spanish', 'French', 'Multiple', 'Other'])
    .withMessage('Invalid language filter'),
  
  query('dataFormat')
    .optional()
    .isIn(['', 'accepted/rejected', 'Scored', 'Classification', 'Multiple responses scored', 'Prompt and response', 'JSONL', 'CSV', 'JSON', 'Text', 'XML'])
    .withMessage('Invalid data format filter'),
  
  query('fileType')
    .optional()
    .isIn(['', '.jsonl', '.csv', '.json', '.txt', '.zip', '.parquet', '.xlsx'])
    .withMessage('Invalid file type filter'),
  
  query('licensing')
    .optional()
    .isIn(['', 'CC BY-NC-SA 4.0', 'Apache 2.0', 'MIT', 'GPLv3', 'CC BY 4.0', 'Custom (Research Only)', 'Other'])
    .withMessage('Invalid licensing filter'),
  
  query('sortBy')
    .optional()
    .isIn(['newest', 'oldest', 'name', 'downloads', 'rating'])
    .withMessage('Invalid sort option'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

// ID validation
export const validateMongoId = (paramName = 'id') => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName}`),
];

// Rating validation
export const validateRating = [
  param('id')
    .isMongoId()
    .withMessage('Invalid dataset ID'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters'),
];
