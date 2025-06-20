import express from 'express';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Dataset from '../models/Dataset.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateMongoId } from '../middleware/validation.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin', 'moderator'));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin/Moderator)
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      totalDatasets,
      pendingDatasets,
      approvedDatasets,
      rejectedDatasets,
      recentUsers,
      recentDatasets,
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Dataset.countDocuments(),
      Dataset.countDocuments({ status: 'pending' }),
      Dataset.countDocuments({ status: 'approved' }),
      Dataset.countDocuments({ status: 'rejected' }),
      User.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('username email firstName lastName createdAt')
        .lean(),
      Dataset.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('submittedBy', 'username firstName lastName')
        .select('name status createdAt submittedBy')
        .lean(),
    ]);

    const stats = {
      users: {
        total: totalUsers,
      },
      datasets: {
        total: totalDatasets,
        pending: pendingDatasets,
        approved: approvedDatasets,
        rejected: rejectedDatasets,
      },
    };

    res.json({
      success: true,
      data: {
        stats,
        recentUsers,
        recentDatasets,
      },
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting dashboard data',
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination and search
// @access  Private (Admin/Moderator)
router.get('/users', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      role = '',
      status = '',
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Build search criteria
    const searchCriteria = {};

    if (search) {
      searchCriteria.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
      ];
    }

    if (role && ['user', 'admin', 'moderator'].includes(role)) {
      searchCriteria.role = role;
    }

    if (status === 'active') {
      searchCriteria.isActive = true;
    } else if (status === 'inactive') {
      searchCriteria.isActive = false;
    }

    const [users, totalUsers] = await Promise.all([
      User.find(searchCriteria)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .populate('submittedDatasets', 'name status')
        .lean(),
      User.countDocuments(searchCriteria),
    ]);

    const totalPages = Math.ceil(totalUsers / limitNumber);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalUsers,
          hasNext: pageNumber < totalPages,
          hasPrev: pageNumber > 1,
        },
      },
    });
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting users',
    });
  }
});

// @route   GET /api/admin/datasets
// @desc    Get all datasets with pagination and filtering
// @access  Private (Admin/Moderator)
router.get('/datasets', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status = '',
      search = '',
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Build search criteria
    const searchCriteria = {};

    if (status && ['pending', 'approved', 'rejected', 'under_review'].includes(status)) {
      searchCriteria.status = status;
    }

    if (search) {
      searchCriteria.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const [datasets, totalDatasets] = await Promise.all([
      Dataset.find(searchCriteria)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .populate('submittedBy', 'username firstName lastName email')
        .populate('reviewedBy', 'username firstName lastName')
        .lean(),
      Dataset.countDocuments(searchCriteria),
    ]);

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
    console.error('Admin get datasets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting datasets',
    });
  }
});

// @route   PUT /api/admin/datasets/:id/review
// @desc    Review a dataset (approve/reject)
// @access  Private (Admin/Moderator)
router.put('/datasets/:id/review', validateMongoId(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid dataset ID',
      });
    }

    const { status, reviewNotes } = req.body;

    if (!['approved', 'rejected', 'under_review'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be approved, rejected, or under_review',
      });
    }

    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found',
      });
    }

    dataset.status = status;
    dataset.reviewNotes = reviewNotes || '';
    dataset.reviewedBy = req.user._id;
    dataset.reviewedAt = new Date();

    await dataset.save();

    const updatedDataset = await Dataset.findById(dataset._id)
      .populate('submittedBy', 'username firstName lastName email')
      .populate('reviewedBy', 'username firstName lastName');

    res.json({
      success: true,
      message: `Dataset ${status} successfully`,
      data: {
        dataset: updatedDataset,
      },
    });
  } catch (error) {
    console.error('Review dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error reviewing dataset',
    });
  }
});

// @route   PUT /api/admin/datasets/:id/featured
// @desc    Toggle featured status of a dataset
// @access  Private (Admin only)
router.put('/datasets/:id/featured', authorize('admin'), validateMongoId(), async (req, res) => {
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

    if (dataset.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Only approved datasets can be featured',
      });
    }

    dataset.isFeatured = !dataset.isFeatured;
    await dataset.save();

    res.json({
      success: true,
      message: `Dataset ${dataset.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: {
        dataset,
      },
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating featured status',
    });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user (role, status, etc.)
// @access  Private (Admin only)
router.put('/users/:id', authorize('admin'), validateMongoId(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const { role, isActive } = req.body;

    const allowedUpdates = {};
    if (role && ['user', 'admin', 'moderator'].includes(role)) {
      allowedUpdates.role = role;
    }
    if (typeof isActive === 'boolean') {
      allowedUpdates.isActive = isActive;
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Admin update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating user',
    });
  }
});

// @route   DELETE /api/admin/datasets/:id
// @desc    Delete a dataset (Admin only)
// @access  Private (Admin only)
router.delete('/datasets/:id', authorize('admin'), validateMongoId(), async (req, res) => {
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
    console.error('Admin delete dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting dataset',
    });
  }
});

export default router;
