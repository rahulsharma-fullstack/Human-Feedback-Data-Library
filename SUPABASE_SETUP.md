# Supabase Setup Guide

This guide explains how to set up and configure Supabase as the data storage solution for the Human Feedback Data Library.

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Node.js**: Ensure you have Node.js installed (v16 or later)
3. **Environment Variables**: Access to modify `.env` files

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `human-feedback-data-library`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (usually 1-2 minutes)

## Step 2: Get Project Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Public anon key** (starts with `eyJ`)

## Step 3: Set Up Database Schema

Run the following SQL in the Supabase SQL Editor (**SQL Editor** → **New query**):

```sql
-- Create datasets table
CREATE TABLE datasets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  link TEXT NOT NULL,
  description TEXT,
  tags TEXT[], -- Array of strings for tags
  data_format VARCHAR(100),
  data_size VARCHAR(50),
  num_rows INTEGER,
  language VARCHAR(50),
  file_type VARCHAR(20),
  licensing VARCHAR(100),
  originating_platform VARCHAR(100),
  categories TEXT[],
  date_posted DATE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by VARCHAR(255)
);

-- Create indexes for better performance
CREATE INDEX idx_datasets_status ON datasets(status);
CREATE INDEX idx_datasets_created_at ON datasets(created_at);
CREATE INDEX idx_datasets_language ON datasets(language);
CREATE INDEX idx_datasets_data_format ON datasets(data_format);

-- Enable Row Level Security (RLS)
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to approved datasets
CREATE POLICY "Public can view approved datasets" ON datasets
  FOR SELECT USING (status = 'approved');

-- Create policies for authenticated users to insert (submit) datasets
CREATE POLICY "Authenticated users can submit datasets" ON datasets
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Admin policies (you'll need to set up admin roles separately)
-- For now, allow all authenticated users to update (for admin functions)
CREATE POLICY "Authenticated users can update datasets" ON datasets
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_datasets_updated_at 
  BEFORE UPDATE ON datasets 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

## Step 4: Configure Backend Environment

1. Navigate to your backend folder:
   ```powershell
   cd c:\Users\domin\Desktop\Projects\human_frontend\backend
   ```

2. Update your `.env` file with Supabase credentials:
   ```env
   # Supabase Integration
   SUPABASE_URL=your_supabase_project_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

3. Replace the placeholder values with your actual Supabase credentials

## Step 5: Test Backend Integration

1. Start the backend server:
   ```powershell
   npm run dev
   ```

2. Check the console output for:
   ```
   ✅ Supabase connection successful
   ```

3. Test the health endpoint:
   ```powershell
   curl http://localhost:5001/api/supabase/health
   ```

   Expected response:
   ```json
   {
     "success": true,
     "message": "Supabase service is healthy",
     "timestamp": "2024-01-01T00:00:00.000Z",
     "connection": "verified"
   }
   ```

## Step 6: Test Dataset Operations

### Submit a Test Dataset
```powershell
curl -X POST http://localhost:5001/api/supabase/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Dataset",
    "link": "https://example.com/dataset",
    "description": "A test dataset for verification",
    "tags": ["Test", "Verification"],
    "dataFormat": "JSON",
    "dataSize": "100MB",
    "numRows": 1000,
    "language": "English",
    "fileType": ".json",
    "licensing": "MIT"
  }'
```

### List Pending Submissions (Admin)
```powershell
curl http://localhost:5001/api/supabase/pending
```

### List Approved Datasets (Public)
```powershell
curl http://localhost:5001/api/supabase/datasets
```

## Step 7: Frontend Integration

The frontend has been updated to use Supabase through the new `supabaseService.js`. You can toggle between data sources in the Datasets page using the "Use Supabase Data" button.

### Available Frontend Methods

```javascript
// Import the service
import { supabaseService } from '../services/supabaseService';

// Get approved datasets
const datasets = await supabaseService.getDatasets({
  searchTerm: 'machine learning',
  language: 'English'
});

// Submit a new dataset
const result = await supabaseService.submitDataset(datasetData);

// Admin: Get pending submissions
const pending = await supabaseService.getPendingSubmissions();

// Admin: Approve a submission
await supabaseService.approveSubmission(submissionId, updatedData);

// Admin: Reject a submission
await supabaseService.rejectSubmission(submissionId, 'Reason for rejection');
```

## Available API Endpoints

### Public Endpoints
- `GET /api/supabase/datasets` - Get approved datasets with filters
- `GET /api/supabase/health` - Check Supabase service health

### Protected Endpoints (Admin)
- `GET /api/supabase/pending` - Get pending submissions
- `POST /api/supabase/submit` - Submit new dataset
- `POST /api/supabase/approve/:id` - Approve submission
- `POST /api/supabase/reject/:id` - Reject submission
- `GET /api/supabase/stats` - Get submission statistics

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Verify your `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
   - Check if your Supabase project is active
   - Ensure there are no trailing spaces in environment variables

2. **Permission Denied**
   - Check Row Level Security policies
   - Verify the user has appropriate permissions
   - For admin operations, ensure proper authentication

3. **Schema Errors**
   - Make sure the database schema has been created
   - Check column names match exactly (case-sensitive)
   - Verify data types are compatible

### Logs and Debugging

- Backend logs will show connection status on startup
- Check browser network tab for API request/response details
- Use Supabase dashboard logs for database-level debugging

## Security Considerations

1. **Row Level Security (RLS)**: Enabled on all tables
2. **API Keys**: Only use anon keys on frontend, never service role keys
3. **Policies**: Restrict access based on user authentication and roles
4. **Environment Variables**: Never commit actual keys to version control

## Migration from Google Sheets

If migrating from Google Sheets:

1. Export your existing data from Google Sheets
2. Transform the data to match the Supabase schema
3. Use the Supabase dashboard to import data
4. Update frontend components to use `supabaseService` instead of `sheetsService`
5. Test all workflows (submit, approve, reject, list)

## Next Steps

1. Set up admin user roles in Supabase Auth
2. Implement more granular permissions
3. Add data validation rules
4. Set up automated backups
5. Configure production environment variables

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
