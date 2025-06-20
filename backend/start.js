#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Human Feedback Data Library Backend...\n');

// Check if MongoDB is running (basic check)
const checkMongoDB = () => {
  return new Promise((resolve) => {
    const mongoCheck = spawn('mongod', ['--version'], { stdio: 'pipe' });
    
    mongoCheck.on('error', () => {
      console.log('⚠️  MongoDB not found in PATH. Make sure MongoDB is installed and running.');
      resolve(false);
    });
    
    mongoCheck.on('close', (code) => {
      if (code === 0) {
        console.log('✅ MongoDB is available');
        resolve(true);
      } else {
        console.log('⚠️  MongoDB check failed');
        resolve(false);
      }
    });
  });
};

// Start the server
const startServer = () => {
  console.log('🔧 Starting Express server...\n');
  
  const serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: process.env.NODE_ENV || 'development'
    }
  });

  serverProcess.on('error', (error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });

  serverProcess.on('close', (code) => {
    console.log(`\n📋 Server process exited with code ${code}`);
    process.exit(code);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    serverProcess.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    serverProcess.kill('SIGTERM');
  });
};

// Main startup sequence
const main = async () => {
  try {
    console.log('🔍 Checking prerequisites...\n');
    
    await checkMongoDB();
    
    console.log('\n📝 Quick Setup Checklist:');
    console.log('   ✓ Copy .env.example to .env and configure');
    console.log('   ✓ Make sure MongoDB is running');
    console.log('   ✓ Run "npm run seed" to populate sample data');
    console.log('   ✓ Frontend should point to http://localhost:5000');
    
    console.log('\n📚 API Documentation:');
    console.log('   Health Check: http://localhost:5000/api/health');
    console.log('   Datasets: http://localhost:5000/api/datasets');
    console.log('   Auth: http://localhost:5000/api/auth');
    
    console.log('\n' + '='.repeat(50));
    
    startServer();
    
  } catch (error) {
    console.error('❌ Startup failed:', error);
    process.exit(1);
  }
};

main();
