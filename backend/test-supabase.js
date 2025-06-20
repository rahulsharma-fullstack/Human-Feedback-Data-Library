#!/usr/bin/env node

// Test script to verify Supabase setup
import dotenv from 'dotenv';
import supabaseService from './services/supabaseService.js';

dotenv.config();

console.log('🧪 Testing Supabase Setup...\n');

// Test 1: Check environment variables
console.log('1. Environment Variables:');
console.log(`   SUPABASE_URL: ${process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing'}`);
console.log(`   SUPABASE_ANON_KEY: ${process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}`);

// Test 2: Check service initialization
console.log('\n2. Service Initialization:');
console.log(`   Supabase Service: ${supabaseService.initialized ? '✅ Initialized' : '❌ Not Initialized'}`);

// Test 3: Test connection (if initialized)
console.log('\n3. Connection Test:');
if (supabaseService.initialized) {
  try {
    const isConnected = await supabaseService.testConnection();
    console.log(`   Connection: ${isConnected ? '✅ Success' : '❌ Failed'}`);
  } catch (error) {
    console.log(`   Connection: ❌ Error - ${error.message}`);
  }
} else {
  console.log('   Connection: ⚠️ Skipped (service not initialized)');
}

console.log('\n📋 Setup Summary:');
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && !process.env.SUPABASE_URL.includes('placeholder')) {
  console.log('✅ Supabase is ready to use');
} else {
  console.log('⚠️ Please configure your Supabase credentials in the .env file');
  console.log('   See SUPABASE_SETUP.md for detailed instructions');
}

console.log('\n🚀 To complete setup:');
console.log('1. Create a Supabase project at https://supabase.com');
console.log('2. Update SUPABASE_URL and SUPABASE_ANON_KEY in .env');
console.log('3. Run the database schema from SUPABASE_SETUP.md');
console.log('4. Start the server with: npm run dev');
