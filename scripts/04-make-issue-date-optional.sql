-- Make issue_date optional in certifications table
ALTER TABLE certifications 
ALTER COLUMN issue_date DROP NOT NULL;

-- Verify the change
-- SELECT column_name, is_nullable FROM information_schema.columns 
-- WHERE table_name = 'certifications' AND column_name = 'issue_date';
