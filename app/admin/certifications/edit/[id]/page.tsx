"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Certification } from "@/lib/supabase";
import { CertificationForm } from "@/components/admin/CertificationForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

interface EditCertificationPageProps {
  params: Promise<{ id: string }>;
}

export default function EditCertification({
  params,
}: EditCertificationPageProps) {
  const [id, setId] = useState("");
  const [certification, setCertification] = useState<Certification | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { id: idParam } = await params;
      setId(idParam);
    })();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const loadCertification = async () => {
      try {
        const response = await fetch(`/api/certifications/${id}`);
        if (!response.ok) throw new Error("Failed to load certification");
        const data = await response.json();
        setCertification(data);
      } catch (error) {
        toast.error("Failed to load certification");
      } finally {
        setLoading(false);
      }
    };

    loadCertification();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white py-12 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
      </div>
    );
  }

  if (!certification) {
    return (
      <div className="min-h-screen bg-off-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Certification not found</p>
          <Link href="/admin/certifications" className="text-[#4ddcd3] hover:text-[#3db5a1]">
            Back to Certifications
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
            href="/admin/certifications"
            className="text-black hover:text-[#4ddcd3] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-black">
            Edit Certification
          </h1>
        </div>

        {/* Form */}
        <div className="glass-card p-8 md:p-10">
          <CertificationForm initialData={certification} isEditing />
        </div>
      </div>
    </div>
  );
}
