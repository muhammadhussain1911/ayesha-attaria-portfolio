"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { bugBountyProgramSchema } from "@/lib/validations";
import toast from "react-hot-toast";
import { Save, ArrowLeft } from "lucide-react";
import { BugBountyProgram } from "@/lib/supabase";

interface BugBountyProgramFormProps {
  initialData?: BugBountyProgram;
  isEditing?: boolean;
}

export function BugBountyProgramForm({
  initialData,
  isEditing,
}: BugBountyProgramFormProps) {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    logo_url: initialData?.logo_url || "",
    logo_alt: initialData?.logo_alt || "",
    url: initialData?.url || "",
    order_index: initialData?.order_index || 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, logo_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = bugBountyProgramSchema.parse(formData);

      if (!session?.access_token) {
        toast.error("Session expired. Please login again.");
        router.push("/admin/login");
        return;
      }

      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing
        ? `/api/bug-bounty-programs/${initialData?.id}`
        : `/api/bug-bounty-programs`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(validated),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save bug bounty program");
      }

      toast.success(isEditing ? "Program updated" : "Program created");
      router.push("/admin/bug-bounty-programs");
    } catch (error: any) {
      toast.error(error.message || "Error saving bug bounty program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-black hover:text-[#4ddcd3] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="text-3xl font-serif font-bold text-black mb-8">
          {isEditing ? "Edit Bug Bounty Program" : "New Bug Bounty Program"}
        </h1>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Program Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Bugcrowd, HackerOne, Intigriti"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ddcd3]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the program"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ddcd3]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Program Logo (Cloudinary URL)
            </label>
            <CloudinaryUploader onUpload={handleImageUpload} />
            {formData.logo_url && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={formData.logo_url}
                  alt="Preview"
                  className="w-16 h-16 object-contain rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Logo URL"
                  value={formData.logo_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      logo_url: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ddcd3]"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Logo Alt Text
            </label>
            <input
              type="text"
              name="logo_alt"
              value={formData.logo_alt}
              onChange={handleInputChange}
              placeholder="Descriptive alt text for the logo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ddcd3]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Program URL
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com/program"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ddcd3]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Order Index
            </label>
            <input
              type="number"
              name="order_index"
              value={formData.order_index}
              onChange={handleInputChange}
              placeholder="e.g., 0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4ddcd3]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? "Saving..." : "Save Program"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
