'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { deductMP, getUserMP, addMP } from '../../lib/xp';

const MP_COST = 3;
const BLOCK_GAS_LIMIT = 15_000_000;
const BASE_FEE = 12;
const GAME_DURATION = 60;

interface Transaction {
  id: number;
  type: string;
  icon: string;
  gasLimit: number;
  maxFee: number;
  priorityFee: number;
  special?: 'mev';
  mevExpiry?: number;
}

let txIdCounter = 0;

const TX_TYPES = [
  { type: 'ETH Transfer', icon: '💸', gasLimit: 21_000, feeRange: [1, 8] },
  { type: 'ERC-20 Transfer', icon: '🪙', gasLimit: 65_000, feeRange: [2, 12] },
  { type: 'Uniswap Swap', icon: '🔄', gasLimit: 150_000, feeRange: [3, 20] },
  { type: 'NFT Mint', icon: '🖼️', gasLimit: 200_000, feeRange: [8, 40] },
  { type: 'Contract Deploy', icon: '📜', gasLimit: 500_000, feeRange: [5, 25] },
];

function generateTx(isMev = false): Transaction {
  const template = TX_TYPES[Math.floor(Math.random() * TX_TYPES.length)];
  const [lo, hi] = template.feeRange;
  const priorityFee = isMev
    ? Math.floor(Math.random() * 80) + 40
    : Math.floor(Math.random() * (hi - lo) + lo);
  return {
    id: ++txIdCounter,
    type: isMev ? 'MEV Bundle' : template.type,
    icon: isMev ? '⚡' : template.icon,
    gasLimit: isMev ? 300_000 : template.gasLimit,
    maxFee: priorityFee + BASE_FEE + Math.floor(Math.random() * 5),
    priorityFee,
    special: isMev ? 'mev' : undefined,
    mevExpiry: isMev ? Date.now() + 5000 : undefined,
  };
}

function formatGas(gas: number): string {
  if (gas >= 1_000_000) return `${(gas / 1_000_000).toFixed(2)}M`;
  if (gas >= 1_000) return `${(gas / 1_000).toFixed(0)}K`;
  return gas.toString();
}

function getScoreTier(score: number): { mp: number; label: string; color: string } {
  if (score >= 5000) return { mp: 8, label: 'Elite MEV Searcher', color: '#F59E0B' };
  if (score >= 2000) return { mp: 6, label: 'Expert Builder', color: '#A78BFA' };
  if (score >= 800)  return { mp: 4, label: 'Solid Block', color: '#06B6D4' };
  if (score >= 200)  return { mp: 2, label: 'Decent Block', color: '#22C55E' };
  if (score >= 50)   return { mp: 1, label: 'Newbie Builder', color: '#94A3B8' };
  return { mp: 0, label: 'Empty Block', color: '#6B7280' };
}

