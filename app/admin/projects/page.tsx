'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/supabase';
import { useAuth } from '@/app/context/AuthContext';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProjects() {
  const { session } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        toast.success('Project deleted successfully');
      } else {
        toast.error('Failed to delete project');
      }
    } catch {
      toast.error('Error deleting project');
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
            <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
          </div>
          <Link href="/admin/projects/new" className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            <Plus className="w-5 h-5" />
            New Project
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No projects yet.</p>
            <Link href="/admin/projects/new" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
              <Plus className="w-5 h-5" />
              Create Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className={`px-2 py-1 rounded ${project.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                    {project.featured && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Featured</span>}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/projects/edit/${project.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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
