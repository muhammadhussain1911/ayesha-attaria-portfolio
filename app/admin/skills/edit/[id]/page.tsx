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
      <div className="min-h-screen bg-off-white py-12 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-off-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Skill not found</p>
          <Link href="/admin/skills" className="text-[#4ddcd3] hover:text-[#3db5a1]">
            Back to Skills
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/admin/skills"
            className="text-black hover:text-[#4ddcd3] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-black">Edit Skill</h1>
        </div>

        {/* Form */}
        <div className="glass-card p-8 md:p-10">
          <SkillForm initialData={skill} isEditing />
        </div>
      </div>
    </div>
  );
}
