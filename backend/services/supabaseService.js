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
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      console.log(`📊 Retrieved ${data.length} approved datasets from Supabase`);
      return data;
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
  }

  // Add a new pending submission
  async addPendingSubmission(submissionData) {
    try {
      const dataToInsert = {
        ...submissionData,
        status: 'pending',
        created_at: new Date().toISOString(),
        submitted_at: new Date().toISOString()
      };

      // Convert tags array to string if needed
      if (Array.isArray(dataToInsert.tags)) {
        dataToInsert.tags = dataToInsert.tags.join(', ');
      }

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
          status: 'approved',
          approved_at: new Date().toISOString()
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
          rejection_reason: reason,
          rejected_at: new Date().toISOString()
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
      console.error('❌ Error getting statistics:', error);
      return { approved: 0, pending: 0, rejected: 0, total: 0 };
    }
  }
}

export default new SupabaseService();
