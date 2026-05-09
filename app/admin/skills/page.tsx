"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Skill } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSkills() {
  const { session } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await fetch("/api/skills?admin=true");
      const data = await response.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (response.ok) {
        setSkills(skills.filter((s) => s.id !== id));
        toast.success("Skill deleted");
      } else {
        toast.error("Failed to delete skill");
      }
    } catch {
      toast.error("Error deleting skill");
    }
  };

  return (
    <div className="min-h-screen bg-off-white py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4ddcd3]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-black hover:text-[#4ddcd3] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-serif font-bold text-black">
              Manage Skills
            </h1>
          </div>
          <Link
            href="/admin/skills/new"
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            New Skill
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
          </div>
        ) : skills.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-gray-500 mb-4">No skills yet.</p>
            <Link
              href="/admin/skills/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Add Skill
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="glass-card group hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-serif font-bold text-black">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {skill.category} — {skill.proficiency}% proficiency
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/skills/edit/${skill.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(skill.id)}
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
