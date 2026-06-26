'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout';
import { useProgress } from '../context/ProgressContext';
import { getAllTracks } from '../lib/data';
import type { Module, Lesson } from '../lib/types';
import {
  TRACK_PREREQUISITES,
  TRACK_LEVELS,
  LEVEL_LABELS,
  type TrackLevel,
} from '../data/progression';
import { isTrackUnlocked, getCompletedTracks } from '../lib/progress';
import MaiaGuide from '../components/MaiaGuide';
import ExternalCourses from '../components/ExternalCourses';

const LEVEL_COLORS: Record<string, string> = {
  beginner:     '#30d158',
  intermediate: '#ff9f0a',
  expert:       '#ff453a',
};

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

interface OnboardingInfo {
  score: number;
  hasOnboarded: boolean;
  testMode: boolean;
}

function getOnboardingInfo(): OnboardingInfo {
  if (typeof window === 'undefined') return { score: -1, hasOnboarded: false, testMode: false };
  const testMode = localStorage.getItem('maiden_test_mode') === 'true';
  const hasOnboarded = localStorage.getItem('maiden_onboarded') === '1';
  const raw = localStorage.getItem('maiden_user');
  if (!raw) return { score: -1, hasOnboarded, testMode };
  try {
    const u = JSON.parse(raw);
    let score: number;
    if (typeof u.onboardingScore === 'number') {
      score = u.onboardingScore;
    } else {
      const level = u.level as string ?? 'beginner';
      score = level === 'expert' ? 10 : level === 'intermediate' ? 6 : 2;
    }
    return { score, hasOnboarded, testMode };
  } catch {
    return { score: -1, hasOnboarded, testMode };
  }
}

function getVisibilityConfig(info: OnboardingInfo): { visibleLevels: TrackLevel[]; forcedLockedLevel: TrackLevel | null } {
  // Test mode or no user/no onboarding: show ALL levels unlocked
  if (info.testMode || !info.hasOnboarded || info.score < 0) {
    return { visibleLevels: [1, 2, 3, 4], forcedLockedLevel: null };
  }
  if (info.score <= 4) {
    // Beginner: L1 unlocked, L2 visible+locked, L3+ hidden
    return { visibleLevels: [1, 2], forcedLockedLevel: 2 };
  } else if (info.score <= 8) {
    // Intermediate: L1+2 unlocked, L3 visible+locked, L4+ hidden
    return { visibleLevels: [1, 2, 3], forcedLockedLevel: 3 };
  } else {
    // Expert: all visible, L4 uses normal prerequisite-based locking
    return { visibleLevels: [1, 2, 3, 4], forcedLockedLevel: null };
  }
}

