import express from 'express';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Dataset from '../models/Dataset.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateMongoId } from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'submittedDatasets',
        select: 'name status createdAt downloads views',
        options: { sort: { createdAt: -1 } }
      });

    res.json({
      success: true,
      data: {
        user: user.toSafeObject(),
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting profile',
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user's profile
// @access  Private
router.put('/profile', authenticate, async (req, res) => {
  try {
    const allowedUpdates = [
      'firstName',
      'lastName',
      'profile.organization',
      'profile.bio',
      'profile.website',
      'profile.researchInterests',
      'preferences.emailNotifications',
      'preferences.datasetUpdates',
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('submittedDatasets', 'name status createdAt');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user.toSafeObject(),
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile',
    });
  }
});

// @route   GET /api/users/datasets
// @desc    Get current user's submitted datasets
// @access  Private
router.get('/datasets', authenticate, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { submittedBy: req.user._id };
    if (status && ['pending', 'approved', 'rejected', 'under_review'].includes(status)) {
      query.status = status;
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const datasets = await Dataset.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate('reviewedBy', 'username firstName lastName')
      .lean();

    const totalDatasets = await Dataset.countDocuments(query);
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
    console.error('Get user datasets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting datasets',
    });
  }
});

// @route   GET /api/users/:id/public
// @desc    Get public user profile
// @access  Public
router.get('/:id/public', validateMongoId(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await User.findById(req.params.id)
      .select('username firstName lastName profile.organization profile.bio profile.researchInterests createdAt')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get user's approved datasets
    const datasets = await Dataset.find({
      submittedBy: req.params.id,
      status: 'approved',
      isPublic: true,
    })
      .select('name description tags createdAt downloads views')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.json({
      success: true,
      data: {
        user,
        datasets,
      },
    });
  } catch (error) {
    console.error('Get public profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting public profile',
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get current user's statistics
// @access  Private
router.get('/stats', authenticate, async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Dataset.aggregate([
      { $match: { submittedBy: userId } },
      {
        $group: {
          _id: null,
          totalDatasets: { $sum: 1 },
          approvedDatasets: {
            $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
          },
          pendingDatasets: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          totalDownloads: { $sum: '$downloads' },
          totalViews: { $sum: '$views' },
        }
      }
    ]);

    const userStats = stats[0] || {
      totalDatasets: 0,
      approvedDatasets: 0,
      pendingDatasets: 0,
      totalDownloads: 0,
      totalViews: 0,
    };

    res.json({
      success: true,
      data: {
        stats: userStats,
      },
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting statistics',
    });
  }
});

// @route   DELETE /api/users/account
// @desc    Deactivate user account
// @access  Private
router.delete('/account', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Deactivate account instead of deleting
    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'Account deactivated successfully',
    });
  } catch (error) {
    console.error('Deactivate account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deactivating account',
    });
  }
});

export default router;
