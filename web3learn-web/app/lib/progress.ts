'use client';

export function getCompletedTracks(): string[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('maiden_progress');
  if (!raw) return [];
  try {
    return JSON.parse(raw).completedTracks || [];
  } catch {
    return [];
  }
}

export function isTrackUnlocked(trackId: string, prerequisites: string[]): boolean {
  // Test mode bypasses all locks
  const testMode = typeof window !== 'undefined' && localStorage.getItem('maiden_test_mode') === 'true';
  if (testMode) return true;
  if (!prerequisites || prerequisites.length === 0) return true;
  const completed = getCompletedTracks();
  return prerequisites.every(req => completed.includes(req));
}

export function markTrackComplete(trackId: string): void {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem('maiden_progress') || '{}';
  let progress: { completedTracks?: string[] } = {};
  try {
    progress = JSON.parse(raw);
  } catch {
    progress = {};
  }
  if (!progress.completedTracks) progress.completedTracks = [];
  if (!progress.completedTracks.includes(trackId)) {
    progress.completedTracks.push(trackId);
  }
  localStorage.setItem('maiden_progress', JSON.stringify(progress));
}
