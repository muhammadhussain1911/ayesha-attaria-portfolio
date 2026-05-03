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
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Blog not found</p>
          <Link href="/admin/blogs" className="text-[#4ddcd3] hover:text-[#3db5a1]">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/blogs" className="text-black hover:text-[#4ddcd3] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-black">Edit Blog</h1>
        </div>

        {/* Form */}
        <div className="glass-card p-8 md:p-10">
          <BlogForm initialData={blog} isEditing />
        </div>
      </div>
    </div>
  );
}
