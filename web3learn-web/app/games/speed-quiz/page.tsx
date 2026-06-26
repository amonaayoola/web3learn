'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { getTermsByDifficulty, type Difficulty, type VocabTerm } from '../../data/vocabulary';
import ShareCard from '../../components/ShareCard';
import { deductMP, getUserMP } from '../../lib/xp';

const MP_COST = 8;

const DIFF_CONFIG: Record<Difficulty, { label: string; color: string; time: number }> = {
  beginner:     { label: 'Beginner',     color: '#10B981', time: 15 },
  intermediate: { label: 'Intermediate', color: '#F59E0B', time: 12 },
  expert:       { label: 'Expert',       color: '#EF4444', time: 10 },
};

const RADIUS = 50;
const CIRC = 2 * Math.PI * RADIUS;

interface Question { term: string; correct: string; options: string[]; }

function buildQuestions(terms: VocabTerm[]): Question[] {
  return terms.map((t, i) => {
    const others = terms.filter((_, j) => j !== i).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [t.definition, ...others.map(o => o.definition)].sort(() => Math.random() - 0.5);
    return { term: t.term, correct: t.definition, options: opts };
  });
}

export default function SpeedQuizPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [questions, setQuestions]   = useState<Question[]>([]);
  const [idx, setIdx]               = useState(0);
  const [time, setTime]             = useState(15);
  const [selected, setSelected]     = useState<string | null>(null);
  const [score, setScore]           = useState(0);
  const [combo, setCombo]           = useState(0);
  const [maxCombo, setMaxCombo]     = useState(0);
  const [totalXp, setTotalXp]       = useState(0);
  const [done, setDone]             = useState(false);
  const [started, setStarted]       = useState(false);
  const [showShare, setShowShare]   = useState(false);
  const [xpError, setXpError]       = useState(false);
  const [userMP, setUserMP]         = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cfg = DIFF_CONFIG[difficulty];

  useEffect(() => { setUserMP(getUserMP()); }, []);

  const advance = useCallback((correct: boolean, newCombo: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => {
      setIdx(i => {
        const next = i + 1;
        if (next >= 10) { setDone(true); return i; }
        setTime(cfg.time); setSelected(null);
        return next;
      });
    }, 800);
  }, [cfg.time]);

  useEffect(() => {
    if (!started || done || selected !== null) return;
    intervalRef.current = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setSelected('__timeout__'); setCombo(0);
          advance(false, 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [started, idx, done, selected, advance]);

  function startGame() {
    const ok = deductMP(MP_COST);
    if (!ok) { setXpError(true); return; }
    setXpError(false);
    setUserMP(getUserMP());
    const pool = getTermsByDifficulty(difficulty, 10);
    setQuestions(buildQuestions(pool));
    setIdx(0); setTime(cfg.time); setSelected(null); setScore(0);
    setCombo(0); setMaxCombo(0); setTotalXp(0); setDone(false); setStarted(true);
  }

  function pick(opt: string) {
    if (selected !== null || !started) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSelected(opt);
    const q = questions[idx];
    const correct = opt === q.correct;
    let newCombo = combo;
    if (correct) {
      const xpGain = 10 * Math.max(1, combo + 1);
      newCombo = combo + 1;
      setScore(s => s + 1); setCombo(newCombo);
      setMaxCombo(m => Math.max(m, newCombo)); setTotalXp(x => x + xpGain);
    } else { newCombo = 0; setCombo(0); }
    advance(correct, newCombo);
  }

  const q = questions[idx];
  const dashOffset = CIRC - (CIRC * time / cfg.time);
  const timerColor = time > cfg.time * 0.6 ? '#10B981' : time > cfg.time * 0.3 ? '#F59E0B' : '#EF4444';

  if (!started) {
    return (
      <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif" }}>
        <div style={{ maxWidth:480, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'56px 48px', boxShadow:'var(--card-shadow)' }}>
          <div style={{ fontSize:56, marginBottom:16 }}>⚡</div>
          <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Speed Quiz</h1>
          <p style={{ color:'var(--text-secondary)', marginBottom:32, fontSize:14, lineHeight:1.6 }}>10 questions · Timed · Build combos for bonus XP</p>
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
            <div style={{ marginTop:12, fontSize:12, color:'var(--text-muted)' }}>{cfg.time}s per question</div>
          </div>
          <div style={{ marginBottom:12, fontSize:12, color:'var(--text-tertiary)' }}>
            Cost: <span style={{ color:'#F59E0B', fontWeight:600 }}>-{MP_COST} MP</span> &nbsp;|&nbsp; Your balance: <span style={{ color:'#F59E0B', fontWeight:600 }}>{userMP} MP</span>
          </div>
          {xpError && (
            <div style={{ marginBottom:16, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>
              Not enough MP to play. Complete lessons to earn more MP.
            </div>
          )}
          <button onClick={startGame} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'var(--gold)', color:'#fff', fontWeight:700, fontSize:15, boxShadow:'0 4px 20px rgba(245,158,11,0.3)' }}>Start Quiz ({MP_COST} XP)</button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <>
        <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif" }}>
          <div style={{ maxWidth:480, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'56px 48px', boxShadow:'var(--card-shadow)' }}>
            <div style={{ fontSize:64, marginBottom:20 }}>{score>=8?'🏆':score>=5?'🥈':'📚'}</div>
            <h2 style={{ margin:'0 0 8px', fontSize:32, fontWeight:800, color:'var(--text-primary)' }}>{score} / 10</h2>
            <p style={{ color:'var(--text-secondary)', marginBottom:32 }}>{score>=8?'Web3 master! 🔥':score>=5?'Solid knowledge!':'Keep learning!'}</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:32 }}>
              {[['+'+(totalXp),'XP Earned','var(--gold)'],['x'+maxCombo,'Best Combo','#F59E0B'],[''+score+'/10','Correct','#10B981']].map(([val,lab,col])=>(
                <div key={lab} style={{ background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:14, padding:'14px 10px' }}>
                  <div style={{ fontSize:20, fontWeight:800, color:col }}>{val}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{lab}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={startGame} style={{ padding:'11px 22px', borderRadius:12, border:'none', cursor:'pointer', background:'var(--gold)', color:'#fff', fontWeight:700, fontSize:14 }}>Play Again</button>
              <button onClick={() => setShowShare(true)} style={{ padding:'11px 22px', borderRadius:12, border:'1px solid var(--accent)', background:'var(--accent-subtle)', color:'var(--accent)', fontWeight:700, fontSize:14, cursor:'pointer' }}>Share Result</button>
              <Link href="/games" style={{ padding:'11px 20px', borderRadius:12, border:'1px solid var(--border)', background:'var(--glass)', color:'var(--text-secondary)', fontWeight:600, fontSize:14, textDecoration:'none', display:'inline-flex', alignItems:'center' }}>Games</Link>
            </div>
          </div>
        </div>
        {showShare && <ShareCard gameName="Speed Quiz" difficulty={difficulty} scoreLabel={`${score}/10`} xp={totalXp} onClose={() => setShowShare(false)} />}
      </>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", padding:'32px 16px' }}>
      <div style={{ width:'100%', maxWidth:640, marginBottom:28, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <Link href="/games" style={{ fontSize:13, color:'var(--text-tertiary)', textDecoration:'none' }}>← Games</Link>
        <span style={{ fontSize:12, padding:'4px 10px', borderRadius:8, background:`${cfg.color}15`, color:cfg.color, fontWeight:600, border:`1px solid ${cfg.color}30` }}>{cfg.label}</span>
        <div style={{ display:'flex', gap:16, fontSize:13, fontWeight:600 }}>
          <span style={{ color:'#10B981' }}>Score: {score}</span>
          {combo > 1 && <span style={{ color:'#F59E0B', fontWeight:800 }}>🔥 x{combo}</span>}
          <span style={{ color:'var(--gold)' }}>+{totalXp} XP</span>
        </div>
        <span style={{ fontSize:12, color:'var(--text-muted)' }}>{idx+1}/10</span>
      </div>

      <div style={{ marginBottom:28, position:'relative', width:110, height:110 }}>
        <svg width="110" height="110" style={{ transform:'rotate(-90deg)' }}>
          <circle cx="55" cy="55" r={RADIUS} fill="none" stroke="var(--glass)" strokeWidth="7" />
          <circle cx="55" cy="55" r={RADIUS} fill="none" stroke={timerColor} strokeWidth="7" strokeDasharray={CIRC} strokeDashoffset={dashOffset} strokeLinecap="round" style={{ transition:'stroke-dashoffset 1s linear, stroke 0.5s' }} />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:800, color:timerColor }}>{time}</div>
      </div>

      <div style={{ maxWidth:640, width:'100%', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'28px 32px', marginBottom:20, boxShadow:'var(--card-shadow)', textAlign:'center' }}>
        <div style={{ fontSize:11, fontWeight:600, color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:12 }}>TERM</div>
        <p style={{ fontSize:22, fontWeight:700, color:'var(--text-primary)', margin:0 }}>{q?.term}</p>
        <p style={{ fontSize:13, color:'var(--text-tertiary)', marginTop:8, marginBottom:0 }}>Choose the correct definition</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, maxWidth:640, width:'100%' }}>
        {q?.options.map((opt, i) => {
          const isCorrect = opt === q.correct;
          const isPicked  = opt === selected;
          const timesUp   = selected === '__timeout__';
          let bg = 'var(--glass)', border = '1px solid var(--glass-border)', color = 'var(--text-primary)';
          if (selected !== null) {
            if (isCorrect) { bg='rgba(16,185,129,0.12)'; border='1px solid #10B981'; color='#10B981'; }
            else if (isPicked && !timesUp) { bg='rgba(239,68,68,0.12)'; border='1px solid #EF4444'; color='#EF4444'; }
          }
          return (
            <button key={i} onClick={() => pick(opt)} style={{ padding:'16px 18px', borderRadius:14, background:bg, border, color, fontSize:13, fontWeight:600, cursor:selected!==null?'default':'pointer', transition:'all 200ms', textAlign:'left', boxShadow:'var(--card-shadow)', lineHeight:1.5 }}
              onMouseEnter={e => { if (selected===null) (e.currentTarget as HTMLElement).style.background='var(--glass-hover)'; }}
              onMouseLeave={e => { if (selected===null) (e.currentTarget as HTMLElement).style.background='var(--glass)'; }}
            >
              <span style={{ marginRight:8, opacity:0.4, fontSize:12 }}>{['A','B','C','D'][i]}.</span>{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
