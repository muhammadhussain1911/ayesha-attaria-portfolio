"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { RichTextEditor } from "./RichTextEditor";
import { blogSchema } from "@/lib/validations";
import toast from "react-hot-toast";
import { Save, ArrowLeft } from "lucide-react";
import { Blog } from "@/lib/supabase";

interface BlogFormProps {
  initialData?: Blog;
  isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing }: BlogFormProps) {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    image_url: initialData?.image_url || "",
    image_alt: initialData?.image_alt || "",
    category: initialData?.category || "",
    tags: initialData?.tags || ([] as string[]),
    published: initialData?.published || false,
  });
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validated = blogSchema.parse(formData);

      // Get auth token
      if (!session?.access_token) {
        toast.error("Session expired. Please login again.");
        router.push("/admin/login");
        return;
      }

      const url = isEditing ? `/api/blogs/${initialData?.slug}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        const error = await response.json();
        // Zod returns array of errors, flatten to readable message
        if (Array.isArray(error.error)) {
          throw new Error(error.error.map((e: any) => e.message).join(', '));
        }
        throw new Error(error.error || "Failed to save blog");
      }

      toast.success(
        isEditing ? "Blog updated successfully!" : "Blog created successfully!",
      );
      router.push("/admin/blogs");
    } catch (error: any) {
      toast.error(error.message || "Error saving blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter blog title"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug *
        </label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          placeholder="my-blog-post"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Must be unique with only lowercase letters, numbers, and hyphens
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief SEO description"
          rows={3}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      {/* Image Upload */}
      <CloudinaryUploader
        value={formData.image_url}
        onChange={(url) => setFormData({ ...formData, image_url: url })}
        folder="portfolio/blogs"
        label="Featured Image"
      />

      {/* Image Alt Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Alt Text
        </label>
        <input
          type="text"
          name="image_alt"
          value={formData.image_alt}
          onChange={handleInputChange}
          placeholder="Descriptive alt text for accessibility"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="e.g., Web Security, API Security"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            placeholder="Add a tag and press Enter"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-red-600"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Content - Rich Text Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content (Markdown) *
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
        />
      </div>

      {/* Published */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="published"
          checked={formData.published}
          onChange={handleInputChange}
          className="w-4 h-4 rounded text-teal-600"
        />
        <span className="text-sm font-medium text-gray-700">
          Publish immediately
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
      >
        <Save className="w-4 h-4" />
        {loading ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );
}
