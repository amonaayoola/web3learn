'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: Props) {
  const { isAuthenticated, isGuest, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated && !isGuest) router.push('/auth');
  }, [loading, isAuthenticated, isGuest, router]);

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: 'var(--bg)',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '2px solid var(--border)',
        borderTopColor: 'var(--accent)',
        animation: 'spin 0.7s linear infinite',
      }} />
    </div>
  );

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <div className="sidebar-wrap"><Sidebar /></div>

      <div style={{ marginLeft: 220, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Sticky frosted header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50, height: 52,
          background: 'var(--header-bg)',
          borderBottom: '1px solid var(--sidebar-border)',
          display: 'flex', alignItems: 'center', padding: '0 40px', gap: 16,
        }}>
          {title && (
            <span style={{
              fontSize: 15, fontWeight: 600,
              color: 'var(--text-primary)', letterSpacing: '-0.01em',
            }}>{title}</span>
          )}
          <div style={{ flex: 1 }} />
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-disabled)', fontSize: 13, pointerEvents: 'none',
            }}>⌕</span>
            <input
              type="text"
              placeholder="Search"
              style={{
                width: 200, padding: '6px 12px 6px 28px',
                borderRadius: 8, fontSize: 13,
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)', outline: 'none',
                transition: 'border-color 150ms',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--input-border)'; }}
            />
          </div>
        </header>

        <main className="page-enter" style={{
          flex: 1,
          padding: '48px 40px 80px',
          maxWidth: 1200, width: '100%',
          margin: '0 auto',
          alignSelf: 'stretch',
          boxSizing: 'border-box',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
