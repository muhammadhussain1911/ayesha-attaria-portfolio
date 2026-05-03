"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { experienceSchema } from "@/lib/validations";
import toast from "react-hot-toast";
import { Save, ArrowLeft, X } from "lucide-react";
import { Experience } from "@/lib/supabase";

interface ExperienceFormProps {
  initialData?: Experience;
  isEditing?: boolean;
}

export function ExperienceForm({
  initialData,
  isEditing,
}: ExperienceFormProps) {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    organization: initialData?.organization || "",
    organization_logo_url: initialData?.organization_logo_url || "",
    organization_logo_alt: initialData?.organization_logo_alt || "",
    description: initialData?.description || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
    is_current: initialData?.is_current || false,
    type: initialData?.type || "employment",
    location: initialData?.location || "",
    achievements: initialData?.achievements || [],
    technologies: initialData?.technologies || [],
    order_index: initialData?.order_index || 0,
  });
  const [achievementInput, setAchievementInput] = useState("");
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
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const addAchievement = () => {
    if (
      achievementInput.trim() &&
      !formData.achievements.includes(achievementInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()],
      }));
      setAchievementInput("");
    }
  };

  const removeAchievement = (achievement: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a !== achievement),
    }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
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
      const validated = experienceSchema.parse(formData);

      // Get auth token
      if (!session?.access_token) {
        toast.error("Session expired. Please login again.");
        router.push("/admin/login");
        return;
      }

      const url = isEditing
        ? `/api/experience/${initialData?.id}`
        : "/api/experience";
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
        throw new Error(error.error || "Failed to save experience");
      }

      toast.success(
        isEditing
          ? "Experience updated successfully!"
          : "Experience created successfully!",
      );
      router.push("/admin/experience");
    } catch (error: any) {
      toast.error(error.message || "Error saving experience");
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
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g., Senior Penetration Tester"
          required
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Organization */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Organization *
        </label>
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
          placeholder="Company or Organization name"
          required
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Type *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        >
          <option value="employment">Employment</option>
          <option value="bug-bounty">Bug Bounty</option>
          <option value="ctf">CTF Competition</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="e.g., Remote, New York"
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Start Date *
        </label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* End Date & Is Current */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            disabled={formData.is_current}
            className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm disabled:bg-gray-100"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_current"
              checked={formData.is_current}
              onChange={handleInputChange}
              className="w-4 h-4 rounded text-[#4ddcd3] focus:ring-[#4ddcd3]"
            />
            <span className="text-sm font-medium text-gray-700">
              Currently working here
            </span>
          </label>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description of your role or experience"
          rows={4}
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Organization Logo Upload */}
      <CloudinaryUploader
        value={formData.organization_logo_url}
        onChange={(url) =>
          setFormData({ ...formData, organization_logo_url: url })
        }
        folder="portfolio/experience"
        label="Organization Logo"
      />

      {/* Organization Logo Alt Text */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Logo Alt Text
        </label>
        <input
          type="text"
          name="organization_logo_alt"
          value={formData.organization_logo_alt}
          onChange={handleInputChange}
          placeholder="Describe the logo for accessibility"
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Technologies Used
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTechnology())
            }
            placeholder="e.g., Burp Suite, OWASP"
            className="flex-1 px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-2 bg-black text-white hover:bg-[#4ddcd3] hover:text-black rounded-xl transition-all shadow-soft-sm"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-[#4ddcd3]/10 text-[#4ddcd3] border border-[#4ddcd3]/20 rounded-full text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Achievements
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={achievementInput}
            onChange={(e) => setAchievementInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addAchievement())
            }
            placeholder="e.g., Found 15 critical vulnerabilities"
            className="flex-1 px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
          />
          <button
            type="button"
            onClick={addAchievement}
            className="px-4 py-2 bg-black text-white hover:bg-[#4ddcd3] hover:text-black rounded-xl transition-all shadow-soft-sm"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {formData.achievements.map((achievement) => (
            <div
              key={achievement}
              className="flex items-center justify-between gap-2 bg-blue-50 border border-blue-200 p-3 rounded-lg"
            >
              <span className="text-sm text-gray-700">{achievement}</span>
              <button
                type="button"
                onClick={() => removeAchievement(achievement)}
                className="text-red-600 hover:text-red-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Order Index */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Display Order (lower numbers appear first)
        </label>
        <input
          type="number"
          name="order_index"
          value={formData.order_index}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black hover:bg-[#4ddcd3] hover:text-black disabled:bg-gray-400 text-white font-medium rounded-xl transition-all duration-300 shadow-soft-lg hover:-translate-y-1 hover:shadow-soft-xl"
      >
        <Save className="w-4 h-4" />
        {loading
          ? "Saving..."
          : isEditing
            ? "Update Experience"
            : "Create Experience"}
      </button>
    </form>
  );
}
