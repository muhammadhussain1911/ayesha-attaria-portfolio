'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Experience } from '@/lib/supabase';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      const data = await response.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      const response = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setExperiences(experiences.filter((e) => e.id !== id));
        toast.success('Experience deleted');
      }
    } catch {
      toast.error('Error deleting experience');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-teal-600 hover:text-teal-700">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Manage Experience</h1>
          </div>
          <Link
            href="/admin/experience/new"
            className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            <Plus className="w-5 h-5" />
            New Experience
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : experiences.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No experiences yet. Add your first experience!</p>
            <Link
              href="/admin/experience/new"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
            >
              <Plus className="w-5 h-5" />
              Add Experience
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-sm text-gray-500">{exp.organization} - {exp.type}</p>
                  <p className="text-sm text-gray-400">{exp.start_date} to {exp.end_date || 'Present'}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/experience/edit/${exp.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
