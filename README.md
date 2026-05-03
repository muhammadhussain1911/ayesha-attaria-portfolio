# Ayesha Attaria - Professional Portfolio

A modern, high-performance portfolio website for a penetration testing and ethical hacking professional. Built with cutting-edge web technologies, this platform showcases expertise in web application security, API testing, and bug bounty hunting.

**Live Demo:** [ayeshaattaria.site](https://ayeshaattaria.site)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🎯 Overview

This portfolio application serves as a professional presence for a cybersecurity specialist, enabling dynamic content management through a comprehensive admin panel. The platform highlights certifications, technical skills, professional experience, and case studies while maintaining SEO best practices and optimal performance.

### Key Objectives

- Showcase cybersecurity expertise and credentials
- Provide a modern, responsive user experience
- Enable content management without code deployment
- Maintain high performance and SEO rankings
- Ensure security and data integrity

---

## 🛠 Tech Stack

### Frontend

- **Next.js 16.2.4** - React framework with App Router, SSR/SSG, TypeScript support
- **React 19.2.4** - UI library with hooks and server components
- **TypeScript 5.7.3** - Type-safe development
- **Tailwind CSS 4.2.4** - Utility-first CSS framework with custom theme
- **Lucide React 0.564.0** - Consistent icon system (6x6 sizing, teal-600 color)

### Backend & Database

- **Supabase 2.104.0** - PostgreSQL database, authentication, real-time subscriptions
- **Node.js 18+** - Runtime environment
- **Nodemailer 8.0.7** - Email delivery via Gmail SMTP

### Forms & Validation

- **React Hook Form 7.73.1** - Performant form state management
- **Zod** - TypeScript-first schema validation

### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code quality enforcement
- **PostCSS 8.4.47** - CSS transformation

---

## ✨ Features

### Public-Facing Features

1. **Responsive Design** - Mobile-first, optimized for all devices
2. **Homepage** - Hero section with CTA, services overview, methodologies, testimonials
3. **About Page** - Consolidated professional narrative with:
   - Personal bio and approach
   - Skills database with proficiency levels and categorization
   - Professional timeline with logos and achievements
   - Certifications with badges and credentials
   - Technologies and tools grid
4. **Services Page** - Detailed offerings (Web App Testing, API Security, VAPT, Bug Bounty Support, etc.)
5. **Projects/Case Studies** - Portfolio of penetration testing engagements
6. **Blog** - Articles on security topics and findings
7. **Contact Form** - Email submission with validation and SMTP delivery
8. **SEO Optimization** - Meta tags, Open Graph, structured data, sitemaps
9. **Analytics** - Blog view tracking and engagement metrics

### Admin Panel Features

1. **Authentication** - Supabase auth with session management
2. **Skills Management** - Add/edit/delete skills with:
   - Category organization
   - Proficiency levels (0-100%)
   - Descriptions and images
   - Display ordering
3. **Experience Management** - Professional timeline entries with:
   - Start/end dates
   - Current position indicator
   - Organization logos
   - Multiple achievement tracking
   - Type categorization (employment, CTF, bug-bounty, etc.)
4. **Certification Management** - Credential tracking with:
   - Issue and expiry dates
   - Badge images
   - Credential URLs
   - Descriptions
5. **Blog Management** - Full CMS functionality
6. **Project Management** - Case study and portfolio entries

---

## 📁 Project Structure

```
root/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── blogs/               # Blog endpoints (GET, POST, PUT, DELETE)
│   │   ├── certifications/       # Certification management
│   │   ├── contact/             # Email contact submission
│   │   ├── experience/          # Experience CRUD
│   │   ├── projects/            # Project management
│   │   └── skills/              # Skill management
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx             # Admin landing
│   │   ├── blogs/               # Blog form and management
│   │   ├── certifications/       # Certification form
│   │   ├── experience/          # Experience form
│   │   ├── projects/            # Project form
│   │   └── skills/              # Skills form
│   ├── about/                    # About page (consolidated skills/exp/certs)
│   ├── blog/                     # Blog listing and individual posts
│   ├── certifications/           # Certifications page
│   ├── contact/                  # Contact page
│   ├── experience/               # Professional timeline
│   ├── projects/                 # Portfolio/case studies
│   ├── services/                 # Services showcase
│   ├── skills/                   # Technical skills showcase
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── robots.ts                 # SEO robots configuration
│   └── sitemap.ts                # Dynamic sitemap generation
│
├── components/
│   ├── admin/                    # Admin UI components
│   │   ├── BlogForm.tsx
│   │   ├── ProjectForm.tsx
│   │   └── SkillForm.tsx
│   ├── contact/                  # Contact form components
│   │   └── ContactForm.tsx
│   ├── home/                     # Homepage sections
│   │   ├── CTABanner.tsx
│   │   ├── Hero.tsx
│   │   ├── Methodology.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── Testimonials.tsx
│   │   └── WhyChooseMe.tsx
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx
│   │   ├── MobileBottomNav.tsx
│   │   └── Navbar.tsx
│   ├── seo/                      # SEO components
│   │   └── SchemaMarkup.tsx
│   ├── shared/                   # Reusable components
│   │   ├── BlogCard.tsx
│   │   ├── CertCard.tsx
│   │   ├── CountUpNumber.tsx
│   │   ├── IconRenderer.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ToolsGrid.tsx
│   │   └── TypewriterText.tsx
│   ├── ui/                       # Shadcn UI components
│   │   └── [various UI components]
│   └── theme-provider.tsx        # Theme context and setup
│
├── lib/
│   ├── supabase.ts              # Supabase client setup and types
│   ├── utils.ts                 # Utility functions
│   └── validations.ts           # Zod schemas for form validation
│
├── hooks/
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
│
├── styles/
│   └── globals.css              # Global styles and Tailwind setup
│
├── public/
│   └── images/                  # Static assets
│
├── scripts/
│   └── 01-create-tables.sql     # Database initialization script
│
├── config files
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   └── components.json          # Shadcn configuration
│
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 8.0 or later (recommended) or npm 9.0+
- Supabase account (free tier available)
- Gmail account (for contact form emails)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ayesha-attaria-portfolio.git
cd AyeshaAttariaPortfolio
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Configure environment variables** (see section below)

4. **Initialize database**

```bash
# Run the SQL script in Supabase SQL editor
# File: scripts/01-create-tables.sql
```

5. **Start development server**

```bash
pnpm dev
# or
npm run dev
```

Access the application at `http://localhost:3000`

---

## 🔐 Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Configuration (Gmail SMTP)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password

# Optional: Analytics
NEXT_PUBLIC_GTAG=your_google_analytics_id
```

### Generating Gmail App Password

1. Enable 2-Step Verification on your Google Account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Select "App passwords"
4. Generate a new app password for Mail on Windows Computer
5. Use the 16-character password in your `.env.local`

---

## 📊 Database Schema

### Tables Overview

#### `skills`

Stores technical skills with proficiency levels and categorization.

```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  proficiency INT CHECK (proficiency >= 0 AND proficiency <= 100),
  description TEXT,
  image_url TEXT,
  image_alt VARCHAR(255),
  icon_name VARCHAR(100),
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `experience`

Tracks professional experience and engagements.

```sql
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  organization_logo_url TEXT,
  organization_logo_alt VARCHAR(255),
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  type VARCHAR(50) DEFAULT 'employment', -- employment, ctf, bug-bounty, other
  location VARCHAR(255),
  achievements TEXT[] DEFAULT ARRAY[]::TEXT[],
  technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `certifications`

Stores professional certifications and credentials.

```sql
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  credential_id VARCHAR(255),
  credential_url TEXT,
  badge_image_url TEXT,
  badge_image_alt VARCHAR(255),
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `blogs`

Dynamic blog content with metadata.

```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  image_alt VARCHAR(255),
  author VARCHAR(255),
  category VARCHAR(100),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  published BOOLEAN DEFAULT FALSE,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `projects`

Portfolio and case study entries.

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  image_alt VARCHAR(255),
  project_url TEXT,
  github_url TEXT,
  technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
  severity_found VARCHAR(100), -- critical, high, medium, low
  impact TEXT,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Documentation

### Base URL

`/api` - All API routes are prefixed with `/api`

### Skills Endpoints

#### GET `/api/skills`

Fetch all skills with optional filtering and sorting.

**Query Parameters:**

- `category` (optional): Filter by skill category
- `sort` (optional): Sort by proficiency (asc/desc)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Burp Suite",
      "category": "Web App Testing",
      "proficiency": 95,
      "description": "Advanced web application testing",
      "order_index": 0
    }
  ]
}
```

#### POST `/api/skills`

Create a new skill. Requires authentication.

**Body:**

```json
{
  "name": "string",
  "category": "string",
  "proficiency": 0-100,
  "description": "string (optional)",
  "order_index": "number (optional)"
}
```

#### PUT `/api/skills/:id`

Update an existing skill. Requires authentication.

#### DELETE `/api/skills/:id`

Delete a skill. Requires authentication.

### Experience Endpoints

#### GET `/api/experience`

Fetch all professional experiences ordered by date.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Senior Penetration Tester",
      "organization": "Security Firm",
      "start_date": "2022-01-01",
      "is_current": true,
      "type": "employment",
      "achievements": ["Achievement 1", "Achievement 2"]
    }
  ]
}
```

#### POST/PUT/DELETE `/api/experience/:id`

Create, update, or delete experience entries. Requires authentication.

### Certifications Endpoints

#### GET `/api/certifications`

Fetch all certifications ordered by issue date (newest first).

#### POST/PUT/DELETE `/api/certifications/:id`

Manage certifications. Requires authentication.

### Contact Endpoint

#### POST `/api/contact`

Submit contact form with email delivery.

**Body:**

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "error": "Validation error or email delivery failed"
}
```

