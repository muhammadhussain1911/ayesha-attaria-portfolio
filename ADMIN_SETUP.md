# Admin Panel Setup Guide

## Database Setup

### 1. Create Tables in Supabase

Run the SQL script in your Supabase SQL editor:

```sql
-- From: scripts/01-create-tables.sql
```

Copy and paste the entire contents of `/scripts/01-create-tables.sql` into the Supabase SQL Editor and execute.

This will create:
- `blogs` table - for blog posts with image_url and image_alt fields
- `projects` table - for security projects with featured status
- `skills` table - for technical skills with proficiency levels
- `experience` table - for work experience and bug bounty
- `certifications` table - for certifications with badge images

### 2. Environment Variables

Add these to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from your Supabase project settings.

## Admin Panel Access

Access the admin panel at: `http://localhost:3000/admin`

### Admin Features

1. **Dashboard** (`/admin`)
   - View stats for all content types
   - Quick navigation to management panels

2. **Blogs** (`/admin/blogs`)
   - Create/Edit/Delete blog posts
   - Upload featured images with alt text
   - Add tags and categorize posts
   - Publish/Draft status
   - View count tracking

3. **Projects** (`/admin/projects`)
   - Manage security research projects
   - Upload project images
   - Add technologies used
   - Mark as featured
   - Link to GitHub/project URLs

4. **Skills** (`/admin/skills`)
   - Add technical skills
   - Set proficiency levels (0-100%)
   - Upload skill category images
   - Organize by category

5. **Experience** (`/admin/experience`)
   - Add work experience
   - Track bug bounty hunting
   - CTF competitions
   - Employment history
   - Upload organization logos

6. **Certifications** (`/admin/certifications`)
   - Add certifications and badges
   - Upload badge images
   - Link to credential URLs
   - Track expiry dates

## Data Structure

### Blog Fields
- title: string (required)
- slug: string (unique, required)
- description: string
- content: string (markdown supported)
- image_url: string (base64 or URL)
- image_alt: string (accessibility)
- category: string
- tags: array
- published: boolean
- views: integer (auto-incremented)

### Project Fields
- title: string (required)
- slug: string (unique, required)
- description: string
- content: string
- image_url: string
- image_alt: string
- technologies: array
- severity_found: string
- impact: string
- published: boolean
- featured: boolean

### Skill Fields
- name: string (required)
- category: string (required)
- proficiency: 0-100 (default: 80)
- description: string
- image_url: string
- image_alt: string
- order_index: integer (for sorting)

### Experience Fields
- title: string (required)
- organization: string (required)
- organization_logo_url: string
- organization_logo_alt: string
- start_date: date (required)
- end_date: date (optional, null if current)
- is_current: boolean
- type: enum (employment, bug-bounty, ctf, other)
- achievements: array
- technologies: array

### Certification Fields
- title: string (required)
- issuer: string (required)
- issue_date: date (required)
- expiry_date: date (optional)
- credential_id: string
- credential_url: string
- badge_image_url: string
- badge_image_alt: string

## API Routes

All CRUD operations are exposed through API routes:

- `GET/POST /api/blogs`
- `GET/PUT/DELETE /api/blogs/[slug]`
- `GET/POST /api/projects`
- `GET/PUT/DELETE /api/projects/[id]`
- `GET/POST /api/skills`
- `GET/PUT/DELETE /api/skills/[id]`
- `GET/POST /api/experience`
- `GET/PUT/DELETE /api/experience/[id]`
- `GET/POST /api/certifications`
- `GET/PUT/DELETE /api/certifications/[id]`

## Image Handling

### Uploading Images
1. Click the upload area in any form
2. Select an image file
3. The image is converted to base64 and stored in the database
4. Provide alt text for accessibility

### Image Alt Text
Always provide descriptive alt text for images:
- For headshots: "Ayesha Attaria, cybersecurity professional"
- For project screenshots: "Screenshot of vulnerability dashboard"
- For certificates: "OSCP certification badge"

## Validation

All inputs are validated using Zod schemas:
- Slugs must be lowercase with hyphens
- URLs must be valid
- Dates must be valid date format
- Proficiency must be 0-100

## Deployment Checklist

- [ ] Supabase project created
- [ ] Database tables created
- [ ] RLS policies configured
- [ ] Environment variables set
- [ ] Test admin panel locally
- [ ] Add first blog/project/skill
- [ ] Deploy to Vercel
- [ ] Verify APIs work in production
- [ ] Set up custom domain (if desired)

## Troubleshooting

### Images not showing
- Check that image_url field is populated
- Verify image_alt text is set
- Check CORS settings in Supabase storage

### Slug conflicts
- Slugs must be unique per table
- System prevents duplicate slugs
- Use timestamps in slug if needed

### Missing images on public pages
- Ensure images are published in admin
- Check that image_url is set
- Verify database queries filter by published status

## Support

For issues:
1. Check Supabase dashboard for table data
2. Review browser console for errors
3. Check Vercel logs for API errors
4. Verify environment variables are set
