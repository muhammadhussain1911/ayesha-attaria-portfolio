'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skill } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { Upload, X } from 'lucide-react';

interface SkillFormProps {
  initialData?: Skill;
  isEditing?: boolean;
}

export function SkillForm({ initialData, isEditing }: SkillFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.image_url || '');
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image_url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/skills/${initialData?.id}` : '/api/skills';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error('Failed to save skill');
        return;
      }

      toast.success(isEditing ? 'Skill updated' : 'Skill created');
      router.push('/admin/skills');
    } catch (error) {
      toast.error('Error saving skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Skill name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            required
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency (%)</label>
        <input
          type="number"
          name="proficiency"
          min="0"
          max="100"
          value={formData.proficiency}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-input"
          />
          <label htmlFor="image-input" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">Click to upload</span>
          </label>
        </div>
        {imagePreview && (
          <div className="mt-4 relative inline-block">
            <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded" />
            <button
              type="button"
              onClick={() => {
                setImagePreview('');
                setFormData((prev) => ({ ...prev, image_url: '' }));
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
        <input
          type="text"
          name="image_alt"
          value={formData.image_alt}
          onChange={handleInputChange}
          placeholder="Image description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 font-medium"
      >
        {loading ? 'Saving...' : isEditing ? 'Update Skill' : 'Create Skill'}
      </button>
    </form>
  );
}
