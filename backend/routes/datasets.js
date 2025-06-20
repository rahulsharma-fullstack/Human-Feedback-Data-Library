import express from 'express';
import { validationResult } from 'express-validator';
import Dataset from '../models/Dataset.js';
import User from '../models/User.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { 
  validateDatasetSubmission, 
  validateDatasetUpdate, 
  validateSearch,
  validateMongoId,
  validateRating 
} from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/datasets
// @desc    Get all approved datasets with search and filtering
// @access  Public
router.get('/', validateSearch, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      searchTerm = '',
      language = '',
      dataFormat = '',
      fileType = '',
      licensing = '',
      sortBy = 'newest',
      page = 1,
      limit = 20,
      tags,
    } = req.query;

    // Build search query
    const searchQuery = {
      searchTerm: searchTerm.trim(),
      language,
      dataFormat,
      fileType,
      licensing,
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
    };

    // Build sort criteria
    let sortCriteria = { createdAt: -1 }; // default: newest first
    switch (sortBy) {
      case 'oldest':
        sortCriteria = { createdAt: 1 };
        break;
      case 'name':
        sortCriteria = { name: 1 };
        break;
      case 'downloads':
        sortCriteria = { downloads: -1 };
        break;
      case 'rating':
        sortCriteria = { 'ratings.rating': -1 };
        break;
    }

    // Calculate pagination
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Search datasets
    const datasets = await Dataset.search(searchQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limitNumber)
      .lean();

    // Get total count for pagination
    const totalDatasets = await Dataset.countDocuments({
      status: 'approved',
      isPublic: true,
      ...(searchTerm && { $text: { $search: searchTerm } }),
      ...(language && { language }),
      ...(dataFormat && { dataFormat }),
      ...(fileType && { fileType }),
      ...(licensing && { licensing }),
      ...(searchQuery.tags.length > 0 && { tags: { $in: searchQuery.tags } }),
    });

    const totalPages = Math.ceil(totalDatasets / limitNumber);

    res.json({
      success: true,
      data: {
        datasets,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalDatasets,
          hasNext: pageNumber < totalPages,
          hasPrev: pageNumber > 1,
        },
      },
    });
  } catch (error) {
    console.error('Get datasets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting datasets',
    });
  }
});

// @route   GET /api/datasets/featured
// @desc    Get featured datasets
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredDatasets = await Dataset.find({
      status: 'approved',
      isPublic: true,
      isFeatured: true,
    })
      .populate('submittedBy', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    res.json({
      success: true,
      data: {
        datasets: featuredDatasets,
      },
    });
  } catch (error) {
    console.error('Get featured datasets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting featured datasets',
    });
  }
});

// @route   GET /api/datasets/:id
// @desc    Get single dataset by ID
// @access  Public
router.get('/:id', validateMongoId(), optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid dataset ID',
      });
    }

    const dataset = await Dataset.findById(req.params.id)
      .populate('submittedBy', 'username firstName lastName')
      .populate('ratings.user', 'username firstName lastName');

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found',
      });
    }

    // Check if dataset is public or user has permission to view
    if (!dataset.isPublic && dataset.status !== 'approved') {
      if (!req.user || (req.user._id.toString() !== dataset.submittedBy._id.toString() && req.user.role !== 'admin')) {
        return res.status(403).json({
          success: false,
          message: 'Access denied',
        });
      }
    }

    // Increment views (don't wait for completion)
    dataset.incrementViews().catch(console.error);

    res.json({
      success: true,
      data: {
        dataset,
      },
    });
  } catch (error) {
    console.error('Get dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting dataset',
    });
  }
});

// @route   POST /api/datasets
// @desc    Submit a new dataset
// @access  Private
router.post('/', authenticate, validateDatasetSubmission, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const datasetData = {
      ...req.body,
      submittedBy: req.user._id,
      status: 'pending',
    };

    const dataset = new Dataset(datasetData);
    await dataset.save();

    // Add dataset to user's submitted datasets
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { submittedDatasets: dataset._id } }
    );

    const populatedDataset = await Dataset.findById(dataset._id)
      .populate('submittedBy', 'username firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Dataset submitted successfully',
      data: {
        dataset: populatedDataset,
      },
    });
  } catch (error) {
    console.error('Submit dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting dataset',
    });
  }
});

// @route   PUT /api/datasets/:id
// @desc    Update dataset (only by owner or admin)
// @access  Private
router.put('/:id', authenticate, validateDatasetUpdate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found',
      });
    }

    // Check permissions
    if (dataset.submittedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    // Update dataset
    Object.assign(dataset, req.body);
    
    // If status was approved and changed, reset to pending
    if (dataset.status === 'approved' && req.body.name || req.body.description || req.body.link) {
      dataset.status = 'pending';
    }

    await dataset.save();

    const updatedDataset = await Dataset.findById(dataset._id)
      .populate('submittedBy', 'username firstName lastName');

    res.json({
      success: true,
      message: 'Dataset updated successfully',
      data: {
        dataset: updatedDataset,
      },
    });
  } catch (error) {
    console.error('Update dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating dataset',
    });
  }
});

// @route   DELETE /api/datasets/:id
// @desc    Delete dataset (only by owner or admin)
// @access  Private
router.delete('/:id', authenticate, validateMongoId(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid dataset ID',
      });
    }

    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found',
      });
    }

    // Check permissions
    if (dataset.submittedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    await Dataset.findByIdAndDelete(req.params.id);

    // Remove from user's submitted datasets
    await User.findByIdAndUpdate(
      dataset.submittedBy,
      { $pull: { submittedDatasets: dataset._id } }
    );

    res.json({
      success: true,
      message: 'Dataset deleted successfully',
    });
  } catch (error) {
    console.error('Delete dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting dataset',
    });
  }
});

// @route   POST /api/datasets/:id/download
// @desc    Track dataset download
// @access  Public
router.post('/:id/download', validateMongoId(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid dataset ID',
      });
    }

    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found',
      });
    }

    if (dataset.status !== 'approved' || !dataset.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Dataset not available for download',
      });
    }

    // Increment downloads (don't wait for completion)
    dataset.incrementDownloads().catch(console.error);

    res.json({
      success: true,
      message: 'Download tracked successfully',
      data: {
        downloadUrl: dataset.link,
      },
    });
  } catch (error) {
    console.error('Track download error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error tracking download',
    });
  }
});

// @route   POST /api/datasets/:id/rate
// @desc    Rate a dataset
// @access  Private
router.post('/:id/rate', authenticate, validateRating, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { rating, comment } = req.body;
    const dataset = await Dataset.findById(req.params.id);

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found',
      });
    }

    if (dataset.status !== 'approved' || !dataset.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Cannot rate this dataset',
      });
    }

    // Check if user already rated this dataset
    const existingRatingIndex = dataset.ratings.findIndex(
      r => r.user.toString() === req.user._id.toString()
    );

    if (existingRatingIndex > -1) {
      // Update existing rating
      dataset.ratings[existingRatingIndex] = {
        user: req.user._id,
        rating,
        comment: comment || '',
        createdAt: new Date(),
      };
    } else {
      // Add new rating
      dataset.ratings.push({
        user: req.user._id,
        rating,
        comment: comment || '',
      });
    }

    await dataset.save();

    const updatedDataset = await Dataset.findById(dataset._id)
      .populate('ratings.user', 'username firstName lastName');

    res.json({
      success: true,
      message: 'Rating submitted successfully',
      data: {
        dataset: updatedDataset,
      },
    });
  } catch (error) {
    console.error('Rate dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error rating dataset',
    });
  }
});

export default router;
