"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  Award,
  Zap,
  FileText,
  LogOut,
  Trophy,
  Shield,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    skills: 0,
    experience: 0,
    certifications: 0,
    ctfRankings: 0,
    bugBountyPrograms: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error: any) {
      toast.error("Logout failed: " + error.message);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [
          blogs,
          projects,
          skills,
          experience,
          certifications,
          ctfRankings,
          bugBountyPrograms,
        ] = await Promise.all([
          fetch("/api/blogs?admin=true").then((r) => r.json()),
          fetch("/api/projects?admin=true").then((r) => r.json()),
          fetch("/api/skills?admin=true").then((r) => r.json()),
          fetch("/api/experience?admin=true").then((r) => r.json()),
          fetch("/api/certifications?admin=true").then((r) => r.json()),
          fetch("/api/ctf-rankings?admin=true").then((r) => r.json()),
          fetch("/api/bug-bounty-programs?admin=true").then((r) => r.json()),
        ]);

        setStats({
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          skills: Array.isArray(skills) ? skills.length : 0,
          experience: Array.isArray(experience) ? experience.length : 0,
          certifications: Array.isArray(certifications)
            ? certifications.length
            : 0,
          ctfRankings: Array.isArray(ctfRankings) ? ctfRankings.length : 0,
          bugBountyPrograms: Array.isArray(bugBountyPrograms)
            ? bugBountyPrograms.length
            : 0,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const adminItems = [
    {
      icon: BookOpen,
      label: "Blogs",
      href: "/admin/blogs",
      count: stats.blogs,
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Briefcase,
      label: "Projects",
      href: "/admin/projects",
      count: stats.projects,
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: Zap,
      label: "Skills",
      href: "/admin/skills",
      count: stats.skills,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      icon: FileText,
      label: "Experience",
      href: "/admin/experience",
      count: stats.experience,
      color: "bg-green-100 text-green-700",
    },
    {
      icon: Award,
      label: "Certifications",
      href: "/admin/certifications",
      count: stats.certifications,
      color: "bg-red-100 text-red-700",
    },
    {
      icon: Trophy,
      label: "CTF Rankings",
      href: "/admin/ctf-rankings",
      count: stats.ctfRankings,
      color: "bg-orange-100 text-orange-700",
    },
    {
      icon: Shield,
      label: "Bug Bounty Programs",
      href: "/admin/bug-bounty-programs",
      count: stats.bugBountyPrograms,
      color: "bg-pink-100 text-pink-700",
    },
  ];

  return (
    <div className="min-h-screen bg-off-white py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#4ddcd3]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4ddcd3]/10 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-[#4ddcd3]" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-black">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 glass-card shadow-none hover:shadow-soft-sm hover:-translate-y-1 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
          <p className="text-gray-600">
            Manage your portfolio content • {user?.email}
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {adminItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="glass-card group hover:-translate-y-2 transition-all duration-300 p-6 h-full cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ddcd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-black mb-2">
                      {item.label}
                    </h3>
                    <p className="text-4xl font-serif font-bold text-[#4ddcd3] mt-auto pt-4 border-t border-gray-100">
                      {item.count}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
