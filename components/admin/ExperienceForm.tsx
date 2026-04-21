"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Experience } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";

interface ExperienceFormProps {
  initialData?: Experience;
  isEditing?: boolean;
}

export function ExperienceForm({
  initialData,
  isEditing,
}: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(
    initialData?.organization_logo_url || "",
  );
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoPreview(result);
        setFormData((prev) => ({ ...prev, organization_logo_url: result }));
      };
      reader.readAsDataURL(file);
    }
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
      const url = isEditing
        ? `/api/experience/${initialData?.id}`
        : "/api/experience";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to save experience");
        return;
      }

      toast.success(
        isEditing
          ? "Experience updated successfully"
          : "Experience created successfully",
      );
      router.push("/admin/experience");
    } catch (error) {
      toast.error("Error saving experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          placeholder="e.g., Senior Penetration Tester"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          required
        />
      </div>

      {/* Organization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization *
        </label>
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
          placeholder="Company or Organization name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          required
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          required
        >
          <option value="employment">Employment</option>
          <option value="bug-bounty">Bug Bounty</option>
          <option value="ctf">CTF Competition</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="e.g., Remote, New York"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Date *
        </label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          required
        />
      </div>

      {/* End Date & Is Current */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            disabled={formData.is_current}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none disabled:bg-gray-100"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_current"
              checked={formData.is_current}
              onChange={handleInputChange}
              className="w-4 h-4 text-teal-600 rounded focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Currently working here
            </span>
          </label>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description of your role or experience"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Organization Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization Logo
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
            id="logo-input"
          />
          <label
            htmlFor="logo-input"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">Click to upload logo</span>
          </label>
        </div>
        {logoPreview && (
          <div className="mt-4 relative inline-block">
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="h-20 w-20 object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setLogoPreview("");
                setFormData((prev) => ({
                  ...prev,
                  organization_logo_url: "",
                  organization_logo_alt: "",
                }));
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Organization Logo Alt Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo Alt Text
        </label>
        <input
          type="text"
          name="organization_logo_alt"
          value={formData.organization_logo_alt}
          onChange={handleInputChange}
          placeholder="Describe the logo for accessibility"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technologies Used
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechnology();
              }
            }}
            placeholder="e.g., Burp Suite, OWASP"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="text-teal-700 hover:text-teal-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Achievements
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={achievementInput}
            onChange={(e) => setAchievementInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAchievement();
              }
            }}
            placeholder="e.g., Found 15 critical vulnerabilities"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={addAchievement}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display Order (lower numbers appear first)
        </label>
        <input
          type="number"
          name="order_index"
          value={formData.order_index}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Experience"
              : "Create Experience"}
        </button>
      </div>
    </form>
  );
}
