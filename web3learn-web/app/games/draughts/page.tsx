'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { deductMP, getUserMP, addMP } from '../../lib/xp';

const MP_COST = 5;
const MP_WIN  = 8;

/* ─── Types ─────────────────────────────────────────────────── */
type PColor = 'w' | 'b';
interface DPiece { color: PColor; king: boolean; }
type DBoard = (DPiece | null)[][];

/* ─── Difficulty ────────────────────────────────────────────── */
type Difficulty = 1 | 2 | 3 | 4 | 5;
const DIFF_INFO: Record<Difficulty, { label: string; desc: string; emoji: string }> = {
  1: { label: 'Novice',  desc: 'Random legal move. Mandatory jumps still enforced.',                              emoji: '🌱' },
  2: { label: 'Casual',  desc: 'Always takes a jump if available, otherwise random.',                             emoji: '🎯' },
  3: { label: 'Club',    desc: 'Minimax depth 2. Thinks one exchange ahead.',                                     emoji: '⚔️' },
  4: { label: 'Skilled', desc: 'Minimax depth 4 with piece value and advancement scoring.',                       emoji: '🧠' },
  5: { label: 'Master',  desc: 'Minimax depth 8 with full evaluation, mobility, endgame detection.',             emoji: '👑' },
};

/* ─── Init ──────────────────────────────────────────────────── */
function initDBoard(): DBoard {
  const b: DBoard = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 8; c++)
      if ((r + c) % 2 === 1) b[r][c] = { color: 'b', king: false };
  for (let r = 5; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if ((r + c) % 2 === 1) b[r][c] = { color: 'w', king: false };
  return b;
}

function inB(r: number, c: number) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

interface Move { from: [number, number]; to: [number, number]; captured?: [number, number]; }

function getMoves(board: DBoard, r: number, c: number): Move[] {
  const p = board[r][c];
  if (!p) return [];
  const moves: Move[] = [];
  const dirs = p.color === 'w' ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]];
  const allDirs = p.king ? [[-1,-1],[-1,1],[1,-1],[1,1]] : dirs;
  for (const [dr, dc] of allDirs) {
    const nr = r + dr, nc = c + dc;
    if (inB(nr, nc) && !board[nr][nc]) moves.push({ from: [r, c], to: [nr, nc] });
  }
  return moves;
}

function getJumps(board: DBoard, r: number, c: number): Move[] {
  const p = board[r][c];
  if (!p) return [];
  const jumps: Move[] = [];
  const dirs = p.color === 'w' ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]];
  const allDirs = p.king ? [[-1,-1],[-1,1],[1,-1],[1,1]] : dirs;
  for (const [dr, dc] of allDirs) {
    const mr = r + dr, mc = c + dc;
    const lr = r + 2*dr, lc = c + 2*dc;
    if (inB(lr, lc) && board[mr][mc] && board[mr][mc]!.color !== p.color && !board[lr][lc])
      jumps.push({ from: [r, c], to: [lr, lc], captured: [mr, mc] });
  }
  return jumps;
}

function getAllForColor(board: DBoard, color: PColor): { jumps: Move[]; simples: Move[] } {
  const jumps: Move[] = [], simples: Move[] = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c]?.color === color) {
        jumps.push(...getJumps(board, r, c));
        simples.push(...getMoves(board, r, c));
      }
  return { jumps, simples };
}

function applyDMove(board: DBoard, move: Move): DBoard {
  const nb = board.map(row => [...row]);
  const [fr, fc] = move.from;
  const [tr, tc] = move.to;
  let piece = { ...nb[fr][fc]! };
  if (move.captured) nb[move.captured[0]][move.captured[1]] = null;
  if ((piece.color === 'w' && tr === 0) || (piece.color === 'b' && tr === 7)) piece.king = true;
  nb[tr][tc] = piece;
  nb[fr][fc] = null;
  return nb;
}

/* ─── Draughts evaluation ────────────────────────────────────── */
const CENTER_SQUARES = new Set([
  '2,3','2,4','3,2','3,3','3,4','3,5','4,2','4,3','4,4','4,5','5,3','5,4',
]);
const INNER_SQUARES = new Set(['3,3','3,4','4,3','4,4']);

