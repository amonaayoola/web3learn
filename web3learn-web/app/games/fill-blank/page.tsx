'use client';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { getTermsByDifficulty, type Difficulty, type VocabTerm } from '../../data/vocabulary';
import ShareCard from '../../components/ShareCard';
import { deductMP, getUserMP } from '../../lib/xp';

const MP_COST = 5;

const DIFF_CONFIG: Record<Difficulty, { label: string; color: string }> = {
  beginner:     { label: 'Beginner',     color: '#10B981' },
  intermediate: { label: 'Intermediate', color: '#F59E0B' },
  expert:       { label: 'Expert',       color: '#EF4444' },
};

interface Question { term: string; definition: string; options: string[]; }

function buildQuestions(terms: VocabTerm[], allTerms: VocabTerm[]): Question[] {
  return terms.map(t => {
    const distractors = allTerms
      .filter(x => x.term !== t.term)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(x => x.term);
    const options = [t.term, ...distractors].sort(() => Math.random() - 0.5);
    return { term: t.term, definition: t.definition, options };
  });
}

export default function FillBlankPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [questions, setQuestions]   = useState<Question[]>([]);
  const [idx, setIdx]               = useState(0);
  const [score, setScore]           = useState(0);
  const [selected, setSelected]     = useState<string | null>(null);
  const [done, setDone]             = useState(false);
  const [started, setStarted]       = useState(false);
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
    const pool = getTermsByDifficulty(difficulty, 10);
    const allSameDiff = getTermsByDifficulty(difficulty, 30);
    setQuestions(buildQuestions(pool, allSameDiff));
    setIdx(0); setScore(0); setSelected(null); setDone(false); setStarted(true);
  }, [difficulty]);

  function pick(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === questions[idx].term) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else { setIdx(i => i + 1); setSelected(null); }
    }, 900);
  }

  const xp = score * (difficulty === 'expert' ? 20 : difficulty === 'intermediate' ? 15 : 10);
  const q = questions[idx];

  if (!started) {
    return (
      <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif" }}>
        <div style={{ maxWidth:480, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px', boxShadow:'var(--card-shadow)' }}>
          <div style={{ fontSize:56, marginBottom:16 }}>✏️</div>
          <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Fill the Blank</h1>
          <p style={{ color:'var(--text-secondary)', marginBottom:32, fontSize:14, lineHeight:1.6 }}>Read the definition and choose the correct crypto term. 10 rounds.</p>
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
          </div>
          <div style={{ marginBottom:12, fontSize:12, color:'var(--text-tertiary)' }}>
            Cost: <span style={{ color:'#F59E0B', fontWeight:600 }}>-{MP_COST} MP</span> &nbsp;|&nbsp; Your balance: <span style={{ color:'#F59E0B', fontWeight:600 }}>{userMP} MP</span>
          </div>
          {xpError && (
            <div style={{ marginBottom:16, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>
              Not enough MP to play. Complete lessons to earn more MP.
            </div>
          )}
          <button onClick={startGame} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'var(--success)', color:'#fff', fontWeight:700, fontSize:15, boxShadow:'0 4px 20px rgba(16,185,129,0.3)' }}>Start Game ({MP_COST} MP)</button>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <>
        <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif" }}>
          <div style={{ maxWidth:460, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px', boxShadow:'var(--card-shadow)' }}>
            <div style={{ fontSize:64, marginBottom:20 }}>{pct>=80?'🏆':pct>=50?'💪':'📚'}</div>
            <h2 style={{ margin:'0 0 8px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>{score} / {questions.length}</h2>
            <p style={{ color:'var(--text-secondary)', marginBottom:28, fontSize:14 }}>{pct>=80?'Excellent! You really know your Web3.':pct>=50?'Good work, keep studying!':'Keep at it, practice makes perfect.'}</p>
            <div style={{ background:'var(--accent-subtle)', borderRadius:16, padding:'18px 24px', marginBottom:28, border:'1px solid var(--accent-glow)' }}>
              <div style={{ fontSize:30, fontWeight:800, color:'var(--gold)' }}>+{xp} XP</div>
              <div style={{ fontSize:12, color:'var(--text-tertiary)', marginTop:4 }}>earned this round</div>
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={startGame} style={{ padding:'11px 22px', borderRadius:12, border:'none', cursor:'pointer', background:'var(--success)', color:'#fff', fontWeight:700, fontSize:14 }}>Play Again</button>
              <button onClick={() => setShowShare(true)} style={{ padding:'11px 22px', borderRadius:12, border:'1px solid var(--accent)', background:'var(--accent-subtle)', color:'var(--accent)', fontWeight:700, fontSize:14, cursor:'pointer' }}>Share Result</button>
              <Link href="/games" style={{ padding:'11px 20px', borderRadius:12, border:'1px solid var(--border)', background:'var(--glass)', color:'var(--text-secondary)', fontWeight:600, fontSize:14, textDecoration:'none', display:'inline-flex', alignItems:'center' }}>Games</Link>
            </div>
          </div>
        </div>
        {showShare && <ShareCard gameName="Fill the Blank" difficulty={difficulty} scoreLabel={`${score}/${questions.length}`} xp={xp} onClose={() => setShowShare(false)} />}
      </>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", padding:'32px 16px' }}>
      <div style={{ width:'100%', maxWidth:620, marginBottom:28 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <Link href="/games" style={{ fontSize:13, color:'var(--text-tertiary)', textDecoration:'none' }}>← Games</Link>
          <span style={{ fontSize:12, padding:'4px 10px', borderRadius:8, background:`${cfg.color}15`, color:cfg.color, fontWeight:600, border:`1px solid ${cfg.color}30` }}>{cfg.label}</span>
          <span style={{ fontSize:13, fontWeight:600, color:'var(--text-secondary)' }}>Q {idx+1}/{questions.length}</span>
          <span style={{ fontSize:13, fontWeight:700, color:'#10B981' }}>Score: {score}</span>
        </div>
        <div style={{ height:4, background:'var(--glass)', borderRadius:2, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${(idx/questions.length)*100}%`, background:'linear-gradient(90deg,#10B981,#059669)', borderRadius:2, transition:'width 300ms ease' }} />
        </div>
      </div>

      <div style={{ maxWidth:620, width:'100%', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'32px 36px', marginBottom:24, boxShadow:'var(--card-shadow)', textAlign:'center' }}>
        <div style={{ fontSize:11, fontWeight:600, color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:16 }}>DEFINITION</div>
        <p style={{ fontSize:18, color:'var(--text-primary)', lineHeight:1.7, margin:0, fontWeight:500 }}>{q?.definition}</p>
        <p style={{ fontSize:13, color:'var(--text-tertiary)', marginTop:16, marginBottom:0 }}>Which term matches this definition?</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, maxWidth:620, width:'100%' }}>
        {q?.options.map(opt => {
          const isCorrect = opt === q.term;
          const isPicked  = opt === selected;
          let bg = 'var(--glass)', border = '1px solid var(--glass-border)', color = 'var(--text-primary)';
          if (selected) {
            if (isCorrect) { bg='rgba(16,185,129,0.12)'; border='1px solid #10B981'; color='#10B981'; }
            else if (isPicked) { bg='rgba(239,68,68,0.12)'; border='1px solid #EF4444'; color='#EF4444'; }
          }
          return (
            <button key={opt} onClick={() => pick(opt)} style={{ padding:'16px 20px', borderRadius:14, background:bg, border, color, fontSize:14, fontWeight:600, cursor:selected?'default':'pointer', transition:'all 200ms', textAlign:'left', boxShadow:'var(--card-shadow)' }}
              onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.background='var(--glass-hover)'; }}
              onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.background='var(--glass)'; }}
            >{opt}</button>
          );
        })}
      </div>
    </div>
  );
}
