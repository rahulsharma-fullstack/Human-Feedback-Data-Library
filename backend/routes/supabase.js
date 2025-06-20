import express from 'express';
import supabaseService from '../services/supabaseService.js';

const router = express.Router();

// @route   GET /api/supabase/datasets
// @desc    Get all datasets from Supabase (both human_feedback and approved datasets)
// @access  Public
router.get('/datasets', async (req, res) => {
  try {
    const { searchTerm, language, dataFormat, fileType, licensing, source } = req.query;
    
    const filters = {
      searchTerm,
      language,
      dataFormat,
      fileType,
      licensing
    };

    let datasets;
    
    // Allow filtering by source, or get combined by default
    if (source === 'human_feedback') {
      datasets = await supabaseService.getHumanFeedbackDatasets(filters);
    } else if (source === 'datasets') {
      datasets = await supabaseService.getApprovedDatasets(filters);
    } else {
      // Default: get combined datasets from both tables
      datasets = await supabaseService.getCombinedDatasets(filters);
    }
    
    res.json({
      success: true,
      data: {
        datasets,
        total: datasets.length,
        source: 'supabase'
      },
    });
  } catch (error) {
    console.error('Error fetching datasets from Supabase:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch datasets from Supabase',
      error: error.message
    });
  }
});

// @route   GET /api/supabase/pending
// @desc    Get all pending submissions from Supabase
// @access  Public (simplified - no auth)
router.get('/pending', async (req, res) => {
  try {
    const pendingSubmissions = await supabaseService.getPendingSubmissions();
    
    res.json({
      success: true,
      data: {
        submissions: pendingSubmissions,
        total: pendingSubmissions.length,
        source: 'supabase'
      },
    });
  } catch (error) {
    console.error('Error fetching pending submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending submissions',
      error: error.message
    });
  }
});

// @route   POST /api/supabase/submit
// @desc    Submit a new dataset to Supabase (pending approval)
// @access  Public (simplified - no auth)
router.post('/submit', async (req, res) => {
  try {
    const submissionData = {
      ...req.body
      // Remove fields that don't exist in the current database
    };

    const result = await supabaseService.addPendingSubmission(submissionData);
    
    res.status(201).json({
      success: true,
      message: 'Dataset submitted for approval',
      data: result.data,
    });
  } catch (error) {
    console.error('Error submitting dataset:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit dataset',
      error: error.message
    });
  }
});

// @route   POST /api/supabase/approve/:id
// @desc    Approve a pending submission
// @access  Public (simplified - no auth)
router.post('/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await supabaseService.approveSubmission(id);
    
    res.json({
      success: true,
      message: 'Submission approved successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('Error approving submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve submission',
      error: error.message
    });
  }
});

// @route   POST /api/supabase/reject/:id
// @desc    Reject a pending submission
// @access  Public (simplified - no auth)
router.post('/reject/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const result = await supabaseService.rejectSubmission(id, reason);
    
    res.json({
      success: true,
      message: 'Submission rejected',
      data: result.data,
    });
  } catch (error) {
    console.error('Error rejecting submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject submission',
      error: error.message
    });
  }
});

// @route   GET /api/supabase/dataset/:id
// @desc    Get a specific dataset by ID
// @access  Public
router.get('/dataset/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dataset = await supabaseService.getDatasetById(id);
    
    res.json({
      success: true,
      data: dataset,
    });
  } catch (error) {
    console.error('Error fetching dataset:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dataset',
      error: error.message
    });
  }
});

// @route   PUT /api/supabase/dataset/:id
// @desc    Update a dataset (Admin only)
// @access  Private (Admin)
router.put('/dataset/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await supabaseService.updateDataset(id, updateData);
    
    res.json({
      success: true,
      message: 'Dataset updated successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('Error updating dataset:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update dataset',
      error: error.message
    });
  }
});

// @route   DELETE /api/supabase/dataset/:id
// @desc    Delete a dataset (Admin only)
// @access  Private (Admin)
router.delete('/dataset/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await supabaseService.deleteDataset(id);
    
    res.json({
      success: true,
      message: 'Dataset deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting dataset:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete dataset',
      error: error.message
    });
  }
});

// @route   GET /api/supabase/stats
// @desc    Get dataset statistics (Admin only)
// @access  Private (Admin)
router.get('/stats', async (req, res) => {
  try {
    const stats = await supabaseService.getStats();
    
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

// @route   GET /api/supabase/health
// @desc    Check Supabase service health
// @access  Public
router.get('/health', async (req, res) => {
  try {
    const isConnected = await supabaseService.testConnection();
    
    if (isConnected) {
      res.json({
        success: true,
        message: 'Supabase service is operational',
        service: 'supabase'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Supabase service is not available'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Supabase service health check failed',
      error: error.message
    });
  }
});

// @route   GET /api/supabase/test-human-feedback
// @desc    Test human_feedback table connection and structure
// @access  Public (for debugging)
router.get('/test-human-feedback', async (req, res) => {
  try {
    const result = await supabaseService.testHumanFeedbackTable();
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error testing human_feedback table:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to test human_feedback table',
      error: error.message
    });
  }
});

// @route   GET /api/supabase/filter-options
// @desc    Get available filter options from all datasets
// @access  Public
router.get('/filter-options', async (req, res) => {
  try {
    const filterOptions = await supabaseService.getFilterOptions();
    
    res.json({
      success: true,
      data: filterOptions,
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch filter options',
      error: error.message
    });
  }
});

export default router;
