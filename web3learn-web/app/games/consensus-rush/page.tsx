'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { deductMP, getUserMP, addMP } from '../../lib/xp';

const MP_COST = 3;
const MP_WIN_NORMAL = 6;
const MP_WIN_PERFECT = 15;
const TOTAL_BLOCKS = 30;

type BlockType = 'normal' | 'forked' | 'mev' | 'late';

interface SliderBlock {
  id: number;
  type: BlockType;
  x: number;
  speed: number;
  attested: boolean;
  missed: boolean;
  resolved: boolean;
}

const BLOCK_TYPE_INFO: Record<BlockType, { label: string; color: string; emoji: string; valid: boolean; reward: number; windowFraction: number }> = {
  normal: { label: 'Valid Block',   color: '#22C55E', emoji: '🟩', valid: true,  reward: 10, windowFraction: 0.25 },
  forked: { label: 'Forked Block',  color: '#EF4444', emoji: '🔴', valid: false, reward: 0,  windowFraction: 0.25 },
  mev:    { label: 'MEV Block',     color: '#F59E0B', emoji: '⚡', valid: true,  reward: 20, windowFraction: 0.20 },
  late:   { label: 'Late Block',    color: '#EAB308', emoji: '🕐', valid: true,  reward: 6,  windowFraction: 0.15 },
};

const TRACK_WIDTH = 600;
const BLOCK_WIDTH = 80;
const WINDOW_CENTER = TRACK_WIDTH / 2;

function inWindow(x: number, windowFraction: number): boolean {
  const halfWindow = (TRACK_WIDTH * windowFraction) / 2;
  const blockCenter = x + BLOCK_WIDTH / 2;
  return Math.abs(blockCenter - WINDOW_CENTER) < halfWindow;
}

let blockIdCounter = 0;

function makeBlock(index: number): { type: BlockType; speed: number } {
  const progress = index / TOTAL_BLOCKS;
  const baseSpeed = 1.2 + progress * 2.5;
  const speed = baseSpeed + Math.random() * 0.8;
  const r = Math.random();
  const type: BlockType =
    r < 0.08 ? 'mev' :
    r < 0.28 ? 'forked' :
    r < 0.42 ? 'late' :
    'normal';
  return { type, speed };
}

