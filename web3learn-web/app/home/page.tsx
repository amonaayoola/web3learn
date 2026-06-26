'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { getAllTracks } from '../lib/data';
import type { Module, Lesson } from '../lib/types';
import MaiaGuide from '../components/MaiaGuide';
import { getFreshCurrency } from '../lib/currency';

const QUOTES = [
  { text: 'Bitcoin is the beginning of something great: a currency without a government.', author: 'Nassim Nicholas Taleb' },
  { text: 'Blockchain is to trust what the internet was to communication.', author: 'MAIDEN' },
  { text: 'The future of money is digital currency.', author: 'Bill Gates' },
  { text: 'Ethereum is a general-purpose blockchain. It is the internet of blockchains.', author: 'Vitalik Buterin' },
  { text: 'Every expert was once a beginner. Every master was once a student.', author: 'MAIDEN' },
  { text: 'The blockchain cannot be described just as a revolution. It is a tsunami-like phenomenon, slowly advancing and gradually enveloping everything along its way.', author: 'William Mougayar' },
  { text: 'DeFi is not about getting rich quick. It is about rebuilding finance from first principles.', author: 'MAIDEN' },
  { text: 'Web3 is the internet owned by the builders and users, orchestrated with tokens.', author: 'Chris Dixon' },
  { text: 'The most valuable skill in crypto is the ability to keep learning when everyone else has stopped.', author: 'MAIDEN' },
  { text: 'Code is law, but curiosity is the key that unlocks it.', author: 'MAIDEN' },
  { text: 'Cryptography is the art of writing in secret. Blockchain is the art of writing in public and still being trusted.', author: 'MAIDEN' },
  { text: 'Not your keys, not your coins. Knowledge is the only key you truly own.', author: 'MAIDEN' },
  { text: 'We are building the infrastructure of a more fair and open economy, one block at a time.', author: 'Changpeng Zhao' },
  { text: 'The best time to learn about Web3 was five years ago. The second best time is today.', author: 'MAIDEN' },
];

function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 17) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
}

function QuoteRotator() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const q = QUOTES[idx];
  return (
    <div style={{ transition: 'opacity 0.5s ease', opacity: visible ? 1 : 0, marginBottom: 20 }}>
      <p style={{
        margin: '0 0 6px',
        fontSize: 15,
        fontStyle: 'italic',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        maxWidth: 560,
      }}>
        &ldquo;{q.text}&rdquo;
      </p>
      <p style={{ margin: 0, fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500, letterSpacing: '0.04em' }}>
        {q.author}
      </p>
    </div>
  );
}

const RANKS = [
  { title: 'Newcomer', min: 0,    emoji: '🌱' },
  { title: 'Explorer', min: 100,  emoji: '🔭' },
  { title: 'Builder',  min: 300,  emoji: '⚒️' },
  { title: 'Developer',min: 700,  emoji: '💻' },
  { title: 'Architect',min: 1500, emoji: '🏗️' },
  { title: 'Expert',   min: 3000, emoji: '⚡' },
  { title: 'Master',   min: 6000, emoji: '👑' },
];

