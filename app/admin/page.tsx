'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, Briefcase, Award, Zap, FileText, LogOut } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    skills: 0,
    experience: 0,
    certifications: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error: any) {
      toast.error('Logout failed: ' + error.message);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [blogs, projects, skills, experience, certifications] = await Promise.all([
          fetch('/api/blogs').then((r) => r.json()),
          fetch('/api/projects').then((r) => r.json()),
          fetch('/api/skills').then((r) => r.json()),
          fetch('/api/experience').then((r) => r.json()),
          fetch('/api/certifications').then((r) => r.json()),
        ]);

        setStats({
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          skills: Array.isArray(skills) ? skills.length : 0,
          experience: Array.isArray(experience) ? experience.length : 0,
          certifications: Array.isArray(certifications) ? certifications.length : 0,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const adminItems = [
    {
      icon: BookOpen,
      label: 'Blogs',
      href: '/admin/blogs',
      count: stats.blogs,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Briefcase,
      label: 'Projects',
      href: '/admin/projects',
      count: stats.projects,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      icon: Zap,
      label: 'Skills',
      href: '/admin/skills',
      count: stats.skills,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      icon: FileText,
      label: 'Experience',
      href: '/admin/experience',
      count: stats.experience,
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: Award,
      label: 'Certifications',
      href: '/admin/certifications',
      count: stats.certifications,
      color: 'bg-red-100 text-red-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-teal-600" />
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
          <p className="text-gray-600">Manage your portfolio content • {user?.email}</p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {adminItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full cursor-pointer transform hover:scale-105">
                    <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.label}</h3>
                    <p className="text-3xl font-bold text-teal-600">{item.count}</p>
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
