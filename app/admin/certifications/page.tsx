"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Certification } from "@/lib/supabase";
import { useAuth } from "@/app/context/AuthContext";
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminCertifications() {
  const { session } = useAuth();
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    try {
      const response = await fetch("/api/certifications?admin=true");
      const data = await response.json();
      setCerts(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load certifications");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certification?")) return;
    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (response.ok) {
        setCerts(certs.filter((c) => c.id !== id));
        toast.success("Certification deleted");
      } else {
        toast.error("Failed to delete certification");
      }
    } catch {
      toast.error("Error deleting certification");
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
              Manage Certifications
            </h1>
          </div>
          <Link
            href="/admin/certifications/new"
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            New Certification
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
          </div>
        ) : certs.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-gray-500 mb-4">No certifications yet.</p>
            <Link
              href="/admin/certifications/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all shadow-soft-sm hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Add Certification
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {certs.map((cert) => (
              <div
                key={cert.id}
                className="glass-card group hover:-translate-y-1 transition-all duration-300 p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-serif font-bold text-black">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-500">{cert.issuer}</p>
                  <p className="text-sm text-gray-400">{cert.issue_date}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/certifications/edit/${cert.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(cert.id)}
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
