"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { projectSchema } from "@/lib/validations";
import toast from "react-hot-toast";
import { Save, ArrowLeft, X } from "lucide-react";
import { Project } from "@/lib/supabase";

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing }: ProjectFormProps) {
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
    project_url: initialData?.project_url || "",
    github_url: initialData?.github_url || "",
    technologies: initialData?.technologies || [],
    severity_found: initialData?.severity_found || "",
    impact: initialData?.impact || "",
    published: initialData?.published || false,
    featured: initialData?.featured || false,
  });
  const [techInput, setTechInput] = useState("");

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

  const addTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validated = projectSchema.parse(formData);

      // Get auth token
      if (!session?.access_token) {
        toast.error("Session expired. Please login again.");
        router.push("/admin/login");
        return;
      }

      const url = isEditing
        ? `/api/projects/${initialData?.id}`
        : "/api/projects";
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
        if (Array.isArray(error.error)) {
          throw new Error(error.error.map((e: any) => e.message).join(', '));
        }
        throw new Error(error.error || "Failed to save project");
      }

      toast.success(
        isEditing
          ? "Project updated successfully!"
          : "Project created successfully!",
      );
      router.push("/admin/projects");
    } catch (error: any) {
      toast.error(error.message || "Error saving project");
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
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
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
          placeholder="Project title"
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
          placeholder="my-project"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
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
          placeholder="Brief description"
          rows={3}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detailed Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Detailed project information"
          rows={10}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent font-mono text-sm"
        />
      </div>

      {/* Image Upload */}
      <CloudinaryUploader
        value={formData.image_url}
        onChange={(url) => setFormData({ ...formData, image_url: url })}
        folder="portfolio/projects"
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
          placeholder="Describe the image for accessibility"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      {/* URLs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project URL
          </label>
          <input
            type="url"
            name="project_url"
            value={formData.project_url}
            onChange={handleInputChange}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="github_url"
            value={formData.github_url}
            onChange={handleInputChange}
            placeholder="https://github.com/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Severity & Impact */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severity Found
          </label>
          <input
            type="text"
            name="severity_found"
            value={formData.severity_found}
            onChange={handleInputChange}
            placeholder="Critical, High, Medium..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Impact
          </label>
          <input
            type="text"
            name="impact"
            value={formData.impact}
            onChange={handleInputChange}
            placeholder="Brief impact description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technologies
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTech())
            }
            placeholder="Add technology"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
            className="w-4 h-4 rounded text-teal-600"
          />
          <span className="text-sm font-medium text-gray-700">
            Publish this project
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="w-4 h-4 rounded text-teal-600"
          />
          <span className="text-sm font-medium text-gray-700">
            Feature on homepage
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
      >
        <Save className="w-4 h-4" />
        {loading
          ? "Saving..."
          : isEditing
            ? "Update Project"
            : "Create Project"}
      </button>
    </form>
  );
}
