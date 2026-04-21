'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { Project } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProject({ params }: EditProjectPageProps) {
  const [id, setId] = useState('');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { id: idParam } = await params;
      setId(idParam);
    })();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const loadProject = async () => {
      try {
        const response = await fetch(`/api/projects`);
        if (!response.ok) {
          toast.error('Failed to load project');
          return;
        }
        const data = await response.json();
        const found = data.find((p: Project) => p.id === id);
        if (!found) {
          toast.error('Project not found');
          return;
        }
        setProject(found);
      } catch (error) {
        toast.error('Error loading project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Project not found</p>
          <Link href="/admin/projects" className="text-teal-600 hover:text-teal-700">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/projects" className="text-teal-600 hover:text-teal-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <ProjectForm initialData={project} isEditing />
        </div>
      </div>
    </div>
  );
}
