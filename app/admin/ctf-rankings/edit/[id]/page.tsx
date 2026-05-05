'use client';

import { useEffect, useState } from 'react';
import { CTFRankingForm } from '@/components/admin/CTFRankingForm';
import { CTFRanking } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function EditCTFRanking({ params }: { params: { id: string } }) {
  const [ranking, setRanking] = useState<CTFRanking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRanking = async () => {
      try {
        const response = await fetch(`/api/ctf-rankings/${params.id}`);
        if (!response.ok) throw new Error('Failed to load ranking');
        const data = await response.json();
        setRanking(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to load ranking');
      } finally {
        setLoading(false);
      }
    };

    loadRanking();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ddcd3]"></div>
      </div>
    );
  }

  if (!ranking) {
    return <div>CTF ranking not found</div>;
  }

  return <CTFRankingForm initialData={ranking} isEditing />;
}
