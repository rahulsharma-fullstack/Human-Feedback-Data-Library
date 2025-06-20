import api from './api';

export const bulkImportService = {
  // Validate CSV data before import
  async validateData(datasets) {
    try {
      const response = await api.post('/bulk-import/validate', { datasets });
      return response.data;
    } catch (error) {
      console.error('Error validating bulk import data:', error);
      throw error;
    }
  },

  // Import datasets in bulk
  async importDatasets(datasets, importMode = 'approved') {
    try {
      const response = await api.post('/bulk-import/datasets', { 
        datasets, 
        importMode 
      });
      return response.data;
    } catch (error) {
      console.error('Error importing datasets:', error);
      throw error;
    }
  },

  // Parse CSV data into the format expected by the backend
  parseCsvData(csvData) {
    const datasets = [];
    
    // Skip header row and process each data row
    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i];
      
      // Skip empty rows
      if (!row || row.length < 3) continue;
      
      // Skip rows where essential fields are missing
      if (!row[2] || !row[3]) continue; // Link and Name are required
      
      const dataset = {
        link: row[2]?.trim(),
        name: row[3]?.trim(),
        description: row[4]?.trim() || '',
        tags: row[6] ? row[6].split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        data_format: row[7]?.trim() || '',
        data_size: row[8]?.trim() || '',
        num_rows: row[9] ? parseInt(row[9].replace(/,/g, '')) : null,
        date_posted: row[10] ? this.parseDate(row[10]) : null,
        language: row[11]?.trim() || '',
        file_type: row[12]?.trim() || '',
        licensing: row[13]?.trim() || '',
        originating_platform: this.extractPlatformFromLink(row[2]),
        categories: row[6] ? row[6].split(',').map(tag => tag.trim()).filter(tag => tag) : []
      };
      
      datasets.push(dataset);
    }
    
    return datasets;
  },

  // Helper function to parse various date formats
  parseDate(dateString) {
    if (!dateString) return null;
    
    try {
      // Handle DD/MM/YYYY format
      if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          // Assuming DD/MM/YYYY format
          const day = parseInt(parts[0]);
          const month = parseInt(parts[1]) - 1; // JavaScript months are 0-indexed
          const year = parseInt(parts[2]);
          return new Date(year, month, day).toISOString().split('T')[0];
        }
      }
      
      // Handle other formats
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch (error) {
      console.warn('Could not parse date:', dateString);
    }
    
    return null;
  },

  // Extract platform name from URL
  extractPlatformFromLink(url) {
    if (!url) return '';
    
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      
      if (hostname.includes('huggingface.co')) return 'Hugging Face';
      if (hostname.includes('kaggle.com')) return 'Kaggle';
      if (hostname.includes('github.com')) return 'GitHub';
      if (hostname.includes('openai')) return 'OpenAI';
      if (hostname.includes('google')) return 'Google';
      if (hostname.includes('stanford')) return 'Stanford';
      if (hostname.includes('databricks')) return 'Databricks';
      if (hostname.includes('anthropic')) return 'Anthropic';
      if (hostname.includes('nvidia')) return 'NVIDIA';
      
      // Extract main domain name as fallback
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        return parts[parts.length - 2].charAt(0).toUpperCase() + parts[parts.length - 2].slice(1);
      }
      
      return hostname;
    } catch (error) {
      return '';
    }
  },

  // Convert CSV text to array format
  csvToArray(csvText) {
    const lines = csvText.split('\n');
    const result = [];
    
    for (let line of lines) {
      if (line.trim()) {
        // Simple CSV parsing - handle quoted fields
        const row = this.parseCSVLine(line);
        result.push(row);
      }
    }
    
    return result;
  },

  // Parse a single CSV line handling quotes and commas
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }
};
