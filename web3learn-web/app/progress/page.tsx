'use client';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout';
import { useProgress } from '../context/ProgressContext';
import { getAllTracks } from '../lib/data';
import type { Module, Lesson } from '../lib/types';

const RANKS = [
  { title: 'Newcomer',  min: 0,    next: 100,      emoji: '🌱' },
  { title: 'Explorer',  min: 100,  next: 300,      emoji: '🔭' },
  { title: 'Builder',   min: 300,  next: 700,      emoji: '⚒️' },
  { title: 'Developer', min: 700,  next: 1500,     emoji: '💻' },
  { title: 'Architect', min: 1500, next: 3000,     emoji: '🏗️' },
  { title: 'Expert',    min: 3000, next: 6000,     emoji: '⚡' },
  { title: 'Master',    min: 6000, next: Infinity, emoji: '👑' },
];

export default function ProgressPage() {
  const { xp, streak, hearts, completedLessons, completedQuizzes } = useProgress();
  const tracks = getAllTracks();

  const rankIdx = RANKS.reduce((best, r, i) => xp >= r.min ? i : best, 0);
  const rank    = RANKS[rankIdx];
  const nextRank = RANKS[rankIdx + 1];
  const pct = nextRank && nextRank.next !== Infinity
    ? Math.min(100, Math.round(((xp - rank.min) / (nextRank.min - rank.min)) * 100))
    : rankIdx === RANKS.length - 1 ? 100
    : Math.min(100, Math.round(((xp - rank.min) / (rank.next - rank.min)) * 100));

  const totalLessons = tracks.reduce((s, t) => s + t.modules.reduce((ms: number, m: Module) => ms + m.lessons.length, 0), 0);
  const totalQuizzes = tracks.reduce((s, t) => s + t.modules.length, 0);
  const completionPct = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  const trackProgress = tracks.map(t => {
    const total = t.modules.reduce((s: number, m: Module) => s + m.lessons.length, 0);
    const done  = t.modules.reduce((s: number, m: Module) => s + m.lessons.filter((l: Lesson) => completedLessons.includes(l.id)).length, 0);
    return { ...t, done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  }).filter(t => t.done > 0).sort((a, b) => b.pct - a.pct);

  const milestones = RANKS.filter(r => r.min > xp).slice(0, 3).map(r => ({ ...r, needed: r.min - xp }));

  return (
    <DashboardLayout title="Progress">
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 48, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Progress.
        </h1>
        <p style={{ margin: 0, fontSize: 16, color: 'var(--text-tertiary)' }}>Track your learning journey.</p>
      </section>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 36 }}>
        {[
          { label: 'TOTAL XP',       value: xp.toLocaleString(),                         accent: 'var(--gold)'    },
          { label: 'LESSONS DONE',   value: `${completedLessons.length}/${totalLessons}`, accent: 'var(--success)' },
          { label: 'QUIZZES PASSED', value: `${completedQuizzes.length}/${totalQuizzes}`, accent: 'var(--accent)'  },
          { label: 'DAY STREAK',     value: `${streak}`,                                  accent: 'var(--orange)'  },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '22px 24px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em', marginBottom: 12 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.accent, letterSpacing: '-0.025em', lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Rank journey */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '24px' }}>
            <p style={{ margin: '0 0 18px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>RANK JOURNEY</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {RANKS.map((r, i) => {
                const isCur  = i === rankIdx;
                const isPast = i < rankIdx;
                const rankPct = isPast ? 100 : isCur ? pct : 0;
                return (
                  <div key={r.title} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 14px', borderRadius: 12,
                    background: isCur ? 'var(--accent-subtle)' : 'transparent',
                    border: `1px solid ${isCur ? 'var(--accent-glow)' : isPast ? 'var(--success-bg)' : 'var(--border-subtle)'}`,
                    opacity: i > rankIdx ? 0.4 : 1,
                  }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{r.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 13, fontWeight: isCur ? 600 : 400, color: isCur ? 'var(--text-primary)' : isPast ? 'var(--text-tertiary)' : 'var(--text-disabled)' }}>
                          {r.title}
                          {isCur && <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--accent)', fontWeight: 600 }}>← YOU</span>}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text-disabled)' }}>{r.min.toLocaleString()} XP</span>
                      </div>
                      <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${rankPct}%`,
                          background: isPast ? 'var(--success)' : isCur ? 'var(--accent)' : 'transparent',
                          borderRadius: 2, transition: 'width 0.5s',
                        }} />
                      </div>
                    </div>
                    {isPast && <span style={{ fontSize: 14, flexShrink: 0, color: 'var(--success)' }}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course completion */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '24px' }}>
            <p style={{ margin: '0 0 16px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>COURSE COMPLETION</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>{completionPct}%</div>
              <div style={{ flex: 1 }}>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ height: '100%', width: `${completionPct}%`, background: 'var(--accent)', borderRadius: 3, transition: 'width 0.6s', boxShadow: '0 0 8px var(--accent-glow)' }} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{totalLessons - completedLessons.length} lessons remaining</div>
              </div>
            </div>

            {trackProgress.length > 0 ? (
              <>
                <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-disabled)', letterSpacing: '0.06em' }}>TRACKS IN PROGRESS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {trackProgress.map(t => (
                    <Link key={t.id} href={`/track/${t.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12,
                        background: 'var(--bg-card-low)', border: '1px solid var(--border-subtle)', transition: 'all 150ms',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-low)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'; }}
                      >
                        <div style={{
                          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                          background: t.gradient ? `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})` : 'var(--accent)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                        }}>{t.emoji}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{t.title}</span>
                            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{t.done}/{t.total}</span>
                          </div>
                          <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${t.pct}%`, background: t.gradient ? t.gradient[0] : 'var(--accent)', borderRadius: 2 }} />
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0, minWidth: 28, textAlign: 'right' }}>{t.pct}%</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <p style={{ color: 'var(--text-tertiary)', fontSize: 14, marginBottom: 14 }}>No progress yet. Start learning!</p>
                <Link href="/tracks" style={{
                  display: 'inline-block', padding: '10px 20px', borderRadius: 10,
                  background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
                }}>Browse Tracks →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div style={{ background: 'var(--accent-subtle)', border: '1px solid var(--accent-glow)', borderRadius: 20, padding: '22px' }}>
            <p style={{ margin: '0 0 14px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-disabled)', letterSpacing: '0.06em' }}>CURRENT RANK</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: 'var(--accent-subtle)', border: '1px solid var(--accent-glow)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>{rank.emoji}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{rank.title}</div>
                <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500 }}>{xp.toLocaleString()} XP</div>
              </div>
            </div>
            {nextRank && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>→ {nextRank.emoji} {nextRank.title}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{pct}%</span>
                </div>
                <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: 7 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 3, transition: 'width 0.6s', boxShadow: '0 0 6px var(--accent-glow)' }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-disabled)' }}>{(nextRank.min - xp).toLocaleString()} XP to go</div>
              </>
            )}
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '20px' }}>
            <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>LIVES</p>
            <div style={{ display: 'flex', gap: 7, marginBottom: 10 }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ fontSize: 24, opacity: i <= hearts ? 1 : 0.12 }}>❤️</span>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
              {hearts === 5 ? 'Full hearts!' : `${hearts} of 5 remaining`}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-disabled)', marginTop: 4 }}>Lost on wrong answers. Refill over time.</div>
          </div>

          {milestones.length > 0 && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '20px' }}>
              <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>NEXT MILESTONES</p>
              {milestones.map((m, i) => (
                <div key={m.title} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 0',
                  borderBottom: i < milestones.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}>
                  <span style={{ fontSize: 20, opacity: 0.55 }}>{m.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-tertiary)' }}>{m.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-disabled)' }}>{m.needed.toLocaleString()} XP needed</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-disabled)' }}>{m.min.toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '20px' }}>
            <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>EARN XP</p>
            {[
              { icon: '📖', text: 'Complete a lesson',    xp: '+20 XP'        },
              { icon: '🧩', text: 'Pass a module quiz',   xp: 'up to +100 XP' },
              { icon: '🔥', text: 'Maintain your streak', xp: 'bonus XP'      },
            ].map((tip, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0',
                borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <span style={{ fontSize: 15 }}>{tip.icon}</span>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--text-tertiary)' }}>{tip.text}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)' }}>{tip.xp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
