'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { deductMP, getUserMP, addMP } from '../../lib/xp';

const MP_COST = 2;

const WORD_LIST: { word: string; def: string }[] = [
  { word: 'ETHER', def: 'The native cryptocurrency of the Ethereum network.' },
  { word: 'BLOCK', def: 'A bundle of transactions recorded on the blockchain.' },
  { word: 'CHAIN', def: 'A sequence of blocks linked cryptographically.' },
  { word: 'TOKEN', def: 'A digital asset issued on a blockchain platform.' },
  { word: 'NODES', def: 'Computers that participate in a blockchain network.' },
  { word: 'STAKE', def: 'Locking up crypto as collateral in proof-of-stake.' },
  { word: 'PROOF', def: 'Cryptographic evidence used in consensus mechanisms.' },
  { word: 'VAULT', def: 'A smart contract that holds and manages assets.' },
  { word: 'YIELD', def: 'Returns earned by providing liquidity or staking.' },
  { word: 'SMART', def: 'As in "smart contract" - self-executing code on-chain.' },
  { word: 'FLASH', def: 'As in "flash loan" - uncollateralized loan in one tx.' },
  { word: 'NONCE', def: 'A number used once in cryptographic operations.' },
  { word: 'SHARD', def: 'A partition of the blockchain for scaling purposes.' },
  { word: 'POOLS', def: 'Liquidity pools in decentralized exchanges.' },
  { word: 'MINER', def: 'A node that validates transactions via proof-of-work.' },
  { word: 'EPOCH', def: 'A period of time in blockchain consensus cycles.' },
  { word: 'BYTES', def: 'Units of digital information stored in transactions.' },
  { word: 'LAYER', def: 'A scaling solution built on top of the base chain.' },
  { word: 'ASSET', def: 'Any digital resource with economic value on-chain.' },
  { word: 'BONDS', def: 'Fixed-income instruments in DeFi protocols.' },
  { word: 'PRICE', def: 'The current market value of a crypto asset.' },
  { word: 'LIMIT', def: 'A type of order with a maximum or minimum price.' },
  { word: 'ORDER', def: 'An instruction to buy or sell a crypto asset.' },
  { word: 'QUORUM', def: 'Minimum votes needed for a governance decision.' },
  { word: 'SLOTH', def: 'A slow block production issue in some networks.' },
  { word: 'FORK', def: 'A protocol change splitting a blockchain into two.' },
  { word: 'SWAP', def: 'Exchanging one token for another via a DEX.' },
  { word: 'BURN', def: 'Permanently removing tokens from circulation.' },
  { word: 'MINT', def: 'Creating new tokens or NFTs on the blockchain.' },
  { word: 'LOCK', def: 'Preventing transfer of tokens for a set period.' },
  { word: 'DEFI', def: 'Decentralized finance protocols and applications.' },
  { word: 'HASH', def: 'A fixed-size fingerprint of data used in cryptography.' },
  { word: 'SEED', def: 'A secret phrase used to recover a crypto wallet.' },
];

// Only 5-letter words
const FIVE_LETTER = WORD_LIST.filter(w => w.word.length === 5);

type LetterState = 'correct' | 'present' | 'absent' | 'empty' | 'typed';

interface GuessRow {
  letters: string[];
  states: LetterState[];
  revealed: boolean;
}

function pickWord(): { word: string; def: string } {
  return FIVE_LETTER[Math.floor(Math.random() * FIVE_LETTER.length)];
}

const KEYBOARD_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
];

