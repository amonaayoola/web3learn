'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getUserXP, getUserMP } from '../lib/xp';
import MaiaGuide from '../components/MaiaGuide';

const GAMES = [
  {
    href: '/games/crypto-wordle',
    title: 'Crypto Wordle',
    desc: 'Guess the hidden 5-letter crypto term in 6 tries. Green = right spot, yellow = wrong spot.',
    emoji: '🔤',
    gradient: ['#7C3AED','#06B6D4'],
    tag: '6 GUESSES',
    difficulty: 'Easy',
    mpCost: 2,
    mpWin: 5,
  },
  {
    href: '/games/block-builder',
    title: 'Block Builder',
    desc: 'You are a block producer. Fill your Ethereum block with transactions to maximize fee revenue.',
    emoji: '⛏️',
    gradient: ['#F59E0B','#EF4444'],
    tag: '60 SECONDS',
    difficulty: 'Medium',
    mpCost: 3,
    mpWin: 8,
  },
  {
    href: '/games/consensus-rush',
    title: 'Consensus Rush',
    desc: 'Be a validator. Attest valid blocks and skip invalid ones as they slide past at speed.',
    emoji: '⛓️',
    gradient: ['#6D28D9','#06B6D4'],
    tag: '30 BLOCKS',
    difficulty: 'Hard',
    mpCost: 3,
    mpWin: 15,
  },
  {
    href: '/games/flashcards',
    title: 'Flash Cards',
    desc: 'Flip cards to reveal definitions. Mark what you know and what to study.',
    emoji: '🃏',
    gradient: ['#06B6D4','#0891B2'],
    tag: '20 CARDS',
    difficulty: 'Easy',
    mpCost: 1,
    mpWin: 2,
  },
  {
    href: '/games/word-match',
    title: 'Word Match',
    desc: 'Match 8 crypto terms to their definitions before time runs out.',
    emoji: '🔤',
    gradient: ['#6D28D9','#8B5CF6'],
    tag: '60 SECONDS',
    difficulty: 'Easy',
    mpCost: 2,
    mpWin: 3,
  },
  {
    href: '/games/fill-blank',
    title: 'Fill the Blank',
    desc: 'Complete sentences about blockchain concepts. Choose the right word.',
    emoji: '✏️',
    gradient: ['#10B981','#059669'],
    tag: '10 ROUNDS',
    difficulty: 'Medium',
    mpCost: 2,
    mpWin: 4,
  },
  {
    href: '/games/speed-quiz',
    title: 'Speed Quiz',
    desc: '10 questions, 15 seconds each. Build combos for bonus XP.',
    emoji: '⚡',
    gradient: ['#F59E0B','#D97706'],
    tag: 'TIMED',
    difficulty: 'Hard',
    mpCost: 3,
    mpWin: 5,
  },
  {
    href: '/games/draughts',
    title: 'Draughts',
    desc: 'Classic checkers with kings, multi-jumps, and full rules. Play against the AI.',
    emoji: '⬛',
    gradient: ['#EF4444','#F97316'],
    tag: 'STRATEGY',
    difficulty: 'Medium',
    mpCost: 5,
    mpWin: 8,
  },
  {
    href: '/games/chess',
    title: 'Chess',
    desc: 'Full chess against an AI opponent. Choose difficulty from Novice to Master.',
    emoji: '♟️',
    gradient: ['#6D28D9','#06B6D4'],
    tag: 'STRATEGY',
    difficulty: 'Hard',
    mpCost: 8,
    mpWin: 12,
  },
];

const DIFF_COLORS: Record<string, string> = {
  Easy: '#10B981', Medium: '#F59E0B', Hard: '#EF4444',
};

export default function GamesPage() {
  const [userXP, setUserXP] = useState(0);
  const [userMP, setUserMP] = useState(0);

  useEffect(() => {
    setUserXP(getUserXP());
    setUserMP(getUserMP());
  }, []);

  return (
    <DashboardLayout title="Games">
      <section style={{ marginBottom: 44 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>ARCADE</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
          <h1 style={{ margin: 0, fontSize: 48, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Games.
          </h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12, padding: '8px 14px' }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#F59E0B' }}>{userXP.toLocaleString()}</span>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>XP</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: 12, padding: '8px 14px' }}>
              <span style={{ fontSize: 14 }}>🪙</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#A78BFA' }}>{userMP.toLocaleString()}</span>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>MP</span>
            </div>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 16, color: 'var(--text-secondary)' }}>
          Complete lessons to earn XP and MP. Spend MP to play. Win more than you stake.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {GAMES.map(game => {
          const [g0, g1] = game.gradient;
          const canAfford = userMP >= game.mpCost;
          return (
            <Link key={game.href} href={game.href} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{
                height: '100%', borderRadius: 20, overflow: 'hidden',
                background: 'var(--glass)', border: '1px solid var(--glass-border)',
                boxShadow: 'var(--card-shadow)',
                transition: 'all 200ms ease', cursor: 'pointer',
                opacity: canAfford ? 1 : 0.7,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `var(--card-shadow), 0 12px 40px ${g0}28`;
                el.style.borderColor = `${g0}40`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'var(--card-shadow)';
                el.style.borderColor = 'var(--glass-border)';
              }}
              >
                <div style={{ height: 4, background: `linear-gradient(90deg,${g0},${g1})` }} />
                <div style={{ padding: '22px 22px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${g0}20,${g1}15)`, border: `1px solid ${g0}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                      {game.emoji}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                      <span style={{ fontSize: 9.5, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: `${g0}18`, color: g0, letterSpacing: '0.06em', border: `1px solid ${g0}28` }}>
                        {game.tag}
                      </span>
                      <span style={{ fontSize: 9.5, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: `${DIFF_COLORS[game.difficulty]}14`, color: DIFF_COLORS[game.difficulty], letterSpacing: '0.04em' }}>
                        {game.difficulty}
                      </span>
                      <span style={{ fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'rgba(167,139,250,0.12)', color: canAfford ? '#A78BFA' : '#EF4444', letterSpacing: '0.04em', border: `1px solid ${canAfford ? 'rgba(167,139,250,0.25)' : 'rgba(239,68,68,0.25)'}` }}>
                        -{game.mpCost} MP
                      </span>
                      <span style={{ fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'rgba(52,211,153,0.10)', color: '#34D399', letterSpacing: '0.04em', border: '1px solid rgba(52,211,153,0.20)' }}>
                        +{game.mpWin} MP win
                      </span>
                    </div>
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{game.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{game.desc}</p>
                  <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: canAfford ? g0 : '#EF4444' }}>
                      {canAfford ? 'Play now' : 'Need more MP'}
                    </span>
                    <span style={{ fontSize: 14, color: canAfford ? g0 : '#EF4444' }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <MaiaGuide context="games" />
    </DashboardLayout>
  );
}
