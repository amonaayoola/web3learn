'use client';
import { useRef, useCallback } from 'react';
import type { Difficulty } from '../data/vocabulary';

interface ShareCardProps {
  gameName: string;
  difficulty: Difficulty;
  scoreLabel: string;
  xp: number;
  onClose: () => void;
}

const DIFF_COLOR: Record<Difficulty, string> = {
  beginner:     '#10B981',
  intermediate: '#F59E0B',
  expert:       '#EF4444',
};

const GAME_EMOJI: Record<string, string> = {
  'Word Match':    '🔤',
  'Flashcards':   '🃏',
  'Fill the Blank':'✏️',
  'Speed Quiz':   '⚡',
};

export default function ShareCard({ gameName, difficulty, scoreLabel, xp, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const diffColor = DIFF_COLOR[difficulty];
  const emoji = GAME_EMOJI[gameName] ?? '🎮';

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `maiden-${gameName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Download failed', e);
    }
  }, [gameName]);

  const handleShare = useCallback(async () => {
    const text = `I just played ${gameName} on MAIDEN Web3 Learning! ${scoreLabel} — +${xp} XP earned. 🚀 #Web3 #MAIDEN`;
    if (navigator.share) {
      try { await navigator.share({ title: 'MAIDEN Web3', text }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      alert('Result copied to clipboard!');
    }
  }, [gameName, scoreLabel, xp]);

  return (
    <div
      onClick={onClose}
      style={{
        position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex',
        alignItems:'center', justifyContent:'center', zIndex:1000, padding:24, backdropFilter:'blur(6px)',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
        {/* The shareable card */}
        <div
          ref={cardRef}
          style={{
            width:380, background:'linear-gradient(135deg,#1a0533 0%,#0a1628 50%,#001a2e 100%)',
            borderRadius:24, padding:36, position:'relative', overflow:'hidden',
            boxShadow:'0 25px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Background glow blobs */}
          <div style={{ position:'absolute', top:-60, left:-60, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(109,40,217,0.3),transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-40, right:-40, width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle,rgba(6,182,212,0.25),transparent 70%)', pointerEvents:'none' }} />

          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', color:'rgba(255,255,255,0.4)', marginBottom:4 }}>MAIDEN ACADEMY</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:500 }}>Web3 Learning Platform</div>
            </div>
            <div style={{ fontSize:32 }}>{emoji}</div>
          </div>

          {/* Game name + difficulty */}
          <div style={{ marginBottom:24 }}>
            <h2 style={{ margin:0, fontSize:26, fontWeight:800, color:'#fff', letterSpacing:'-0.02em' }}>{gameName}</h2>
            <span style={{ display:'inline-block', marginTop:8, padding:'3px 10px', borderRadius:6, background:`${diffColor}22`, border:`1px solid ${diffColor}55`, color:diffColor, fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' }}>{difficulty}</span>
          </div>

          {/* Score + XP */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:28 }}>
            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:14, padding:'16px 18px', border:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize:28, fontWeight:800, color:'#fff' }}>{scoreLabel}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:4, fontWeight:500 }}>Score</div>
            </div>
            <div style={{ background:'rgba(245,158,11,0.08)', borderRadius:14, padding:'16px 18px', border:'1px solid rgba(245,158,11,0.2)' }}>
              <div style={{ fontSize:28, fontWeight:800, color:'#F59E0B' }}>+{xp}</div>
              <div style={{ fontSize:11, color:'rgba(245,158,11,0.6)', marginTop:4, fontWeight:500 }}>XP Earned</div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign:'center', padding:'14px', borderRadius:12, background:'linear-gradient(135deg,rgba(109,40,217,0.2),rgba(6,182,212,0.1))', border:'1px solid rgba(109,40,217,0.25)' }}>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', fontWeight:500 }}>Learn Web3 at maiden.app</div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display:'flex', gap:10 }}>
          <button
            onClick={handleDownload}
            style={{ padding:'12px 22px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#6D28D9,#4C1D95)', color:'#fff', fontWeight:700, fontSize:14, boxShadow:'0 4px 20px rgba(109,40,217,0.4)' }}
          >⬇ Download Card</button>
          <button
            onClick={handleShare}
            style={{ padding:'12px 22px', borderRadius:12, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.08)', color:'#fff', fontWeight:700, fontSize:14, cursor:'pointer', backdropFilter:'blur(4px)' }}
          >🔗 Share</button>
          <button
            onClick={onClose}
            style={{ padding:'12px 18px', borderRadius:12, border:'1px solid rgba(255,255,255,0.12)', background:'transparent', color:'rgba(255,255,255,0.5)', fontWeight:600, fontSize:14, cursor:'pointer' }}
          >✕</button>
        </div>
      </div>
    </div>
  );
}
