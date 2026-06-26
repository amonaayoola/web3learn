'use client';
import { useMemo, useState } from 'react';
import type { Track, ScenarioQuestion } from '../lib/types';
import { getWeakSpots, recordHit, type WeakSpot } from '../lib/weakSpots';
import { useProgress } from '../context/ProgressContext';
import ScenarioQuiz, { type ScenarioResult } from './ScenarioQuiz';

interface Props {
  track: Track;
  /** Limit review to weak spots from these lesson ids (the module just finished). */
  lessonIds?: string[];
  color: string;
  onClose: () => void;
}

interface ReviewItem {
  weak: WeakSpot;
  question: ScenarioQuestion;
}

const XP_PER_GAP = 15; // 50% bonus over a 10-XP base

/** Resolve a weak spot back to its live scenario question. */
function resolve(track: Track, weak: WeakSpot): ScenarioQuestion | null {
  for (const mod of track.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.id !== weak.lessonId) continue;
      const list = lesson.scenarioQuiz || [];
      const found = list.find((q, i) => (q.id || `q${i}`) === weak.questionId);
      if (found) return found;
    }
  }
  return null;
}

export default function WeakSpotReview({ track, lessonIds, color, onClose }: Props) {
  const { addXp } = useProgress();
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'done'>('intro');
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<ScenarioResult[]>([]);

  // Build the review set once: up to 2 questions per weak topic.
  const items = useMemo<ReviewItem[]>(() => {
    let spots = getWeakSpots(track.id);
    if (lessonIds && lessonIds.length) spots = spots.filter(w => lessonIds.includes(w.lessonId));
    const perLesson = new Map<string, number>();
    const out: ReviewItem[] = [];
    for (const w of spots) {
      const n = perLesson.get(w.lessonId) || 0;
      if (n >= 2) continue;
      const question = resolve(track, w);
      if (!question) continue;
      perLesson.set(w.lessonId, n + 1);
      out.push({ weak: w, question });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.id]);

  const topics = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach(it => m.set(it.weak.topic, (m.get(it.weak.topic) || 0) + 1));
    return [...m.entries()].map(([topic, count]) => ({ topic, count }));
  }, [items]);

  if (items.length === 0) return null;

  const questions: ScenarioQuestion[] = items.map((it, i) => ({
    ...it.question,
    id: `review_${i}`,
  }));

  const handleAnswer = (questionId: string, correct: boolean) => {
    const idx = Number(questionId.replace('review_', ''));
    const it = items[idx];
    if (!it) return;
    if (correct) {
      recordHit(it.weak.trackId, it.weak.lessonId, it.weak.questionId);
      setClosed(prev => new Set(prev).add(it.weak.lessonId + '::' + it.weak.questionId));
    }
  };

  const handleComplete = (res: ScenarioResult[]) => {
    setResults(res);
    const gained = res.filter(r => r.correct).length;
    if (gained > 0) addXp(gained * XP_PER_GAP);
    setPhase('done');
  };

  const overlayWrap = (inner: React.ReactNode) => (
    <div style={{ position: 'fixed', inset: 0, zIndex: 250, background: 'var(--bg)', overflowY: 'auto', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {inner}
    </div>
  );

  if (phase === 'intro') {
    return overlayWrap(
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '72px 28px' }}>
        <div style={{ fontSize: 52, marginBottom: 18 }}>🎯</div>
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', color, marginBottom: 10 }}>END-OF-MODULE REVIEW</div>
        <h1 style={{ margin: '0 0 12px', fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
          Let’s close your knowledge gaps
        </h1>
        <p style={{ margin: '0 0 24px', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          You missed {items.length} question{items.length === 1 ? '' : 's'} across {topics.length} topic{topics.length === 1 ? '' : 's'} earlier.
          Answer them correctly now and you’ll earn a <strong style={{ color: 'var(--gold)' }}>50% XP bonus</strong> for each gap you close.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
          {topics.map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{t.topic}</span>
              <span style={{ fontSize: 13, color: 'var(--error)', fontWeight: 600 }}>{t.count} to revisit</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setPhase('quiz')} style={{ flex: 1, padding: '14px', borderRadius: 11, border: 'none', background: color, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: `0 4px 16px ${color}40` }}>
            Start Review →
          </button>
          <button onClick={onClose} style={{ padding: '14px 22px', borderRadius: 11, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-tertiary)', fontSize: 14, cursor: 'pointer' }}>
            Later
          </button>
        </div>
      </div>,
    );
  }

  if (phase === 'quiz') {
    return overlayWrap(
      <div style={{ paddingTop: 32 }}>
        <ScenarioQuiz
          title="Revisiting your weak spots"
          kicker="KNOWLEDGE GAP REVIEW"
          intro="Same concepts, fresh questions. Get them right to close the gap."
          questions={questions}
          color={color}
          overlay={false}
          continueLabel="See Results ✓"
          onAnswer={handleAnswer}
          onComplete={handleComplete}
        />
      </div>,
    );
  }

  // done
  const correct = results.filter(r => r.correct).length;
  const gapsClosed = closed.size;
  const xpGained = results.filter(r => r.correct).length * XP_PER_GAP;
  return overlayWrap(
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '80px 28px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 18 }}>{correct === results.length ? '🏆' : correct > 0 ? '📈' : '💪'}</div>
      <h1 style={{ margin: '0 0 12px', fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
        {correct === results.length ? 'Every gap closed!' : correct > 0 ? 'Knowledge gaps closing' : 'Keep at it'}
      </h1>
      <p style={{ margin: '0 0 8px', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        You got <strong style={{ color: 'var(--success)' }}>{correct}/{results.length}</strong> of your previously-missed questions right.
      </p>
      {gapsClosed > 0 && (
        <p style={{ margin: '0 0 8px', fontSize: 15, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
          {gapsClosed} weak spot{gapsClosed === 1 ? '' : 's'} removed from your list — knowledge gap{gapsClosed === 1 ? '' : 's'} closed!
        </p>
      )}
      {xpGained > 0 && (
        <div style={{ display: 'inline-block', margin: '20px 0 32px', padding: '10px 22px', borderRadius: 999, background: 'var(--gold)' + '18', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: 16, fontWeight: 700 }}>
          +{xpGained} XP bonus earned
        </div>
      )}
      <div>
        <button onClick={onClose} style={{ padding: '14px 36px', borderRadius: 11, border: 'none', background: color, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: `0 4px 16px ${color}40` }}>
          Done
        </button>
      </div>
    </div>,
  );
}
