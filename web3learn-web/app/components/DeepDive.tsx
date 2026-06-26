'use client';
import { useEffect, useRef, useState } from 'react';
import type { DeepDive as DeepDiveData } from '../lib/types';
import VideoEmbed from './VideoEmbed';
import FurtherReading from './FurtherReading';

interface Props {
  title: string;
  deepDive: DeepDiveData;
  color: string;
  onMarkRead: () => void;
  onBack: () => void;
}

export default function DeepDive({ title, deepDive, color, onMarkRead, onBack }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(1, el.scrollTop / max) : 1;
      setProgress(p);
      if (p > 0.92) setReachedEnd(true);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg)', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        @keyframes ddFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .dd-section{animation:ddFadeUp .4s ease both}
        .dd-link{color:${color};text-decoration:none;border-bottom:1px solid ${color}40;transition:border-color .15s}
        .dd-link:hover{border-bottom-color:${color}}
      `}</style>

      {/* Reading progress bar */}
      <div style={{ height: 3, background: 'var(--border)', position: 'relative', flexShrink: 0 }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: color, transition: 'width .15s linear', boxShadow: `0 0 8px ${color}80` }} />
      </div>

      {/* Header */}
      <div style={{ height: 56, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', borderBottom: '1px solid var(--sidebar-border)', background: 'var(--header-bg)', backdropFilter: 'blur(20px)' }}>
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-tertiary)', fontSize: 17, cursor: 'pointer' }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', color }}>DEEP DIVE</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13 }}>📖</span>{deepDive.readingTime} read
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto' }}>
        <article style={{ maxWidth: 720, margin: '0 auto', padding: '56px 28px 120px' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: 40, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{title}</h1>
          <div style={{ height: 3, width: 56, background: color, borderRadius: 2, margin: '20px 0 44px' }} />

          {deepDive.video && (
            <div style={{ marginBottom: 36 }}>
              <VideoEmbed video={deepDive.video} color={color} />
            </div>
          )}

          {deepDive.pullQuote && (
            <blockquote style={{ margin: '0 0 44px', padding: '4px 0 4px 24px', borderLeft: `4px solid ${color}` }}>
              <p style={{ margin: '0 0 12px', fontSize: 21, fontWeight: 500, fontStyle: 'italic', lineHeight: 1.5, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                “{deepDive.pullQuote.text}”
              </p>
              {deepDive.pullQuote.url ? (
                <a href={deepDive.pullQuote.url} target="_blank" rel="noopener noreferrer" className="dd-link" style={{ fontSize: 14, fontWeight: 600 }}>
                  — {deepDive.pullQuote.attribution}
                </a>
              ) : (
                <cite style={{ fontSize: 14, fontWeight: 600, fontStyle: 'normal', color: 'var(--text-tertiary)' }}>
                  — {deepDive.pullQuote.attribution}
                </cite>
              )}
            </blockquote>
          )}

          {deepDive.sections.map((s, i) => (
            <section key={i} className="dd-section" style={{ marginBottom: 44, animationDelay: `${Math.min(i * 0.05, 0.3)}s` }}>
              <h2 style={{ margin: '0 0 16px', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.25 }}>{s.heading}</h2>
              {s.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ margin: '0 0 16px', fontSize: 17, lineHeight: 1.78, color: 'var(--text-secondary)' }}>{para}</p>
              ))}
              {s.code && (
                <div style={{ marginTop: 20, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-card-low)' }}>
                  {s.lang && (
                    <div style={{ padding: '7px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border)', textTransform: 'uppercase' }}>{s.lang}</div>
                  )}
                  <pre style={{ margin: 0, padding: '16px 18px', overflowX: 'auto', fontSize: 13.5, lineHeight: 1.7, fontFamily: "'SF Mono', ui-monospace, Menlo, monospace", color: 'var(--text-primary)' }}>
                    <code>{s.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}

          {/* Sources */}
          <div style={{ marginTop: 56, padding: '24px 26px', borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 16 }}>📚 SOURCE MATERIAL</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {deepDive.sources.map((src, i) => (
                <a key={i} href={src.url} target="_blank" rel="noopener noreferrer" className="dd-link" style={{ fontSize: 15, lineHeight: 1.5, display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content' }}>
                  <span style={{ opacity: 0.7 }}>↗</span>{src.label}
                </a>
              ))}
            </div>
          </div>

          {deepDive.furtherReading && deepDive.furtherReading.length > 0 && (
            <FurtherReading items={deepDive.furtherReading} color={color} />
          )}
        </article>
      </div>

      {/* Footer: mark as read */}
      <div style={{ flexShrink: 0, borderTop: '1px solid var(--sidebar-border)', background: 'var(--header-bg)', backdropFilter: 'blur(20px)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
          {reachedEnd ? '✓ You reached the end' : `${Math.round(progress * 100)}% read — scroll to finish`}
        </div>
        <button
          onClick={onMarkRead}
          disabled={!reachedEnd}
          style={{
            padding: '12px 28px', borderRadius: 10, border: 'none',
            background: reachedEnd ? color : 'var(--bg-card)',
            color: reachedEnd ? '#fff' : 'var(--text-disabled)',
            fontSize: 14, fontWeight: 600, cursor: reachedEnd ? 'pointer' : 'not-allowed',
            boxShadow: reachedEnd ? `0 4px 16px ${color}40` : 'none', transition: 'all .15s',
          }}
        >
          Mark as Read → Practice
        </button>
      </div>
    </div>
  );
}
