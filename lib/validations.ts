import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  image_url: z.string().url().optional().or(z.literal('')),
  image_alt: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  image_url: z.string().url().optional().or(z.literal('')),
  image_alt: z.string().optional(),
  project_url: z.string().url().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
  severity_found: z.string().optional(),
  impact: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export const skillSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(2, 'Category is required'),
  proficiency: z.number().min(0).max(100).default(80),
  description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  image_alt: z.string().optional(),
  icon_name: z.string().optional(),
  order_index: z.number().default(0),
});

export const experienceSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  organization: z.string().min(2, 'Organization is required'),
  organization_logo_url: z.string().url().optional().or(z.literal('')),
  organization_logo_alt: z.string().optional(),
  description: z.string().optional(),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid start date'),
  end_date: z.string().optional().refine((date) => !date || !isNaN(Date.parse(date)), 'Invalid end date'),
  is_current: z.boolean().default(false),
  type: z.enum(['employment', 'bug-bounty', 'ctf', 'other']),
  location: z.string().optional(),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  order_index: z.number().default(0),
});

export const certificationSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  issuer: z.string().min(2, 'Issuer is required'),
  issue_date: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid issue date'),
  expiry_date: z.string().optional().refine((date) => !date || !isNaN(Date.parse(date)), 'Invalid expiry date'),
  credential_id: z.string().optional(),
  credential_url: z.string().url().optional().or(z.literal('')),
  badge_image_url: z.string().url().optional().or(z.literal('')),
  badge_image_alt: z.string().optional(),
  description: z.string().optional(),
  order_index: z.number().default(0),
});

export const ctfRankingSchema = z.object({
  competition_name: z.string().min(3, 'Competition name is required'),
  rank: z.number().min(1, 'Rank must be positive'),
  year: z.number().min(2000, 'Year must be valid'),
  description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  image_alt: z.string().optional(),
  order_index: z.number().default(0),
});

export const bugBountyProgramSchema = z.object({
  name: z.string().min(2, 'Program name is required'),
  description: z.string().optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  logo_alt: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  order_index: z.number().default(0),
});

export type BlogInput = z.infer<typeof blogSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type CTFRankingInput = z.infer<typeof ctfRankingSchema>;
export type BugBountyProgramInput = z.infer<typeof bugBountyProgramSchema>;
