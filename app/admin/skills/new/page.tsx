"use client";

import Link from "next/link";
import { SkillForm } from "@/components/admin/SkillForm";
import { ArrowLeft } from "lucide-react";

export default function NewSkill() {
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
          <h1 className="text-3xl font-serif font-bold text-black">Add New Skill</h1>
        </div>

        {/* Form */}
        <div className="glass-card p-8 md:p-10">
          <SkillForm />
        </div>
      </div>
    </div>
  );
}
