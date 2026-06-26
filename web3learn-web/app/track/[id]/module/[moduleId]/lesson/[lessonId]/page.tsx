'use client';
import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../../../context/AuthContext';
import tracks from '../../../../../../data';
import LessonViewer from './LessonViewer';

const LEVEL_COLORS: Record<string,string> = { beginner:'#00C896', intermediate:'#F59E0B', expert:'#EF4444' };
const MODULE_COLORS = ['#00B4A0','#FF3B5C','#FF9500','#AF52DE','#32ADE6','#FF2D55'];

export default function LessonPage({ params }: { params: Promise<{ id:string; moduleId:string; lessonId:string }> }) {
  const { id, moduleId, lessonId } = use(params);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !isAuthenticated) router.replace('/auth'); }, [loading,isAuthenticated,router]);

  const track = tracks.find(t => t.id === id);
  const mod = track?.modules.find(m => m.id === moduleId);
  const lesson = mod?.lessons.find(l => l.id === lessonId);
  if (!track || !mod || !lesson) return null;

  const color = LEVEL_COLORS[mod.level] || '#0071E3';
  const lessonIdx = mod.lessons.findIndex(l => l.id === lessonId);
  const nextLesson = mod.lessons[lessonIdx + 1] ?? null;

  return <LessonViewer track={track} mod={mod} lesson={lesson} color={color} nextLesson={nextLesson} />;
}
