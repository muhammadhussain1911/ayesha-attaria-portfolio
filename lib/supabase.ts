import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for database tables
export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string | null;
  image_alt: string | null;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string | null;
  image_alt: string | null;
  project_url: string | null;
  github_url: string | null;
  technologies: string[];
  severity_found: string | null;
  impact: string | null;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  description: string | null;
  image_url: string | null;
  image_alt: string | null;
  icon_name: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  organization_logo_url: string | null;
  organization_logo_alt: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  type: string;
  location: string | null;
  achievements: string[];
  technologies: string[];
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  badge_image_url: string | null;
  badge_image_alt: string | null;
  description: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}
