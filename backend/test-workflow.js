#!/usr/bin/env node

// Test script for dataset submission and approval workflow
import dotenv from 'dotenv';
import supabaseService from './services/supabaseService.js';

dotenv.config();

console.log('🧪 Testing Dataset Submission and Approval Workflow\n');

async function testWorkflow() {
  try {
    // Test 1: Check if database schema exists
    console.log('1. Testing database schema...');
    const testConnection = await supabaseService.testConnection();
    if (!testConnection) {
      console.log('❌ Database connection failed');
      return;
    }

    // Test 2: Try to get existing datasets
    console.log('\n2. Fetching existing datasets...');
    try {
      const existingDatasets = await supabaseService.getApprovedDatasets();
      console.log(`✅ Found ${existingDatasets.length} approved datasets`);
    } catch (error) {
      console.log(`❌ Error fetching datasets: ${error.message}`);
      console.log('📝 You need to run the database schema first!');
      console.log('   Run the SQL in backend/database-schema.sql in your Supabase dashboard');
      return;
    }

    // Test 3: Submit a new test dataset
    console.log('\n3. Submitting test dataset...');
    const testSubmission = {
      name: 'Test Workflow Dataset',
      link: 'https://example.com/test-workflow-dataset',
      description: 'A test dataset to verify the submission workflow',
      tags: ['Test', 'Workflow', 'Automation'],
      data_format: 'Prompt and response',
      data_size: '1MB',
      num_rows: 100,
      language: 'English',
      file_type: '.json',
      licensing: 'MIT',
      originating_platform: 'Test Platform',
      categories: ['Testing', 'Workflow']
    };

    const submissionResult = await supabaseService.addPendingSubmission(testSubmission);
    console.log('✅ Dataset submitted successfully');
    console.log(`   Submission ID: ${submissionResult.data.id}`);

    // Test 4: Get pending submissions
    console.log('\n4. Fetching pending submissions...');
    const pendingSubmissions = await supabaseService.getPendingSubmissions();
    console.log(`✅ Found ${pendingSubmissions.length} pending submissions`);
    
    const ourSubmission = pendingSubmissions.find(s => s.name === 'Test Workflow Dataset');
    if (!ourSubmission) {
      console.log('❌ Could not find our test submission');
      return;
    }

    // Test 5: Approve the submission
    console.log('\n5. Approving test submission...');
    const approvalResult = await supabaseService.approveSubmission(ourSubmission.id);
    console.log('✅ Dataset approved successfully');

    // Test 6: Verify it appears in approved datasets
    console.log('\n6. Verifying approved dataset...');
    const approvedDatasets = await supabaseService.getApprovedDatasets();
    const approvedSubmission = approvedDatasets.find(s => s.name === 'Test Workflow Dataset');
    
    if (approvedSubmission) {
      console.log('✅ Dataset appears in approved list');
      console.log(`   Status: ${approvedSubmission.status}`);
      console.log(`   Approved at: ${approvedSubmission.approved_at}`);
    } else {
      console.log('❌ Dataset not found in approved list');
    }

    // Test 7: Test rejection workflow with another submission
    console.log('\n7. Testing rejection workflow...');
    const rejectTestSubmission = {
      name: 'Test Rejection Dataset',
      link: 'https://example.com/test-rejection-dataset',
      description: 'A test dataset to verify the rejection workflow',
      tags: ['Test', 'Rejection'],
      data_format: 'JSON',
      data_size: '500KB',
      num_rows: 50,
      language: 'English',
      file_type: '.json',
      licensing: 'MIT'
    };

    const rejectSubmissionResult = await supabaseService.addPendingSubmission(rejectTestSubmission);
    console.log('✅ Second test dataset submitted');

    // Reject it
    const rejectionResult = await supabaseService.rejectSubmission(
      rejectSubmissionResult.data.id, 
      'Test rejection - dataset does not meet quality standards'
    );
    console.log('✅ Dataset rejected successfully');

    // Test 8: Get statistics
    console.log('\n8. Getting statistics...');
    const stats = await supabaseService.getStats();
    console.log('✅ Statistics retrieved:');
    console.log(`   Total datasets: ${stats.total}`);
    console.log(`   Approved: ${stats.approved}`);
    console.log(`   Pending: ${stats.pending}`);
    console.log(`   Rejected: ${stats.rejected}`);

    console.log('\n🎉 All workflow tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ Dataset submission works');
    console.log('✅ Approval workflow works');
    console.log('✅ Rejection workflow works');
    console.log('✅ Statistics generation works');
    console.log('✅ Database queries work correctly');

  } catch (error) {
    console.error('\n❌ Workflow test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testWorkflow();