export default function ConsensusRushPage() {
  const [paid, setPaid] = useState(false);
  const [mpError, setMpError] = useState(false);
  const [userMP, setUserMP] = useState(0);
  const [blocks, setBlocks] = useState<SliderBlock[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [blocksSpawned, setBlocksSpawned] = useState(0);
  const [blocksResolved, setBlocksResolved] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [allCorrect, setAllCorrect] = useState(true);
  const [timeLeft, setTimeLeft] = useState(90);
  const [feedback, setFeedback] = useState<{ text: string; color: string } | null>(null);
  const [multiplier, setMultiplier] = useState(1);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const spawnCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gameOverRef = useRef(false);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const multiplierRef = useRef(1);
  const allCorrectRef = useRef(true);
  const blocksResolvedRef = useRef(0);
  const blocksSpawnedRef = useRef(0);

  useEffect(() => { setUserMP(getUserMP()); }, []);

  const endGame = useCallback((finalScore: number, perfect: boolean) => {
    gameOverRef.current = true;
    setGameOver(true);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (finalScore > 150 || perfect) {
      const mp = perfect ? MP_WIN_PERFECT : MP_WIN_NORMAL;
      addMP(mp);
      setUserMP(getUserMP());
    }
  }, []);

  const showFeedback = useCallback((text: string, color: string) => {
    setFeedback({ text, color });
    setTimeout(() => setFeedback(null), 900);
  }, []);

  const resolveAttest = useCallback(() => {
    if (gameOverRef.current) return;
    setBlocks(prev => {
      const active = prev.filter(b => !b.resolved && !b.attested && !b.missed);
      if (active.length === 0) return prev;
      // Find the block closest to center
      const closest = active.reduce((a, b) => {
        const da = Math.abs((a.x + BLOCK_WIDTH/2) - WINDOW_CENTER);
        const db = Math.abs((b.x + BLOCK_WIDTH/2) - WINDOW_CENTER);
        return da < db ? a : b;
      });
      const info = BLOCK_TYPE_INFO[closest.type];
      const inWin = inWindow(closest.x, info.windowFraction);

      if (inWin) {
        // Attested a block in window
        if (info.valid) {
          const pts = info.reward * multiplierRef.current;
          scoreRef.current += pts;
          setScore(scoreRef.current);
          streakRef.current++;
          setStreak(streakRef.current);
          setMaxStreak(m => Math.max(m, streakRef.current));
          if (streakRef.current >= 5) {
            multiplierRef.current = 2;
            setMultiplier(2);
          }
          showFeedback(`+${pts} ATTESTED!`, '#22C55E');
        } else {
          // Slashed!
          scoreRef.current -= 20;
          setScore(scoreRef.current);
          streakRef.current = 0;
          setStreak(0);
          multiplierRef.current = 1;
          setMultiplier(1);
          allCorrectRef.current = false;
          setAllCorrect(false);
          showFeedback('-20 SLASHED!', '#EF4444');
        }
      } else {
        // Attested out of window -- counts as miss
        if (info.valid) {
          scoreRef.current -= 5;
          setScore(scoreRef.current);
          streakRef.current = 0;
          setStreak(0);
          multiplierRef.current = 1;
          setMultiplier(1);
          allCorrectRef.current = false;
          setAllCorrect(false);
          showFeedback('-5 EARLY/LATE', '#F59E0B');
        }
      }
      blocksResolvedRef.current++;
      setBlocksResolved(blocksResolvedRef.current);
      if (blocksResolvedRef.current >= TOTAL_BLOCKS || blocksSpawnedRef.current >= TOTAL_BLOCKS) {
        setTimeout(() => endGame(scoreRef.current, allCorrectRef.current), 300);
      }
      return prev.map(b => b.id === closest.id ? { ...b, attested: true, resolved: true } : b);
    });
    setLastAction('attest');
  }, [endGame, showFeedback]);

  const resolveSkip = useCallback(() => {
    if (gameOverRef.current) return;
    setBlocks(prev => {
      const active = prev.filter(b => !b.resolved && !b.attested && !b.missed);
      if (active.length === 0) return prev;
      const closest = active.reduce((a, b) => {
        const da = Math.abs((a.x + BLOCK_WIDTH/2) - WINDOW_CENTER);
        const db = Math.abs((b.x + BLOCK_WIDTH/2) - WINDOW_CENTER);
        return da < db ? a : b;
      });
      const info = BLOCK_TYPE_INFO[closest.type];
      const inWin = inWindow(closest.x, info.windowFraction);
      if (inWin && !info.valid) {
        // Correctly skipped invalid
        scoreRef.current += 5;
        setScore(scoreRef.current);
        streakRef.current++;
        setStreak(streakRef.current);
        setMaxStreak(m => Math.max(m, streakRef.current));
        if (streakRef.current >= 5) { multiplierRef.current = 2; setMultiplier(2); }
        showFeedback('+5 SKIPPED!', '#06B6D4');
      } else if (inWin && info.valid) {
        // Skipped valid block
        scoreRef.current -= 5;
        setScore(scoreRef.current);
        streakRef.current = 0; setStreak(0);
        multiplierRef.current = 1; setMultiplier(1);
        allCorrectRef.current = false; setAllCorrect(false);
        showFeedback('-5 MISSED!', '#F59E0B');
      }
      blocksResolvedRef.current++;
      setBlocksResolved(blocksResolvedRef.current);
      if (blocksResolvedRef.current >= TOTAL_BLOCKS || blocksSpawnedRef.current >= TOTAL_BLOCKS) {
        setTimeout(() => endGame(scoreRef.current, allCorrectRef.current), 300);
      }
      return prev.map(b => b.id === closest.id ? { ...b, resolved: true } : b);
    });
    setLastAction('skip');
  }, [endGame, showFeedback]);

  useEffect(() => {
    if (!paid || gameOverRef.current) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); resolveAttest(); }
      if (e.code === 'KeyS' || e.code === 'ArrowDown') { e.preventDefault(); resolveSkip(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [paid, resolveAttest, resolveSkip]);

  function startGame() {
    const ok = deductMP(MP_COST);
    if (!ok) { setMpError(true); return; }
    setMpError(false);
    setUserMP(getUserMP());
    blockIdCounter = 0;
    spawnCountRef.current = 0;
    blocksSpawnedRef.current = 0;
    blocksResolvedRef.current = 0;
    scoreRef.current = 0;
    streakRef.current = 0;
    multiplierRef.current = 1;
    allCorrectRef.current = true;
    gameOverRef.current = false;
    setBlocks([]);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setBlocksSpawned(0);
    setBlocksResolved(0);
    setGameOver(false);
    setAllCorrect(true);
    setTimeLeft(90);
    setMultiplier(1);
    setFeedback(null);
    setPaid(true);

    let t = 90;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) endGame(scoreRef.current, allCorrectRef.current);
    }, 1000);

    lastTimeRef.current = performance.now();
    spawnTimerRef.current = 0;

    function loop(ts: number) {
      if (gameOverRef.current) return;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;
      spawnTimerRef.current += dt;

      const spawnInterval = Math.max(1.2, 2.8 - spawnCountRef.current * 0.06);
      if (spawnTimerRef.current >= spawnInterval && spawnCountRef.current < TOTAL_BLOCKS) {
        spawnTimerRef.current = 0;
        const { type, speed } = makeBlock(spawnCountRef.current);
        const newBlock: SliderBlock = {
          id: ++blockIdCounter,
          type,
          x: -BLOCK_WIDTH,
          speed,
          attested: false,
          missed: false,
          resolved: false,
        };
        spawnCountRef.current++;
        blocksSpawnedRef.current = spawnCountRef.current;
        setBlocksSpawned(spawnCountRef.current);
        setBlocks(prev => [...prev.slice(-8), newBlock]);
      }

      setBlocks(prev => {
        const updated = prev.map(b => {
          if (b.resolved || b.missed) return b;
          const nx = b.x + b.speed * dt * 100;
          if (nx > TRACK_WIDTH + BLOCK_WIDTH) {
            // Block passed without being attested/skipped
            const info = BLOCK_TYPE_INFO[b.type];
            if (info.valid && !b.attested) {
              scoreRef.current -= 5;
              setScore(scoreRef.current);
              streakRef.current = 0; setStreak(0);
              multiplierRef.current = 1; setMultiplier(1);
              allCorrectRef.current = false; setAllCorrect(false);
              showFeedback('-5 MISSED', '#F59E0B');
              blocksResolvedRef.current++;
              setBlocksResolved(blocksResolvedRef.current);
              if (blocksResolvedRef.current >= TOTAL_BLOCKS) {
                setTimeout(() => endGame(scoreRef.current, allCorrectRef.current), 300);
              }
            } else if (!info.valid && !b.resolved) {
              // Correctly ignored invalid block
              scoreRef.current += 5;
              setScore(scoreRef.current);
              streakRef.current++;
              setStreak(streakRef.current);
              setMaxStreak(m => Math.max(m, streakRef.current));
              if (streakRef.current >= 5) { multiplierRef.current = 2; setMultiplier(2); }
              blocksResolvedRef.current++;
              setBlocksResolved(blocksResolvedRef.current);
              if (blocksResolvedRef.current >= TOTAL_BLOCKS) {
                setTimeout(() => endGame(scoreRef.current, allCorrectRef.current), 300);
              }
            }
            return { ...b, missed: true, resolved: true, x: nx };
          }
          return { ...b, x: nx };
        });
        return updated;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    }
    animFrameRef.current = requestAnimationFrame(loop);
  }

  const mpEarned = gameOver
    ? allCorrect ? MP_WIN_PERFECT : score > 150 ? MP_WIN_NORMAL : 0
    : 0;

  if (!paid) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>
      <div style={{ maxWidth:460, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>⛓️</div>
        <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Consensus Rush</h1>
        <p style={{ color:'var(--text-secondary)', marginBottom:20, fontSize:14, lineHeight:1.6 }}>
          You are a blockchain validator. Blocks slide across the screen. Press <strong>ATTEST (Space)</strong> when a valid block is in the glowing window, or <strong>SKIP (S)</strong> for invalid ones. Don&apos;t get slashed!
        </p>
        <div style={{ marginBottom:20, padding:'12px 16px', borderRadius:12, background:'rgba(167,139,250,0.08)', border:'1px solid rgba(167,139,250,0.2)', fontSize:13, textAlign:'left' }}>
          <div style={{ color:'var(--text-secondary)', marginBottom:6 }}>Block types:</div>
          {Object.entries(BLOCK_TYPE_INFO).map(([key, info]) => (
            <div key={key} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, fontSize:12 }}>
              <span>{info.emoji}</span>
              <span style={{ color: info.color, fontWeight:600 }}>{info.label}</span>
              <span style={{ color:'var(--text-muted)' }}>{info.valid ? `+${info.reward} pts` : 'INVALID - skip it'}</span>
            </div>
          ))}
        </div>
        <div style={{ marginBottom:16, fontSize:12, color:'var(--text-tertiary)' }}>
          Cost: <span style={{ color:'#A78BFA', fontWeight:700 }}>{MP_COST} MP</span> | Win: <span style={{ color:'#22C55E' }}>+{MP_WIN_NORMAL} MP</span> | Perfect: <span style={{ color:'#F59E0B' }}>+{MP_WIN_PERFECT} MP</span>
          <br /><span>Balance: {userMP} MP</span>
        </div>
        {mpError && <div style={{ marginBottom:14, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>Not enough MP to play.</div>}
        <button onClick={startGame} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7C3AED,#06B6D4)', color:'#fff', fontWeight:700, fontSize:15 }}>Validate ({MP_COST} MP)</button>
      </div>
    </div>
  );

  const windowColor = '#7C3AED';
  const activeBlocks = blocks.filter(b => !b.missed && b.x < TRACK_WIDTH + BLOCK_WIDTH);

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:"'Outfit',sans-serif", padding:'16px', display:'flex', flexDirection:'column', alignItems:'center', position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>

      <h1 style={{ margin:'8px 0 4px', fontSize:22, fontWeight:800, color:'var(--text-primary)' }}>⛓️ Consensus Rush</h1>

      {/* Stats bar */}
      <div style={{ display:'flex', gap:16, fontSize:13, marginBottom:14, flexWrap:'wrap', justifyContent:'center' }}>
        <span style={{ color:'#A78BFA', fontWeight:700 }}>Score: {score}</span>
        <span style={{ color: timeLeft <= 15 ? '#EF4444' : '#F59E0B', fontWeight:700 }}>⏱ {timeLeft}s</span>
        <span style={{ color:'#22C55E' }}>Streak: {streak} {multiplier > 1 ? '🔥 x2' : ''}</span>
        <span style={{ color:'var(--text-muted)' }}>Blocks: {blocksResolved}/{TOTAL_BLOCKS}</span>
      </div>

      {/* Feedback */}
      <div style={{ height:28, marginBottom:8, textAlign:'center' }}>
        {feedback && <div style={{ fontSize:16, fontWeight:800, color: feedback.color, animation:'fadeUp 0.9s ease' }}>{feedback.text}</div>}
      </div>

      {/* Track */}
      <div style={{ position:'relative', width:TRACK_WIDTH, height:80, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, overflow:'hidden', marginBottom:16 }}>
        {/* Chain lines */}
        <div style={{ position:'absolute', top:'50%', left:0, right:0, height:2, background:'rgba(109,40,217,0.2)', transform:'translateY(-50%)' }} />

        {/* Attestation window */}
        <div style={{ position:'absolute', top:0, bottom:0, left: WINDOW_CENTER - TRACK_WIDTH * 0.125, width: TRACK_WIDTH * 0.25, background:`rgba(109,40,217,0.12)`, border:`2px solid ${windowColor}`, borderRadius:8, boxShadow:`0 0 20px ${windowColor}50`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ fontSize:10, fontWeight:700, color: windowColor, letterSpacing:'0.06em', opacity:0.7 }}>ATTEST</div>
        </div>

        {/* Blocks */}
        {activeBlocks.map(b => {
          const info = BLOCK_TYPE_INFO[b.type];
          const inWin = inWindow(b.x, info.windowFraction);
          return (
            <div key={b.id} style={{
              position:'absolute', top:'50%', transform:'translateY(-50%)',
              left: b.x, width: BLOCK_WIDTH, height:56,
              background: b.attested ? 'rgba(34,197,94,0.3)' : info.color + '22',
              border: `2px solid ${info.color}`,
              borderRadius:10,
              boxShadow: inWin ? `0 0 16px ${info.color}80` : undefined,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              fontSize:11, fontWeight:700, color: info.color,
              transition:'box-shadow 100ms',
            }}>
              <div style={{ fontSize:18 }}>{info.emoji}</div>
              <div style={{ fontSize:9, color:'rgba(255,255,255,0.5)' }}>{info.label.split(' ')[0]}</div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      {!gameOver && (
        <div style={{ display:'flex', gap:12, marginBottom:16 }}>
          <button onClick={resolveAttest} style={{ padding:'12px 28px', borderRadius:12, border:'2px solid #22C55E', background:'rgba(34,197,94,0.12)', color:'#22C55E', fontWeight:800, fontSize:15, cursor:'pointer' }}>
            ✅ ATTEST <span style={{ fontSize:11, opacity:0.7 }}>(Space)</span>
          </button>
          <button onClick={resolveSkip} style={{ padding:'12px 28px', borderRadius:12, border:'2px solid #06B6D4', background:'rgba(6,182,212,0.10)', color:'#06B6D4', fontWeight:800, fontSize:15, cursor:'pointer' }}>
            ⏭ SKIP <span style={{ fontSize:11, opacity:0.7 }}>(S)</span>
          </button>
        </div>
      )}

      {/* Legend */}
      {!gameOver && (
        <div style={{ display:'flex', gap:12, fontSize:11, color:'var(--text-muted)', flexWrap:'wrap', justifyContent:'center', marginBottom:8 }}>
          {Object.entries(BLOCK_TYPE_INFO).map(([key, info]) => (
            <span key={key}><span style={{ color: info.color }}>{info.emoji}</span> {info.label}: {info.valid ? `+${info.reward} pts` : 'SKIP or -20'}</span>
          ))}
        </div>
      )}

      {/* Streak bar */}
      {!gameOver && streak > 0 && (
        <div style={{ width:300, marginBottom:8 }}>
          <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:4, textAlign:'center' }}>
            {streak >= 5 ? '🔥 2x MULTIPLIER ACTIVE!' : `Streak: ${streak}/5 for 2x`}
          </div>
          <div style={{ height:4, borderRadius:2, background:'rgba(255,255,255,0.08)' }}>
            <div style={{ height:'100%', width:`${Math.min(100, streak/5*100)}%`, background:'linear-gradient(90deg,#A78BFA,#F59E0B)', borderRadius:2 }} />
          </div>
        </div>
      )}

      {/* Game over */}
      {gameOver && (
        <div style={{ maxWidth:400, width:'100%', padding:'20px', borderRadius:16, background: allCorrect ? 'rgba(245,158,11,0.10)' : (score > 150 ? 'rgba(34,197,94,0.10)' : 'rgba(109,40,217,0.10)'), border:`1px solid ${allCorrect ? '#F59E0B' : '#7C3AED'}`, textAlign:'center' }}>
          <div style={{ fontSize:28, marginBottom:8 }}>{allCorrect ? '👑' : score > 150 ? '🎉' : '📉'}</div>
          <div style={{ fontSize:20, fontWeight:800, color:'var(--text-primary)', marginBottom:6 }}>
            {allCorrect ? 'Perfect Validator!' : score > 150 ? 'Great Validator!' : 'Game Over'}
          </div>
          <div style={{ fontSize:14, color:'var(--text-secondary)', marginBottom:4 }}>Final Score: <strong style={{ color:'#A78BFA' }}>{score}</strong></div>
          <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:6 }}>Max streak: {maxStreak} | Blocks: {blocksResolved}/{TOTAL_BLOCKS}</div>
          {mpEarned > 0 && <div style={{ fontSize:15, fontWeight:700, color: allCorrect ? '#F59E0B' : '#22C55E', marginBottom:10 }}>+{mpEarned} MP earned!</div>}
          <button onClick={startGame} style={{ padding:'10px 24px', borderRadius:10, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7C3AED,#06B6D4)', color:'#fff', fontWeight:700, fontSize:14 }}>Play Again ({MP_COST} MP)</button>
        </div>
      )}

      <style>{`@keyframes fadeUp { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-20px)} }`}</style>
    </div>
  );
}
