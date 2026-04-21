"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Skill } from "@/lib/supabase";
import { SkillForm } from "@/components/admin/SkillForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

interface EditSkillPageProps {
  params: Promise<{ id: string }>;
}

export default function EditSkill({ params }: EditSkillPageProps) {
  const [id, setId] = useState("");
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { id: idParam } = await params;
      setId(idParam);
    })();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const loadSkill = async () => {
      try {
        const response = await fetch(`/api/skills/${id}`);
        if (!response.ok) throw new Error("Failed to load skill");
        const data = await response.json();
        setSkill(data);
      } catch (error) {
        toast.error("Failed to load skill");
      } finally {
        setLoading(false);
      }
    };

    loadSkill();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-600">Skill not found</p>
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
            href="/admin/skills"
            className="text-teal-600 hover:text-teal-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Skill</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <SkillForm initialData={skill} isEditing />
        </div>
      </div>
    </div>
  );
}
