"use client";

import { useEffect, useState } from "react";
import { BugBountyProgramForm } from "@/components/admin/BugBountyProgramForm";
import { BugBountyProgram } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function EditBugBountyProgram({
  params,
}: {
  params: { id: string };
}) {
  const [program, setProgram] = useState<BugBountyProgram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgram = async () => {
      try {
        const response = await fetch(`/api/bug-bounty-programs/${params.id}`);
        if (!response.ok) throw new Error("Failed to load program");
        const data = await response.json();
        setProgram(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load program");
      } finally {
        setLoading(false);
      }
    };

    loadProgram();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
      </div>
    );
  }

  if (!program) {
    return <div>Bug bounty program not found</div>;
  }

  return <BugBountyProgramForm initialData={program} isEditing />;
}
