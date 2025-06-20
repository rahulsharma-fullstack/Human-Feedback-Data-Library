import express from 'express';
import supabaseService from '../services/supabaseService.js';

const router = express.Router();

// @route   POST /api/bulk-import/datasets
// @desc    Bulk import datasets from spreadsheet data
// @access  Public (should be admin only in production)
router.post('/datasets', async (req, res) => {
  try {
    const { datasets, importMode = 'approved' } = req.body;
    
    if (!Array.isArray(datasets)) {
      return res.status(400).json({
        success: false,
        message: 'Datasets must be an array'
      });
    }

    const results = {
      successful: [],
      failed: [],
      total: datasets.length
    };

    for (const dataset of datasets) {
      try {
        // Validate required fields
        if (!dataset.name || !dataset.link) {
          results.failed.push({
            dataset: dataset.name || 'Unknown',
            error: 'Missing required fields: name and link'
          });
          continue;
        }

        // Prepare dataset for import
        const datasetToImport = {
          name: dataset.name?.trim(),
          link: dataset.link?.trim(),
          description: dataset.description?.trim() || '',
          tags: Array.isArray(dataset.tags) ? dataset.tags : 
                (dataset.tags ? dataset.tags.split(',').map(t => t.trim()) : []),
          data_format: dataset.data_format?.trim() || '',
          data_size: dataset.data_size?.trim() || '',
          num_rows: dataset.num_rows ? parseInt(dataset.num_rows) : null,
          language: dataset.language?.trim() || '',
          file_type: dataset.file_type?.trim() || '',
          licensing: dataset.licensing?.trim() || '',
          originating_platform: dataset.originating_platform?.trim() || '',
          categories: Array.isArray(dataset.categories) ? dataset.categories : 
                     (dataset.categories ? dataset.categories.split(',').map(c => c.trim()) : []),
          status: importMode, // 'approved', 'pending', or 'rejected'
          submitted_by: 'bulk_import',
          submitted_at: new Date(),
          approved_at: importMode === 'approved' ? new Date() : null,
          approved_by: importMode === 'approved' ? 'bulk_import' : null
        };

        // Import the dataset
        let result;
        if (importMode === 'pending') {
          result = await supabaseService.addPendingSubmission(datasetToImport);
        } else {
          result = await supabaseService.addApprovedDataset(datasetToImport);
        }

        results.successful.push({
          name: dataset.name,
          id: result.data?.id,
          status: importMode
        });

      } catch (error) {
        console.error(`Error importing dataset "${dataset.name}":`, error);
        results.failed.push({
          dataset: dataset.name || 'Unknown',
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: `Bulk import completed. ${results.successful.length}/${results.total} datasets imported successfully.`,
      data: results
    });

  } catch (error) {
    console.error('Bulk import error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process bulk import',
      error: error.message
    });
  }
});

// @route   POST /api/bulk-import/validate
// @desc    Validate spreadsheet data before import
// @access  Public (should be admin only in production)
router.post('/validate', async (req, res) => {
  try {
    const { datasets } = req.body;
    
    if (!Array.isArray(datasets)) {
      return res.status(400).json({
        success: false,
        message: 'Datasets must be an array'
      });
    }

    const validation = {
      valid: [],
      invalid: [],
      total: datasets.length,
      warnings: []
    };

    datasets.forEach((dataset, index) => {
      const errors = [];
      const warnings = [];

      // Required field validation
      if (!dataset.name || dataset.name.trim() === '') {
        errors.push('Name is required');
      }
      if (!dataset.link || dataset.link.trim() === '') {
        errors.push('Link is required');
      }

      // URL validation
      if (dataset.link && !isValidUrl(dataset.link)) {
        errors.push('Invalid URL format');
      }

      // Data validation
      if (dataset.num_rows && isNaN(parseInt(dataset.num_rows))) {
        warnings.push('Number of rows is not a valid number');
      }

      if (errors.length > 0) {
        validation.invalid.push({
          index: index + 1,
          name: dataset.name || 'Unknown',
          errors
        });
      } else {
        validation.valid.push({
          index: index + 1,
          name: dataset.name,
          warnings
        });
        validation.warnings.push(...warnings);
      }
    });

    res.json({
      success: true,
      data: validation
    });

  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate data',
      error: error.message
    });
  }
});

// Helper function to validate URLs
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export default router;
