'use client';
import Logo from './Logo';

const CREAM = '#f4f0ea';
const BG = '#0a0806';

export type ShareLevel = 'beginner' | 'intermediate' | 'expert';

const LEVEL_META: Record<ShareLevel, { label: string; emoji: string; line: string; tint: string }> = {
  beginner: { label: 'BEGINNER', emoji: '\u{1F331}', line: 'Just started my web3 journey on MAIDEN.', tint: '#A78BFA' },
  intermediate: { label: 'INTERMEDIATE', emoji: '\u{1F525}', line: 'Solid web3 foundations. Time to go deeper.', tint: '#C4B5FD' },
  expert: { label: 'EXPERT', emoji: '\u{26A1}', line: 'Top-tier web3 knowledge. Verified.', tint: '#06B6D4' },
};

interface ShareableCardProps {
  score: number;
  maxScore: number;
  level: ShareLevel;
}

export default function ShareableCard({ score, maxScore, level }: ShareableCardProps) {
  const meta = LEVEL_META[level];

  return (
    <div
      id="share-card"
      style={{
        width: 1200,
        height: 630,
        position: 'relative',
        overflow: 'hidden',
        background: BG,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* violet/cyan gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 15% 10%, rgba(109,40,217,0.38), transparent 55%), ' +
            'radial-gradient(circle at 88% 92%, rgba(6,182,212,0.20), transparent 55%)',
        }}
      />

      {/* large decorative diamond watermark */}
      <svg
        width="560"
        height="560"
        viewBox="0 0 48 48"
        style={{ position: 'absolute', right: -100, top: -80, opacity: 0.12 }}
      >
        <polygon points="12,4 24,16 12,28 0,16" fill="#8B5CF6" />
        <polygon points="36,20 48,32 36,44 24,32" fill="#06B6D4" />
        <polygon points="24,16 30,22 24,28 18,22" fill="#A78BFA" />
      </svg>

      {/* logo, top-left */}
      <div style={{ position: 'absolute', top: 52, left: 60, transform: 'scale(1.3)', transformOrigin: 'left top' }}>
        <Logo size="lg" showText dark />
      </div>

      {/* main content */}
      <div style={{ position: 'absolute', left: 60, top: 210, right: 60 }}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 92,
            fontWeight: 900,
            color: CREAM,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Score: {score}/{maxScore}
        </div>

        <div
          style={{
            marginTop: 28,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '11px 26px',
            borderRadius: 100,
            background: 'rgba(109,40,217,0.22)',
            border: '1px solid rgba(139,92,246,0.5)',
          }}
        >
          <span style={{ fontSize: 22 }}>{meta.emoji}</span>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.12em', color: meta.tint }}>{meta.label}</span>
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 27,
            color: 'rgba(244,240,234,0.78)',
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: 780,
            lineHeight: 1.4,
          }}
        >
          {meta.line}
        </div>
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: 60, bottom: 50, display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <span style={{ fontSize: 21, fontWeight: 700, color: CREAM, letterSpacing: '0.02em' }}>maiden.app</span>
        <span style={{ fontSize: 16, color: 'rgba(244,240,234,0.5)' }}>Learn Web3. Earn as you go.</span>
      </div>
    </div>
  );
}
