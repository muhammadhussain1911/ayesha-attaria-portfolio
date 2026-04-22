-- Create admins table to track admin users
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for admins table
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read admin info
CREATE POLICY "Authenticated users can read admin table"
  ON admins FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create RLS policies for content tables (admins can manage all)

-- Blogs policies
CREATE POLICY "Admins can manage all blogs"
  ON blogs FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT
  USING (published = true OR auth.uid() IN (SELECT id FROM admins));

-- Projects policies
CREATE POLICY "Admins can manage all projects"
  ON projects FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (published = true OR auth.uid() IN (SELECT id FROM admins));

-- Skills policies
CREATE POLICY "Admins can manage all skills"
  ON skills FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read all skills"
  ON skills FOR SELECT
  USING (true);

-- Experience policies
CREATE POLICY "Admins can manage all experience"
  ON experience FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read all experience"
  ON experience FOR SELECT
  USING (true);

-- Certifications policies
CREATE POLICY "Admins can manage all certifications"
  ON certifications FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read all certifications"
  ON certifications FOR SELECT
  USING (true);

-- IMPORTANT: After creating this table, manually insert your admin user:
-- INSERT INTO admins (id, email, role) 
-- VALUES ('YOUR_USER_ID_FROM_SUPABASE_AUTH', 'your-email@example.com', 'admin');
--
-- To find your user ID:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click on your user
-- 3. Copy the ID (UUID format)
-- 4. Run the INSERT statement above with your actual ID and email
