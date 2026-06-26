'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Track, Module } from '../../../../../lib/types';
import { useProgress } from '../../../../../context/ProgressContext';
import { markTrackComplete } from '../../../../../lib/progress';

interface Props { track: Track; mod: Module; color: string; }

export default function QuizClient({ track, mod, color }: Props) {
  const router = useRouter();
  const { completeQuiz, loseHeart, hearts: initHearts, isQuizCompleted } = useProgress();
  const questions = mod.quiz;

  const [queue, setQueue] = useState(() => questions.map((_, i) => i));
  const [cursor, setCursor] = useState(0);
  const [firstAttempts, setFirstAttempts] = useState<Record<number, boolean>>({});
  const [missedSet, setMissedSet] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [hearts, setHearts] = useState(initHearts);
  const [failed, setFailed] = useState(false);
  const [shaking, setShaking] = useState(false);

  const qIdx = queue[cursor] ?? 0;
  const q = questions[qIdx];
  const uniqueAnswered = Object.keys(firstAttempts).length;
  const progressFraction = questions.length > 0 ? uniqueAnswered / questions.length : 0;
  const retryCount = queue.length - questions.length;
  const isRetry = qIdx in firstAttempts && firstAttempts[qIdx] === false;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.correct;
    const isFirst = !(qIdx in firstAttempts);
    if (isFirst) setFirstAttempts(prev => ({ ...prev, [qIdx]: correct }));
    if (!correct) {
      if (isFirst) setMissedSet(prev => new Set([...prev, qIdx]));
      setQueue(prev => [...prev, qIdx]);
      const newH = loseHeart();
      setHearts(newH);
      setShaking(true); setTimeout(() => setShaking(false), 600);
      if (newH === 0) { setTimeout(() => setFailed(true), 1200); return; }
    }
  };

  const handleNext = () => {
    if (cursor + 1 >= queue.length) {
      const fa = { ...firstAttempts };
      if (!(qIdx in fa)) fa[qIdx] = selected !== null && selected === q.correct;
      const correctCount = Object.values(fa).filter(Boolean).length;
      const base = Math.round((correctCount / questions.length) * (mod.quizXp ?? 100));
      const earned = completeQuiz(mod.id, base);
      setXpEarned(earned);
      // Check if all modules in the track are now complete and mark the track done
      const allModulesDone = track.modules.every(m => {
        if (m.id === mod.id) return true; // this one just finished
        return isQuizCompleted(m.id);
      });
      if (allModulesDone) {
        markTrackComplete(track.id);
      }
      setFirstAttempts(fa);
      setDone(true);
    } else {
      setCursor(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (failed) return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <span style={{ fontSize: 64, marginBottom: 20 }}>💔</span>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Out of Hearts</h2>
      <p style={{ fontSize: 15, color: 'var(--text-tertiary)', margin: '0 0 36px' }}>Hearts refill over time. Come back later!</p>
      <div style={{ display: 'flex', gap: 5, marginBottom: 36 }}>
        {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 24, opacity: 0.15 }}>❤️</span>)}
      </div>
      <button onClick={() => router.push(`/track/${track.id}/module/${mod.id}`)}
        style={{
          borderRadius: 12, padding: '14px 32px', border: 'none',
          background: 'var(--accent)', color: '#fff', fontSize: 16, fontWeight: 600,
          cursor: 'pointer', transition: 'background 150ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
      >Back to Module</button>
    </div>
  );

  if (done) {
    const correct = Object.values(firstAttempts).filter(Boolean).length;
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 24px 80px' }}>
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 24, padding: '40px', textAlign: 'center', marginBottom: 24,
            boxShadow: pct >= 60 ? `0 0 40px ${color}15` : 'none',
          }}>
            <span style={{ fontSize: 64, display: 'block', marginBottom: 16 }}>
              {pct === 100 ? '🏆' : pct >= 60 ? '🎯' : '📊'}
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px', letterSpacing: '-0.025em' }}>
              {pct === 100 ? 'Perfect Score!' : pct >= 60 ? 'Well Done!' : 'Keep Practicing'}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-tertiary)', margin: '0 0 24px' }}>
              {correct} of {questions.length} correct · {pct}%
            </p>
            {xpEarned > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.03em' }}>+{xpEarned}</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--gold)', opacity: 0.7 }}>XP</span>
              </div>
            )}
          </div>

          {missedSet.size > 0 && (
            <div style={{
              background: 'var(--error-bg)', border: '1px solid var(--error)',
              borderRadius: 12, padding: '12px 18px', marginBottom: 20, textAlign: 'center',
              opacity: 0.7,
            }}>
              <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
                🔄 {missedSet.size} question{missedSet.size > 1 ? 's' : ''} needed a retry
              </span>
            </div>
          )}

          <p style={{ margin: '0 0 12px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.07em' }}>QUESTION REVIEW</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {questions.map((q, i) => {
              const firstRight = firstAttempts[i] === true;
              const retried    = missedSet.has(i);
              return (
                <div key={q.id} style={{
                  borderRadius: 14, border: '1px solid', padding: '16px 20px',
                  background: firstRight ? 'var(--success-bg)' : 'var(--error-bg)',
                  borderColor: firstRight ? 'var(--success)' : 'var(--error)',
                  opacity: firstRight ? 1 : 0.85,
                }}>
                  <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: '0 0 6px', lineHeight: 1.5 }}>{q.question}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                    {firstRight ? '✓' : retried ? '🔄' : '✗'} {q.options[q.correct]}
                  </p>
                  {!firstRight && (
                    <p style={{ fontSize: 12.5, color: 'var(--text-disabled)', margin: 0, lineHeight: 1.5 }}>
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => router.push(`/track/${track.id}/module/${mod.id}`)} style={{
              flex: 1, borderRadius: 12, padding: '14px', border: '1px solid var(--border)',
              background: 'transparent', color: 'var(--text-secondary)', fontSize: 15, fontWeight: 500, cursor: 'pointer',
              transition: 'all 150ms',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
            >← Back to Module</button>
            <button onClick={() => router.push(`/track/${track.id}`)} style={{
              flex: 1, borderRadius: 12, padding: '14px', border: 'none',
              background: color, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
              transition: 'all 150ms', boxShadow: `0 4px 16px ${color}30`,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; }}
            >Back to Track →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--sidebar-border)',
        padding: '0 28px', height: 52, display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <Link href={`/track/${track.id}/module/${mod.id}`} style={{
          width: 32, height: 32, borderRadius: 8,
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          color: 'var(--text-tertiary)', fontSize: 15, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
          transition: 'all 150ms',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
        >✕</Link>

        <div style={{ fontSize: 12.5, color: 'var(--text-disabled)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href={`/track/${track.id}`} style={{ color: 'var(--text-disabled)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-disabled)')}
          >{track.title}</Link>
          <span>›</span>
          <Link href={`/track/${track.id}/module/${mod.id}`} style={{ color: 'var(--text-disabled)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-disabled)')}
          >{mod.title}</Link>
          <span>›</span>
          <span style={{ color: 'var(--text-secondary)' }}>Quiz</span>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ height: 3, width: 160, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', marginBottom: 3 }}>
              <div style={{ height: '100%', width: `${progressFraction * 100}%`, background: color, borderRadius: 2, transition: 'width 0.3s', boxShadow: `0 0 6px ${color}60` }} />
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-disabled)' }}>
              {uniqueAnswered}/{questions.length}{retryCount > 0 ? ` · 🔄 ${retryCount}` : ''}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 3, animation: shaking ? 'shake 0.5s ease' : 'none' }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ fontSize: 16, opacity: i <= hearts ? 1 : 0.12 }}>❤️</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 24px', animation: 'fadeUp 0.3s ease both' }}>
        <div style={{ width: '100%', maxWidth: 680 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <span style={{
              fontSize: 10.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              color: 'var(--text-tertiary)', letterSpacing: '0.06em',
            }}>MULTIPLE CHOICE</span>
            {isRetry && (
              <span style={{
                fontSize: 10.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                background: 'var(--error-bg)', border: '1px solid var(--error)',
                color: 'var(--error)', letterSpacing: '0.06em',
              }}>🔄 RETRY</span>
            )}
            <span style={{
              fontSize: 10.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              color: 'var(--text-tertiary)', letterSpacing: '0.06em', marginLeft: 'auto',
            }}>{uniqueAnswered + 1} of {questions.length}</span>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.45, margin: '0 0 32px', letterSpacing: '-0.015em' }}>
            {q.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {q.options.map((opt, i) => {
              const isCorrectOpt = i === q.correct;
              const isSel        = i === selected;
              let bg     = 'var(--bg-card)';
              let border = 'var(--border)';
              let tc     = 'var(--text-primary)';
              if (answered) {
                if (isCorrectOpt) { bg = 'var(--success-bg)'; border = 'var(--success)'; tc = 'var(--success)'; }
                else if (isSel)  { bg = 'var(--error-bg)'; border = 'var(--error)'; tc = 'var(--error)'; }
                else             { tc = 'var(--text-disabled)'; }
              } else if (isSel) { bg = color+'14'; border = color; }

              return (
                <button key={i} onClick={() => handleSelect(i)} disabled={answered}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: bg, border: `1px solid ${border}`,
                    borderRadius: 14, padding: '16px 18px',
                    cursor: answered ? 'default' : 'pointer', textAlign: 'left',
                    transition: 'all 150ms', width: '100%',
                  }}
                  onMouseEnter={e => { if (!answered) { (e.currentTarget as HTMLElement).style.background = color+'0C'; (e.currentTarget as HTMLElement).style.borderColor = color+'50'; } }}
                  onMouseLeave={e => { if (!answered) { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; } }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: answered && isCorrectOpt ? 'var(--success)' : answered && isSel ? 'var(--error)' : 'var(--bg-card-hover)',
                    border: `1px solid ${answered && (isCorrectOpt || isSel) ? 'transparent' : 'var(--border)'}`,
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: answered && (isCorrectOpt || isSel) ? '#fff' : 'var(--text-tertiary)' }}>
                      {answered && isCorrectOpt ? '✓' : answered && isSel ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                  </div>
                  <span style={{ flex: 1, fontSize: 15, color: tc, lineHeight: 1.5, fontWeight: answered && isCorrectOpt ? 500 : 400 }}>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div style={{
              borderRadius: 14, border: '1px solid', padding: '16px 20px', marginBottom: 24,
              background: selected === q.correct ? 'var(--success-bg)' : 'var(--error-bg)',
              borderColor: selected === q.correct ? 'var(--success)' : 'var(--error)',
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: selected === q.correct ? 'var(--success)' : 'var(--error)', marginBottom: 6 }}>
                {selected === q.correct ? 'Correct!' : "Not quite. You'll see this again"}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.65 }}>{q.explanation}</div>
            </div>
          )}

          {answered && (
            <button onClick={handleNext} style={{
              width: '100%', borderRadius: 12, padding: '15px', border: 'none',
              background: selected === q.correct ? color : 'var(--bg-card)',
              color: selected === q.correct ? '#fff' : 'var(--text-secondary)',
              fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 150ms',
              boxShadow: selected === q.correct ? `0 4px 16px ${color}30` : 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; }}
            >
              {cursor + 1 >= queue.length ? 'See Results →' : selected === q.correct ? 'Next →' : 'Got It →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
