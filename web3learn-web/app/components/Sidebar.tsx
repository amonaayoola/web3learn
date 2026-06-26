'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const NAV = [
  { href: '/home',        label: 'Dashboard',   icon: '⊞' },
  { href: '/tracks',      label: 'Tracks',      icon: '◫' },
  { href: '/games',       label: 'Games',       icon: '◈' },
  { href: '/progress',    label: 'Progress',    icon: '◎' },
  { href: '/leaderboard', label: 'Leaderboard', icon: '⬡' },
  { href: '/settings',    label: 'Settings',    icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="glass-panel" style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: 220, zIndex: 100,
      background: '#0a0a0a',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Logo header */}
      <div style={{
        padding: '20px 18px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/home">
          <Logo size="sm" showText={true} dark />
        </Link>
        <button onClick={toggleTheme} style={{
          width: 28, height: 28, borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.06)', color: 'rgba(244,240,234,0.55)',
          fontSize: 13, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          transition: 'all 150ms',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#7C3AED'; (e.currentTarget as HTMLElement).style.color = '#7C3AED'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(244,240,234,0.55)'; }}
        title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
        >{theme === 'dark' ? '☀' : '◑'}</button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px 9px 10px',
                borderRadius: 8,
                background: active ? 'rgba(124,58,237,0.12)' : 'transparent',
                borderLeft: active ? '3px solid #7C3AED' : '3px solid transparent',
                color: active ? '#ffffff' : 'rgba(244,240,234,0.65)',
                fontSize: 14, fontWeight: active ? 600 : 500,
                transition: 'all 150ms',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.color = '#ffffff';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(244,240,234,0.65)';
                }
              }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: 'center', flexShrink: 0, opacity: active ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 14px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{
          padding: '10px 12px', borderRadius: 12,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(244,240,234,0.5)', letterSpacing: '0.08em', marginBottom: 4 }}>
            MAIDEN BETA
          </div>
          <div style={{ fontSize: 11, color: 'rgba(244,240,234,0.35)' }}>
            Making Web3 accessible
          </div>
          <div style={{ marginTop: 8, height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
            <div style={{ height: '100%', width: '35%', background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)', borderRadius: 1 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
