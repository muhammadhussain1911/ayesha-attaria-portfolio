# Supabase Admin Authentication Setup Guide

This guide will help you secure your admin panel using Supabase Authentication.

---

## Table of Contents

1. [Overview](#overview)
2. [Supabase Setup](#supabase-setup)
3. [Environment Variables](#environment-variables)
4. [Implementation](#implementation)
5. [Admin Protection](#admin-protection)
6. [Logout & Session Management](#logout--session-management)

---

## Overview

Supabase provides built-in authentication with email/password, OAuth providers, and more. We'll use **email/password authentication** to protect the admin panel.

**Key Features:**

- Simple email/password authentication
- Session management via Supabase
- Row-Level Security (RLS) for database
- Protected API routes
- Automatic session persistence

---

## Supabase Setup

### Step 1: Enable Email Authentication

1. Go to your [Supabase project dashboard](https://app.supabase.com)
2. Navigate to **Authentication** → **Providers**
3. Find **Email** provider (should be enabled by default)
4. Ensure settings are:
   - ✅ **Email** is enabled
   - ✅ **Confirm email** - Choose based on preference (can disable for development)
   - ✅ **Double confirm changes** - Optional

### Step 2: Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter:
   - **Email**: your-email@example.com
   - **Password**: Strong password (25+ characters recommended)
   - ✅ Check "Auto confirm user"
4. Click **Create user**

### Step 3: Create Admins Table (Optional but Recommended)

This table tracks which users are admins:

```sql
-- Create admins table
CREATE TABLE admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert your admin user
INSERT INTO admins (id, email, role)
VALUES ('YOUR_USER_ID_FROM_SUPABASE', 'your-email@example.com', 'admin');

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read admin info
CREATE POLICY "Admins can read admin table"
  ON admins FOR SELECT
  USING (auth.uid() IN (SELECT id FROM admins));

-- Create content tables RLS policies for authenticated admins
CREATE POLICY "Admins can manage all blogs"
  ON blogs FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can manage all projects"
  ON projects FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can manage all skills"
  ON skills FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can manage all experience"
  ON experience FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can manage all certifications"
  ON certifications FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));
```

---

## Environment Variables

Add these to your `.env.local`:

```env
# Already have these:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Authentication Settings
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
```

---

## Implementation

### Step 1: Create Authentication Context

Create `app/context/AuthContext.tsx`:

```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user || null);

        // Check if user is admin
        if (session?.user) {
          const { data } = await supabase
            .from('admins')
            .select('id')
            .eq('id', session.user.id)
            .single();
          setIsAdmin(!!data);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChanged(async (event, session) => {
      setSession(session);
      setUser(session?.user || null);

      if (session?.user) {
        const { data } = await supabase
          .from('admins')
          .select('id')
          .eq('id', session.user.id)
          .single();
        setIsAdmin(!!data);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### Step 2: Create Login Page

Create `app/admin/login/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Secure access to your portfolio admin panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          For security purposes, only authorized administrators can access this panel.
        </p>
      </div>
    </div>
  );
}
```

### Step 3: Create Protected Admin Layout

Create `app/admin/layout.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Loader } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Redirecting...
  }

  return <>{children}</>;
}
```

### Step 4: Add Logout Button to Admin Dashboard

Update `app/admin/page.tsx` to include logout:

```typescript
// Add to imports
import { useAuth } from '@/app/context/AuthContext';
import { LogOut } from 'lucide-react';

// In component, add:
const { signOut, user } = useAuth();

// Add logout button in header section:
const handleLogout = async () => {
  await signOut();
  window.location.href = '/admin/login';
};

// In JSX, add this button to the header:
<button
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
>
  <LogOut className="w-4 h-4" />
  Logout
</button>
```

### Step 5: Update Root Layout

Update `app/layout.tsx` to include AuthProvider:

```typescript
import { AuthProvider } from '@/app/context/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ... existing head content ... */}
      </head>
      <body className="font-sans antialiased text-black">
        <AuthProvider>
          {/* ... rest of layout ... */}
        </AuthProvider>
      </body>
    </html>
  )
}
```

---

## Admin Protection

### Protect API Routes

Add protection to `/api/blogs/route.ts` and other API routes:

```typescript
import { supabase } from "@/lib/supabase";

async function isAdmin(userId: string) {
  const { data } = await supabase
    .from("admins")
    .select("id")
    .eq("id", userId)
    .single();
  return !!data;
}

export async function POST(request: NextRequest) {
  try {
    // Get session from header or cookies
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if admin
    if (!(await isAdmin(user.id))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ... rest of API logic
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

---

## Logout & Session Management

### Session Persistence

Sessions are automatically persisted to localStorage by Supabase. To clear on logout:

```typescript
const handleLogout = async () => {
  await signOut(); // Clears session from Supabase
  localStorage.clear(); // Optional: clear any local data
  router.push("/admin/login");
};
```

### Check Session on App Load

The AuthProvider automatically checks session on mount using `getSession()` and sets up a listener for auth state changes.

---

## Security Best Practices

1. **Strong Passwords**: Require 12+ character passwords with mixed case, numbers, and symbols
2. **HTTPS Only**: Always use HTTPS in production
3. **Rate Limiting**: Implement rate limiting on login endpoint (Supabase does this by default)
4. **Session Timeout**: Consider implementing automatic logout after 30 minutes of inactivity
5. **Two-Factor Authentication**: Enable 2FA in Supabase settings (optional but recommended)
6. **Environment Variables**: Never commit `.env.local` to version control
7. **RLS Policies**: Ensure Row Level Security is enabled on all tables

---

## Troubleshooting

### "Unexpected token '<'" Error

- Make sure you've added `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Verify Supabase credentials are correct

### "Admin table doesn't exist"

- Run the SQL script to create the admins table
- Make sure RLS is enabled

### Sessions not persisting

- Check browser localStorage is enabled
- Verify cookies aren't being blocked
- Check browser console for CORS errors

### Login works but redirect fails

- Verify `/admin` route exists
- Check AuthContext is properly wrapped around app
- Look for router.push errors in console

---

## Next Steps

After authentication is set up:

1. Follow the **Cloudinary Image Upload Guide**
2. Implement image uploads in forms
3. Store image URLs in Supabase
4. Display images on public pages