export default function CryptoWordlePage() {
  const [paid, setPaid] = useState(false);
  const [mpError, setMpError] = useState(false);
  const [userMP, setUserMP] = useState(0);
  const [target, setTarget] = useState<{ word: string; def: string }>(pickWord);
  const [guesses, setGuesses] = useState<GuessRow[]>(
    Array.from({ length: 6 }, () => ({ letters: [], states: [], revealed: false }))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [keyStates, setKeyStates] = useState<Record<string, LetterState>>({});
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [mpEarned, setMpEarned] = useState(0);

  useEffect(() => { setUserMP(getUserMP()); }, []);

  function startGame() {
    const ok = deductMP(MP_COST);
    if (!ok) { setMpError(true); return; }
    setMpError(false);
    setUserMP(getUserMP());
    setPaid(true);
    const w = pickWord();
    setTarget(w);
    setGuesses(Array.from({ length: 6 }, () => ({ letters: [], states: [], revealed: false })));
    setCurrentRow(0);
    setCurrentInput([]);
    setKeyStates({});
    setGameOver(false);
    setWon(false);
    setMpEarned(0);
  }

  const submitGuess = useCallback(() => {
    if (currentInput.length !== 5 || flipping || gameOver) return;
    const word = currentInput.join('');

    // Evaluate
    const targetArr = target.word.split('');
    const states: LetterState[] = Array(5).fill('absent');
    const used = Array(5).fill(false);

    // First pass: correct
    for (let i = 0; i < 5; i++) {
      if (word[i] === targetArr[i]) { states[i] = 'correct'; used[i] = true; }
    }
    // Second pass: present
    for (let i = 0; i < 5; i++) {
      if (states[i] === 'correct') continue;
      for (let j = 0; j < 5; j++) {
        if (!used[j] && word[i] === targetArr[j]) {
          states[i] = 'present'; used[j] = true; break;
        }
      }
    }

    // Build new guesses (before flip)
    const newGuesses = [...guesses];
    newGuesses[currentRow] = { letters: currentInput, states, revealed: false };
    setGuesses(newGuesses);
    setFlipping(true);

    // Flip animation timing
    setTimeout(() => {
      const revealed = [...newGuesses];
      revealed[currentRow] = { ...newGuesses[currentRow], revealed: true };
      setGuesses(revealed);

      // Update key states
      const newKeys = { ...keyStates };
      for (let i = 0; i < 5; i++) {
        const l = word[i];
        const existing = newKeys[l];
        const s = states[i];
        if (!existing || (existing === 'absent') || (existing === 'present' && s === 'correct')) {
          newKeys[l] = s;
        }
      }
      setKeyStates(newKeys);
      setFlipping(false);

      const isWin = states.every(s => s === 'correct');
      const nextRow = currentRow + 1;

      if (isWin) {
        setWon(true); setGameOver(true);
        const mp = nextRow <= 2 ? 5 : nextRow === 3 ? 4 : nextRow === 4 ? 3 : 2;
        setMpEarned(mp);
        addMP(mp);
        setUserMP(getUserMP());
      } else if (nextRow >= 6) {
        setGameOver(true);
      } else {
        setCurrentRow(nextRow);
        setCurrentInput([]);
      }
    }, 5 * 300 + 100);
  }, [currentInput, flipping, gameOver, guesses, currentRow, target, keyStates]);

  const handleKey = useCallback((key: string) => {
    if (gameOver || flipping) return;
    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrentInput(p => p.slice(0, -1));
    } else if (key === 'ENTER') {
      if (currentInput.length < 5) { setShake(true); setTimeout(() => setShake(false), 400); return; }
      submitGuess();
    } else if (/^[A-Z]$/.test(key) && currentInput.length < 5) {
      setCurrentInput(p => [...p, key]);
    }
  }, [gameOver, flipping, currentInput, submitGuess]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === 'BACKSPACE' || k === 'ENTER' || /^[A-Z]$/.test(k)) handleKey(k === 'BACKSPACE' ? '⌫' : k);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKey]);

  const stateColor: Record<LetterState, string> = {
    correct: '#22C55E',
    present: '#EAB308',
    absent: '#374151',
    empty: 'var(--glass)',
    typed: 'var(--glass)',
  };
  const stateBorder: Record<LetterState, string> = {
    correct: '#22C55E',
    present: '#EAB308',
    absent: '#374151',
    empty: 'var(--glass-border)',
    typed: '#A78BFA',
  };

  if (!paid) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>
      <div style={{ maxWidth:420, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>🔤</div>
        <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Crypto Wordle</h1>
        <p style={{ color:'var(--text-secondary)', marginBottom:20, fontSize:14, lineHeight:1.6 }}>Guess the hidden 5-letter crypto term in 6 tries. Green = right spot, Yellow = wrong spot.</p>
        <div style={{ marginBottom:20, padding:'12px 16px', borderRadius:12, background:'rgba(167,139,250,0.08)', border:'1px solid rgba(167,139,250,0.2)', fontSize:13 }}>
          <div style={{ color:'var(--text-secondary)', marginBottom:4 }}>Cost: <span style={{ color:'#A78BFA', fontWeight:700 }}>{MP_COST} MP</span></div>
          <div style={{ color:'var(--text-secondary)', fontSize:12 }}>Win: <span style={{ color:'#22C55E' }}>2-5 MP</span> depending on guesses</div>
          <div style={{ color:'var(--text-tertiary)', fontSize:11, marginTop:4 }}>Balance: {userMP} MP</div>
        </div>
        {mpError && <div style={{ marginBottom:14, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>Not enough MP to play.</div>}
        <button onClick={startGame} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7C3AED,#06B6D4)', color:'#fff', fontWeight:700, fontSize:15 }}>Play ({MP_COST} MP)</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', fontFamily:"'Outfit',sans-serif", padding:'16px', position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>

      <div style={{ marginTop:16, marginBottom:12, textAlign:'center' }}>
        <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:'var(--text-primary)' }}>🔤 Crypto Wordle</h1>
        <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>Guess the crypto term in 6 tries</div>
      </div>

      {/* Grid */}
      <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:16 }}>
        {guesses.map((row, ri) => {
          const isCurrentRow = ri === currentRow && !gameOver;
          const displayLetters = isCurrentRow ? currentInput : row.letters;
          const isShaking = isCurrentRow && shake;
          return (
            <div key={ri} style={{ display:'flex', gap:6, animation: isShaking ? 'shake 0.4s ease' : undefined }}>
              {Array.from({ length: 5 }, (_, ci) => {
                const letter = displayLetters[ci] || '';
                const state: LetterState = row.revealed
                  ? row.states[ci]
                  : (letter ? (isCurrentRow ? 'typed' : 'typed') : 'empty');
                const delay = row.revealed ? ci * 300 : 0;
                return (
                  <div key={ci} style={{
                    width:54, height:54, borderRadius:8,
                    background: row.revealed ? stateColor[row.states[ci]] : stateColor[state],
                    border: `2px solid ${row.revealed ? stateBorder[row.states[ci]] : stateBorder[state]}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:22, fontWeight:800, color:'#fff',
                    transition: row.revealed ? `background ${delay}ms, border-color ${delay}ms` : undefined,
                    transform: row.revealed ? undefined : (letter ? 'scale(1.05)' : 'scale(1)'),
                  }}>
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Game over banner */}
      {gameOver && (
        <div style={{ marginBottom:12, padding:'12px 20px', borderRadius:14, background: won ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.10)', border: `1px solid ${won ? '#22C55E' : '#EF4444'}`, textAlign:'center', maxWidth:320, width:'100%' }}>
          <div style={{ fontSize:16, fontWeight:800, color: won ? '#22C55E' : '#EF4444', marginBottom:4 }}>{won ? `🎉 ${mpEarned} MP earned!` : '💀 Better luck next time!'}</div>
          <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:4 }}>The word was <strong style={{ color:'#A78BFA' }}>{target.word}</strong></div>
          <div style={{ fontSize:12, color:'var(--text-muted)', fontStyle:'italic' }}>{target.def}</div>
          <button onClick={startGame} style={{ marginTop:10, padding:'8px 20px', borderRadius:8, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7C3AED,#06B6D4)', color:'#fff', fontWeight:700, fontSize:13 }}>Play Again ({MP_COST} MP)</button>
        </div>
      )}

      {/* Keyboard */}
      <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'center' }}>
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} style={{ display:'flex', gap:5 }}>
            {row.map(key => {
              const ks = keyStates[key] || 'empty';
              const isWide = key === 'ENTER' || key === '⌫';
              return (
                <button key={key} onClick={() => handleKey(key)} style={{
                  minWidth: isWide ? 56 : 36, height:44, borderRadius:6, border:'none', cursor:'pointer', fontWeight:700, fontSize: isWide ? 11 : 14,
                  background: key.length === 1 && keyStates[key] ? stateColor[ks] : 'rgba(255,255,255,0.08)',
                  color: key.length === 1 && keyStates[key] ? '#fff' : 'var(--text-primary)',
                  transition:'background 200ms',
                }}>
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
    </div>
  );
}
