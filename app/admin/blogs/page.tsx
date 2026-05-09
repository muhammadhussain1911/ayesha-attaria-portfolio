"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminBlogs() {
  const { session } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await fetch("/api/blogs?admin=true");
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (response.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch {
      toast.error("Error deleting blog");
    }
  };

  return (
    <div className="min-h-screen bg-off-white py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-black hover:text-[#4ddcd3] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-serif font-bold text-black">
              Manage Blogs
            </h1>
          </div>
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            New Blog
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-gray-500 mb-4">
              No blogs yet. Create your first blog post!
            </p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Create Blog
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="glass-card group hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-bold text-black">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {blog.description}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded ${blog.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-gray-500">{blog.views} views</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/admin/blogs/edit/${blog.slug}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id, blog.slug)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
