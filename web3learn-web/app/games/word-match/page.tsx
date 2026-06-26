'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getTermsByDifficulty, type Difficulty } from '../../data/vocabulary';
import ShareCard from '../../components/ShareCard';
import { deductMP, getUserMP } from '../../lib/xp';

const MP_COST = 5;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

type GameState = 'idle' | 'playing' | 'done';

const DIFF_CONFIG: Record<Difficulty, { label: string; color: string; pairs: number; time: number }> = {
  beginner:     { label: 'Beginner',     color: '#10B981', pairs: 8, time: 90 },
  intermediate: { label: 'Intermediate', color: '#F59E0B', pairs: 8, time: 75 },
  expert:       { label: 'Expert',       color: '#EF4444', pairs: 8, time: 60 },
};

export default function WordMatchPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [gameState, setGameState]   = useState<GameState>('idle');
  const [terms, setTerms]           = useState<string[]>([]);
  const [defs, setDefs]             = useState<string[]>([]);
  const [pairs, setPairs]           = useState<Record<string, string>>({});
  const [selTerm, setSelTerm]       = useState<string | null>(null);
  const [selDef, setSelDef]         = useState<string | null>(null);
  const [matched, setMatched]       = useState<string[]>([]);
  const [wrong, setWrong]           = useState<string[]>([]);
  const [score, setScore]           = useState(0);
  const [time, setTime]             = useState(90);
  const [showShare, setShowShare]   = useState(false);
  const [xpError, setXpError]       = useState(false);
  const [userMP, setUserMP]         = useState(0);

  useEffect(() => { setUserMP(getUserMP()); }, []);

  const cfg = DIFF_CONFIG[difficulty];

  const startGame = useCallback(() => {
    const ok = deductMP(MP_COST);
    if (!ok) { setXpError(true); return; }
    setXpError(false);
    setUserMP(getUserMP());
    const vocabTerms = getTermsByDifficulty(difficulty, cfg.pairs);
    const pairMap: Record<string, string> = {};
    vocabTerms.forEach(v => { pairMap[v.term] = v.definition; });
    setPairs(pairMap);
    setTerms(shuffle(vocabTerms.map(v => v.term)));
    setDefs(shuffle(vocabTerms.map(v => v.definition)));
    setSelTerm(null); setSelDef(null); setMatched([]); setWrong([]);
    setScore(0); setTime(cfg.time); setGameState('playing');
  }, [difficulty, cfg.pairs, cfg.time]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (time <= 0) { setGameState('done'); return; }
    const id = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [gameState, time]);

  useEffect(() => {
    if (matched.length > 0 && matched.length === Object.keys(pairs).length) setGameState('done');
  }, [matched, pairs]);

  useEffect(() => {
    if (!selTerm || !selDef) return;
    if (pairs[selTerm] === selDef) {
      setMatched(m => [...m, selTerm]);
      setScore(s => s + 1);
      setSelTerm(null); setSelDef(null);
    } else {
      setWrong([selTerm, selDef]);
      setTimeout(() => { setWrong([]); setSelTerm(null); setSelDef(null); }, 700);
    }
  }, [selTerm, selDef, pairs]);

  const totalPairs = Object.keys(pairs).length;
  const remaining  = totalPairs - matched.length;
  const timerPct   = (time / cfg.time) * 100;
  const timerColor = time > cfg.time * 0.5 ? '#10B981' : time > cfg.time * 0.25 ? '#F59E0B' : '#EF4444';
  const xp = score * (difficulty === 'expert' ? 20 : difficulty === 'intermediate' ? 15 : 10);

  if (gameState === 'idle') {
    return (
      <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif" }}>
        <div style={{ maxWidth:480, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px', boxShadow:'var(--card-shadow)' }}>
          <div style={{ fontSize:56, marginBottom:16 }}>🔤</div>
          <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Word Match</h1>
          <p style={{ color:'var(--text-secondary)', marginBottom:32, fontSize:14, lineHeight:1.6 }}>Match crypto terms to their definitions before time runs out.</p>
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:600, color:'var(--text-tertiary)', letterSpacing:'0.08em', marginBottom:12 }}>SELECT DIFFICULTY</div>
            <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
              {(Object.keys(DIFF_CONFIG) as Difficulty[]).map(d => (
                <button key={d} onClick={() => setDifficulty(d)} style={{
                  padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer',
                  border:`1px solid ${difficulty===d ? DIFF_CONFIG[d].color : 'var(--glass-border)'}`,
                  background: difficulty===d ? `${DIFF_CONFIG[d].color}18` : 'var(--glass)',
                  color: difficulty===d ? DIFF_CONFIG[d].color : 'var(--text-secondary)',
                  transition:'all 150ms',
                }}>{DIFF_CONFIG[d].label}</button>
              ))}
            </div>
            <div style={{ marginTop:12, fontSize:12, color:'var(--text-muted)' }}>{cfg.pairs} pairs · {cfg.time}s</div>
          </div>
          <div style={{ marginBottom:12, fontSize:12, color:'var(--text-tertiary)' }}>
            Cost: <span style={{ color:'#F59E0B', fontWeight:600 }}>-{MP_COST} MP</span> &nbsp;|&nbsp; Your balance: <span style={{ color:'#F59E0B', fontWeight:600 }}>{userMP} MP</span>
          </div>
          {xpError && (
            <div style={{ marginBottom:16, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>
              Not enough MP to play. Complete lessons to earn more MP.
            </div>
          )}
          <button onClick={startGame} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'var(--accent)', color:'#fff', fontWeight:700, fontSize:15, boxShadow:'0 4px 20px rgba(109,40,217,0.3)' }}>Start Game ({MP_COST} MP)</button>
        </div>
      </div>
    );
  }

  if (gameState === 'done') {
    return (
      <>
        <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif" }}>
          <div style={{ maxWidth:460, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px', boxShadow:'var(--card-shadow)' }}>
            <div style={{ fontSize:64, marginBottom:20 }}>{score === totalPairs ? '🏆' : time <= 0 ? '⏰' : '💪'}</div>
            <h2 style={{ margin:'0 0 8px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>{score} / {totalPairs} matched</h2>
            <p style={{ color:'var(--text-secondary)', marginBottom:28, fontSize:14 }}>{time <= 0 ? 'Time ran out!' : 'All pairs matched!'} {cfg.label} difficulty.</p>
            <div style={{ background:'var(--accent-subtle)', borderRadius:16, padding:'18px 24px', marginBottom:28, border:'1px solid var(--accent-glow)' }}>
              <div style={{ fontSize:30, fontWeight:800, color:'var(--gold)' }}>+{xp} XP</div>
              <div style={{ fontSize:12, color:'var(--text-tertiary)', marginTop:4 }}>earned this round</div>
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={startGame} style={{ padding:'11px 22px', borderRadius:12, border:'none', cursor:'pointer', background:'var(--accent)', color:'#fff', fontWeight:700, fontSize:14 }}>Play Again</button>
              <button onClick={() => setShowShare(true)} style={{ padding:'11px 22px', borderRadius:12, border:'1px solid var(--accent)', background:'var(--accent-subtle)', color:'var(--accent)', fontWeight:700, fontSize:14, cursor:'pointer' }}>Share Result</button>
              <Link href="/games" style={{ padding:'11px 20px', borderRadius:12, border:'1px solid var(--border)', background:'var(--glass)', color:'var(--text-secondary)', fontWeight:600, fontSize:14, textDecoration:'none', display:'inline-flex', alignItems:'center' }}>Games</Link>
            </div>
          </div>
        </div>
        {showShare && <ShareCard gameName="Word Match" difficulty={difficulty} scoreLabel={`${score}/${totalPairs}`} xp={xp} onClose={() => setShowShare(false)} />}
      </>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:"'Outfit',sans-serif", padding:'24px 16px' }}>
      <div style={{ maxWidth:960, margin:'0 auto 20px', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <Link href="/games" style={{ fontSize:13, color:'var(--text-tertiary)', textDecoration:'none' }}>← Games</Link>
        <h1 style={{ margin:0, fontSize:18, fontWeight:800, color:'var(--text-primary)' }}>Word Match</h1>
        <span style={{ fontSize:12, padding:'4px 10px', borderRadius:8, background:`${cfg.color}15`, color:cfg.color, fontWeight:600, border:`1px solid ${cfg.color}30` }}>{cfg.label}</span>
        <div style={{ flex:1 }} />
        <span style={{ fontSize:13, fontWeight:600, color:'var(--text-secondary)' }}>{remaining} left</span>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:80, height:6, background:'var(--glass)', borderRadius:3, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${timerPct}%`, background:timerColor, borderRadius:3, transition:'width 1s linear, background 0.5s' }} />
          </div>
          <span style={{ fontSize:14, fontWeight:700, color:timerColor, minWidth:24 }}>{time}</span>
        </div>
      </div>

      <div style={{ maxWidth:960, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ fontSize:10, fontWeight:700, color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:4 }}>TERMS</div>
          {terms.map(t => {
            const isMatched = matched.includes(t);
            const isSelected = selTerm === t;
            const isWrong = wrong.includes(t);
            return (
              <button key={t} onClick={() => !isMatched && setSelTerm(t === selTerm ? null : t)} style={{
                padding:'13px 18px', borderRadius:12, textAlign:'left', cursor:isMatched?'default':'pointer',
                fontSize:14, fontWeight:600,
                border:`1px solid ${isMatched?'#10B98140':isWrong?'#EF4444':isSelected?'var(--accent)':'var(--glass-border)'}`,
                background:isMatched?'rgba(16,185,129,0.08)':isWrong?'rgba(239,68,68,0.1)':isSelected?'var(--accent-subtle)':'var(--glass)',
                color:isMatched?'#10B981':isWrong?'#EF4444':isSelected?'var(--accent)':'var(--text-primary)',
                transition:'all 150ms', opacity:isMatched?0.5:1,
              }}>{isMatched ? '✓ ' : ''}{t}</button>
            );
          })}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ fontSize:10, fontWeight:700, color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:4 }}>DEFINITIONS</div>
          {defs.map(d => {
            const termKey = Object.keys(pairs).find(k => pairs[k] === d);
            const isMatched = termKey ? matched.includes(termKey) : false;
            const isSelected = selDef === d;
            const isWrong = wrong.includes(d);
            return (
              <button key={d} onClick={() => !isMatched && setSelDef(d === selDef ? null : d)} style={{
                padding:'13px 18px', borderRadius:12, textAlign:'left', cursor:isMatched?'default':'pointer',
                fontSize:12, lineHeight:1.5,
                border:`1px solid ${isMatched?'#10B98140':isWrong?'#EF4444':isSelected?'var(--accent-2)':'var(--glass-border)'}`,
                background:isMatched?'rgba(16,185,129,0.08)':isWrong?'rgba(239,68,68,0.1)':isSelected?'rgba(6,182,212,0.1)':'var(--glass)',
                color:isMatched?'#10B981':isWrong?'#EF4444':isSelected?'var(--accent-2)':'var(--text-secondary)',
                transition:'all 150ms', opacity:isMatched?0.5:1,
              }}>{d}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
