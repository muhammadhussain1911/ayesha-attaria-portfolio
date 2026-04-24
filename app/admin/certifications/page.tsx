'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Certification } from '@/lib/supabase';
import { useAuth } from '@/app/context/AuthContext';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCertifications() {
  const { session } = useAuth();
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCerts(); }, []);

  const loadCerts = async () => {
    try {
      const response = await fetch('/api/certifications');
      const data = await response.json();
      setCerts(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (response.ok) {
        setCerts(certs.filter((c) => c.id !== id));
        toast.success('Certification deleted');
      } else {
        toast.error('Failed to delete certification');
      }
    } catch {
      toast.error('Error deleting certification');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-teal-600 hover:text-teal-700">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Manage Certifications</h1>
          </div>
          <Link href="/admin/certifications/new" className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
            <Plus className="w-5 h-5" />
            New Certification
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : certs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No certifications yet.</p>
            <Link href="/admin/certifications/new" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
              <Plus className="w-5 h-5" />
              Add Certification
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {certs.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
                  <p className="text-sm text-gray-500">{cert.issuer}</p>
                  <p className="text-sm text-gray-400">{cert.issue_date}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/certifications/edit/${cert.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