---

## 💻 Development Workflow

### Code Standards

- **Type Safety**: All TypeScript files must be fully typed
- **Component Structure**: Use functional components with hooks
- **Naming Conventions**:
  - Components: PascalCase
  - Files: match component name or camelCase for utilities
  - Variables/Functions: camelCase
- **CSS**: Tailwind utilities (no inline styles except dynamic values)

### Creating New Pages

1. Create a new folder in `/app` with `page.tsx`
2. Include proper metadata with `Metadata` export
3. Implement SEO markup with `SchemaMarkup` component
4. Use `SectionHeading` for consistent styling
5. Add to navigation components (Navbar, MobileBottomNav)

### Creating New Components

1. Place in `/components` with appropriate folder
2. Export as named export matching filename
3. Use TypeScript interfaces for props
4. Include JSDoc comments for complex logic
5. Keep components focused and reusable

### API Route Development

1. Create route in `/app/api/[feature]/route.ts`
2. Implement proper HTTP methods (GET, POST, PUT, DELETE)
3. Use Zod validation for request bodies
4. Return consistent JSON structure
5. Implement error handling with proper status codes

### Testing Forms

Use the provided Zod schemas in `/lib/validations.ts`:

```typescript
import {
  skillSchema,
  experienceSchema,
  certificationSchema,
} from "@/lib/validations";
```

