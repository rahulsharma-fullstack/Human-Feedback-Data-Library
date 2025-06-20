export const filterOptions = {
  languages: [
    'English',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
    'Russian',
    'Telugu',
    'Turkish',
    'German',
    'Spanish',
    'French',
    'Multiple',
    'Other'
  ],
  
  dataFormats: [
    'accepted/rejected',
    'Scored',
    'Classification',
    'Multiple responses scored',
    'Prompt and response',
    'JSONL',
    'CSV',
    'JSON',
    'Text',
    'XML'
  ],
  
  fileTypes: [
    '.jsonl',
    '.csv',
    '.json',
    '.txt',
    '.zip',
    '.parquet',
    '.xlsx'
  ],
  
  licenses: [
    'CC BY-NC-SA 4.0',
    'Apache 2.0',
    'MIT',
    'GPLv3',
    'CC BY 4.0',
    'Custom (Research Only)',
    'Other'
  ],
  
  roles: [
    'user',
    'admin',
    'moderator'
  ],
  
  statuses: [
    'pending',
    'approved',
    'rejected',
    'under_review'
  ]
};

export const tagOptions = [
  'Accuracy',
  'Alignment',
  'Benchmarking',
  'Bias',
  'Classification',
  'Coding',
  'Comparison',
  'DPO',
  'Dialogue',
  'EcoFriendly',
  'Educational',
  'Evaluation',
  'Expert Feedback',
  'Fairness',
  'Feedback',
  'Finance',
  'Harmless',
  'Helpfulness',
  'Human Feedback',
  'Instruction',
  'Math',
  'Medical',
  'Multimodal',
  'News',
  'NLP',
  'NLG',
  'Preference Learning',
  'Process Supervision',
  'QA',
  'Quantitative Reasoning',
  'Reddit',
  'Reproducibility',
  'RLHF',
  'Safety',
  'Science',
  'Search',
  'Sentiment Analysis',
  'Social Media',
  'Social Reasoning',
  'Structured Tasks',
  'Summarization',
  'Sustainability',
  'Task Prompts',
  'Technical Queries',
  'Text-to-Image',
  'TOOL/instruction',
  'Toxicity',
  'Transparency',
  'Truthfulness',
  'Visual',
  'Visual QA',
  'Writing'
];

export const defaultPagination = {
  page: 1,
  limit: 20,
  maxLimit: 100
};

export const sortOptions = {
  datasets: [
    { value: 'newest', label: 'Newest First', field: 'createdAt', order: -1 },
    { value: 'oldest', label: 'Oldest First', field: 'createdAt', order: 1 },
    { value: 'name', label: 'Name A-Z', field: 'name', order: 1 },
    { value: 'downloads', label: 'Most Downloaded', field: 'downloads', order: -1 },
    { value: 'rating', label: 'Highest Rated', field: 'ratings.rating', order: -1 },
    { value: 'views', label: 'Most Viewed', field: 'views', order: -1 }
  ],
  
  users: [
    { value: 'newest', label: 'Newest First', field: 'createdAt', order: -1 },
    { value: 'oldest', label: 'Oldest First', field: 'createdAt', order: 1 },
    { value: 'username', label: 'Username A-Z', field: 'username', order: 1 },
    { value: 'lastLogin', label: 'Last Login', field: 'lastLogin', order: -1 }
  ]
};

export const httpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

export const errorMessages = {
  VALIDATION_ERROR: 'Validation failed',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  USER_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  ACCOUNT_DEACTIVATED: 'Account is deactivated',
  TOKEN_EXPIRED: 'Token has expired',
  INVALID_TOKEN: 'Invalid token',
  SERVER_ERROR: 'Internal server error',
  DATABASE_ERROR: 'Database operation failed',
  INVALID_ID: 'Invalid ID format',
  PERMISSION_DENIED: 'Permission denied',
  RATE_LIMIT_EXCEEDED: 'Too many requests'
};
