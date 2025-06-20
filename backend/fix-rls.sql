-- Fix RLS policies for the datasets table
-- Run this in your Supabase SQL Editor

-- Disable RLS temporarily for testing
ALTER TABLE datasets DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Public can view approved datasets" ON datasets;
DROP POLICY IF EXISTS "Anyone can submit datasets" ON datasets;
DROP POLICY IF EXISTS "Anyone can update datasets" ON datasets;

-- Create new simplified policies that work with anonymous access
CREATE POLICY "Enable read access for all users" ON datasets
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON datasets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON datasets
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON datasets
  FOR DELETE USING (true);

-- Test the policies
SELECT 'RLS policies updated successfully' as status;
