"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Experience } from "@/lib/supabase";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default function EditExperience({ params }: EditExperiencePageProps) {
  const [id, setId] = useState("");
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { id: idParam } = await params;
      setId(idParam);
    })();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const loadExperience = async () => {
      try {
        const response = await fetch(`/api/experience/${id}`);
        if (!response.ok) throw new Error("Failed to load experience");
        const data = await response.json();
        setExperience(data);
      } catch (error) {
        toast.error("Failed to load experience");
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-600">Experience not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/admin/experience"
            className="text-teal-600 hover:text-teal-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Experience</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <ExperienceForm initialData={experience} isEditing />
        </div>
      </div>
    </div>
  );
}