function GlassCard({
  children, style = {}, glowColor, onClick, glass = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  onClick?: () => void;
  glass?: boolean;
}) {
  const baseBg = glass ? 'rgba(255,255,255,0.04)' : 'var(--bg-card)';
  const hoverBg = glass ? 'rgba(255,255,255,0.07)' : 'var(--bg-card-hover)';
  return (
    <div
      onClick={onClick}
      style={{
        background: baseBg,
        backdropFilter: glass ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: glass ? 'blur(16px)' : undefined,
        border: `1px solid ${glass ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`,
        borderRadius: 20, transition: 'all 200ms ease', cursor: onClick ? 'pointer' : 'default', ...style,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = hoverBg;
        el.style.borderColor = glass ? 'rgba(255,255,255,0.12)' : 'var(--border-hover)';
        if (glowColor) el.style.boxShadow = `0 8px 32px ${glowColor}28`;
        if (onClick) el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = baseBg;
        el.style.borderColor = glass ? 'rgba(255,255,255,0.08)' : 'var(--border)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </div>
  );
}


export default function HomePage() {
  const { xp: progressXp, streak, hearts, completedLessons, completedQuizzes } = useProgress();
  const [storedCurrency, setStoredCurrency] = useState({ xp: 0, mp: 0 });
  useEffect(() => { setStoredCurrency(getFreshCurrency()); }, []);
  // Read XP and MP from maiden_user (source of truth)
  const xp = storedCurrency.xp || progressXp;
  const mp = storedCurrency.mp;
  const { email, isGuest } = useAuth();
  const tracks = getAllTracks();

  const rankIdx  = RANKS.reduce((b, r, i) => xp >= r.min ? i : b, 0);
  const rank     = RANKS[rankIdx];
  const nextRank = RANKS[rankIdx + 1];
  const pct = nextRank
    ? Math.min(100, Math.round(((xp - rank.min) / (nextRank.min - rank.min)) * 100))
    : 100;

  let continueTrack = null, continueMod: Module | null = null;
  outer: for (const t of tracks) {
    for (const m of t.modules) {
      const done = m.lessons.filter((l: Lesson) => completedLessons.includes(l.id)).length;
      if (done > 0 && done < m.lessons.length) { continueTrack = t; continueMod = m; break outer; }
    }
  }
  if (!continueTrack) {
    outer2: for (const t of tracks) {
      for (const m of t.modules) {
        const done = m.lessons.filter((l: Lesson) => completedLessons.includes(l.id)).length;
        if (done === 0) { continueTrack = t; continueMod = m; break outer2; }
      }
    }
  }

  const totalLessons = tracks.reduce((s, t) =>
    s + t.modules.reduce((ms: number, m: Module) => ms + m.lessons.length, 0), 0);
  const [storedName, setStoredName] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('maiden_user');
      if (raw) {
        const parsed = JSON.parse(raw) as { name?: string };
        if (parsed.name) setStoredName(parsed.name);
      }
    } catch { /* ignore */ }
  }, []);
  const displayName = storedName ?? (isGuest ? 'Explorer' : (email?.split('@')[0] ?? 'Explorer'));

  return (
    <DashboardLayout>
      {/* Greeting */}
      <section style={{ marginBottom: 52, animation: 'fadeUp 0.5s ease both' }}>
        <QuoteRotator />
        <h1 style={{ margin: 0, fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--text-primary)' }}>
          {getGreeting(displayName)}.
        </h1>
      </section>

      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 48, animation: 'fadeUp 0.5s 0.07s ease both' }}>
        {[
          { label: 'Total XP',      value: xp.toLocaleString(),          sub: `${rank.emoji} ${rank.title}`, accent: 'var(--gold)',    glow: '#ff9f0a' },
          { label: 'MAIDEN Points', value: mp.toLocaleString(),           sub: 'spend to play games',         accent: '#A78BFA',        glow: '#8B5CF6' },
          { label: 'Lessons Done',  value: `${completedLessons.length}`,  sub: `of ${totalLessons}`,          accent: 'var(--success)', glow: '#30d158' },
          { label: 'Day Streak',    value: `${streak}`,                   sub: 'days in a row',               accent: 'var(--orange)',  glow: '#ff6b35' },
        ].map(s => (
          <GlassCard key={s.label} glowColor={s.glow} glass={true} style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase' }}>
              {s.label}
            </div>
            <div style={{ fontSize: 44, fontWeight: 700, color: s.accent, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub}</div>
          </GlassCard>
        ))}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div>
          {/* Continue learning */}
          {continueTrack && continueMod && (
            <section style={{ marginBottom: 44, animation: 'fadeUp 0.5s 0.12s ease both' }}>
              <p style={{ margin: '0 0 14px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>
                CONTINUE LEARNING
              </p>
              <Link href={`/track/${continueTrack.id}/module/${continueMod.id}`} style={{ display: 'block' }}>
                <GlassCard
                  glowColor={continueTrack.gradient?.[0] ?? '#0A6FFF'}
                  onClick={() => {}}
                  style={{ padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18 }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: 'var(--bg-card-hover)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                  }}>{continueMod.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: 4, letterSpacing: '0.04em' }}>
                      {continueTrack.title.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>
                      {continueMod.title}
                    </div>
                    <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', marginBottom: 5 }}>
                      <div style={{
                        height: '100%',
                        width: `${(continueMod.lessons.filter((l: Lesson) => completedLessons.includes(l.id)).length / continueMod.lessons.length) * 100}%`,
                        background: 'var(--accent)', borderRadius: 2, transition: 'width 0.8s ease',
                      }} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                      {continueMod.lessons.filter((l: Lesson) => completedLessons.includes(l.id)).length} / {continueMod.lessons.length} lessons
                    </div>
                  </div>
                  <div style={{ fontSize: 20, color: 'var(--text-disabled)', flexShrink: 0 }}>›</div>
                </GlassCard>
              </Link>
            </section>
          )}

          {/* Track grid */}
          <section style={{ animation: 'fadeUp 0.5s 0.17s ease both' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>LEARNING TRACKS</p>
              <Link href="/tracks" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>View all</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {tracks.slice(0, 6).map(track => {
                const total = track.modules.reduce((s: number, m: Module) => s + m.lessons.length, 0);
                const done  = track.modules.reduce((s: number, m: Module) => s + m.lessons.filter((l: Lesson) => completedLessons.includes(l.id)).length, 0);
                const p = total > 0 ? Math.round((done/total)*100) : 0;
                const g0 = track.gradient?.[0] ?? '#0A6FFF';
                const g1 = track.gradient?.[1] ?? '#0A6FFF';
                return (
                  <Link key={track.id} href={`/track/${track.id}`} style={{ display: 'block' }}>
                    <GlassCard glowColor={g0} onClick={() => {}} style={{ padding: '18px', overflow: 'hidden' }}>
                      <div style={{ height: 2, background: `linear-gradient(90deg,${g0},${g1})`, borderRadius: 1, marginBottom: 14 }} />
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{track.emoji}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{track.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 12 }}>{track.modules.length} modules</div>
                      <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
                        <div style={{ height: '100%', width: `${p}%`, background: `linear-gradient(90deg,${g0},${g1})`, borderRadius: 2, transition: 'width 0.8s ease' }} />
                      </div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-disabled)' }}>{p}%</div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <GlassCard glowColor="#a855f7" style={{ padding: '20px' }}>
            <p style={{ margin: '0 0 14px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>RANK</p>
            <div style={{ fontSize: 30, marginBottom: 5 }}>{rank.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 3 }}>{rank.title}</div>
            <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>{xp.toLocaleString()} XP</div>
            {nextRank && (
              <>
                <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', marginBottom: 5 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 2, transition: 'width 0.8s ease' }} />
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--text-disabled)' }}>{(nextRank.min - xp).toLocaleString()} XP to {nextRank.title}</div>
              </>
            )}
          </GlassCard>

          <GlassCard style={{ padding: '20px' }}>
            <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>ACTIVITY</p>
            {[
              { icon: '📖', label: 'Lessons done', value: completedLessons.length },
              { icon: '🧩', label: 'Quizzes',      value: completedQuizzes.length },
              { icon: '🔥', label: 'Streak',       value: `${streak}d`            },
              { icon: '❤️', label: 'Lives',        value: hearts                  },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{row.icon} {row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{row.value}</span>
              </div>
            ))}
          </GlassCard>

          <GlassCard style={{ padding: '20px' }}>
            <p style={{ margin: '0 0 10px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>NAVIGATE</p>
            {[
              { href: '/tracks',      label: 'All Tracks'   },
              { href: '/progress',    label: 'My Progress'  },
              { href: '/leaderboard', label: 'Leaderboard'  },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0',
                borderBottom: item.href !== '/leaderboard' ? '1px solid var(--border-subtle)' : 'none',
                color: 'var(--text-secondary)', fontSize: 14, transition: 'color 150ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
              >
                <span>{item.label}</span>
                <span style={{ color: 'var(--text-disabled)', fontSize: 16 }}>›</span>
              </Link>
            ))}
          </GlassCard>
        </div>
      </div>
      <MaiaGuide context="home" />
    </DashboardLayout>
  );
}
