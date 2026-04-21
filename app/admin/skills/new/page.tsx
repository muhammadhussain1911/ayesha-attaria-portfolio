"use client";

import Link from "next/link";
import { SkillForm } from "@/components/admin/SkillForm";
import { ArrowLeft } from "lucide-react";

export default function NewSkill() {
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
          <h1 className="text-3xl font-bold text-gray-900">Add New Skill</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <SkillForm />
        </div>
      </div>
    </div>
  );
}
