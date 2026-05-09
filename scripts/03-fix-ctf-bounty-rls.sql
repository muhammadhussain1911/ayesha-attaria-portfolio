-- Fix RLS policies for CTF Rankings and Bug Bounty Programs tables
-- These policies should match the other admin-managed tables

-- Drop existing policies for CTF Rankings
DROP POLICY IF EXISTS "Allow public read on ctf_rankings" ON public.ctf_rankings;
DROP POLICY IF EXISTS "Allow authenticated users to manage ctf_rankings" ON public.ctf_rankings;

-- Create new RLS policies for CTF Rankings (matching other tables)
CREATE POLICY "Admins can manage all ctf_rankings"
  ON public.ctf_rankings FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read all ctf_rankings"
  ON public.ctf_rankings FOR SELECT
  USING (true);

-- Drop existing policies for Bug Bounty Programs
DROP POLICY IF EXISTS "Allow public read on bug_bounty_programs" ON public.bug_bounty_programs;
DROP POLICY IF EXISTS "Allow authenticated users to manage bug_bounty_programs" ON public.bug_bounty_programs;

-- Create new RLS policies for Bug Bounty Programs (matching other tables)
CREATE POLICY "Admins can manage all bug_bounty_programs"
  ON public.bug_bounty_programs FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read all bug_bounty_programs"
  ON public.bug_bounty_programs FOR SELECT
  USING (true);
