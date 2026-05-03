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
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          toast.error('Project not found');
          return;
        }
        const data = await response.json();
        setProject(data);
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
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Project not found</p>
          <Link href="/admin/projects" className="text-[#4ddcd3] hover:text-[#3db5a1]">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/projects" className="text-black hover:text-[#4ddcd3] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-black">Edit Project</h1>
        </div>

        <div className="glass-card p-8 md:p-10">
          <ProjectForm initialData={project} isEditing />
        </div>
      </div>
    </div>
  );
}
