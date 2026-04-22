'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { CloudinaryUploader } from '@/components/admin/CloudinaryUploader';
import { skillSchema } from '@/lib/validations';
import toast from 'react-hot-toast';
import { Save, ArrowLeft, X } from 'lucide-react';
import { Skill } from '@/lib/supabase';

interface SkillFormProps {
  initialData?: Skill;
  isEditing?: boolean;
}

export function SkillForm({ initialData, isEditing }: SkillFormProps) {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    proficiency: initialData?.proficiency || 80,
    description: initialData?.description || '',
    image_url: initialData?.image_url || '',
    image_alt: initialData?.image_alt || '',
    icon_name: initialData?.icon_name || '',
    order_index: initialData?.order_index || 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validated = skillSchema.parse(formData);

      // Get auth token
      if (!session?.access_token) {
        toast.error('Session expired. Please login again.');
        router.push('/admin/login');
        return;
      }

      const url = isEditing ? `/api/skills/${initialData?.id}` : '/api/skills';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save skill');
      }

      toast.success(isEditing ? 'Skill updated successfully!' : 'Skill created successfully!');
      router.push('/admin/skills');
    } catch (error: any) {
      toast.error(error.message || 'Error saving skill');
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Skill name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          >
            <option value="">Select category</option>
            <option value="Web App Testing">Web App Testing</option>
            <option value="API Security">API Security</option>
            <option value="Tools">Tools</option>
            <option value="Languages">Languages</option>
            <option value="Frameworks">Frameworks</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency (%)</label>
          <input
            type="number"
            name="proficiency"
            min="0"
            max="100"
            value={formData.proficiency}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
          <input
            type="number"
            name="order_index"
            value={formData.order_index}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      {/* Image Upload */}
      <CloudinaryUploader
        value={formData.image_url}
        onChange={(url) => setFormData({ ...formData, image_url: url })}
        folder="portfolio/skills"
        label="Skill Image"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
        <input
          type="text"
          name="image_alt"
          value={formData.image_alt}
          onChange={handleInputChange}
          placeholder="Image description for accessibility"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name (Lucide)</label>
        <input
          type="text"
          name="icon_name"
          value={formData.icon_name}
          onChange={handleInputChange}
          placeholder="e.g., Code, Shield, Zap"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Lucide icon name (optional)</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
      >
        <Save className="w-4 h-4" />
        {loading ? 'Saving...' : isEditing ? 'Update Skill' : 'Create Skill'}
      </button>
    </form>
  );
}