function countPieces(board: DBoard): { bMen: number; bKings: number; wMen: number; wKings: number } {
  let bMen = 0, bKings = 0, wMen = 0, wKings = 0;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      if (p.color === 'b') { if (p.king) bKings++; else bMen++; }
      else { if (p.king) wKings++; else wMen++; }
    }
  return { bMen, bKings, wMen, wKings };
}

function evaluateDraughts(board: DBoard, depth: number): number {
  const { bMen, bKings, wMen, wKings } = countPieces(board);
  const totalPieces = bMen + bKings + wMen + wKings;
  const endgame = totalPieces <= 6;

  if (endgame) {
    // Pure mobility evaluation in endgame
    const bMoves = getAllForColor(board, 'b');
    const wMoves = getAllForColor(board, 'w');
    const bMob = bMoves.jumps.length * 3 + bMoves.simples.length;
    const wMob = wMoves.jumps.length * 3 + wMoves.simples.length;
    return (bMen * 5 + bKings * 10 + bMob) - (wMen * 5 + wKings * 10 + wMob);
  }

  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      const base = p.king ? 10 : 5;
      const advancementRow = p.color === 'b' ? r : (7 - r);
      const advance = advancementRow * 0.5;
      const center = CENTER_SQUARES.has(`${r},${c}`) ? (INNER_SQUARES.has(`${r},${c}`) ? 3 : 2) : 0;
      const backRow = p.color === 'b' ? (r === 0 ? 3 : 0) : (r === 7 ? 3 : 0);
      // King mobility bonus
      let kingMob = 0;
      if (p.king) {
        kingMob = getMoves(board, r, c).length * 0.5 + getJumps(board, r, c).length * 1.5;
      }
      // Penalize premature king promotion rush
      const tempo = (!p.king && advancementRow > 4) ? -0.5 : 0;
      const val = base + advance + center + backRow + kingMob + tempo;
      score += p.color === 'b' ? val : -val;
    }
  }

  // Mobility
  const bAll = getAllForColor(board, 'b');
  const wAll = getAllForColor(board, 'w');
  const bMob = bAll.jumps.length * 2 + bAll.simples.length;
  const wMob = wAll.jumps.length * 2 + wAll.simples.length;
  score += (bMob - wMob) * 0.15;

  // Sacrifice detection: don't sacrifice without lookahead (handled by search depth)
  void depth; // depth used for lookahead in minimax

  return score;
}

/* ─── Master minimax (depth 8 with move ordering) ───────────── */
function draughtsMinimaxMaster(
  board: DBoard,
  piece: [number, number] | null,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
): number {
  if (depth === 0) return evaluateDraughts(board, depth);

  const color: PColor = maximizing ? 'b' : 'w';
  let movesToTry: Move[];

  if (piece) {
    const jumps = getJumps(board, piece[0], piece[1]);
    movesToTry = jumps;
    if (movesToTry.length === 0) {
      return draughtsMinimaxMaster(board, null, depth - 1, alpha, beta, !maximizing);
    }
  } else {
    const { jumps, simples } = getAllForColor(board, color);
    // Move ordering: multi-jump candidates first, then single jumps, then simples
    const multiJumps: Move[] = [];
    const singleJumps: Move[] = [];
    for (const j of jumps) {
      const nb = applyDMove(board, j);
      const further = getJumps(nb, j.to[0], j.to[1]);
      if (further.length > 0) multiJumps.push(j);
      else singleJumps.push(j);
    }
    movesToTry = jumps.length > 0 ? [...multiJumps, ...singleJumps] : simples;
  }

  if (movesToTry.length === 0) return maximizing ? -9999 : 9999;

  if (maximizing) {
    let best = -Infinity;
    for (const move of movesToTry) {
      const nb = applyDMove(board, move);
      const furtherJumps = move.captured ? getJumps(nb, move.to[0], move.to[1]) : [];
      const val = furtherJumps.length > 0
        ? draughtsMinimaxMaster(nb, move.to, depth, alpha, beta, true)
        : draughtsMinimaxMaster(nb, null, depth - 1, alpha, beta, false);
      best = Math.max(best, val); alpha = Math.max(alpha, val);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of movesToTry) {
      const nb = applyDMove(board, move);
      const furtherJumps = move.captured ? getJumps(nb, move.to[0], move.to[1]) : [];
      const val = furtherJumps.length > 0
        ? draughtsMinimaxMaster(nb, move.to, depth, alpha, beta, false)
        : draughtsMinimaxMaster(nb, null, depth - 1, alpha, beta, true);
      best = Math.min(best, val); beta = Math.min(beta, val);
      if (beta <= alpha) break;
    }
    return best;
  }
}

