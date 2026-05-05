"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BugBountyProgram } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminBugBountyPrograms() {
  const { session } = useAuth();
  const [programs, setPrograms] = useState<BugBountyProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await fetch("/api/bug-bounty-programs");
      const data = await response.json();
      setPrograms(
        Array.isArray(data)
          ? data.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
          : [],
      );
    } catch {
      toast.error("Failed to load bug bounty programs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this bug bounty program?")) return;
    try {
      const response = await fetch(`/api/bug-bounty-programs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (response.ok) {
        setPrograms(programs.filter((p) => p.id !== id));
        toast.success("Bug bounty program deleted");
      } else {
        toast.error("Failed to delete bug bounty program");
      }
    } catch {
      toast.error("Error deleting bug bounty program");
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
              Manage Bug Bounty Programs
            </h1>
          </div>
          <Link
            href="/admin/bug-bounty-programs/new"
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            New Program
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
          </div>
        ) : programs.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-gray-500 mb-4">No bug bounty programs yet.</p>
            <Link
              href="/admin/bug-bounty-programs/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Add Program
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {programs.map((program) => (
              <div
                key={program.id}
                className="glass-card group hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {program.logo_url && (
                    <img
                      src={program.logo_url}
                      alt={program.name}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-serif font-bold text-black">
                      {program.name}
                    </h3>
                    {program.description && (
                      <p className="text-sm text-gray-600">
                        {program.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/bug-bounty-programs/edit/${program.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(program.id)}
                    aria-label="Delete program"
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
