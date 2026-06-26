import type { Lesson, Module, QuizQuestion, ScenarioQuestion } from './types';

/** Base lesson XP was cut 40% as part of the difficulty pass. */
export const LESSON_XP_MULTIPLIER = 0.6;

/** The "full credit" XP for a lesson — what 100% on its Quick Check pays out. */
export function getLessonXp(lesson: Lesson): number {
  return Math.round((lesson.xp ?? 20) * LESSON_XP_MULTIPLIER);
}

/** Minimum fraction correct on the Quick Check needed to complete a lesson. */
export const QUICK_CHECK_PASS_THRESHOLD = 0.6;

function shuffledVariant(q: QuizQuestion, suffix: string): QuizQuestion {
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...q,
    id: `${q.id}_${suffix}`,
    options: order.map(i => q.options[i]),
    correct: order.indexOf(q.correct),
  };
}

/**
 * The Quick Check question set for a lesson: the module quiz entries assigned
 * to it (by index % lessons.length), padded to at least 2 questions with a
 * shuffled-option duplicate when only one is assigned.
 */
export function getLessonQuizPool(mod: Module, lesson: Lesson): ScenarioQuestion[] {
  if (mod.quiz.length === 0) return [];
  const n = mod.lessons.length;
  const lessonIdx = mod.lessons.findIndex(l => l.id === lesson.id);
  let pool = mod.quiz.filter((_, i) => i % n === lessonIdx);
  if (pool.length === 0) pool = [mod.quiz[lessonIdx % mod.quiz.length]];
  if (pool.length === 1) pool = [pool[0], shuffledVariant(pool[0], 'v2')];
  return pool;
}