/* ─── Standard minimax (levels 3-4) ─────────────────────────── */
function draughtsMinimaxMulti(
  board: DBoard,
  piece: [number, number] | null,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
): number {
  if (depth === 0) return evaluateDraughts(board, depth);

  const color: PColor = maximizing ? 'b' : 'w';
  let movesToTry: Move[];

  if (piece) {
    const jumps = getJumps(board, piece[0], piece[1]);
    movesToTry = jumps;
    if (movesToTry.length === 0) {
      return draughtsMinimaxMulti(board, null, depth - 1, alpha, beta, !maximizing);
    }
  } else {
    const { jumps, simples } = getAllForColor(board, color);
    movesToTry = jumps.length > 0 ? jumps : simples;
  }

  if (movesToTry.length === 0) return maximizing ? -9999 : 9999;

  if (maximizing) {
    let best = -Infinity;
    for (const move of movesToTry) {
      const nb = applyDMove(board, move);
      const furtherJumps = move.captured ? getJumps(nb, move.to[0], move.to[1]) : [];
      const val = furtherJumps.length > 0
        ? draughtsMinimaxMulti(nb, move.to, depth, alpha, beta, true)
        : draughtsMinimaxMulti(nb, null, depth - 1, alpha, beta, false);
      best = Math.max(best, val); alpha = Math.max(alpha, val);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of movesToTry) {
      const nb = applyDMove(board, move);
      const furtherJumps = move.captured ? getJumps(nb, move.to[0], move.to[1]) : [];
      const val = furtherJumps.length > 0
        ? draughtsMinimaxMulti(nb, move.to, depth, alpha, beta, false)
        : draughtsMinimaxMulti(nb, null, depth - 1, alpha, beta, true);
      best = Math.min(best, val); beta = Math.min(beta, val);
      if (beta <= alpha) break;
    }
    return best;
  }
}

/* ─── AI move selection ──────────────────────────────────────── */
function getAIDraughtsMove(board: DBoard, diff: Difficulty): Move | null {
  const { jumps, simples } = getAllForColor(board, 'b');
  const available = jumps.length > 0 ? jumps : simples;
  if (available.length === 0) return null;

  if (diff === 1) return available[Math.floor(Math.random() * available.length)];

  if (diff === 2) {
    if (jumps.length > 0) return jumps[Math.floor(Math.random() * jumps.length)];
    return simples[Math.floor(Math.random() * simples.length)];
  }

  if (diff === 5) {
    // Master: depth 8 with ordering
    let bestMove = available[0];
    let bestVal = -Infinity;
    for (const move of available) {
      const nb = applyDMove(board, move);
      const furtherJumps = move.captured ? getJumps(nb, move.to[0], move.to[1]) : [];
      const val = furtherJumps.length > 0
        ? draughtsMinimaxMaster(nb, move.to, 8, -Infinity, Infinity, true)
        : draughtsMinimaxMaster(nb, null, 7, -Infinity, Infinity, false);
      if (val > bestVal) { bestVal = val; bestMove = move; }
    }
    return bestMove;
  }

  // Levels 3-4
  const depths: Record<Difficulty, number> = { 1:0, 2:0, 3:2, 4:4, 5:0 };
  const depth = depths[diff];
  let bestMove = available[0];
  let bestVal = -Infinity;
  for (const move of available) {
    const nb = applyDMove(board, move);
    const furtherJumps = move.captured ? getJumps(nb, move.to[0], move.to[1]) : [];
    const val = furtherJumps.length > 0
      ? draughtsMinimaxMulti(nb, move.to, depth, -Infinity, Infinity, true)
      : draughtsMinimaxMulti(nb, null, depth - 1, -Infinity, Infinity, false);
    if (val > bestVal) { bestVal = val; bestMove = move; }
  }
  return bestMove;
}

/* ─── Component ─────────────────────────────────────────────── */
type Screen = 'gate' | 'difficulty' | 'game';

