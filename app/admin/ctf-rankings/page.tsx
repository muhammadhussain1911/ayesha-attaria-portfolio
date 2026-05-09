"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CTFRanking } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminCTFRankings() {
  const { session } = useAuth();
  const [rankings, setRankings] = useState<CTFRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    try {
      const response = await fetch("/api/ctf-rankings?admin=true");
      const data = await response.json();
      setRankings(
        Array.isArray(data)
          ? data.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
          : [],
      );
    } catch {
      toast.error("Failed to load CTF rankings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this CTF ranking?")) return;
    try {
      const response = await fetch(`/api/ctf-rankings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (response.ok) {
        setRankings(rankings.filter((r) => r.id !== id));
        toast.success("CTF ranking deleted");
      } else {
        toast.error("Failed to delete CTF ranking");
      }
    } catch {
      toast.error("Error deleting CTF ranking");
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
              Manage CTF Rankings
            </h1>
          </div>
          <Link
            href="/admin/ctf-rankings/new"
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            New CTF Ranking
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
          </div>
        ) : rankings.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-gray-500 mb-4">No CTF rankings yet.</p>
            <Link
              href="/admin/ctf-rankings/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Add CTF Ranking
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {rankings.map((ranking) => (
              <div
                key={ranking.id}
                className="glass-card group hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {ranking.image_url && (
                    <img
                      src={ranking.image_url}
                      alt={ranking.competition_name}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-serif font-bold text-black">
                      {ranking.competition_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Rank #{ranking.rank} - {ranking.year}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/ctf-rankings/edit/${ranking.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(ranking.id)}
                    aria-label="Delete ranking"
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
