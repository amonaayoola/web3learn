'use client';
import type { FurtherReadingItem } from '../lib/types';

interface Props {
  items: FurtherReadingItem[];
  /** Accent color for the link hover / title underline. */
  color?: string;
}

/**
 * A clean, bibliography-style list of research papers, articles, and docs.
 * Each entry: title, author, publication/date, and a one-sentence description.
 * Rendered as a dark card with cream text.
 */
export default function FurtherReading({ items, color = '#8B5CF6' }: Props) {
  if (!items?.length) return null;
  return (
    <div
      style={{
        marginTop: 28,
        padding: '26px 28px',
        borderRadius: 16,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <style>{`
        .fr-item{transition:border-color .15s}
        .fr-item:hover{border-color:${color}66 !important}
        .fr-title{transition:color .15s}
        .fr-item:hover .fr-title{color:${color}}
      `}</style>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 18 }}>
        📄 FURTHER READING · RESEARCH DOCUMENTS
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <li key={i}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="fr-item"
              style={{
                display: 'block',
                textDecoration: 'none',
                padding: '14px 16px',
                borderRadius: 11,
                border: '1px solid var(--border)',
                background: 'var(--bg-card-low, var(--bg))',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color, flexShrink: 0, fontFamily: "'SF Mono', ui-monospace, monospace" }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="fr-title" style={{ fontSize: 15.5, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  {item.title}
                  <span style={{ opacity: 0.5, marginLeft: 6, fontSize: 13 }}>↗</span>
                </span>
              </div>
              <div style={{ marginLeft: 20, marginTop: 4, fontSize: 12.5, color: 'var(--text-tertiary)', fontWeight: 500 }}>
                {item.author} · {item.publication}
              </div>
              <div style={{ marginLeft: 20, marginTop: 6, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {item.description}
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
