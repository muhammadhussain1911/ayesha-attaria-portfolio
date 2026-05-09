"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Experience } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminExperience() {
  const { session } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const response = await fetch("/api/experience?admin=true");
      const data = await response.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (response.ok) {
        setExperiences(experiences.filter((e) => e.id !== id));
        toast.success("Experience deleted");
      } else {
        toast.error("Failed to delete experience");
      }
    } catch {
      toast.error("Error deleting experience");
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
              Manage Experience
            </h1>
          </div>
          <Link
            href="/admin/experience/new"
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            New Experience
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
          </div>
        ) : experiences.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-gray-500 mb-4">No experiences yet.</p>
            <Link
              href="/admin/experience/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Add Experience
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="glass-card group hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-serif font-bold text-black">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {exp.organization} — {exp.type}
                  </p>
                  <p className="text-sm text-gray-400">
                    {exp.start_date} to {exp.end_date || "Present"}
                  </p>
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