---

## 📦 Deployment

### Vercel (Recommended)

1. **Connect repository**
   - Go to [Vercel](https://vercel.com)
   - Import repository
   - Select Next.js as framework

2. **Configure environment variables**
   - Add all `.env.local` variables to Vercel project settings
   - Ensure service role key is marked as sensitive

3. **Configure build**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install --frozen-lockfile`

4. **Deploy**
   - Vercel auto-deploys on push to main branch
   - Preview deployments for pull requests

### Self-Hosted Deployment

1. **Build for production**

```bash
pnpm build
```

2. **Start production server**

```bash
pnpm start
# or with PM2
pm2 start "pnpm start" --name "portfolio"
```

3. **Configure reverse proxy** (nginx)

```nginx
server {
  listen 80;
  server_name ayeshaattaria.site;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass $http_upgrade;
  }
}
```

4. **SSL Certificate** (Let's Encrypt)

```bash
certbot certonly --standalone -d ayeshaattaria.site
```

---

## ⚡ Performance Optimization

### Current Optimizations

1. **Image Optimization** - Next.js Image component with automatic webp conversion
2. **Code Splitting** - Automatic via Next.js App Router
3. **Server Components** - Database queries at server-level to avoid hydration mismatch
4. **Static Generation** - Homepage and static pages pre-rendered
5. **CSS Optimization** - Tailwind purges unused styles
6. **Database Queries** - Selective column fetching, proper indexing

### Monitoring

- Use Vercel Analytics for Core Web Vitals
- Monitor Supabase query performance
- Track database connections

### Optimization Checklist

- [ ] Images compressed and in modern formats
- [ ] Unused dependencies removed
- [ ] CSS classes tree-shaken
- [ ] Database indices created for frequently queried columns
- [ ] API responses cached where appropriate

---

## 🔒 Security Considerations

### Authentication & Authorization

- Admin routes protected with Supabase authentication
- Service role key never exposed to client
- Auth tokens stored securely by Supabase SDK

### Data Validation

- All API inputs validated with Zod schemas
- SQL injection prevented through parameterized queries
- CSRF protection via SameSite cookies

### Environment Variables

- `.env.local` never committed to version control
- Service role key stored only on server-side
- Public keys safely exposed to frontend

### Email Security

- Gmail app-specific passwords for SMTP
- No credentials in code or logs
- Rate limiting on contact form (recommended)

### API Security

- CORS configured appropriately
- Request validation on all endpoints
- Error responses don't leak sensitive information

### Recommendations

1. Implement rate limiting on contact form
2. Add admin IP whitelist for sensitive operations
3. Regular security audits of database access patterns
4. Monitor for unusual API activity
5. Keep dependencies updated (`pnpm update`)

---

## 🐛 Troubleshooting

### Common Issues

#### Build Errors

**Problem**: `Module not found` errors

- **Solution**: Run `pnpm install` and verify node_modules are installed

**Problem**: TypeScript compilation errors

- **Solution**: Check component props against interfaces, ensure all imports are correct

#### Database Connection Issues

**Problem**: `Error: Invalid Supabase URL or key`

- **Solution**: Verify `.env.local` has correct values from Supabase dashboard

**Problem**: `SUPABASE_SERVICE_ROLE_KEY is not defined`

- **Solution**: This is only needed on server routes; verify it's in `.env.local` not `.env`

#### Email Not Sending

**Problem**: Gmail SMTP authentication fails

- **Solution**:
  - Verify app-specific password (16 characters)
  - Ensure 2-FA is enabled on Gmail
  - Check email isn't rate-limited

#### Styling Issues

**Problem**: Tailwind classes not applied

- **Solution**:
  - Check file is in `globals.css` import path
  - Clear `.next` build cache: `rm -rf .next`
  - Verify class names are correct (no typos)

### Debug Mode

Set environment variable for verbose logging:

```bash
DEBUG=* pnpm dev
```

### Performance Issues

1. **Slow page loads**: Check Network tab in DevTools
2. **High API latency**: Monitor Supabase real-time metrics
3. **Large bundle size**: Run `pnpm analyze` to identify heavy packages

---

## 🤝 Contributing

### Development Guidelines

1. Create feature branch: `git checkout -b feature/description`
2. Make atomic, well-documented commits
3. Write clear commit messages following conventional commits
4. Test changes locally before pushing
5. Submit pull request with description

### Code Review Checklist

- [ ] TypeScript types are complete
- [ ] No `any` types without justification
- [ ] Responsive design tested
- [ ] Accessibility considered (ARIA labels, contrast ratios)
- [ ] Performance impact evaluated
- [ ] Security implications reviewed

### Commit Message Format

```
type(scope): short description

Detailed explanation if needed.

- Item 1
- Item 2

Fixes #issue-number
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

---

## 📞 Support & Contact

For technical questions or support:

- Email: [contact information]
- Portfolio: [ayeshaattaria.site](https://ayeshaattaria.site)
- GitHub: [your-github-profile]

---

## 🎯 Future Roadmap

- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Client testimonials/reviews section
- [ ] Newsletter subscription
- [ ] API rate limiting and monitoring
- [ ] Advanced search functionality
- [ ] CMS webhooks for automated updates

---

**Last Updated**: May 2026  
**Current Version**: 1.0.0  
**Developed by [Muhammad Hussain](https://www.hussainappdeveloper.site)**
