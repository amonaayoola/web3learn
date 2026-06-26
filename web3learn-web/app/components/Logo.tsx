'use client';
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  /** Force the wordmark to a light color, for use on dark surfaces that don't follow the page theme (e.g. the sidebar). */
  dark?: boolean;
}

export default function Logo({ size = 'md', showText = true, dark = false }: LogoProps) {
  const dims = { sm: 22, md: 30, lg: 48 };
  const fontSizes = { sm: 11, md: 14, lg: 22 };
  const d = dims[size];
  const fs = fontSizes[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size === 'sm' ? 6 : size === 'lg' ? 12 : 8, userSelect: 'none' }}>
      {/* SVG M-diamond logo */}
      <svg width={d} height={d} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="maiden-grad-l" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D28D9"/>
            <stop offset="100%" stopColor="#8B5CF6"/>
          </linearGradient>
          <linearGradient id="maiden-grad-r" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4"/>
            <stop offset="100%" stopColor="#0891B2"/>
          </linearGradient>
          <linearGradient id="maiden-grad-c" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D28D9"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
          <filter id="logo-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Left diamond: violet */}
        <polygon
          points="12,4 24,16 12,28 0,16"
          fill="url(#maiden-grad-l)"
          opacity="0.95"
          filter="url(#logo-glow)"
        />
        {/* Right diamond: cyan */}
        <polygon
          points="36,20 48,32 36,44 24,32"
          fill="url(#maiden-grad-r)"
          opacity="0.95"
          filter="url(#logo-glow)"
        />
        {/* Overlap: gradient blend */}
        <polygon
          points="24,16 30,22 24,28 18,22"
          fill="url(#maiden-grad-c)"
          opacity="1"
        />
      </svg>

      {showText && (
        <span style={{
          fontSize: fs,
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: dark ? '#f4f0ea' : 'var(--text-primary)',
          textTransform: 'uppercase',
          fontFamily: "'Outfit', sans-serif",
        }}>
          MAIDEN
        </span>
      )}
    </div>
  );
}
