# Cloudinary Image Upload Integration Guide

This guide will help you set up Cloudinary for hosting and serving images from your admin panel.

---

## Table of Contents

1. [Overview](#overview)
2. [Cloudinary Setup](#cloudinary-setup)
3. [Environment Variables](#environment-variables)
4. [Installation](#installation)
5. [Create Upload Component](#create-upload-component)
6. [Integrate into Forms](#integrate-into-forms)
7. [Display Images on Website](#display-images-on-website)
8. [Best Practices](#best-practices)

---

## Overview

**Why Cloudinary?**

- Automatic image optimization (compression, responsive sizing)
- CDN distribution (fast delivery worldwide)
- Transformations (cropping, effects, filters)
- Secure uploads with authentication
- Free tier: 25GB storage, unlimited bandwidth
- Easy integration with Next.js

**What You'll Learn:**

- Upload images from admin panel
- Store image URLs in Supabase
- Fetch and display images on public pages
- Optimize images for web

---

## Cloudinary Setup

### Step 1: Create Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com/)
2. Click **Sign Up Free**
3. Create account with email or social login
4. Complete email verification

### Step 2: Get API Keys

1. Go to **Dashboard** (home page after login)
2. You'll see your **Cloud Name** at the top

3. Navigate to **Settings** → **API Keys**
4. You'll see:
   - **Cloud Name** (public)
   - **API Key** (public, but don't expose in frontend)
   - **API Secret** (KEEP PRIVATE - server-side only)

### Step 3: Configure Upload Settings

1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Click **Add upload preset**

4. Create a preset with these settings:
   - **Preset Name**: `portfolio_uploads` (or your preference)
   - **Signing Mode**: **Signed** (more secure)
   - **Folder**: `portfolio/` (organize uploads)
   - **Auto-tagging**: 0.6 (optional - auto-tag images)
   - **Resource type**: Image
   - **Allowed formats**: jpg, png, webp, gif
   - Click **Save**

### Step 4: Create Folders in Cloudinary

For organization, create these folders in your Cloudinary dashboard:

- `portfolio/blogs/` - Blog featured images
- `portfolio/projects/` - Project images
- `portfolio/certifications/` - Badge images
- `portfolio/experience/` - Company logos

You can do this by uploading images to specific folders.

---

## Environment Variables

Add these to your `.env.local`:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Upload preset (public-friendly name)
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=portfolio_uploads

# Optional: Transformation settings
NEXT_PUBLIC_CLOUDINARY_IMAGE_QUALITY=auto
NEXT_PUBLIC_CLOUDINARY_FETCH_FORMAT=auto
```

**Why certain variables are NEXT*PUBLIC*?**

- `CLOUD_NAME`: Needed in browser for uploads
- `API_KEY`: Used by upload widget (safe to expose)
- `API_SECRET`: NEVER make public - server-side only
- `UPLOAD_PRESET`: Needed in browser for widget

---

## Installation

Install Cloudinary Next.js SDK:

```bash
npm install next-cloudinary
```

---

## Create Upload Component

Create `components/admin/CloudinaryUploader.tsx`:

```typescript
'use client';

import { useState, useCallback } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { Upload, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface CloudinaryUploaderProps {
  value: string; // Current image URL
  onChange: (url: string) => void;
  folder?: string; // Cloudinary folder (e.g., 'portfolio/blogs')
  label?: string;
  preview?: boolean;
  maxSize?: number; // MB
}

export function CloudinaryUploader({
  value,
  onChange,
  folder = 'portfolio',
  label = 'Upload Image',
  preview = true,
  maxSize = 5,
}: CloudinaryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUploadSuccess = useCallback(
    (result: any) => {
      const imageUrl = result.info.secure_url;
      onChange(imageUrl);
      setUploading(false);
      setError('');
    },
    [onChange]
  );

  const handleUploadError = useCallback((error: any) => {
    setError(error.message || 'Upload failed');
    setUploading(false);
  }, []);

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Upload Widget */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        folder={folder}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
        onQueuesStart={() => setUploading(true)}
        options={{
          maxFileSize: maxSize * 1024 * 1024,
          maxFiles: 1,
          resourceType: 'image',
          sources: ['local', 'url'],
          styles: {
            palette: {
              window: '#ffffff',
              windowBorder: '#e5e5e5',
              tabIcon: '#4ddcd3',
              menuIcons: '#666',
              textDark: '#333',
              textLight: '#999',
              link: '#4ddcd3',
              action: '#4ddcd3',
              inactiveTabIcon: '#999',
              error: '#ef4444',
              inProgress: '#4ddcd3',
              complete: '#4ddcd3',
              sourceBg: '#f5f5f5',
            },
          },
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition-colors disabled:opacity-50"
          >
            <Upload className={`w-5 h-5 ${uploading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">
              {uploading ? 'Uploading...' : 'Click to upload or drag'}
            </span>
          </button>
        )}
      </CldUploadWidget>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Image Preview */}
      {preview && value && (
        <div className="relative w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <div className="relative w-full h-48">
            <CldImage
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* URL Display */}
          <div className="p-3 bg-white border-t border-gray-200">
            <p className="text-xs text-gray-600 break-all">{value}</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Integrate into Forms

### Update BlogForm.tsx

```typescript
import { CloudinaryUploader } from '@/components/admin/CloudinaryUploader';

export function BlogForm() {
  const [formData, setFormData] = useState({
    // ... other fields
    image_url: '',
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ... other form fields ... */}

      {/* Image Upload */}
      <CloudinaryUploader
        value={formData.image_url}
        onChange={(url) =>
          setFormData({ ...formData, image_url: url })
        }
        folder="portfolio/blogs"
        label="Blog Featured Image"
      />

      {/* Submit Button */}
      <button type="submit">Save Blog</button>
    </form>
  );
}
```

### Update ProjectForm.tsx

```typescript
<CloudinaryUploader
  value={formData.image_url}
  onChange={(url) =>
    setFormData({ ...formData, image_url: url })
  }
  folder="portfolio/projects"
  label="Project Image"
/>
```

### Update CertificationForm.tsx

```typescript
<CloudinaryUploader
  value={formData.badge_url}
  onChange={(url) =>
    setFormData({ ...formData, badge_url: url })
  }
  folder="portfolio/certifications"
  label="Badge/Certificate Image"
/>
```

### Update ExperienceForm.tsx

```typescript
<CloudinaryUploader
  value={formData.logo_url}
  onChange={(url) =>
    setFormData({ ...formData, logo_url: url })
  }
  folder="portfolio/experience"
  label="Company Logo"
/>
```

---

## Display Images on Website

### Using CldImage Component

For optimized images, use Cloudinary's `CldImage`:

```typescript
'use client';

import { CldImage } from 'next-cloudinary';

export function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-48">
        <CldImage
          src={blog.image_url}
          alt={blog.image_alt || blog.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
      </div>
    </div>
  );
}
```

### Using Regular Image Tag

If you prefer Next.js Image component:

```typescript
import Image from 'next/image';

export function ProjectCard({ project }) {
  return (
    <div>
      <Image
        src={project.image_url}
        alt={project.image_alt || project.title}
        width={500}
        height={300}
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
}
```

### Add Cloudinary to Next.js Image Domains

Update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
```

---

## Image Transformations

### Optimize on Delivery

Cloudinary automatically optimizes, but you can customize:

```typescript
// Resize to specific dimensions
<CldImage
  src={imageUrl}
  width={800}
  height={600}
  crop="fill"
  gravity="auto"
/>

// Blur background (for smaller images)
<CldImage
  src={imageUrl}
  width={300}
  height={300}
  crop="thumb"
  gravity="face"
/>

// Convert to WebP automatically
<CldImage
  src={imageUrl}
  format="auto"
  quality="auto"
/>
```

---

## API Routes for Image Processing

Create `app/api/upload/route.ts` for server-side uploads (optional):

```typescript
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder, resource_type: "auto" }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(Buffer.from(buffer));
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## Database Schema Updates

Your Supabase tables already support image URLs. Key fields:

**Blogs:**

```sql
image_url VARCHAR -- Cloudinary URL
image_alt VARCHAR -- Alt text for accessibility
```

**Projects:**

```sql
image_url VARCHAR -- Cloudinary URL
image_alt VARCHAR
```

**Certifications:**

```sql
badge_url VARCHAR -- Cloudinary URL
```

**Experience:**

```sql
logo_url VARCHAR -- Cloudinary URL
```

---

## Best Practices

### 1. Image Optimization

- Use Cloudinary's automatic optimization
- Always provide `alt` text for accessibility
- Use `sizes` prop for responsive images
- Set `priority={false}` for non-critical images

### 2. Folder Organization

```
portfolio/
├── blogs/
│   ├── blog-title-1.jpg
│   └── blog-title-2.jpg
├── projects/
│   ├── project-1.jpg
│   └── project-2.jpg
├── certifications/
│   ├── cert-1.png
│   └── cert-2.png
└── experience/
    ├── company-1.jpg
    └── company-2.jpg
```

### 3. File Naming

- Use descriptive names: `blog-penetration-testing-guide.jpg`
- No special characters (use hyphens instead of spaces)
- Include date for versioning: `cert-2024-04.png`

### 4. File Sizes

- Compress before upload (< 5MB recommended)
- Cloudinary will optimize automatically
- Use WebP format when possible
- Monitor usage in Cloudinary Dashboard

### 5. Security

- Use **Signed uploads** (requires upload preset)
- Set `maxFileSize` in uploader options
- Never expose API Secret in frontend code
- Validate file types on backend

### 6. Caching

Cloudinary URLs are cached by CDN. To invalidate:

1. Upload new version
2. Use versioning in URL: `image.jpg?v=2`

---

## Troubleshooting

### "Cannot find module 'next-cloudinary'"

```bash
npm install next-cloudinary
```

### Images not displaying

1. Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is correct
2. Check image URL exists in Cloudinary Dashboard
3. Confirm upload preset is signed correctly
4. Verify `remotePatterns` in `next.config.mjs`

### Upload widget not showing

1. Verify `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` exists
2. Check browser console for errors
3. Ensure upload preset is "Signed"
4. Verify Cloud Name is correct

### Images slow to load

1. Enable "Auto format" in Cloudinary settings
2. Set quality to "auto" or "85"
3. Use responsive widths with `sizes` prop
4. Cache on CDN (default with Cloudinary)

---

## Complete Setup Checklist

- ✅ Cloudinary account created
- ✅ API keys obtained
- ✅ Upload preset configured
- ✅ Environment variables added
- ✅ `next-cloudinary` installed
- ✅ `CloudinaryUploader` component created
- ✅ Forms updated with uploader
- ✅ Images displaying on public pages
- ✅ Image optimization configured
- ✅ `next.config.mjs` updated

---

## Next Steps

1. Upload test images via admin panel
2. Verify images display on public pages
3. Test image transformations
4. Monitor bandwidth usage in Cloudinary Dashboard
5. Set up backup/export strategy for images
