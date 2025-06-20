import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')) {
  console.warn('⚠️ Supabase credentials not configured properly. Some features may not work.');
}

class SupabaseService {
  constructor() {
    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder') && !supabaseKey.includes('placeholder')) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.initialized = true;
    } else {
      this.supabase = null;
      this.initialized = false;
      console.warn('⚠️ Supabase client not initialized - check environment variables');
    }
  }
  // Test connection to Supabase
  async testConnection() {
    if (!this.initialized || !this.supabase) {
      console.warn('⚠️ Supabase not initialized - check environment variables');
      return false;
    }
    
    try {
      const { data, error } = await this.supabase.from('datasets').select('count').limit(1);
      if (error) throw error;
      console.log('✅ Supabase connection successful');
      return true;
    } catch (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }
  }

  // Test connection and list available tables (for debugging)
  async testHumanFeedbackTable() {
    try {
      // Try to get just one row to test the connection
      const { data, error, count } = await this.supabase
        .from('human_feedback')
        .select('*', { count: 'exact' })
        .limit(1);

      if (error) {
        console.error('❌ Error accessing human_feedback table:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ Successfully connected to human_feedback table. Total rows: ${count}`);
      console.log('📊 Sample data:', data[0] || 'No data found');
      
      if (data[0]) {
        console.log('🔑 Available columns:', Object.keys(data[0]));
      }

      return { 
        success: true, 
        totalRows: count, 
        sampleData: data[0],
        columns: data[0] ? Object.keys(data[0]) : []
      };
    } catch (error) {
      console.error('❌ Error testing human_feedback table:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all approved datasets
  async getApprovedDatasets(filters = {}) {
    try {
      let query = this.supabase
        .from('datasets')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.searchTerm) {
        query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,tags.ilike.%${filters.searchTerm}%`);
      }
      
      if (filters.language) {
        query = query.eq('language', filters.language);
      }
      
      if (filters.dataFormat) {
        query = query.eq('data_format', filters.dataFormat);
      }
      
      if (filters.fileType) {
        query = query.eq('file_type', filters.fileType);
      }
      
      if (filters.licensing) {
        query = query.eq('licensing', filters.licensing);
      }      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to ensure consistent format
      const transformedData = data.map(item => ({
        ...item,
        tags: (() => {
          if (Array.isArray(item.tags)) return item.tags;
          if (typeof item.tags === 'string' && item.tags.trim()) {
            return item.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
          }
          return [];
        })(),
        categories: (() => {
          if (Array.isArray(item.categories)) return item.categories;
          if (typeof item.categories === 'string' && item.categories.trim()) {
            return item.categories.split(',').map(c => c.trim()).filter(c => c.length > 0);
          }
          return [];
        })(),
        source: 'datasets'
      }));
      
      console.log(`📊 Retrieved ${transformedData.length} approved datasets from Supabase`);
      return transformedData;
    } catch (error) {
      console.error('❌ Error retrieving datasets from Supabase:', error);
      throw error;
    }
  }

  // Get pending submissions waiting for approval
  async getPendingSubmissions() {
    try {
      const { data, error } = await this.supabase
        .from('datasets')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      console.log(`⏳ Retrieved ${data.length} pending submissions from Supabase`);
      return data;
    } catch (error) {
      console.error('❌ Error retrieving pending submissions:', error);
      throw error;
    }
  }  // Add a new pending submission
  async addPendingSubmission(submissionData) {
    try {
      // Only include fields that we know exist in the database
      const dataToInsert = {
        name: submissionData.name,
        link: submissionData.link,
        description: submissionData.description,
        tags: submissionData.tags || [],
        data_format: submissionData.data_format,
        data_size: submissionData.data_size,
        num_rows: submissionData.num_rows,
        language: submissionData.language,
        file_type: submissionData.file_type,
        licensing: submissionData.licensing,
        originating_platform: submissionData.originating_platform,
        categories: submissionData.categories || [],
        status: 'pending'
        // created_at, updated_at will be set automatically by the database
      };

      console.log('📝 Inserting data:', dataToInsert);

      const { data, error } = await this.supabase
        .from('datasets')
        .insert([dataToInsert])
        .select();

      if (error) throw error;

      console.log('✅ Added new pending submission to Supabase');
      return { success: true, data: data[0], message: 'Submission added to pending approval' };
    } catch (error) {
      console.error('❌ Error adding pending submission:', error);
      throw error;
    }
  }
  // Approve a submission
  async approveSubmission(submissionId) {
    try {
      const { data, error } = await this.supabase
        .from('datasets')
        .update({ 
          status: 'approved'
          // updated_at will be set automatically by the trigger
        })
        .eq('id', submissionId)
        .select();

      if (error) throw error;

      console.log('✅ Submission approved in Supabase');
      return { success: true, data: data[0], message: 'Submission approved successfully' };
    } catch (error) {
      console.error('❌ Error approving submission:', error);
      throw error;
    }
  }
  // Reject a submission
  async rejectSubmission(submissionId, reason = '') {
    try {
      const { data, error } = await this.supabase
        .from('datasets')
        .update({ 
          status: 'rejected',
          rejection_reason: reason
          // updated_at will be set automatically by the trigger
        })
        .eq('id', submissionId)
        .select();

      if (error) throw error;

      console.log(`❌ Submission ${submissionId} rejected in Supabase`);
      return { success: true, data: data[0], message: 'Submission rejected' };
    } catch (error) {
      console.error('❌ Error rejecting submission:', error);
      throw error;
    }
  }

  // Get a specific dataset by ID
  async getDatasetById(id) {
    try {
      const { data, error } = await this.supabase
        .from('datasets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('❌ Error retrieving dataset by ID:', error);
      throw error;
    }
  }

  // Update a dataset
  async updateDataset(id, updateData) {
    try {
      const { data, error } = await this.supabase
        .from('datasets')
        .update(updateData)
        .eq('id', id)
        .select();

      if (error) throw error;

      console.log(`✅ Dataset ${id} updated in Supabase`);
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('❌ Error updating dataset:', error);
      throw error;
    }
  }

  // Delete a dataset
  async deleteDataset(id) {
    try {
      const { error } = await this.supabase
        .from('datasets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log(`🗑️ Dataset ${id} deleted from Supabase`);
      return { success: true, message: 'Dataset deleted successfully' };
    } catch (error) {
      console.error('❌ Error deleting dataset:', error);
      throw error;
    }
  }

  // Get statistics
  async getStats() {
    try {
      const [approvedCount, pendingCount, rejectedCount] = await Promise.all([
        this.supabase.from('datasets').select('count').eq('status', 'approved'),
        this.supabase.from('datasets').select('count').eq('status', 'pending'),
        this.supabase.from('datasets').select('count').eq('status', 'rejected')
      ]);

      return {
        approved: approvedCount.count || 0,
        pending: pendingCount.count || 0,
        rejected: rejectedCount.count || 0,
        total: (approvedCount.count || 0) + (pendingCount.count || 0) + (rejectedCount.count || 0)
      };
    } catch (error) {
      console.error('❌ Error getting statistics:', error);      return { approved: 0, pending: 0, rejected: 0, total: 0 };
    }
  }  // Get all datasets from human_feedback table
  async getHumanFeedbackDatasets(filters = {}) {
    try {
      let query = this.supabase
        .from('human_feedback')
        .select('*');

      // Apply filters based on the actual column names from your updated table
      if (filters.searchTerm) {
        query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,tags.ilike.%${filters.searchTerm}%`);
      }
      
      if (filters.language) {
        query = query.eq('language', filters.language);
      }
      
      if (filters.dataFormat) {
        query = query.eq('data_format', filters.dataFormat);
      }
      
      if (filters.fileType) {
        query = query.eq('file_type', filters.fileType);
      }
      
      if (filters.licensing) {
        query = query.eq('licensing', filters.licensing);
      }

      const { data, error } = await query;
      
      if (error) throw error;
        // Transform the data to match the expected format for the frontend
      const transformedData = data.map(item => ({
        id: item.id,
        name: item.name || '',
        link: item.link || '',
        description: item.description || '',
        tags: (() => {
          if (Array.isArray(item.tags)) return item.tags;
          if (typeof item.tags === 'string' && item.tags.trim()) {
            return item.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
          }
          return [];
        })(),
        data_format: item.data_format || '',
        data_size: item.data_size || '',
        num_rows: item.num_rows || 0,
        language: item.language || '',
        file_type: item.file_type || '',
        licensing: item.licensing || '',
        originating_platform: item.originating_platform || '',
        categories: (() => {
          if (Array.isArray(item.categories)) return item.categories;
          if (typeof item.categories === 'string' && item.categories.trim()) {
            return item.categories.split(',').map(c => c.trim()).filter(c => c.length > 0);
          }
          return [];
        })(),
        date_posted: item.date_posted || new Date(),
        created_at: item.date_posted || new Date(),
        status: 'approved', // All data from human_feedback is considered approved
        source: 'human_feedback'
      }));
      
      console.log(`📊 Retrieved ${transformedData.length} datasets from human_feedback table`);
      return transformedData;
    } catch (error) {
      console.error('❌ Error retrieving datasets from human_feedback table:', error);
      throw error;
    }
  }

  // Get combined datasets from both tables
  async getCombinedDatasets(filters = {}) {
    try {
      // Get approved datasets from datasets table
      const approvedDatasets = await this.getApprovedDatasets(filters);
      
      // Get datasets from human_feedback table
      const humanFeedbackDatasets = await this.getHumanFeedbackDatasets(filters);
        // Combine and return both datasets
      const combinedDatasets = [
        ...humanFeedbackDatasets,
        ...approvedDatasets
      ];

      // Sort by created_at (newest first)
      combinedDatasets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      console.log(`📊 Retrieved ${combinedDatasets.length} total datasets (${humanFeedbackDatasets.length} from human_feedback, ${approvedDatasets.length} from datasets)`);
      return combinedDatasets;
    } catch (error) {
      console.error('❌ Error retrieving combined datasets:', error);
      throw error;
    }
  }

  // Get single dataset by ID from either table
  async getDatasetById(id, source = null) {
    try {
      let dataset = null;
      
      if (source === 'human_feedback') {
        // Only check human_feedback table
        const { data, error } = await this.supabase
          .from('human_feedback')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
        dataset = data ? { ...data, source: 'human_feedback' } : null;
      } else if (source === 'datasets') {
        // Only check datasets table
        const { data, error } = await this.supabase
          .from('datasets')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error && error.code !== 'PGRST116') throw error;
        dataset = data ? { ...data, source: 'datasets' } : null;
      } else {
        // Check both tables (default behavior)        // First try human_feedback table
        const { data: humanFeedbackData, error: humanFeedbackError } = await this.supabase
          .from('human_feedback')
          .select('*')
          .eq('id', id)
          .single();
        
        if (humanFeedbackError && humanFeedbackError.code !== 'PGRST116') {
          throw humanFeedbackError;
        }
        
        if (humanFeedbackData) {
          // Transform human_feedback data to match expected format
          dataset = {
            id: humanFeedbackData.id,
            name: humanFeedbackData.name,
            link: humanFeedbackData.link,
            description: humanFeedbackData.description,
            tags: typeof humanFeedbackData.tags === 'string' ? humanFeedbackData.tags.split(',').map(t => t.trim()) : (humanFeedbackData.tags || []),
            data_format: humanFeedbackData.data_format,
            data_size: humanFeedbackData.data_size,
            num_rows: humanFeedbackData.num_rows,
            language: humanFeedbackData.language,
            file_type: humanFeedbackData.file_type,
            licensing: humanFeedbackData.licensing,
            originating_platform: humanFeedbackData.originating_platform,
            categories: Array.isArray(humanFeedbackData.categories) ? humanFeedbackData.categories : 
                       (typeof humanFeedbackData.categories === 'string' ? humanFeedbackData.categories.split(',').map(c => c.trim()) : []),
            date_posted: humanFeedbackData.date_posted,
            created_at: humanFeedbackData.date_posted || new Date(),
            status: 'approved',
            source: 'human_feedback'
          };
        } else {
          // If not found in human_feedback, try datasets table
          const { data: datasetsData, error: datasetsError } = await this.supabase
            .from('datasets')
            .select('*')
            .eq('id', id)
            .single();
          
          if (datasetsError && datasetsError.code !== 'PGRST116') {
            throw datasetsError;
          }
          
          if (datasetsData) {
            dataset = { ...datasetsData, source: 'datasets' };
          }
        }
      }
      
      if (!dataset) {
        throw new Error(`Dataset with ID ${id} not found`);
      }
      
      console.log(`📊 Retrieved dataset ${id} from ${dataset.source} table`);
      return dataset;
    } catch (error) {
      console.error(`❌ Error retrieving dataset ${id}:`, error);
      throw error;
    }
  }
}

export default new SupabaseService();
