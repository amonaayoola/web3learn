'use client';
import { useMemo, useState } from 'react';
import type { MatchingPair } from '../lib/types';

interface Props {
  title: string;
  pairs: MatchingPair[];
  color: string;
  onComplete: (mistakes: number, bonusXp: number) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchingGame({ title, pairs, color, onComplete }: Props) {
  // Definitions shuffled once; each carries its original pair index.
  const defOrder = useMemo(() => shuffle(pairs.map((_, i) => i)), [pairs]);

  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<{ term: number; def: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [locked, setLocked] = useState(false); // brief lock during wrong-shake

  const allMatched = matched.size === pairs.length;
  const bonusXp = Math.max(10, 30 - mistakes * 5);

  const handleDef = (pairIdx: number) => {
    if (locked || matched.has(pairIdx)) return;
    if (selectedTerm === null) return;
    if (selectedTerm === pairIdx) {
      const next = new Set(matched);
      next.add(pairIdx);
      setMatched(next);
      setSelectedTerm(null);
    } else {
      setWrong({ term: selectedTerm, def: pairIdx });
      setMistakes(m => m + 1);
      setLocked(true);
      setTimeout(() => {
        setWrong(null);
        setSelectedTerm(null);
        setLocked(false);
      }, 800);
    }
  };

  const termStyle = (i: number) => {
    const isMatched = matched.has(i);
    const isSel = selectedTerm === i;
    const isWrong = wrong?.term === i;
    let bg = 'var(--bg-card)', border = 'var(--border)', tc = 'var(--text-primary)';
    if (isMatched) { bg = 'var(--success-bg)'; border = 'var(--success)'; tc = 'var(--success)'; }
    else if (isWrong) { bg = 'var(--error-bg)'; border = 'var(--error)'; tc = 'var(--error)'; }
    else if (isSel) { bg = color + '18'; border = color; tc = 'var(--text-primary)'; }
    return { bg, border, tc, isMatched, isWrong };
  };

  const defStyle = (pairIdx: number) => {
    const isMatched = matched.has(pairIdx);
    const isWrong = wrong?.def === pairIdx;
    let bg = 'var(--bg-card)', border = 'var(--border)', tc = 'var(--text-secondary)';
    if (isMatched) { bg = 'var(--success-bg)'; border = 'var(--success)'; tc = 'var(--success)'; }
    else if (isWrong) { bg = 'var(--error-bg)'; border = 'var(--error)'; tc = 'var(--error)'; }
    return { bg, border, tc, isMatched, isWrong };
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg)', overflowY: 'auto', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        @keyframes mgShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
        .mg-shake{animation:mgShake .4s ease}
        @keyframes mgPop{from{transform:scale(.96);opacity:.6}to{transform:scale(1);opacity:1}}
        .mg-card{animation:mgPop .2s ease}
      `}</style>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 28px 80px' }}>
        {/* Header */}
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', color, marginBottom: 10 }}>ACTIVE RECALL · MATCHING</div>
        <h1 style={{ margin: '0 0 8px', fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>{title}</h1>
        <p style={{ margin: '0 0 28px', fontSize: 15, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
          Tap a term on the left, then its matching definition on the right.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
          <Stat label="Matched" value={`${matched.size}/${pairs.length}`} color={color} />
          <Stat label="Mistakes" value={`${mistakes}`} color={mistakes > 0 ? 'var(--error)' : 'var(--text-secondary)'} />
          <Stat label="Bonus XP" value={`+${bonusXp}`} color="var(--gold)" />
        </div>

        {!allMatched ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14 }}>
            {/* Terms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pairs.map((p, i) => {
                const s = termStyle(i);
                return (
                  <button key={i} onClick={() => { if (!s.isMatched && !locked) setSelectedTerm(i); }}
                    className={s.isWrong ? 'mg-shake' : ''}
                    disabled={s.isMatched}
                    style={{
                      textAlign: 'left', padding: '14px 16px', borderRadius: 12,
                      border: `1.5px solid ${s.border}`, background: s.bg, color: s.tc,
                      fontSize: 15, fontWeight: 600, cursor: s.isMatched ? 'default' : 'pointer',
                      lineHeight: 1.4, transition: 'all .15s', fontFamily: "'SF Mono', ui-monospace, monospace",
                    }}>
                    {s.isMatched && <span style={{ marginRight: 7 }}>✓</span>}
                    {p.term}
                  </button>
                );
              })}
            </div>
            {/* Definitions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {defOrder.map(pairIdx => {
                const s = defStyle(pairIdx);
                return (
                  <button key={pairIdx} onClick={() => handleDef(pairIdx)}
                    className={s.isWrong ? 'mg-shake' : ''}
                    disabled={s.isMatched}
                    style={{
                      textAlign: 'left', padding: '14px 16px', borderRadius: 12,
                      border: `1.5px solid ${s.border}`, background: s.bg, color: s.tc,
                      fontSize: 14, cursor: s.isMatched ? 'default' : 'pointer',
                      lineHeight: 1.5, transition: 'all .15s',
                      opacity: selectedTerm === null && !s.isMatched ? 0.85 : 1,
                    }}>
                    {s.isMatched && <span style={{ marginRight: 7 }}>✓</span>}
                    {pairs[pairIdx].definition}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mg-card" style={{ textAlign: 'center', padding: '48px 24px', borderRadius: 20, background: 'var(--success-bg)', border: '1px solid var(--success)' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>{mistakes === 0 ? '🎯' : '✅'}</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)' }}>
              {mistakes === 0 ? 'Flawless!' : 'All matched!'}
            </h2>
            <p style={{ margin: '0 0 28px', fontSize: 15, color: 'var(--text-tertiary)' }}>
              {mistakes === 0 ? 'You matched every pair with zero mistakes.' : `${mistakes} mistake${mistakes === 1 ? '' : 's'} along the way — now you know where to focus.`}
            </p>
            <button onClick={() => onComplete(mistakes, bonusXp)} style={{
              padding: '13px 32px', borderRadius: 11, border: 'none', background: color, color: '#fff',
              fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: `0 4px 16px ${color}40`,
            }}>
              Continue → Scenario Quiz (+{bonusXp} XP)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 800, color, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4, letterSpacing: '0.04em' }}>{label}</div>
    </div>
  );
}
