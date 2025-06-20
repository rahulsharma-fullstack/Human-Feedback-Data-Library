-- Human Feedback Data Library - Supabase Database Schema
-- Run this script in your Supabase SQL Editor to create the required tables

-- Create datasets table
CREATE TABLE IF NOT EXISTS datasets (
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
  date_posted DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  approved_by VARCHAR(255),
  submitted_by VARCHAR(255) DEFAULT 'anonymous',
  submitted_by_id UUID
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_datasets_status ON datasets(status);
CREATE INDEX IF NOT EXISTS idx_datasets_created_at ON datasets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_datasets_language ON datasets(language);
CREATE INDEX IF NOT EXISTS idx_datasets_data_format ON datasets(data_format);
CREATE INDEX IF NOT EXISTS idx_datasets_tags ON datasets USING GIN(tags);

-- Enable Row Level Security (RLS)
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view approved datasets" ON datasets;
DROP POLICY IF EXISTS "Anyone can submit datasets" ON datasets;
DROP POLICY IF EXISTS "Anyone can update datasets" ON datasets;

-- Create policies for public read access to approved datasets
CREATE POLICY "Public can view approved datasets" ON datasets
  FOR SELECT USING (status = 'approved');

-- Create policies for public dataset submission (simplified - no auth required)
CREATE POLICY "Anyone can submit datasets" ON datasets
  FOR INSERT WITH CHECK (true);

-- Create policies for public dataset management (simplified - no auth required)
CREATE POLICY "Anyone can update datasets" ON datasets
  FOR UPDATE USING (true);

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_datasets_updated_at ON datasets;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_datasets_updated_at 
  BEFORE UPDATE ON datasets 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO datasets (
  name, 
  link, 
  description, 
  tags, 
  data_format, 
  data_size, 
  num_rows, 
  language, 
  file_type, 
  licensing, 
  originating_platform, 
  categories,
  status
) VALUES 
(
  'OpenAI WebGPT Comparisons',
  'https://huggingface.co/datasets/openai/webgpt_comparisons',
  'Human preferences over web-browsing AI responses for factual questions',
  ARRAY['RLHF', 'Web Browsing', 'Factual QA', 'Human Feedback'],
  'accepted/rejected',
  '50MB',
  19578,
  'English',
  '.jsonl',
  'MIT',
  'OpenAI',
  ARRAY['Question Answering', 'Web Search'],
  'approved'
),
(
  'Anthropic HH-RLHF Dataset',
  'https://huggingface.co/datasets/Anthropic/hh-rlhf',
  'Human preference dataset for training helpful and harmless AI assistants',
  ARRAY['RLHF', 'Safety', 'Helpfulness', 'Harmlessness'],
  'accepted/rejected',
  '120MB',
  161000,
  'English',
  '.jsonl',
  'MIT',
  'Anthropic',
  ARRAY['AI Safety', 'Dialogue'],
  'approved'
),
(
  'Test Pending Dataset',
  'https://example.com/test-dataset',
  'A test dataset waiting for approval',
  ARRAY['Test', 'Pending'],
  'Prompt and response',
  '10MB',
  1000,
  'English',
  '.json',
  'CC BY 4.0',
  'Test Platform',
  ARRAY['Testing'],
  'pending'
);

-- Verify the setup
SELECT 
  'Tables created successfully' as status,
  COUNT(*) as total_datasets,
  SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_datasets,
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_datasets
FROM datasets;
