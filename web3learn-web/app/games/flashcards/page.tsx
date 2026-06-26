'use client';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllByDifficulty, type Difficulty, type VocabTerm } from '../../data/vocabulary';
import ShareCard from '../../components/ShareCard';
import { deductMP, getUserMP } from '../../lib/xp';

const MP_COST = 3;

const DIFF_CONFIG: Record<Difficulty, { label: string; color: string }> = {
  beginner:     { label: 'Beginner',     color: '#10B981' },
  intermediate: { label: 'Intermediate', color: '#F59E0B' },
  expert:       { label: 'Expert',       color: '#EF4444' },
};

export default function FlashcardsPage() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [deck, setDeck]             = useState<VocabTerm[]>([]);
  const [idx, setIdx]               = useState(0);
  const [flipped, setFlipped]       = useState(false);
  const [known, setKnown]           = useState<number[]>([]);
  const [retry, setRetry]           = useState<number[]>([]);
  const [xp, setXp]                 = useState(0);
  const [done, setDone]             = useState(false);
  const [started, setStarted]       = useState(false);
  const [showShare, setShowShare]   = useState(false);
  const [xpError, setXpError]       = useState(false);
  const [userMP, setUserMP]         = useState(0);

  useEffect(() => { setUserMP(getUserMP()); }, []);

  const cfg = DIFF_CONFIG[difficulty];

  const startDeck = useCallback(() => {
    const ok = deductMP(MP_COST);
    if (!ok) { setXpError(true); return; }
    setXpError(false);
    setUserMP(getUserMP());
    setDeck(getAllByDifficulty(difficulty));
    setIdx(0); setFlipped(false); setKnown([]); setRetry([]); setXp(0); setDone(false); setStarted(true);
  }, [difficulty]);

  const card = deck[idx];
  const progress = deck.length > 0 ? (idx / deck.length) * 100 : 0;

  function handleKnow() {
    setKnown(k => [...k, idx]);
    setXp(x => x + (difficulty === 'expert' ? 20 : difficulty === 'intermediate' ? 15 : 10));
    advance();
  }
  function handleRetry() { setRetry(r => [...r, idx]); advance(); }
  function advance() {
    setFlipped(false);
    setTimeout(() => { if (idx + 1 >= deck.length) setDone(true); else setIdx(i => i + 1); }, 200);
  }

  if (!started) {
    return (
      <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", position:'relative' }}>
        <button onClick={() => router.back()} style={{ position:'absolute', top:16, left:16, background:'transparent', border:'1px solid var(--card-border)', color:'var(--text-secondary)', padding:'8px 16px', borderRadius:8, cursor:'pointer', fontSize:14 }}>
          &larr; Back
        </button>
        <div style={{ maxWidth:480, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px', boxShadow:'var(--card-shadow)' }}>
          <div style={{ fontSize:56, marginBottom:16 }}>🃏</div>
          <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Flash Cards</h1>
          <p style={{ color:'var(--text-secondary)', marginBottom:32, fontSize:14, lineHeight:1.6 }}>Flip cards to reveal definitions. Mark what you know and what to study.</p>
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
            Cost: <span style={{ color:'#A78BFA', fontWeight:600 }}>-{MP_COST} MP</span> &nbsp;|&nbsp; Balance: <span style={{ color:'#A78BFA', fontWeight:600 }}>{userMP} MP</span>
          </div>
          {xpError && (
            <div style={{ marginBottom:16, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>
              Not enough MP to play. Complete lessons to earn more MP.
            </div>
          )}
          <button onClick={startDeck} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#06B6D4,#0891B2)', color:'#fff', fontWeight:700, fontSize:15, boxShadow:'0 4px 20px rgba(6,182,212,0.3)' }}>Start Deck ({MP_COST} MP)</button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <>
        <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif" }}>
          <div style={{ maxWidth:460, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px', boxShadow:'var(--card-shadow)' }}>
            <div style={{ fontSize:64, marginBottom:20 }}>🎉</div>
            <h2 style={{ margin:'0 0 8px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Deck complete!</h2>
            <p style={{ color:'var(--text-secondary)', marginBottom:32, fontSize:15 }}>
              You knew <strong style={{ color:'#10B981' }}>{known.length}</strong> of {deck.length} cards.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', background:'var(--accent-subtle)', borderRadius:16, padding:'20px 24px', marginBottom:32, border:'1px solid var(--accent-glow)' }}>
              {[['+'+(xp),'XP','var(--gold)'],[''+known.length,'Known','#10B981'],[''+retry.length,'Review','#EF4444']].map(([val,lab,col])=>(
                <div key={lab} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:26, fontWeight:800, color:col }}>{val}</div>
                  <div style={{ fontSize:11, color:'var(--text-tertiary)' }}>{lab}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={startDeck} style={{ padding:'11px 22px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#06B6D4,#0891B2)', color:'#fff', fontWeight:700, fontSize:14 }}>Play Again</button>
              <button onClick={() => setShowShare(true)} style={{ padding:'11px 22px', borderRadius:12, border:'1px solid var(--accent)', background:'var(--accent-subtle)', color:'var(--accent)', fontWeight:700, fontSize:14, cursor:'pointer' }}>Share Result</button>
              <Link href="/games" style={{ padding:'11px 20px', borderRadius:12, border:'1px solid var(--border)', background:'var(--glass)', color:'var(--text-secondary)', fontWeight:600, fontSize:14, textDecoration:'none', display:'inline-flex', alignItems:'center' }}>Games</Link>
            </div>
          </div>
        </div>
        {showShare && <ShareCard gameName="Flash Cards" difficulty={difficulty} scoreLabel={`${known.length}/${deck.length}`} xp={xp} onClose={() => setShowShare(false)} />}
      </>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", padding:'32px 16px' }}>
      <div style={{ width:'100%', maxWidth:560, marginBottom:28 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <button onClick={() => router.back()} style={{ fontSize:13, color:'var(--text-tertiary)', background:'transparent', border:'none', cursor:'pointer', padding:0 }}>&larr; Back</button>
          <span style={{ fontSize:12, padding:'4px 10px', borderRadius:8, background:`${cfg.color}15`, color:cfg.color, fontWeight:600, border:`1px solid ${cfg.color}30` }}>{cfg.label}</span>
          <span style={{ fontSize:13, color:'var(--text-tertiary)' }}>{idx+1} / {deck.length}</span>
          <span style={{ fontSize:13, fontWeight:700, color:'var(--gold)' }}>+{xp} XP</span>
        </div>
        <div style={{ height:4, background:'var(--glass)', borderRadius:2, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#06B6D4,#0891B2)', borderRadius:2, transition:'width 400ms ease' }} />
        </div>
      </div>

      <div onClick={() => setFlipped(f => !f)} style={{ width:560, maxWidth:'90vw', height:300, perspective:1000, cursor:'pointer', marginBottom:32 }}>
        <div style={{ width:'100%', height:'100%', position:'relative', transformStyle:'preserve-3d', transition:'transform 0.6s cubic-bezier(0.4,0,0.2,1)', transform:flipped?'rotateY(180deg)':'rotateY(0deg)' }}>
          <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, boxShadow:'var(--card-shadow)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 48px', textAlign:'center' }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:20 }}>TERM</div>
            <div style={{ fontSize:30, fontWeight:800, color:'var(--text-primary)', letterSpacing:'-0.02em', lineHeight:1.2 }}>{card?.term}</div>
            <div style={{ marginTop:28, fontSize:12, color:'var(--text-muted)' }}>Click to reveal</div>
          </div>
          <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', background:'linear-gradient(135deg,rgba(109,40,217,0.15),rgba(6,182,212,0.10))', border:'1px solid rgba(109,40,217,0.3)', borderRadius:24, boxShadow:'var(--card-shadow)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 48px', textAlign:'center', transform:'rotateY(180deg)' }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--accent-2)', letterSpacing:'0.1em', marginBottom:16 }}>DEFINITION</div>
            <div style={{ fontSize:16, fontWeight:500, color:'var(--text-primary)', lineHeight:1.7 }}>{card?.definition}</div>
            <div style={{ marginTop:12, fontSize:11, color:'var(--text-muted)' }}>{card?.category}</div>
          </div>
        </div>
      </div>

      {flipped ? (
        <div style={{ display:'flex', gap:16 }}>
          <button onClick={handleRetry} style={{ padding:'13px 32px', borderRadius:14, border:'1px solid rgba(239,68,68,0.3)', cursor:'pointer', background:'rgba(239,68,68,0.08)', color:'#EF4444', fontWeight:700, fontSize:14 }}>
            ↺ Try again
          </button>
          <button onClick={handleKnow} style={{ padding:'13px 32px', borderRadius:14, border:'1px solid rgba(16,185,129,0.3)', cursor:'pointer', background:'rgba(16,185,129,0.08)', color:'#10B981', fontWeight:700, fontSize:14 }}>
            ✓ Got it
          </button>
        </div>
      ) : (
        <p style={{ fontSize:13, color:'var(--text-muted)' }}>Tap the card to flip it</p>
      )}
    </div>
  );
}