export default function DraughtsPage() {
  const [screen, setScreen] = useState<Screen>('gate');
  const [difficulty, setDifficulty] = useState<Difficulty>(3);
  const [board, setBoard] = useState<DBoard>(initDBoard);
  const [selected, setSelected] = useState<[number,number]|null>(null);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);
  const [turn, setTurn] = useState<PColor>('w');
  const [status, setStatus] = useState('Your turn: Cyan');
  const [gameOver, setGameOver] = useState(false);
  const [wScore, setWScore] = useState(0);
  const [bScore, setBScore] = useState(0);
  const [mpError, setMpError] = useState(false);
  const [userMP, setUserMP] = useState(0);
  const [wonGame, setWonGame] = useState(false);
  const aiThinking = useRef(false);

  useEffect(() => { setUserMP(getUserMP()); }, []);

  function beginGame() {
    const ok = deductMP(MP_COST);
    if (!ok) { setMpError(true); return; }
    setMpError(false);
    setUserMP(getUserMP());
    setScreen('game');
  }

  function checkWinner(b: DBoard): PColor | null {
    const wPieces = b.flat().filter(p => p?.color === 'w').length;
    const bPieces = b.flat().filter(p => p?.color === 'b').length;
    if (wPieces === 0) return 'b';
    if (bPieces === 0) return 'w';
    const { jumps: wj, simples: ws } = getAllForColor(b, 'w');
    if (wj.length + ws.length === 0) return 'b';
    const { jumps: bj, simples: bs } = getAllForColor(b, 'b');
    if (bj.length + bs.length === 0) return 'w';
    return null;
  }

  function runAI(nb: DBoard) {
    aiThinking.current = true;
    const delay = difficulty === 5 ? 200 : [600,600,700,900,0][difficulty-1];
    setTimeout(() => {
      const pick = getAIDraughtsMove(nb, difficulty);
      if (!pick) {
        setStatus('🎉 You win. AI has no moves!');
        setWScore(s => s + 1); setWonGame(true); addMP(MP_WIN); setUserMP(getUserMP());
        setGameOver(true); aiThinking.current = false; return;
      }
      let nb2 = applyDMove(nb, pick);
      let pos: [number,number] = pick.to;
      let mj = pick.captured ? getJumps(nb2, pos[0], pos[1]) : [];
      while (mj.length > 0) {
        const mp = mj[Math.floor(Math.random() * mj.length)];
        nb2 = applyDMove(nb2, mp);
        pos = mp.to;
        mj = mp.captured ? getJumps(nb2, pos[0], pos[1]) : [];
      }
      setBoard(nb2);
      setTurn('w');
      const w2 = checkWinner(nb2);
      if (w2) {
        const playerWon = w2 === 'w';
        setStatus(playerWon ? '🎉 You win!' : '💀 AI wins!');
        if (playerWon) { setWScore(s => s+1); setWonGame(true); addMP(MP_WIN); setUserMP(getUserMP()); }
        else setBScore(s => s+1);
        setGameOver(true);
      } else {
        setStatus('Your turn: Cyan');
      }
      aiThinking.current = false;
    }, delay);
  }

  function handleClick(r: number, c: number) {
    if (gameOver || turn !== 'w' || aiThinking.current) return;
    const { jumps, simples } = getAllForColor(board, 'w');
    const available = jumps.length > 0 ? jumps : simples;
    if (selected) {
      const move = legalMoves.find(m => m.to[0]===r && m.to[1]===c);
      if (move) {
        let nb = applyDMove(board, move);
        const multijumps = move.captured ? getJumps(nb, r, c) : [];
        if (multijumps.length > 0) {
          setBoard(nb); setSelected([r,c]); setLegalMoves(multijumps); return;
        }
        setBoard(nb); setSelected(null); setLegalMoves([]);
        setTurn('b');
        const winner = checkWinner(nb);
        if (winner) {
          const playerWon = winner === 'w';
          setStatus(playerWon ? '🎉 You win!' : '💀 AI wins!');
          if (playerWon) { setWScore(s=>s+1); setWonGame(true); addMP(MP_WIN); setUserMP(getUserMP()); }
          else setBScore(s=>s+1);
          setGameOver(true); return;
        }
        setStatus(difficulty===5 ? 'Master thinking...' : 'AI is thinking...');
        runAI(nb); return;
      }
      if (board[r][c]?.color === 'w') {
        const pieceMoves = available.filter(m => m.from[0]===r && m.from[1]===c);
        setSelected([r,c]); setLegalMoves(pieceMoves); return;
      }
      setSelected(null); setLegalMoves([]); return;
    }
    if (board[r][c]?.color === 'w') {
      const pieceMoves = available.filter(m => m.from[0]===r && m.from[1]===c);
      setSelected([r,c]); setLegalMoves(pieceMoves);
    }
  }

  function restart() {
    setBoard(initDBoard()); setSelected(null); setLegalMoves([]);
    setTurn('w'); setStatus('Your turn: Cyan');
    setGameOver(false); setWonGame(false);
    aiThinking.current = false;
  }

  const CELL = 72;

  if (screen === 'gate') return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>
      <div style={{ maxWidth:440, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>⬛</div>
        <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Draughts</h1>
        <p style={{ color:'var(--text-secondary)', marginBottom:28, fontSize:14, lineHeight:1.6 }}>Classic checkers with kings, multi-jumps, and full rules. Play against the AI.</p>
        <div style={{ marginBottom:16, fontSize:12, color:'var(--text-tertiary)' }}>
          Cost: <span style={{ color:'#A78BFA', fontWeight:600 }}>-{MP_COST} MP</span>
          &nbsp;|&nbsp; Win: <span style={{ color:'#34D399', fontWeight:600 }}>+{MP_WIN} MP</span>
          &nbsp;|&nbsp; Balance: <span style={{ color:'#A78BFA', fontWeight:600 }}>{userMP} MP</span>
        </div>
        {mpError && <div style={{ marginBottom:16, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>Not enough MP to play.</div>}
        <button onClick={() => { setMpError(false); setScreen('difficulty'); }} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#EF4444,#F97316)', color:'#fff', fontWeight:700, fontSize:15 }}>Select Difficulty</button>
      </div>
    </div>
  );

  if (screen === 'difficulty') return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>
      <div style={{ maxWidth:480, width:'90%', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'40px' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:40, marginBottom:10 }}>⚙️</div>
          <h2 style={{ margin:'0 0 6px', fontSize:22, fontWeight:800, color:'var(--text-primary)' }}>Choose Difficulty</h2>
          <p style={{ fontSize:13, color:'var(--text-secondary)' }}>Select how challenging the AI will be.</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
          {([1,2,3,4,5] as Difficulty[]).map(d => {
            const info = DIFF_INFO[d];
            const sel = difficulty === d;
            return (
              <button key={d} onClick={() => setDifficulty(d)} style={{ padding:'14px 18px', borderRadius:14, textAlign:'left', cursor:'pointer', transition:'all 150ms', border:`2px solid ${sel ? '#EF4444' : 'var(--glass-border)'}`, background: sel ? 'rgba(239,68,68,0.08)' : 'var(--glass)', display:'flex', alignItems:'center', gap:14 }}>
                <span style={{ fontSize:24 }}>{info.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color: sel ? '#EF4444' : 'var(--text-primary)', fontSize:14 }}>{info.label}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{info.desc}</div>
                </div>
                {sel && <span style={{ color:'#EF4444', fontWeight:700 }}>✓</span>}
              </button>
            );
          })}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={() => setScreen('gate')} style={{ flex:1, padding:'12px', borderRadius:10, border:'1px solid var(--glass-border)', background:'transparent', color:'var(--text-secondary)', fontSize:14, cursor:'pointer' }}>← Back</button>
          <button onClick={beginGame} style={{ flex:2, padding:'12px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#EF4444,#F97316)', color:'#fff', fontWeight:700, fontSize:14 }}>Play as {DIFF_INFO[difficulty].label} ({MP_COST} MP)</button>
        </div>
        {mpError && <div style={{ marginTop:12, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>Not enough MP to play.</div>}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", padding:'24px 16px', position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>
      <div style={{ width:'100%', maxWidth:640, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ width:80 }} />
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <h1 style={{ margin:0, fontSize:20, fontWeight:800, color:'var(--text-primary)' }}>⬛ Draughts</h1>
          <div style={{ fontSize:11, color:'var(--text-muted)' }}>{DIFF_INFO[difficulty].emoji} {DIFF_INFO[difficulty].label}</div>
        </div>
        <button onClick={restart} style={{ padding:'7px 16px', borderRadius:8, border:'1px solid var(--border)', background:'var(--glass)', color:'var(--text-secondary)', cursor:'pointer', fontSize:12, fontWeight:600 }}>↺ Restart</button>
      </div>

      <div style={{ display:'flex', gap:32, marginBottom:12, fontSize:14 }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontWeight:800, fontSize:22, color:'#06B6D4' }}>{wScore}</div>
          <div style={{ color:'var(--text-muted)', fontSize:11 }}>You</div>
        </div>
        <div style={{ color:'var(--text-muted)', alignSelf:'center' }}>vs</div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontWeight:800, fontSize:22, color:'#F59E0B' }}>{bScore}</div>
          <div style={{ color:'var(--text-muted)', fontSize:11 }}>AI</div>
        </div>
      </div>

      <div style={{ marginBottom:12, padding:'9px 22px', borderRadius:12, background: gameOver ? 'rgba(109,40,217,0.15)' : 'var(--glass)', border:`1px solid ${gameOver ? 'var(--accent)' : 'var(--glass-border)'}`, fontSize:14, fontWeight:600, color: gameOver ? 'var(--accent)' : 'var(--text-primary)' }}>{status}</div>
      {wonGame && <div style={{ marginBottom:12, padding:'8px 20px', borderRadius:12, background:'rgba(52,211,153,0.12)', border:'1px solid #34D399', fontSize:13, fontWeight:600, color:'#34D399' }}>+{MP_WIN} MP earned!</div>}

      <div style={{ display:'grid', gridTemplateColumns:`repeat(8, ${CELL}px)`, border:'2px solid rgba(245,158,11,0.3)', borderRadius:8, overflow:'hidden', boxShadow:'0 0 0 1px rgba(245,158,11,0.15), 0 20px 60px rgba(0,0,0,0.6)' }}>
        {board.map((row, r) => row.map((piece, c) => {
          const isDark = (r+c)%2===1;
          const isSelected = selected?.[0]===r && selected?.[1]===c;
          const isTarget = legalMoves.some(m => m.to[0]===r && m.to[1]===c);
          const isCapture = isTarget && legalMoves.some(m => m.to[0]===r && m.to[1]===c && m.captured);
          let bg = isDark ? '#1E1050' : '#0A0720';
          if (isDark) {
            if (isSelected) bg = 'rgba(6,182,212,0.25)';
            else if (isCapture) bg = 'rgba(239,68,68,0.25)';
            else if (isTarget) bg = 'rgba(16,185,129,0.18)';
          }
          return (
            <div key={`${r}-${c}`} onClick={() => isDark && handleClick(r,c)} style={{ width:CELL, height:CELL, background: isDark ? bg : '#0A0720', display:'flex', alignItems:'center', justifyContent:'center', cursor: isDark ? 'pointer' : 'default', position:'relative', transition:'background 120ms' }}>
              {isTarget && !piece && <div style={{ width:20, height:20, borderRadius:'50%', background: isCapture ? 'rgba(239,68,68,0.5)' : 'rgba(16,185,129,0.5)', pointerEvents:'none' }} />}
              {piece && (
                <div style={{ width:52, height:52, borderRadius:'50%', background: piece.color==='w' ? 'radial-gradient(circle at 35% 35%, #22D3EE, #06B6D4, #0891B2)' : 'radial-gradient(circle at 35% 35%, #FCD34D, #F59E0B, #D97706)', boxShadow: piece.color==='w' ? '0 4px 12px rgba(6,182,212,0.4), inset 0 2px 4px rgba(255,255,255,0.3)' : '0 4px 12px rgba(245,158,11,0.4), inset 0 2px 4px rgba(255,255,255,0.3)', border: `2px solid ${isSelected ? '#fff' : (piece.color==='w' ? '#22D3EE' : '#FCD34D')}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize: piece.king ? 22 : 0, transition:'transform 150ms', transform: isSelected ? 'scale(1.08)' : 'scale(1)' }}>
                  {piece.king && '♛'}
                </div>
              )}
            </div>
          );
        }))}
      </div>

      <div style={{ marginTop:16, display:'flex', gap:24, fontSize:12, color:'var(--text-muted)', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:18, height:18, borderRadius:'50%', background:'#06B6D4' }} />
          You (Cyan)
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:18, height:18, borderRadius:'50%', background:'#F59E0B' }} />
          AI (Gold)
        </div>
        <div>Jumps are mandatory</div>
        <div style={{ color:'#A78BFA' }}>{userMP} MP</div>
      </div>
    </div>
  );
}
