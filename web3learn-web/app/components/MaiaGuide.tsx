'use client';
import { useState } from 'react';

type MaiaContext = 'home' | 'tracks' | 'games' | 'lesson' | 'quiz';

interface Props {
  context?: MaiaContext;
  message?: string;
}

const DEFAULT_MESSAGES: Record<MaiaContext, string> = {
  home:   'Welcome back! Your streak is going strong. Pick up where you left off.',
  tracks: 'Start with Blockchain Fundamentals if you are new. Each course you finish unlocks new ones.',
  games:  'Games cost a little XP to play, but you earn it back by completing lessons!',
  lesson: 'Great work! You are building real knowledge.',
  quiz:   'Take your time. Read each question carefully. You got this!',
};

export default function MaiaGuide({ context = 'home', message }: Props) {
  const [open, setOpen] = useState(true);

  const text = message ?? DEFAULT_MESSAGES[context];

  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      right: 28,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 10,
      fontFamily: "'Inter', -apple-system, sans-serif",
      animation: 'maiaFloat 3s ease-in-out infinite',
      animationPlayState: open ? 'paused' : 'running',
    }}>
      <style>{`
        @keyframes maiaSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes maiaFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes maiaGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(124,58,237,0.4); }
          50% { box-shadow: 0 0 24px rgba(124,58,237,0.8), 0 0 40px rgba(6,182,212,0.3); }
        }
      `}</style>

      {/* Speech bubble */}
      {open && (
        <div style={{
          width: 300,
          padding: '14px 18px',
          borderRadius: 16,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          animation: 'maiaSlideUp 0.35s ease both',
          position: 'relative',
        }}>
          {/* Bubble tail */}
          <div style={{
            position: 'absolute',
            bottom: -8,
            right: 22,
            width: 16,
            height: 16,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderTop: 'none',
            borderLeft: 'none',
            transform: 'rotate(45deg)',
            borderBottomRightRadius: 3,
          }} />
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>M</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--accent)', marginBottom: 4 }}>
                MAIA
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Avatar button */}
      <button
        onClick={() => setOpen(o => !o)}
        title={open ? 'Hide MAIA' : 'Show MAIA'}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(124,58,237,0.45)',
          transition: 'transform 150ms ease',
          animation: 'maiaGlow 3s ease-in-out infinite',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'scale(1.08)';
          el.style.boxShadow = '0 6px 24px rgba(124,58,237,0.6)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'scale(1)';
          el.style.boxShadow = '0 4px 16px rgba(124,58,237,0.45)';
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', userSelect: 'none' }}>
          {open ? '×' : 'M'}
        </span>
      </button>
    </div>
  );
}
