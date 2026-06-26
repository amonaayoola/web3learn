'use client';

// Weak-spot tracking. A "weak spot" is a scenario question the user got wrong on
// their first attempt. We store the minimum needed to reconstruct the question
// later (track + lesson + question id) plus a human-readable topic label for
// review messaging. Persisted under `maiden_progress.weakSpots`.

export interface WeakSpot {
  trackId: string;
  lessonId: string;
  questionId: string;
  /** Lesson title, for "you struggled with ERC-721" messaging. */
  topic: string;
  /** Number of times missed (across attempts). */
  misses: number;
  /** Last time this was seen wrong, as a counter tick (monotonic-ish). */
  lastMissedAt: number;
}

const KEY = 'maiden_progress';

interface ProgressBlob {
  weakSpots?: WeakSpot[];
  [k: string]: unknown;
}

function read(): ProgressBlob {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function write(blob: ProgressBlob): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(blob));
  } catch {
    /* ignore quota / serialization errors */
  }
}

function key(trackId: string, lessonId: string, questionId: string): string {
  return `${trackId}::${lessonId}::${questionId}`;
}

/** Record a missed scenario question. Idempotent per question (increments miss count). */
export function recordMiss(
  trackId: string,
  lessonId: string,
  questionId: string,
  topic: string,
): void {
  const blob = read();
  const list = blob.weakSpots || [];
  const existing = list.find(
    w => key(w.trackId, w.lessonId, w.questionId) === key(trackId, lessonId, questionId),
  );
  const tick = list.reduce((m, w) => Math.max(m, w.lastMissedAt), 0) + 1;
  if (existing) {
    existing.misses += 1;
    existing.lastMissedAt = tick;
    existing.topic = topic;
  } else {
    list.push({ trackId, lessonId, questionId, topic, misses: 1, lastMissedAt: tick });
  }
  blob.weakSpots = list;
  write(blob);
}

/** Record a correct answer — removes the question from the weak-spot list (gap closed). */
export function recordHit(trackId: string, lessonId: string, questionId: string): void {
  clearWeakSpot(trackId, lessonId, questionId);
}

/** All weak spots for a track (most-missed first). */
export function getWeakSpots(trackId: string): WeakSpot[] {
  const list = read().weakSpots || [];
  return list
    .filter(w => w.trackId === trackId)
    .sort((a, b) => b.misses - a.misses || b.lastMissedAt - a.lastMissedAt);
}

/** Remove a single weak spot (e.g. answered correctly in review). */
export function clearWeakSpot(trackId: string, lessonId: string, questionId: string): void {
  const blob = read();
  const list = blob.weakSpots || [];
  blob.weakSpots = list.filter(
    w => key(w.trackId, w.lessonId, w.questionId) !== key(trackId, lessonId, questionId),
  );
  write(blob);
}

/** Count of distinct topics (lessons) the user has weak spots in. */
export function weakSpotTopics(trackId: string): { lessonId: string; topic: string; count: number }[] {
  const list = getWeakSpots(trackId);
  const byLesson = new Map<string, { lessonId: string; topic: string; count: number }>();
  for (const w of list) {
    const e = byLesson.get(w.lessonId);
    if (e) e.count += 1;
    else byLesson.set(w.lessonId, { lessonId: w.lessonId, topic: w.topic, count: 1 });
  }
  return [...byLesson.values()].sort((a, b) => b.count - a.count);
}
