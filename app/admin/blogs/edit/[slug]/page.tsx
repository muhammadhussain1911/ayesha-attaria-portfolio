'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogForm } from '@/components/admin/BlogForm';
import { Blog } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditBlog({ params }: EditBlogPageProps) {
  const [slug, setSlug] = useState('');
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { slug: slugParam } = await params;
      setSlug(slugParam);
    })();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const loadBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) {
          toast.error('Blog not found');
          return;
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        toast.error('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Blog not found</p>
          <Link href="/admin/blogs" className="text-teal-600 hover:text-teal-700">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/blogs" className="text-teal-600 hover:text-teal-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <BlogForm initialData={blog} isEditing />
        </div>
      </div>
    </div>
  );
}