export default function BlockBuilderPage() {
  const [paid, setPaid] = useState(false);
  const [mpError, setMpError] = useState(false);
  const [userMP, setUserMP] = useState(0);
  const [mempool, setMempool] = useState<Transaction[]>([]);
  const [blockTxs, setBlockTxs] = useState<Transaction[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);
  const [gasUsed, setGasUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [now, setNow] = useState(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const txIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mevIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const clockRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setUserMP(getUserMP()); }, []);

  const endGame = useCallback((finalScore: number) => {
    [intervalRef, txIntervalRef, mevIntervalRef, clockRef, timerRef].forEach(r => {
      if (r.current) clearInterval(r.current);
    });
    setGameOver(true);
    const tier = getScoreTier(finalScore);
    if (tier.mp > 0) { addMP(tier.mp); setUserMP(getUserMP()); }
  }, []);

  const sealBlock = useCallback(() => {
    if (gameOver) return;
    const totalPriority = blockTxs.reduce((s, t) => s + t.priorityFee * t.gasLimit / 1e9, 0);
    const finalScore = Math.floor(totalPriority * 1000);
    setScore(finalScore);
    endGame(finalScore);
  }, [blockTxs, gameOver, endGame]);

  function startGame() {
    const ok = deductMP(MP_COST);
    if (!ok) { setMpError(true); return; }
    setMpError(false);
    setUserMP(getUserMP());
    txIdCounter = 0;
    setPaid(true);
    setMempool(Array.from({ length: 6 }, () => generateTx()));
    setBlockTxs([]);
    setGasUsed(0);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);

    // New tx every 2s
    txIntervalRef.current = setInterval(() => {
      setMempool(prev => {
        if (prev.length >= 12) return prev;
        return [...prev, generateTx()];
      });
    }, 2000);

    // MEV bundle every 8s
    mevIntervalRef.current = setInterval(() => {
      const mev = generateTx(true);
      setMempool(prev => {
        if (prev.length >= 12) return prev;
        return [...prev, mev];
      });
    }, 8000);

    // Expire MEV
    clockRef.current = setInterval(() => {
      setNow(Date.now());
      setMempool(prev => prev.filter(t => !t.mevExpiry || t.mevExpiry > Date.now()));
    }, 500);

    // Countdown
    let t = GAME_DURATION;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) {
        setTimeLeft(0);
        setBlockTxs(bTxs => {
          const totalPriority = bTxs.reduce((s, tx) => s + tx.priorityFee * tx.gasLimit / 1e9, 0);
          const finalScore = Math.floor(totalPriority * 1000);
          setScore(finalScore);
          endGame(finalScore);
          return bTxs;
        });
      }
    }, 1000);
  }

  function addToBlock(tx: Transaction) {
    if (gameOver || gasUsed + tx.gasLimit > BLOCK_GAS_LIMIT) return;
    setMempool(prev => prev.filter(t => t.id !== tx.id));
    setBlockTxs(prev => [...prev, tx]);
    setGasUsed(prev => prev + tx.gasLimit);
  }

  function removeFromBlock(tx: Transaction) {
    if (gameOver) return;
    setBlockTxs(prev => prev.filter(t => t.id !== tx.id));
    setGasUsed(prev => prev - tx.gasLimit);
    setMempool(prev => [tx, ...prev]);
  }

  const gasPercent = Math.min(100, (gasUsed / BLOCK_GAS_LIMIT) * 100);
  const priorityEarned = blockTxs.reduce((s, t) => s + t.priorityFee * t.gasLimit / 1e9, 0);
  const tier = getScoreTier(score);

  if (!paid) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>
      <div style={{ maxWidth:440, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>⛏️</div>
        <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Block Builder</h1>
        <p style={{ color:'var(--text-secondary)', marginBottom:20, fontSize:14, lineHeight:1.6 }}>You are a block producer. Fill your block with transactions to maximize priority fee revenue in 60 seconds. Grab MEV bundles fast!</p>
        <div style={{ marginBottom:20, padding:'12px 16px', borderRadius:12, background:'rgba(167,139,250,0.08)', border:'1px solid rgba(167,139,250,0.2)', fontSize:13 }}>
          <div style={{ color:'var(--text-secondary)' }}>Cost: <span style={{ color:'#A78BFA', fontWeight:700 }}>{MP_COST} MP</span></div>
          <div style={{ color:'var(--text-secondary)', fontSize:12, marginTop:4 }}>Win: <span style={{ color:'#22C55E' }}>1-8 MP</span> based on fee revenue</div>
          <div style={{ color:'var(--text-tertiary)', fontSize:11, marginTop:4 }}>Balance: {userMP} MP</div>
        </div>
        {mpError && <div style={{ marginBottom:14, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>Not enough MP to play.</div>}
        <button onClick={startGame} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#F59E0B,#EF4444)', color:'#fff', fontWeight:700, fontSize:15 }}>Build Block ({MP_COST} MP)</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:"'Outfit',sans-serif", padding:'16px', position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:24, paddingTop:8, marginBottom:16, flexWrap:'wrap' }}>
        <h1 style={{ margin:0, fontSize:20, fontWeight:800, color:'var(--text-primary)' }}>⛏️ Block Builder</h1>
        <div style={{ display:'flex', gap:12, fontSize:13, flexWrap:'wrap', justifyContent:'center' }}>
          <span style={{ color: timeLeft <= 10 ? '#EF4444' : '#F59E0B', fontWeight:700 }}>⏱ {timeLeft}s</span>
          <span style={{ color:'#A78BFA' }}>Priority: {priorityEarned.toFixed(4)} ETH</span>
          <span style={{ color:'#06B6D4' }}>Gas: {gasPercent.toFixed(1)}%</span>
        </div>
      </div>

      {/* Gas meter */}
      <div style={{ maxWidth:800, margin:'0 auto 16px', padding:'0 4px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', marginBottom:4 }}>
          <span>Block gas used: {formatGas(gasUsed)} / {formatGas(BLOCK_GAS_LIMIT)}</span>
          <span style={{ color: gasPercent > 90 ? '#EF4444' : '#22C55E' }}>{gasPercent.toFixed(1)}% full</span>
        </div>
        <div style={{ height:8, borderRadius:4, background:'rgba(255,255,255,0.08)', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${gasPercent}%`, background: gasPercent > 90 ? 'linear-gradient(90deg,#F59E0B,#EF4444)' : 'linear-gradient(90deg,#22C55E,#06B6D4)', transition:'width 300ms', borderRadius:4 }} />
        </div>
      </div>

      {/* Game over result */}
      {gameOver && (
        <div style={{ maxWidth:800, margin:'0 auto 16px', padding:'16px 20px', borderRadius:14, background:'rgba(109,40,217,0.12)', border:'1px solid var(--accent)', textAlign:'center' }}>
          <div style={{ fontSize:20, fontWeight:800, color: tier.color, marginBottom:6 }}>{tier.label}</div>
          <div style={{ fontSize:14, color:'var(--text-secondary)', marginBottom:4 }}>Priority fees collected: <strong style={{ color:'#F59E0B' }}>{priorityEarned.toFixed(4)} ETH</strong></div>
          <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:4 }}>Gas efficiency: {gasPercent.toFixed(1)}% | Transactions: {blockTxs.length}</div>
          {tier.mp > 0 && <div style={{ fontSize:14, fontWeight:700, color:'#22C55E', marginBottom:8 }}>+{tier.mp} MP earned!</div>}
          <button onClick={startGame} style={{ padding:'8px 22px', borderRadius:8, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#F59E0B,#EF4444)', color:'#fff', fontWeight:700, fontSize:13 }}>Play Again ({MP_COST} MP)</button>
        </div>
      )}

      {/* Seal button */}
      {!gameOver && (
        <div style={{ textAlign:'center', marginBottom:14 }}>
          <button onClick={sealBlock} disabled={blockTxs.length === 0} style={{ padding:'10px 28px', borderRadius:10, border:'none', cursor: blockTxs.length === 0 ? 'not-allowed' : 'pointer', background: blockTxs.length > 0 ? 'linear-gradient(135deg,#F59E0B,#EF4444)' : 'rgba(255,255,255,0.06)', color: blockTxs.length > 0 ? '#fff' : 'var(--text-disabled)', fontWeight:700, fontSize:14, transition:'all 200ms' }}>
            🔒 Seal Block
          </button>
        </div>
      )}

      {/* Main columns */}
      <div style={{ maxWidth:800, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        {/* Mempool */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text-tertiary)', letterSpacing:'0.08em', marginBottom:8 }}>MEMPOOL ({mempool.length})</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, maxHeight:480, overflowY:'auto' }}>
            {mempool.length === 0 && <div style={{ color:'var(--text-muted)', fontSize:13, padding:'20px 0', textAlign:'center' }}>Waiting for transactions...</div>}
            {mempool.map(tx => {
              const isMev = tx.special === 'mev';
              const expiringSoon = isMev && tx.mevExpiry && tx.mevExpiry - now < 2000;
              const canAdd = gasUsed + tx.gasLimit <= BLOCK_GAS_LIMIT;
              return (
                <button key={tx.id} onClick={() => !gameOver && canAdd && addToBlock(tx)} style={{
                  padding:'10px 12px', borderRadius:10, border:`1px solid ${isMev ? (expiringSoon ? '#EF4444' : '#F59E0B') : 'var(--glass-border)'}`,
                  background: isMev ? 'rgba(245,158,11,0.08)' : 'var(--glass)',
                  cursor: canAdd && !gameOver ? 'pointer' : 'not-allowed',
                  opacity: canAdd ? 1 : 0.5,
                  textAlign:'left', transition:'all 150ms',
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:700, color: isMev ? '#F59E0B' : 'var(--text-primary)' }}>{tx.icon} {tx.type}</span>
                    {isMev && <span style={{ fontSize:10, color: expiringSoon ? '#EF4444' : '#F59E0B', fontWeight:700 }}>{expiringSoon ? '⚠️ EXPIRING' : '⚡ MEV'}</span>}
                  </div>
                  <div style={{ display:'flex', gap:12, fontSize:11, color:'var(--text-muted)' }}>
                    <span>⛽ {formatGas(tx.gasLimit)}</span>
                    <span style={{ color:'#22C55E' }}>+{tx.priorityFee} gwei tip</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Block */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text-tertiary)', letterSpacing:'0.08em', marginBottom:8 }}>YOUR BLOCK ({blockTxs.length} TXs)</div>
          <div style={{ minHeight:200, border:'2px dashed rgba(109,40,217,0.3)', borderRadius:12, padding:'8px', display:'flex', flexDirection:'column', gap:6, maxHeight:480, overflowY:'auto' }}>
            {blockTxs.length === 0 && <div style={{ color:'var(--text-muted)', fontSize:13, padding:'40px 0', textAlign:'center' }}>Click transactions to add them here</div>}
            {blockTxs.map(tx => (
              <button key={tx.id} onClick={() => !gameOver && removeFromBlock(tx)} style={{
                padding:'10px 12px', borderRadius:10, border:'1px solid rgba(109,40,217,0.3)',
                background:'rgba(109,40,217,0.08)', cursor: gameOver ? 'default' : 'pointer',
                textAlign:'left', transition:'all 150ms',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)' }}>{tx.icon} {tx.type}</span>
                  {!gameOver && <span style={{ fontSize:10, color:'#EF4444' }}>✕ remove</span>}
                </div>
                <div style={{ display:'flex', gap:12, fontSize:11, color:'var(--text-muted)' }}>
                  <span>⛽ {formatGas(tx.gasLimit)}</span>
                  <span style={{ color:'#22C55E' }}>+{tx.priorityFee} gwei tip</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign:'center', marginTop:12, fontSize:11, color:'var(--text-muted)' }}>
        Base fee {BASE_FEE} gwei is burned. Only priority fees count toward your score.
      </div>
    </div>
  );
}
