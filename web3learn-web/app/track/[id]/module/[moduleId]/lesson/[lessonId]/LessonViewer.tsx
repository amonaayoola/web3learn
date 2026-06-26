'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Track, Module, Lesson } from '../../../../../../lib/types';
import { useProgress } from '../../../../../../context/ProgressContext';
import { recordMiss, recordHit } from '../../../../../../lib/weakSpots';
import DeepDive from '../../../../../../components/DeepDive';
import MatchingGame from '../../../../../../components/MatchingGame';
import ScenarioQuiz, { type ScenarioResult } from '../../../../../../components/ScenarioQuiz';

interface Props { track: Track; mod: Module; lesson: Lesson; color: string; nextLesson: Lesson | null; }

type Stage = 'lesson' | 'deepdive' | 'matching' | 'scenario';

const SLIDE_ICONS: Record<string, string> = {
  intro: '✦', text: '◈', highlight: '◆', summary: '◉',
};

export default function LessonViewer({ track, mod, lesson, color, nextLesson }: Props) {
  const router = useRouter();
  const { completeLesson } = useProgress();
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(-1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [showMoney, setShowMoney] = useState(false);

  // ── Post-lesson active-recall stages (Deep Dive → Matching → Scenario) ──
  const [stage, setStage] = useState<Stage>('lesson');
  const [bonusXp, setBonusXp] = useState(0);

  const slides = lesson.slides;
  const slide = slides[idx];
  const isLast = idx === slides.length - 1;

  const lessonIdx = mod.lessons.findIndex(l => l.id === lesson.id);
  const miniQ = mod.quiz.length > 0 ? mod.quiz[lessonIdx % mod.quiz.length] : null;
  const progress = showQuiz ? 1 : showMoney ? 0.97 : (idx + 1) / slides.length;

  // Which extra stages this lesson has content for, in order.
  const hasDeep = !!lesson.deepDive?.sections?.length;
  const hasMatch = !!lesson.matchingPairs?.length;
  const hasScenario = !!lesson.scenarioQuiz?.length;
  const extras: Stage[] = [
    ...(hasDeep ? ['deepdive' as Stage] : []),
    ...(hasMatch ? ['matching' as Stage] : []),
    ...(hasScenario ? ['scenario' as Stage] : []),
  ];

  const finishLesson = useCallback((extraXp: number) => {
    // Base lesson XP + any matching/scenario bonus, awarded atomically.
    completeLesson(lesson.id, (lesson.xp ?? 20) + Math.max(0, extraXp));
    router.push(`/track/${track.id}/module/${mod.id}`);
  }, [completeLesson, lesson.id, lesson.xp, router, track.id, mod.id]);

  // Advance to the next extra stage after `current`, or finish if none remain.
  const advanceFrom = useCallback((current: Stage | null, accumulatedBonus: number) => {
    const start = current ? extras.indexOf(current) + 1 : 0;
    const nextStage = extras[start];
    if (nextStage) setStage(nextStage);
    else finishLesson(accumulatedBonus);
  }, [extras, finishLesson]);

  // Called when the in-lesson Quick Check is complete.
  const onLessonComplete = useCallback(() => {
    advanceFrom(null, 0);
  }, [advanceFrom]);

  const goNext = useCallback(() => {
    if (showQuiz) return;
    if (showMoney) {
      setShowMoney(false);
      if (miniQ) setShowQuiz(true);
      else onLessonComplete();
      return;
    }
    if (isLast) {
      if (lesson.moneyAngle) setShowMoney(true);
      else if (miniQ) setShowQuiz(true);
      else onLessonComplete();
    } else {
      setPrevIdx(idx);
      setIdx(i => i + 1);
    }
  }, [showQuiz, showMoney, isLast, lesson.moneyAngle, miniQ, onLessonComplete, idx]);

  const goBack = useCallback(() => {
    if (showQuiz) {
      setShowQuiz(false); setQuizSelected(null); setQuizAnswered(false);
      if (lesson.moneyAngle) setShowMoney(true);
      return;
    }
    if (showMoney) { setShowMoney(false); return; }
    if (idx === 0) router.push(`/track/${track.id}/module/${mod.id}`);
    else { setPrevIdx(idx); setIdx(i => i - 1); }
  }, [showQuiz, showMoney, lesson.moneyAngle, idx, router, track.id, mod.id]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') goBack();
      if (e.key === 'Escape') router.push(`/track/${track.id}/module/${mod.id}`);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [goNext, goBack, router, track.id, mod.id]);

  const isHighlight = slide?.type === 'highlight';
  const isIntro     = slide?.type === 'intro';
  const isSummary   = slide?.type === 'summary';

  const renderSlide = () => (
    <div key={`${lesson.id}-${idx}`} style={{ animation: 'slideInRight 0.25s ease both' }}>
      {isHighlight ? (
        <div>
          <div style={{ borderLeft: `4px solid ${color}`, paddingLeft: 24, marginBottom: 28 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 10, color }}>KEY CONCEPT</div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              {slide.title}
            </h2>
          </div>
          <div style={{ background: color+'0C', border: `1px solid ${color}28`, borderRadius: 16, padding: '24px 28px' }}>
            <p style={{ margin: 0, fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{slide.body}</p>
          </div>
        </div>
      ) : isSummary ? (
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--success)', letterSpacing: '0.08em', marginBottom: 14 }}>SUMMARY</div>
          <h2 style={{ margin: '0 0 22px', fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            {slide.title}
          </h2>
          <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success)28', borderRadius: 16, padding: '22px 26px' }}>
            <p style={{ margin: 0, fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{slide.body}</p>
          </div>
          {isLast && lesson.sources && lesson.sources.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 10 }}>SOURCES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {lesson.sources.map((src, i) => (
                  <a key={i} href={src.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13.5, color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, width: 'fit-content' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                  ><span style={{ opacity: 0.6 }}>↗</span>{src.label}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 14, color: isIntro ? color : 'var(--text-tertiary)' }}>
            {isIntro ? 'INTRO' : `SLIDE ${idx + 1}`}
          </div>
          <h2 style={{ margin: '0 0 24px', fontSize: isIntro ? 38 : 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            {slide.title}
          </h2>
          <p style={{ margin: 0, fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{slide.body}</p>
        </div>
      )}
    </div>
  );

  const RISK_COLOR: Record<string, string> = { low: 'var(--success)', medium: '#D97706', high: 'var(--error)' };

  const renderMoneyAngle = () => {
    const ma = lesson.moneyAngle!;
    const gold = '#22C55E';
    return (
      <div key="money" style={{ animation: 'slideInRight 0.25s ease both' }}>
        <div style={{ borderLeft: `4px solid ${gold}`, paddingLeft: 24, marginBottom: 28 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 10, color: gold, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13 }}>$</span> MONEY ANGLE
          </div>
          <h2 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            {ma.title}
          </h2>
        </div>
        <div style={{ background: gold+'0C', border: `1px solid ${gold}28`, borderRadius: 16, padding: '24px 28px', marginBottom: ma.strategies?.length ? 22 : 0 }}>
          {ma.content.split('\n\n').map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? 0 : '14px 0 0', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{p}</p>
          ))}
        </div>
        {ma.strategies && ma.strategies.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ma.strategies.map((s, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, gap: 12 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</span>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, color: RISK_COLOR[s.risk], background: RISK_COLOR[s.risk]+'18' }}>
                      {s.risk.toUpperCase()} RISK
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, color: 'var(--text-tertiary)', background: 'var(--border)' }}>
                      {s.effort.toUpperCase()} EFFORT
                    </span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{s.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMiniQuiz = () => (
    <div key="quiz" style={{ animation: 'slideInRight 0.25s ease both' }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: color, letterSpacing: '0.08em', marginBottom: 14 }}>QUICK CHECK</div>
      <h2 style={{ margin: '0 0 28px', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, letterSpacing: '-0.015em' }}>
        {miniQ!.question}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {miniQ!.options.map((opt, i) => {
          const isCorrect = i === miniQ!.correct;
          const isSel     = i === quizSelected;
          let bg = 'var(--bg-card)', border = 'var(--border)', tc = 'var(--text-primary)';
          if (quizAnswered) {
            if (isCorrect) { bg = 'var(--success-bg)'; border = 'var(--success)'; tc = 'var(--success)'; }
            else if (isSel) { bg = 'var(--error-bg)'; border = 'var(--error)'; tc = 'var(--error)'; }
          } else if (isSel) { bg = color+'12'; border = color; }
          return (
            <button key={i}
              onClick={() => { if (!quizAnswered) { setQuizSelected(i); setQuizAnswered(true); } }}
              style={{
                textAlign: 'left', borderRadius: 12, border: `1px solid ${border}`,
                padding: '13px 16px', background: bg, color: tc,
                fontSize: 15, cursor: 'pointer', lineHeight: 1.5, transition: 'all 150ms',
              }}
              onMouseEnter={e => { if (!quizAnswered && !isSel) { (e.currentTarget as HTMLElement).style.background = color+'0C'; (e.currentTarget as HTMLElement).style.borderColor = color+'60'; } }}
              onMouseLeave={e => { if (!quizAnswered && !isSel) { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; } }}
            >
              <span style={{ fontWeight: 600, marginRight: 8, color: quizAnswered && isCorrect ? 'var(--success)' : quizAnswered && isSel && !isCorrect ? 'var(--error)' : 'var(--text-tertiary)' }}>
                {quizAnswered && isCorrect ? '✓' : quizAnswered && isSel && !isCorrect ? '✗' : String.fromCharCode(65+i)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {quizAnswered && (
        <div style={{
          borderRadius: 12, border: '1px solid', padding: '14px 18px', marginTop: 16,
          background: quizSelected === miniQ!.correct ? 'var(--success-bg)' : 'var(--error-bg)',
          borderColor: quizSelected === miniQ!.correct ? 'var(--success)' : 'var(--error)',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: quizSelected === miniQ!.correct ? 'var(--success)' : 'var(--error)', marginBottom: quizSelected !== miniQ!.correct ? 6 : 0 }}>
            {quizSelected === miniQ!.correct ? 'Correct!' : 'Not quite.'}
          </div>
          {quizSelected !== miniQ!.correct && (
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{miniQ!.explanation}</div>
          )}
        </div>
      )}
    </div>
  );

  // ── Post-lesson stages (full-screen overlays) ──
  if (stage === 'deepdive' && lesson.deepDive) {
    return (
      <DeepDive
        title={lesson.title}
        deepDive={lesson.deepDive}
        color={color}
        onBack={() => setStage('lesson')}
        onMarkRead={() => advanceFrom('deepdive', bonusXp)}
      />
    );
  }

  if (stage === 'matching' && lesson.matchingPairs) {
    return (
      <MatchingGame
        title={lesson.title}
        pairs={lesson.matchingPairs}
        color={color}
        onComplete={(_mistakes, gained) => {
          const total = bonusXp + gained;
          setBonusXp(total);
          advanceFrom('matching', total);
        }}
      />
    );
  }

  if (stage === 'scenario' && lesson.scenarioQuiz) {
    const handleAnswer = (qId: string, correct: boolean) => {
      if (correct) recordHit(track.id, lesson.id, qId);
      else recordMiss(track.id, lesson.id, qId, lesson.title);
    };
    const handleComplete = (results: ScenarioResult[]) => {
      const scenarioBonus = results.filter(r => r.correct).length * 10;
      finishLesson(bonusXp + scenarioBonus);
    };
    return (
      <ScenarioQuiz
        title={lesson.title}
        questions={lesson.scenarioQuiz}
        color={color}
        continueLabel="Complete Lesson ✓"
        onAnswer={handleAnswer}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        @keyframes slideInRight{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Top progress bar */}
      <div style={{ height: 2, background: 'var(--border)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: color, transition: 'width 0.35s ease', boxShadow: `0 0 8px ${color}60` }} />
      </div>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--sidebar-border)',
        height: 52, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
      }}>
        <button onClick={goBack} style={{
          width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)',
          background: 'var(--bg-card)', color: 'var(--text-tertiary)', fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
        >{idx === 0 && !showQuiz ? '✕' : '‹'}</button>

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
          <span style={{ color: 'var(--text-secondary)' }}>{lesson.title}</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Dots */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => { if (!showQuiz) { setPrevIdx(idx); setIdx(i); } }}
              style={{
                height: 5, width: i === idx && !showQuiz ? 18 : 5,
                borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s',
                background: i < idx || showQuiz ? color+'60' : i === idx && !showQuiz ? color : 'var(--border)',
              }} />
          ))}
          {miniQ && (
            <button style={{
              height: 5, width: showQuiz ? 18 : 5, borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.2s',
              background: showQuiz ? color : 'var(--border)',
            }} />
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-disabled)', minWidth: 52, textAlign: 'right' }}>
          {showQuiz ? 'Quiz' : `${idx+1}/${slides.length}`}
        </div>
      </div>

      {/* Two-panel */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 260px' }}>
        {/* Slide */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 64px', borderRight: '1px solid var(--sidebar-border)' }}>
          <div style={{ maxWidth: 640 }}>
            {showQuiz ? renderMiniQuiz() : showMoney ? renderMoneyAngle() : renderSlide()}

            <div style={{ display: 'flex', gap: 10, marginTop: 44 }}>
              {(idx > 0 || showQuiz || showMoney) && (
                <button onClick={goBack} style={{
                  padding: '12px 22px', borderRadius: 10, border: '1px solid var(--border)',
                  background: 'transparent', color: 'var(--text-tertiary)', fontSize: 14,
                  cursor: 'pointer', transition: 'all 150ms',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                >← Back</button>
              )}
              {showQuiz ? (
                <button onClick={quizAnswered ? onLessonComplete : undefined} disabled={!quizAnswered} style={{
                  padding: '12px 28px', borderRadius: 10, border: 'none',
                  background: quizAnswered ? color : 'var(--bg-card)',
                  color: quizAnswered ? '#fff' : 'var(--text-disabled)',
                  fontSize: 14, fontWeight: 600, cursor: quizAnswered ? 'pointer' : 'not-allowed', transition: 'all 150ms',
                }}
                onMouseEnter={e => { if (quizAnswered) { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.15)'; } }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; }}
                >{extras.length ? 'Go Deeper →' : 'Complete Lesson ✓'}</button>
              ) : (
                <button onClick={goNext} style={{
                  padding: '12px 28px', borderRadius: 10, border: 'none',
                  background: color, color: '#fff', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 150ms',
                  boxShadow: `0 4px 16px ${color}30`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >{showMoney
                    ? (miniQ ? 'Quick Check →' : extras.length ? 'Go Deeper →' : 'Complete ✓')
                    : isLast
                      ? (lesson.moneyAngle ? 'Money Angle →' : miniQ ? 'Quick Check →' : extras.length ? 'Go Deeper →' : 'Complete ✓')
                      : 'Continue →'}</button>
              )}
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              {['← Back', '→ / Space', 'Esc'].map((hint, i) => (
                <span key={i} style={{ fontSize: 10.5, color: 'var(--text-disabled)', padding: '2px 7px', borderRadius: 4, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  {hint}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TOC */}
        <div style={{ background: 'var(--bg-raised)', borderLeft: '1px solid var(--sidebar-border)', padding: '28px 18px', overflowY: 'auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 12px',
            borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', marginBottom: 20,
          }}>
            <span style={{ fontSize: 22 }}>{mod.emoji}</span>
            <div>
              <div style={{ fontSize: 10.5, color: 'var(--text-disabled)', letterSpacing: '0.04em' }}>{track.title}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{mod.title}</div>
            </div>
          </div>

          <p style={{ margin: '0 0 10px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-disabled)', letterSpacing: '0.07em' }}>LESSON OUTLINE</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 20 }}>
            {slides.map((s, i) => {
              const isCur  = i === idx && !showQuiz;
              const isDone = i < idx || showQuiz;
              return (
                <button key={i} onClick={() => { if (!showQuiz) { setPrevIdx(idx); setIdx(i); } }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 9,
                    padding: '8px 10px', borderRadius: 9, width: '100%',
                    border: 'none', textAlign: 'left', cursor: 'pointer',
                    background: isCur ? color+'12' : 'transparent',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={e => { if (!isCur) (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; }}
                  onMouseLeave={e => { if (!isCur) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: 11, lineHeight: 1.6, flexShrink: 0, color: isCur ? color : isDone ? 'var(--success)' : 'var(--text-disabled)' }}>
                    {isDone ? '✓' : SLIDE_ICONS[s.type] || '◈'}
                  </span>
                  <span style={{ fontSize: 12, lineHeight: 1.4, fontWeight: isCur ? 500 : 400, color: isCur ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                    {s.title}
                  </span>
                </button>
              );
            })}
            {miniQ && (
              <button style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '8px 10px', borderRadius: 9, width: '100%',
                border: 'none', textAlign: 'left', cursor: 'pointer',
                background: showQuiz ? color+'12' : 'transparent', transition: 'background 150ms',
              }}
              onMouseEnter={e => { if (!showQuiz) (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; }}
              onMouseLeave={e => { if (!showQuiz) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 11, flexShrink: 0, color: showQuiz ? color : 'var(--text-disabled)' }}>⚡</span>
                <span style={{ fontSize: 12, fontWeight: showQuiz ? 500 : 400, color: showQuiz ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>Quick Check</span>
              </button>
            )}
          </div>

          {mod.lessons.filter(l => l.id !== lesson.id).length > 0 && (
            <div>
              <p style={{ margin: '0 0 8px', fontSize: 10.5, fontWeight: 600, color: 'var(--text-disabled)', letterSpacing: '0.07em' }}>OTHER LESSONS</p>
              {mod.lessons.filter(l => l.id !== lesson.id).slice(0, 5).map(l => (
                <Link key={l.id} href={`/track/${track.id}/module/${mod.id}/lesson/${l.id}`}
                  style={{ display: 'block', padding: '7px 10px', borderRadius: 8, fontSize: 12, color: 'var(--text-disabled)', textDecoration: 'none', lineHeight: 1.4, transition: 'all 150ms' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-disabled)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {l.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
