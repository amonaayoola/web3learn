'use client';
import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../../components/DashboardLayout';
import WeakSpotReview from '../../../../components/WeakSpotReview';
import { useProgress } from '../../../../context/ProgressContext';
import { getWeakSpots } from '../../../../lib/weakSpots';
import tracks from '../../../../data';

const LEVEL_COLORS: Record<string, string> = {
  beginner:     '#30d158',
  intermediate: '#ff9f0a',
  expert:       '#ff453a',
};

export default function ModulePage({ params }: { params: Promise<{ id: string; moduleId: string }> }) {
  const { id, moduleId } = use(params);
  const router = useRouter();
  const { isLessonCompleted, isQuizCompleted } = useProgress();
  const [showReview, setShowReview] = useState(false);
  const [weakCount, setWeakCount] = useState(0);

  const track = tracks.find(t => t.id === id);
  const mod   = track?.modules.find(m => m.id === moduleId);

  // Count weak spots from this module's lessons (client-only; localStorage).
  useEffect(() => {
    if (!track || !mod) return;
    const ids = new Set(mod.lessons.map(l => l.id));
    setWeakCount(getWeakSpots(track.id).filter(w => ids.has(w.lessonId)).length);
  }, [track, mod, showReview]);

  if (!track || !mod) return null;

  const lc       = LEVEL_COLORS[mod.level] || '#0A6FFF';
  const done     = mod.lessons.filter(l => isLessonCompleted(l.id)).length;
  const total    = mod.lessons.length;
  const allDone  = done === total;
  const quizDone = isQuizCompleted(mod.id);
  const pct      = total > 0 ? Math.round((done/total)*100) : 0;

  return (
    <DashboardLayout>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 36, fontSize: 13, color: 'var(--text-tertiary)' }}>
        <Link href="/tracks" style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >Tracks</Link>
        <span>›</span>
        <Link href={`/track/${track.id}`} style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >{track.title}</Link>
        <span>›</span>
        <span style={{ color: 'var(--text-primary)' }}>{mod.title}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28 }}>
        <div>
          {/* Module header */}
          <section style={{ marginBottom: 36, padding: '28px 32px', borderRadius: 20, background: `linear-gradient(135deg,${lc}10,var(--bg-card))`, border: `1px solid ${lc}25` }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, color: lc, background: lc+'14', border: `1px solid ${lc}28`, letterSpacing: '0.04em', textTransform: 'capitalize' }}>
                {mod.level}
              </span>
              {quizDone && <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, color: 'var(--success)', background: 'var(--success-bg)', border: '1px solid var(--success)' }}>✓ Complete</span>}
            </div>
            <div style={{ fontSize: 52, marginBottom: 12 }}>{mod.emoji}</div>
            <h1 style={{ margin: '0 0 10px', fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {mod.title}
            </h1>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{mod.description}</p>
          </section>

          {/* Lessons */}
          <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>
            LESSONS: {done}/{total}
          </p>
          {mod.lessons.map((lesson, i) => {
            const ld       = isLessonCompleted(lesson.id);
            const prevDone = i === 0 || isLessonCompleted(mod.lessons[i-1].id);
            const locked   = !prevDone;
            return (
              <div key={lesson.id}
                onClick={() => !locked && router.push(`/track/${track.id}/module/${mod.id}/lesson/${lesson.id}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 16px', borderRadius: 12, marginBottom: 6,
                  background: 'var(--bg-card)',
                  border: `1px solid ${ld ? lc+'30' : 'var(--border)'}`,
                  cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.35 : 1,
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={e => { if (!locked) { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--bg-card-hover)'; el.style.borderColor = ld ? lc+'50' : 'var(--border-hover)'; } }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--bg-card)'; el.style.borderColor = ld ? lc+'30' : 'var(--border)'; }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: ld ? lc : 'var(--bg-card-hover)',
                  fontSize: 13, fontWeight: 700,
                  color: ld ? '#000' : 'var(--text-tertiary)',
                  boxShadow: ld ? `0 0 12px ${lc}40` : 'none',
                }}>
                  {ld ? '✓' : i+1}
                </div>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: locked ? 'var(--text-disabled)' : 'var(--text-primary)', lineHeight: 1.3 }}>
                  {lesson.title}
                </span>
                {ld   && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}>+{lesson.xp ?? 20} XP</span>}
                {locked && <span style={{ fontSize: 14 }}>🔒</span>}
                {!locked && !ld && <span style={{ fontSize: 16, color: 'var(--text-disabled)' }}>›</span>}
              </div>
            );
          })}

          {/* Quiz */}
          <div style={{ marginTop: 28 }}>
            <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>MODULE QUIZ</p>
            <div
              onClick={() => allDone && router.push(`/track/${track.id}/module/${mod.id}/quiz`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 20px', borderRadius: 14,
                background: 'var(--bg-card)',
                border: `1.5px solid ${allDone ? lc+'40' : 'var(--border)'}`,
                cursor: allDone ? 'pointer' : 'not-allowed',
                opacity: allDone ? 1 : 0.4,
                transition: 'all 150ms ease',
              }}
              onMouseEnter={e => { if (allDone) { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--bg-card-hover)'; el.style.borderColor = lc+'70'; el.style.boxShadow = `0 0 20px ${lc}18`; } }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--bg-card)'; el.style.borderColor = allDone ? lc+'40' : 'var(--border)'; el.style.boxShadow = 'none'; }}
            >
              <span style={{ fontSize: 32 }}>{quizDone ? '🏆' : '📝'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: allDone ? lc : 'var(--text-tertiary)', marginBottom: 3 }}>
                  {quizDone ? 'Quiz Complete!' : 'Module Quiz'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
                  {allDone ? quizDone ? `${mod.quizXp ?? 100} XP earned · ${mod.quiz.length} questions` : `${mod.quiz.length} questions · ${mod.quizXp ?? 100} XP` : 'Complete all lessons to unlock'}
                </div>
              </div>
              {allDone && !quizDone && (
                <div style={{ padding: '8px 18px', borderRadius: 8, background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600 }}>Start →</div>
              )}
            </div>
          </div>

          {/* End-of-module weak-spot review */}
          {allDone && weakCount > 0 && (
            <div style={{ marginTop: 28 }}>
              <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>KNOWLEDGE GAP REVIEW</p>
              <div
                onClick={() => setShowReview(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', borderRadius: 14,
                  background: `linear-gradient(135deg, var(--gold)12, var(--bg-card))`,
                  border: '1.5px solid var(--gold)40', cursor: 'pointer', transition: 'all 150ms ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--gold)'; el.style.boxShadow = '0 0 20px rgba(245,158,11,0.18)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--gold)40'; el.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: 32 }}>🎯</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--gold)', marginBottom: 3 }}>Revisit your weak spots</div>
                  <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
                    {weakCount} question{weakCount === 1 ? '' : 's'} you missed · close the gap for +50% bonus XP
                  </div>
                </div>
                <div style={{ padding: '8px 18px', borderRadius: 8, background: 'var(--gold)', color: '#000', fontSize: 14, fontWeight: 700 }}>Review →</div>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '22px' }}>
            <p style={{ margin: '0 0 14px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>PROGRESS</p>
            <div style={{ fontSize: 42, fontWeight: 800, color: lc, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 5, textShadow: `0 0 20px ${lc}40` }}>{pct}%</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>{done} of {total} lessons</div>
            <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: lc, borderRadius: 3, transition: 'width 0.8s ease', boxShadow: `0 0 8px ${lc}60` }} />
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '22px' }}>
            <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>MODULE INFO</p>
            {[
              { label: 'Level',     value: mod.level.charAt(0).toUpperCase()+mod.level.slice(1) },
              { label: 'Lessons',   value: `${total}` },
              { label: 'Quiz',      value: `${mod.quiz.length} questions` },
              { label: 'XP reward', value: `${mod.lessons.reduce((s, l) => s + (l.xp ?? 20), 0) + (mod.quizXp ?? 100)}` },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{row.value}</span>
              </div>
            ))}
          </div>

          <Link href={`/track/${track.id}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 12, transition: 'all 150ms ease',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--bg-card-hover)'; el.style.borderColor = 'var(--border-hover)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--bg-card)'; el.style.borderColor = 'var(--border)'; }}
            >
              <span style={{ fontSize: 26 }}>{track.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{track.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{track.modules.length} modules</div>
              </div>
              <span style={{ color: 'var(--text-disabled)', fontSize: 18 }}>›</span>
            </div>
          </Link>
        </div>
      </div>

      {showReview && (
        <WeakSpotReview
          track={track}
          lessonIds={mod.lessons.map(l => l.id)}
          color={lc}
          onClose={() => setShowReview(false)}
        />
      )}
    </DashboardLayout>
  );
}