export default function TracksPage() {
  const { completedLessons } = useProgress();
  const tracks = getAllTracks();
  const [, setCompletedTracks] = useState<string[]>([]);
  const [onboardingInfo, setOnboardingInfo] = useState<OnboardingInfo>({ score: -1, hasOnboarded: false, testMode: false });

  useEffect(() => {
    setCompletedTracks(getCompletedTracks());
    setOnboardingInfo(getOnboardingInfo());
  }, []);

  // Group tracks by level
  const levels: TrackLevel[] = [1, 2, 3, 4];
  const tracksByLevel: Record<TrackLevel, typeof tracks> = { 1: [], 2: [], 3: [], 4: [] };
  for (const track of tracks) {
    const level = (TRACK_LEVELS[track.id] ?? 2) as TrackLevel;
    tracksByLevel[level].push(track);
  }

  const { visibleLevels, forcedLockedLevel } = getVisibilityConfig(onboardingInfo);

  let cardIndex = 0;

  return (
    <DashboardLayout title="Tracks">
      <section style={{ marginBottom: 44, animation: 'fadeUp 0.4s ease both' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 48, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Learning Tracks.
        </h1>
        <p style={{ margin: 0, fontSize: 17, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
          Pick a track and go deep. Complete courses to unlock the next level.
        </p>
      </section>

      {levels.map(level => {
        const levelTracks = tracksByLevel[level];
        if (levelTracks.length === 0) return null;
        if (!visibleLevels.includes(level)) return null;

        const isLevelForcedLocked = forcedLockedLevel !== null && level === forcedLockedLevel;

        return (
          <div key={level} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '5px 14px', borderRadius: 999,
                background: level === 1 ? 'var(--accent-subtle)' : 'var(--bg-card-hover)',
                border: `1px solid ${level === 1 ? 'var(--accent-glow)' : 'var(--border)'}`,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: level === 1 ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                  LEVEL {level}
                </span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                {LEVEL_LABELS[level]}
              </span>
              {isLevelForcedLocked && (
                <span style={{ fontSize: 12, color: 'var(--text-disabled)' }}>
                  Complete a Level {level - 1} track to unlock
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
              {levelTracks.map(track => {
                const prerequisites = TRACK_PREREQUISITES[track.id] ?? [];
                const unlocked = isLevelForcedLocked ? false : isTrackUnlocked(track.id, prerequisites);
                const total = track.modules.reduce((s: number, m: Module) => s + m.lessons.length, 0);
                const done  = track.modules.reduce((s: number, m: Module) =>
                  s + m.lessons.filter((l: Lesson) => completedLessons.includes(l.id)).length, 0);
                const p = total > 0 ? Math.round((done / total) * 100) : 0;
                const g0 = track.gradient?.[0] ?? '#0A6FFF';
                const g1 = track.gradient?.[1] ?? '#0A6FFF';
                const ti = cardIndex++;

                const prereqName = isLevelForcedLocked
                  ? `a Level ${level - 1} track`
                  : prerequisites.map(id => tracks.find(t => t.id === id)?.title ?? id).join(', ');

                const cardContent = (
                  <div style={{
                    background: unlocked ? 'var(--bg-card)' : 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 20, overflow: 'hidden',
                    transition: 'all 200ms ease',
                    opacity: unlocked ? 1 : 0.55,
                    filter: unlocked ? 'none' : 'grayscale(0.4)',
                  }}
                  onMouseEnter={e => {
                    if (!unlocked) return;
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'var(--bg-card-hover)';
                    el.style.borderColor = 'var(--border-hover)';
                    el.style.transform = 'translateY(-2px)';
                    el.style.boxShadow = `0 12px 40px ${g0}28`;
                  }}
                  onMouseLeave={e => {
                    if (!unlocked) return;
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'var(--bg-card)';
                    el.style.borderColor = 'var(--border)';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ height: 3, background: unlocked ? `linear-gradient(90deg,${g0},${g1})` : 'var(--border)' }} />
                    <div style={{ padding: '26px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                        <div style={{ fontSize: 44, filter: unlocked ? 'none' : 'grayscale(1)' }}>{track.emoji}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                          {!unlocked && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: 'var(--bg-card-hover)', border: '1px solid var(--border)', color: 'var(--text-disabled)', fontSize: 12, fontWeight: 600 }}>
                              <LockIcon />
                              <span>Locked</span>
                            </div>
                          )}
                          <div style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'var(--bg-card-hover)', border: '1px solid var(--border)', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
                            {track.category}
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 999, background: 'var(--bg-card-hover)', border: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>
                            {total} lessons
                          </div>
                        </div>
                      </div>
                      <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        {track.title}
                      </h2>
                      <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                        {unlocked ? track.description : `Complete ${prereqName} first to unlock this track.`}
                      </p>
                      {unlocked && (
                        <>
                          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                            {Array.from(new Set(track.modules.map((m: { level: string }) => m.level))).map((level) => (
                              <span key={level as string} style={{
                                fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 999,
                                color: LEVEL_COLORS[level as string] ?? 'var(--text-secondary)',
                                background: (LEVEL_COLORS[level as string] ?? '#a1a1a6') + '14',
                                border: `1px solid ${(LEVEL_COLORS[level as string] ?? '#a1a1a6')}28`,
                                textTransform: 'capitalize',
                              }}>{level as string}</span>
                            ))}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{done} of {total} lessons</span>
                            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{p}%</span>
                          </div>
                          <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${p}%`, background: `linear-gradient(90deg,${g0},${g1})`, borderRadius: 2, transition: 'width 0.8s ease' }} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );

                return unlocked ? (
                  <Link key={track.id} href={`/track/${track.id}`}
                    style={{ display: 'block', textDecoration: 'none', animation: `fadeUp 0.4s ${ti * 0.05}s ease both` }}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div key={track.id} style={{ animation: `fadeUp 0.4s ${ti * 0.05}s ease both`, cursor: 'not-allowed' }}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <ExternalCourses />

      <MaiaGuide context="tracks" />
    </DashboardLayout>
  );
}
