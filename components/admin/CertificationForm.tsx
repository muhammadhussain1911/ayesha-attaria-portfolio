"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Certification } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";

interface CertificationFormProps {
  initialData?: Certification;
  isEditing?: boolean;
}

export function CertificationForm({
  initialData,
  isEditing,
}: CertificationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [badgePreview, setBadgePreview] = useState(
    initialData?.badge_image_url || "",
  );
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    issuer: initialData?.issuer || "",
    issue_date: initialData?.issue_date || "",
    expiry_date: initialData?.expiry_date || "",
    credential_id: initialData?.credential_id || "",
    credential_url: initialData?.credential_url || "",
    badge_image_url: initialData?.badge_image_url || "",
    badge_image_alt: initialData?.badge_image_alt || "",
    description: initialData?.description || "",
    order_index: initialData?.order_index || 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleBadgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setBadgePreview(result);
        setFormData((prev) => ({ ...prev, badge_image_url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/certifications/${initialData?.id}`
        : "/api/certifications";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to save certification");
        return;
      }

      toast.success(
        isEditing
          ? "Certification updated successfully"
          : "Certification created successfully",
      );
      router.push("/admin/certifications");
    } catch (error) {
      toast.error("Error saving certification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certification Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g., Certified Ethical Hacker (CEH)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          required
        />
      </div>

      {/* Issuer */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Issuing Organization *
        </label>
        <input
          type="text"
          name="issuer"
          value={formData.issuer}
          onChange={handleInputChange}
          placeholder="e.g., (ISC)², OSCP, Hack The Box"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          required
        />
      </div>

      {/* Issue Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Issue Date *
        </label>
        <input
          type="date"
          name="issue_date"
          value={formData.issue_date}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          required
        />
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expiry Date (Optional - Leave empty if no expiry)
        </label>
        <input
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Credential ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Credential ID
        </label>
        <input
          type="text"
          name="credential_id"
          value={formData.credential_id}
          onChange={handleInputChange}
          placeholder="e.g., CEH-12345"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Credential URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Credential URL
        </label>
        <input
          type="url"
          name="credential_url"
          value={formData.credential_url}
          onChange={handleInputChange}
          placeholder="https://verify.example.com/..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          Link where the certification can be verified
        </p>
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
          placeholder="Brief description of the certification"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Badge Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Badge Image
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleBadgeChange}
            className="hidden"
            id="badge-input"
          />
          <label
            htmlFor="badge-input"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">
              Click to upload badge image
            </span>
          </label>
        </div>
        {badgePreview && (
          <div className="mt-4 relative inline-block">
            <img
              src={badgePreview}
              alt="Badge Preview"
              className="h-32 w-32 object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setBadgePreview("");
                setFormData((prev) => ({
                  ...prev,
                  badge_image_url: "",
                  badge_image_alt: "",
                }));
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Badge Alt Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Badge Alt Text (Accessibility)
        </label>
        <input
          type="text"
          name="badge_image_alt"
          value={formData.badge_image_alt}
          onChange={handleInputChange}
          placeholder="e.g., Certified Ethical Hacker badge"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
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
              ? "Update Certification"
              : "Create Certification"}
        </button>
      </div>
    </form>
  );
}
