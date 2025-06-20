import mongoose from 'mongoose';

const datasetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dataset name is required'],
    trim: true,
    maxlength: [200, 'Dataset name cannot exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  link: {
    type: String,
    required: [true, 'Dataset link is required'],
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  dataFormat: {
    type: String,
    required: [true, 'Data format is required'],
    enum: ['accepted/rejected', 'Scored', 'Classification', 'Multiple responses scored', 'Prompt and response', 'JSONL', 'CSV', 'JSON', 'Text', 'XML'],
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    enum: ['English', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Telugu', 'Turkish', 'German', 'Spanish', 'French', 'Multiple', 'Other'],
  },
  dataSize: {
    type: String,
    required: [true, 'Data size is required'],
    trim: true,
  },
  numRows: {
    type: Number,
    required: [true, 'Number of rows is required'],
    min: [1, 'Number of rows must be at least 1'],
  },
  fileType: {
    type: String,
    required: [true, 'File type is required'],
    enum: ['.jsonl', '.csv', '.json', '.txt', '.zip', '.parquet', '.xlsx'],
  },
  licensing: {
    type: String,
    required: [true, 'Licensing information is required'],
    enum: ['CC BY-NC-SA 4.0', 'Apache 2.0', 'MIT', 'GPLv3', 'CC BY 4.0', 'Custom (Research Only)', 'Other'],
  },
  categories: [{
    type: String,
    trim: true,
  }],
  originatingPlatform: {
    type: String,
    trim: true,
    maxlength: [100, 'Originating platform cannot exceed 100 characters'],
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'pending',
  },
  reviewNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Review notes cannot exceed 1000 characters'],
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewedAt: {
    type: Date,
  },
  downloads: {
    type: Number,
    default: 0,
    min: 0,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isPublic: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  metadata: {
    originalSubmissionDate: {
      type: Date,
      default: Date.now,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    version: {
      type: String,
      default: '1.0.0',
    },
    doi: {
      type: String,
      trim: true,
    },
    citation: {
      type: String,
      trim: true,
      maxlength: [1000, 'Citation cannot exceed 1000 characters'],
    },
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for average rating
datasetSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
});

// Virtual for total ratings count
datasetSchema.virtual('ratingsCount').get(function() {
  return this.ratings.length;
});

// Virtual for date posted (for compatibility with frontend)
datasetSchema.virtual('datePosted').get(function() {
  return this.createdAt;
});

// Index for search functionality
datasetSchema.index({ 
  name: 'text', 
  description: 'text', 
  tags: 'text',
  categories: 'text'
});

// Index for filtering
datasetSchema.index({ status: 1, isPublic: 1 });
datasetSchema.index({ language: 1 });
datasetSchema.index({ dataFormat: 1 });
datasetSchema.index({ fileType: 1 });
datasetSchema.index({ licensing: 1 });
datasetSchema.index({ createdAt: -1 });
datasetSchema.index({ isFeatured: 1 });

// Pre-save middleware to update lastUpdated
datasetSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.metadata.lastUpdated = new Date();
  }
  next();
});

// Static method to find approved datasets
datasetSchema.statics.findApproved = function() {
  return this.find({ 
    status: 'approved', 
    isPublic: true 
  }).populate('submittedBy', 'username firstName lastName');
};

// Static method for advanced search
datasetSchema.statics.search = function(query) {
  const searchCriteria = {
    status: 'approved',
    isPublic: true,
  };

  if (query.searchTerm) {
    searchCriteria.$text = { $search: query.searchTerm };
  }

  if (query.language && query.language !== '') {
    searchCriteria.language = query.language;
  }

  if (query.dataFormat && query.dataFormat !== '') {
    searchCriteria.dataFormat = query.dataFormat;
  }

  if (query.fileType && query.fileType !== '') {
    searchCriteria.fileType = query.fileType;
  }

  if (query.licensing && query.licensing !== '') {
    searchCriteria.licensing = query.licensing;
  }

  if (query.tags && query.tags.length > 0) {
    searchCriteria.tags = { $in: query.tags };
  }

  return this.find(searchCriteria)
    .populate('submittedBy', 'username firstName lastName')
    .sort(query.sortBy || { createdAt: -1 });
};

// Method to increment views
datasetSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to increment downloads
datasetSchema.methods.incrementDownloads = function() {
  this.downloads += 1;
  return this.save();
};

const Dataset = mongoose.model('Dataset', datasetSchema);

export default Dataset;
