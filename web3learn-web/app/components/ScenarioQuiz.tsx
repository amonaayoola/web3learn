'use client';
import { useState } from 'react';
import type { ScenarioQuestion } from '../lib/types';

export interface ScenarioResult {
  questionId: string;
  correct: boolean;
}

interface Props {
  title: string;
  kicker?: string;
  intro?: string;
  questions: ScenarioQuestion[];
  color: string;
  /** Called as each question is answered (first attempt). */
  onAnswer?: (questionId: string, correct: boolean) => void;
  /** Called when all questions are done, with per-question first-attempt results. */
  onComplete: (results: ScenarioResult[]) => void;
  /** Full-screen overlay (lesson flow) vs inline (review). */
  overlay?: boolean;
  continueLabel?: string;
}

function qid(q: ScenarioQuestion, i: number): string {
  return q.id || `q${i}`;
}

export default function ScenarioQuiz({
  title, kicker = 'ACTIVE RECALL · SCENARIOS', intro, questions, color,
  onAnswer, onComplete, overlay = true, continueLabel,
}: Props) {
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<ScenarioResult[]>([]);

  const q = questions[cursor];
  const isLast = cursor === questions.length - 1;
  const correctCount = results.filter(r => r.correct).length;

  const select = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.correct;
    const id = qid(q, cursor);
    setResults(prev => [...prev, { questionId: id, correct }]);
    onAnswer?.(id, correct);
  };

  const next = () => {
    if (isLast) { onComplete(results); return; }
    setCursor(c => c + 1);
    setSelected(null);
    setAnswered(false);
  };

  const body = (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: overlay ? '48px 28px 80px' : '0' }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', color, marginBottom: 10 }}>{kicker}</div>
      <h1 style={{ margin: '0 0 6px', fontSize: overlay ? 28 : 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>{title}</h1>
      {intro && <p style={{ margin: '0 0 8px', fontSize: 14.5, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{intro}</p>}

      {/* progress dots */}
      <div style={{ display: 'flex', gap: 5, margin: '18px 0 26px' }}>
        {questions.map((_, i) => (
          <div key={i} style={{ height: 5, flex: 1, borderRadius: 3, background: i < cursor ? color + '70' : i === cursor ? color : 'var(--border)', transition: 'all .25s' }} />
        ))}
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>Question {cursor + 1} of {questions.length}</div>
      <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.45, letterSpacing: '-0.01em' }}>{q.question}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSel = i === selected;
          let bg = 'var(--bg-card)', border = 'var(--border)', tc = 'var(--text-primary)';
          if (answered) {
            if (isCorrect) { bg = 'var(--success-bg)'; border = 'var(--success)'; tc = 'var(--success)'; }
            else if (isSel) { bg = 'var(--error-bg)'; border = 'var(--error)'; tc = 'var(--error)'; }
          } else if (isSel) { bg = color + '12'; border = color; }
          return (
            <button key={i} onClick={() => select(i)} disabled={answered}
              style={{
                textAlign: 'left', borderRadius: 12, border: `1.5px solid ${border}`,
                padding: '14px 16px', background: bg, color: tc, fontSize: 15,
                cursor: answered ? 'default' : 'pointer', lineHeight: 1.5, transition: 'all .15s',
              }}>
              <span style={{ fontWeight: 700, marginRight: 9, color: answered && isCorrect ? 'var(--success)' : answered && isSel ? 'var(--error)' : 'var(--text-tertiary)' }}>
                {answered && isCorrect ? '✓' : answered && isSel && !isCorrect ? '✗' : String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 18, padding: '16px 18px', borderRadius: 12, background: selected === q.correct ? 'var(--success-bg)' : 'var(--bg-card)', border: `1px solid ${selected === q.correct ? 'var(--success)' : 'var(--border)'}` }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: selected === q.correct ? 'var(--success)' : 'var(--gold)', marginBottom: 7 }}>
            {selected === q.correct ? 'Correct!' : 'Here’s why:'}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{q.explanation}</div>
        </div>
      )}

      <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{correctCount}/{results.length || 0} correct so far</div>
        <button onClick={next} disabled={!answered} style={{
          padding: '12px 28px', borderRadius: 10, border: 'none',
          background: answered ? color : 'var(--bg-card)',
          color: answered ? '#fff' : 'var(--text-disabled)',
          fontSize: 14, fontWeight: 600, cursor: answered ? 'pointer' : 'not-allowed',
          boxShadow: answered ? `0 4px 16px ${color}30` : 'none', transition: 'all .15s',
        }}>
          {isLast ? (continueLabel || 'Finish ✓') : 'Next Question →'}
        </button>
      </div>
    </div>
  );

  if (!overlay) return body;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg)', overflowY: 'auto', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {body}
    </div>
  );
}
