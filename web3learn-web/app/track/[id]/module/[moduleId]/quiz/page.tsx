'use client';
import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../../context/AuthContext';
import tracks from '../../../../../data';
import QuizClient from './QuizClient';

const LEVEL_COLORS: Record<string,string> = { beginner:'#00C896', intermediate:'#F59E0B', expert:'#EF4444' };

export default function QuizPage({ params }: { params: Promise<{ id:string; moduleId:string }> }) {
  const { id, moduleId } = use(params);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !isAuthenticated) router.replace('/auth'); }, [loading,isAuthenticated,router]);

  const track = tracks.find(t => t.id === id);
  const mod = track?.modules.find(m => m.id === moduleId);
  if (!track || !mod) return null;

  return <QuizClient track={track} mod={mod} color={LEVEL_COLORS[mod.level] || '#0071E3'} />;
}
