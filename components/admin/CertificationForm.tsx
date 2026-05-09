"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { certificationSchema } from "@/lib/validations";
import toast from "react-hot-toast";
import { Save, ArrowLeft, X } from "lucide-react";
import { Certification } from "@/lib/supabase";

interface CertificationFormProps {
  initialData?: Certification;
  isEditing?: boolean;
}

export function CertificationForm({
  initialData,
  isEditing,
}: CertificationFormProps) {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data with empty strings converted to null for optional fields
      const dataToValidate = {
        ...formData,
        issue_date: formData.issue_date || "",
        expiry_date: formData.expiry_date || "",
        badge_image_url: formData.badge_image_url || "",
        credential_url: formData.credential_url || "",
      };

      // Validate form data
      const validated = certificationSchema.parse(dataToValidate);

      // Get auth token
      if (!session?.access_token) {
        toast.error("Session expired. Please login again.");
        router.push("/admin/login");
        return;
      }

      const url = isEditing
        ? `/api/certifications/${initialData?.id}`
        : "/api/certifications";
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
        throw new Error(error.error || "Failed to save certification");
      }

      toast.success(
        isEditing
          ? "Certification updated successfully!"
          : "Certification created successfully!",
      );
      router.push("/admin/certifications");
    } catch (error: any) {
      toast.error(error.message || "Error saving certification");
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
          Certification Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g., Certified Ethical Hacker (CEH)"
          required
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Issuer */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Issuing Organization *
        </label>
        <input
          type="text"
          name="issuer"
          value={formData.issuer}
          onChange={handleInputChange}
          placeholder="e.g., (ISC)², OSCP, Hack The Box"
          required
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Issue Date */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Issue Date (Optional)
        </label>
        <input
          type="date"
          name="issue_date"
          value={formData.issue_date}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Expiry Date (Optional - Leave empty if no expiry)
        </label>
        <input
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Credential ID */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Credential ID
        </label>
        <input
          type="text"
          name="credential_id"
          value={formData.credential_id}
          onChange={handleInputChange}
          placeholder="e.g., CEH-12345"
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Credential URL */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Credential URL
        </label>
        <input
          type="url"
          name="credential_url"
          value={formData.credential_url}
          onChange={handleInputChange}
          placeholder="https://verify.example.com/..."
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Link where the certification can be verified
        </p>
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
          placeholder="Brief description of the certification"
          rows={3}
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
      </div>

      {/* Badge Image Upload */}
      <CloudinaryUploader
        value={formData.badge_image_url}
        onChange={(url) => setFormData({ ...formData, badge_image_url: url })}
        folder="portfolio/certifications"
        label="Badge Image"
      />

      {/* Badge Alt Text */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Badge Alt Text (Accessibility)
        </label>
        <input
          type="text"
          name="badge_image_alt"
          value={formData.badge_image_alt}
          onChange={handleInputChange}
          placeholder="e.g., Certified Ethical Hacker badge"
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
        />
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
          className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent transition-all shadow-soft-sm"
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
            ? "Update Certification"
            : "Create Certification"}
      </button>
    </form>
  );
}
