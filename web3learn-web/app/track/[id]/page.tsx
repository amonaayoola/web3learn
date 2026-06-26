'use client';
import { use } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';
import { useProgress } from '../../context/ProgressContext';
import tracks from '../../data';
import type { Lesson } from '../../lib/types';

const LEVEL_COLORS: Record<string, string> = {
  beginner:     '#30d158',
  intermediate: '#ff9f0a',
  expert:       '#ff453a',
};

export default function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isLessonCompleted, isQuizCompleted } = useProgress();

  const track = tracks.find(t => t.id === id);
  if (!track) return null;

  const g0 = track.gradient?.[0] ?? '#0A6FFF';
  const g1 = track.gradient?.[1] ?? '#0A6FFF';

  return (
    <DashboardLayout>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 40, fontSize: 13, color: 'var(--text-tertiary)' }}>
        <Link href="/tracks" style={{ color: 'var(--text-tertiary)', transition: 'color 150ms' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >Tracks</Link>
        <span>›</span>
        <span style={{ color: 'var(--text-primary)' }}>{track.title}</span>
      </div>

      {/* Hero: subtle gradient wash behind */}
      <section style={{
        marginBottom: 60, animation: 'fadeUp 0.45s ease both', position: 'relative',
        padding: '36px 36px 40px',
        borderRadius: 24,
        background: `linear-gradient(135deg, ${g0}10, ${g1}08, var(--bg-card))`,
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 72, marginBottom: 18, lineHeight: 1 }}>{track.emoji}</div>
        <div style={{ display: 'inline-block', marginBottom: 14, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--accent)', padding: '4px 12px', borderRadius: 999, background: 'var(--accent-subtle)', border: '1px solid var(--accent-glow)' }}>
          {track.category.toUpperCase()}
        </div>
        <h1 style={{ margin: '0 0 16px', fontSize: 56, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
          {track.title}
        </h1>
        <p style={{ margin: '0 0 24px', fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 560 }}>
          {track.description}
        </p>
        <div style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
          {track.modules.length} modules · {track.modules.reduce((s, m) => s + m.lessons.length, 0)} lessons
        </div>
      </section>

      {/* Module grid */}
      <section>
        <p style={{ margin: '0 0 18px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>MODULES</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {track.modules.map((mod, i) => {
            const lc       = LEVEL_COLORS[mod.level] ?? '#0A6FFF';
            const done     = mod.lessons.filter((l: Lesson) => isLessonCompleted(l.id)).length;
            const p        = mod.lessons.length > 0 ? done / mod.lessons.length : 0;
            const quizDone = isQuizCompleted(mod.id);
            const full     = p >= 1 && quizDone;

            return (
              <Link key={mod.id} href={`/track/${track.id}/module/${mod.id}`}
                style={{ display: 'block', animation: `fadeUp 0.4s ${i*0.07}s ease both` }}
              >
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 20, overflow: 'hidden', transition: 'all 200ms ease', height: '100%',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'var(--bg-card-hover)';
                  el.style.borderColor = 'var(--border-hover)';
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = `0 8px 28px ${lc}20`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'var(--bg-card)';
                  el.style.borderColor = 'var(--border)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
                >
                  <div style={{ height: 2, background: lc }} />
                  <div style={{ padding: '22px' }}>
                    <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 600, padding: '3px 9px', borderRadius: 999, color: lc, background: lc+'14', border: `1px solid ${lc}28`, letterSpacing: '0.04em', textTransform: 'capitalize' }}>
                        {mod.level}
                      </span>
                      {full && <span style={{ fontSize: 10.5, fontWeight: 600, padding: '3px 9px', borderRadius: 999, color: 'var(--success)', background: 'var(--success-bg)', border: '1px solid var(--success)28' }}>✓ Done</span>}
                    </div>
                    <div style={{ fontSize: 30, marginBottom: 10 }}>{mod.emoji}</div>
                    <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                      {mod.title}
                    </h3>
                    <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{mod.description}</p>
                    <div style={{ fontSize: 12, color: 'var(--text-disabled)', marginBottom: 10 }}>
                      {mod.lessons.length} lessons · {mod.quiz.length} quiz questions
                    </div>
                    <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
                      <div style={{ height: '100%', width: `${p*100}%`, background: lc, borderRadius: 2, transition: 'width 0.8s ease' }} />
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-disabled)' }}>{done}/{mod.lessons.length}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </DashboardLayout>
  );
}
