-- Create CTF Rankings table
CREATE TABLE IF NOT EXISTS public.ctf_rankings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  competition_name TEXT NOT NULL,
  rank INTEGER NOT NULL,
  year INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  image_alt TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create Bug Bounty Programs table
CREATE TABLE IF NOT EXISTS public.bug_bounty_programs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  logo_alt TEXT,
  url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS ctf_rankings_order_index ON public.ctf_rankings(order_index);
CREATE INDEX IF NOT EXISTS bug_bounty_programs_order_index ON public.bug_bounty_programs(order_index);

-- Enable Row Level Security (optional, for security)
ALTER TABLE public.ctf_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bug_bounty_programs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies (allow public read, authenticated write)
-- For CTF Rankings
CREATE POLICY "Allow public read on ctf_rankings" 
  ON public.ctf_rankings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to manage ctf_rankings"
  ON public.ctf_rankings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- For Bug Bounty Programs
CREATE POLICY "Allow public read on bug_bounty_programs"
  ON public.bug_bounty_programs
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to manage bug_bounty_programs"
  ON public.bug_bounty_programs
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
