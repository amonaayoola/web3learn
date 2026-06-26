'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { deductMP, getUserMP, addMP } from '../../lib/xp';

const MP_COST = 8;
const MP_WIN  = 12;

/* ─── Types ────────────────────────────────────────────────── */
type PieceType = 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';
type Color = 'w' | 'b';
interface Piece { type: PieceType; color: Color; }
type Board = (Piece | null)[][];

/* ─── Difficulty ────────────────────────────────────────────── */
type Difficulty = 1 | 2 | 3 | 4 | 5;
const DIFF_INFO: Record<Difficulty, { label: string; desc: string; emoji: string }> = {
  1: { label: 'Novice',      desc: 'Moves randomly. Great for learning piece movements.',                     emoji: '🌱' },
  2: { label: 'Casual',      desc: 'Prefers captures but makes beginner mistakes.',                           emoji: '🎯' },
  3: { label: 'Club',        desc: 'Thinks 2 moves ahead. Will challenge beginners.',                         emoji: '⚔️' },
  4: { label: 'Skilled',     desc: 'Thinks 3-4 moves ahead. Uses piece-square tables.',                      emoji: '🧠' },
  5: { label: 'Grandmaster', desc: 'Iterative deepening, transposition table, quiescence search. Very hard.', emoji: '👑' },
};

/* ─── Initial board ─────────────────────────────────────────── */
function initBoard(): Board {
  const b: Board = Array.from({ length: 8 }, () => Array(8).fill(null));
  const backRow: PieceType[] = ['R','N','B','Q','K','B','N','R'];
  for (let c = 0; c < 8; c++) {
    b[0][c] = { type: backRow[c], color: 'b' };
    b[1][c] = { type: 'P', color: 'b' };
    b[6][c] = { type: 'P', color: 'w' };
    b[7][c] = { type: backRow[c], color: 'w' };
  }
  return b;
}

/* ─── Move generation ────────────────────────────────────────── */
function inBounds(r: number, c: number) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

function getLegalMoves(board: Board, row: number, col: number): [number, number][] {
  const piece = board[row][col];
  if (!piece) return [];
  const moves: [number, number][] = [];
  const { type, color } = piece;
  const dir = color === 'w' ? -1 : 1;

  const slide = (dr: number, dc: number) => {
    let r = row + dr, c = col + dc;
    while (inBounds(r, c)) {
      if (!board[r][c]) { moves.push([r, c]); }
      else { if (board[r][c]!.color !== color) moves.push([r, c]); break; }
      r += dr; c += dc;
    }
  };

  if (type === 'P') {
    if (inBounds(row + dir, col) && !board[row + dir][col]) {
      moves.push([row + dir, col]);
      const startRow = color === 'w' ? 6 : 1;
      if (row === startRow && !board[row + 2 * dir][col]) moves.push([row + 2 * dir, col]);
    }
    for (const dc of [-1, 1]) {
      const nr = row + dir, nc = col + dc;
      if (inBounds(nr, nc) && board[nr][nc] && board[nr][nc]!.color !== color) moves.push([nr, nc]);
    }
  } else if (type === 'N') {
    for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      const nr = row + dr, nc = col + dc;
      if (inBounds(nr, nc) && board[nr][nc]?.color !== color) moves.push([nr, nc]);
    }
  } else if (type === 'R') {
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) slide(dr, dc);
  } else if (type === 'B') {
    for (const [dr, dc] of [[1,1],[1,-1],[-1,1],[-1,-1]]) slide(dr, dc);
  } else if (type === 'Q') {
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) slide(dr, dc);
  } else if (type === 'K') {
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) {
      const nr = row + dr, nc = col + dc;
      if (inBounds(nr, nc) && board[nr][nc]?.color !== color) moves.push([nr, nc]);
    }
  }
  return moves;
}

type Move4 = [number, number, number, number];

function getAllMoves(board: Board, color: Color): Move4[] {
  const all: Move4[] = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c]?.color === color)
        for (const [tr, tc] of getLegalMoves(board, r, c))
          all.push([r, c, tr, tc]);
  return all;
}

function applyMove(board: Board, fr: number, fc: number, tr: number, tc: number): Board {
  const nb = board.map(row => [...row]);
  let piece = nb[fr][fc]!;
  if (piece.type === 'P' && (tr === 0 || tr === 7)) piece = { type: 'Q', color: piece.color };
  nb[tr][tc] = piece;
  nb[fr][fc] = null;
  return nb;
}

/* ─── Centipawn values ──────────────────────────────────────── */
const MATERIAL_CP: Record<PieceType, number> = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000 };

/* ─── Piece-Square Tables (centipawns, from black's perspective rows 0-7) ── */
const PST_P = [
  [  0,  0,  0,  0,  0,  0,  0,  0],
  [ 50, 50, 50, 50, 50, 50, 50, 50],
  [ 10, 10, 20, 30, 30, 20, 10, 10],
  [  5,  5, 10, 25, 25, 10,  5,  5],
  [  0,  0,  0, 20, 20,  0,  0,  0],
  [  5, -5,-10,  0,  0,-10, -5,  5],
  [  5, 10, 10,-20,-20, 10, 10,  5],
  [  0,  0,  0,  0,  0,  0,  0,  0],
];
const PST_N = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50],
];
const PST_B = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5, 10, 10,  5,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20],
];
const PST_R = [
  [  0,  0,  0,  0,  0,  0,  0,  0],
  [  5, 10, 10, 10, 10, 10, 10,  5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [  0,  0,  0,  5,  5,  0,  0,  0],
];
const PST_Q = [
  [-20,-10,-10, -5, -5,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5,  5,  5,  5,  0,-10],
  [ -5,  0,  5,  5,  5,  5,  0, -5],
  [  0,  0,  5,  5,  5,  5,  0, -5],
  [-10,  5,  5,  5,  5,  5,  0,-10],
  [-10,  0,  5,  0,  0,  0,  0,-10],
  [-20,-10,-10, -5, -5,-10,-10,-20],
];
const PST_K_MID = [
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-20,-30,-30,-40,-40,-30,-30,-20],
  [-10,-20,-20,-20,-20,-20,-20,-10],
  [ 20, 20,  0,  0,  0,  0, 20, 20],
  [ 20, 30, 10,  0,  0, 10, 30, 20],
];
const PST_K_END = [
  [-50,-40,-30,-20,-20,-30,-40,-50],
  [-30,-20,-10,  0,  0,-10,-20,-30],
  [-30,-10, 20, 30, 30, 20,-10,-30],
  [-30,-10, 30, 40, 40, 30,-10,-30],
  [-30,-10, 30, 40, 40, 30,-10,-30],
  [-30,-10, 20, 30, 30, 20,-10,-30],
  [-30,-30,  0,  0,  0,  0,-30,-30],
  [-50,-30,-30,-30,-30,-30,-30,-50],
];

const PST_MAP: Record<PieceType, number[][]> = {
  P: PST_P, N: PST_N, B: PST_B, R: PST_R, Q: PST_Q, K: PST_K_MID,
};

function getPST(type: PieceType, color: Color, r: number, c: number, endgame: boolean): number {
  let table = type === 'K' ? (endgame ? PST_K_END : PST_K_MID) : PST_MAP[type];
  const row = color === 'b' ? r : 7 - r;
  return table[row]?.[c] ?? 0;
}

/* ─── Full evaluation (centipawns, positive = good for black) ── */
function evaluateFull(board: Board): number {
  let wMat = 0, bMat = 0;
  // First pass: material for endgame detection
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p || p.type === 'K') continue;
      if (p.color === 'w') wMat += MATERIAL_CP[p.type];
      else bMat += MATERIAL_CP[p.type];
    }
  const totalMat = wMat + bMat;
  const endgame = totalMat < 1300;

  let score = 0;
  const wPawns: number[][] = [], bPawns: number[][] = [];

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      const mat = MATERIAL_CP[p.type];
      const pst = getPST(p.type, p.color, r, c, endgame);
      const val = mat + pst;
      if (p.color === 'b') {
        score += val;
        if (p.type === 'P') bPawns.push([r, c]);
      } else {
        score -= val;
        if (p.type === 'P') wPawns.push([r, c]);
      }
    }
  }

  // Pawn structure
  const pawnPenalty = (pawns: number[][], color: Color) => {
    let pen = 0;
    const cols: Record<number, number> = {};
    for (const [, c] of pawns) cols[c] = (cols[c] || 0) + 1;
    for (const [r, c] of pawns) {
      if ((cols[c] || 0) > 1) pen -= 20; // doubled
      const hasNeighbor = (cols[c - 1] || 0) > 0 || (cols[c + 1] || 0) > 0;
      if (!hasNeighbor) pen -= 15; // isolated
      // Passed pawn
      const enemyPawns = color === 'b' ? wPawns : bPawns;
      const isPassed = !enemyPawns.some(([er, ec]) =>
        Math.abs(ec - c) <= 1 && (color === 'b' ? er > r : er < r)
      );
      if (isPassed) {
        const advancement = color === 'b' ? r : 7 - r;
        pen += 20 + advancement * 7;
      }
    }
    return pen;
  };
  score += pawnPenalty(bPawns, 'b');
  score -= pawnPenalty(wPawns, 'w');

  // Rook on open/semi-open files
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p || p.type !== 'R') continue;
      const ownPawns = p.color === 'b' ? bPawns : wPawns;
      const enemyPawns = p.color === 'b' ? wPawns : bPawns;
      const hasOwn = ownPawns.some(([, pc]) => pc === c);
      const hasEnemy = enemyPawns.some(([, pc]) => pc === c);
      const bonus = !hasOwn && !hasEnemy ? 25 : (!hasOwn ? 12 : 0);
      // 7th rank
      const seventhRank = p.color === 'b' ? 6 : 1;
      const rankBonus = r === seventhRank ? 30 : 0;
      if (p.color === 'b') score += bonus + rankBonus;
      else score -= bonus + rankBonus;
    }
  }

  // Mobility
  const bMoves = getAllMoves(board, 'b').length;
  const wMoves = getAllMoves(board, 'w').length;
  score += (bMoves - wMoves) * 4;

  return score;
}

/* ─── Zobrist hashing ───────────────────────────────────────── */
const PIECE_IDX: Record<Color, Record<PieceType, number>> = {
  b: { P: 0, N: 1, B: 2, R: 3, Q: 4, K: 5 },
  w: { P: 6, N: 7, B: 8, R: 9, Q: 10, K: 11 },
};

// 64x12 random number table (two 32-bit halves XORed for better distribution)
const ZOBRIST_TABLE: number[][] = Array.from({ length: 64 }, () =>
  Array.from({ length: 12 }, () =>
    (Math.floor(Math.random() * 0x7FFFFFFF) ^ (Math.floor(Math.random() * 0x7FFFFFFF) << 1))
  )
);
const ZOBRIST_SIDE = Math.floor(Math.random() * 0x7FFFFFFF);

function boardHash(board: Board, side: Color): number {
  let h = 0;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p) h ^= ZOBRIST_TABLE[r * 8 + c][PIECE_IDX[p.color][p.type]];
    }
  if (side === 'w') h ^= ZOBRIST_SIDE;
  return h;
}

/* ─── Transposition table ───────────────────────────────────── */
const TT_EXACT = 0, TT_ALPHA = 1, TT_BETA = 2;
interface TTEntry { depth: number; score: number; flag: number; best: Move4 | null; }
let transpositionTable: Map<number, TTEntry> = new Map();

/* ─── Move ordering helpers ─────────────────────────────────── */
const MVV_LVA: Record<PieceType, number> = { P: 1, N: 2, B: 3, R: 4, Q: 5, K: 6 };

function scoreMove(board: Board, fr: number, fc: number, tr: number, tc: number,
  killers: Move4[][], plyDepth: number, history: number[][][][]): number {
  const victim = board[tr][tc];
  const attacker = board[fr][fc];
  if (victim) {
    return 10000 + MVV_LVA[victim.type] * 100 - MVV_LVA[attacker!.type];
  }
  // Killer heuristic
  for (const k of (killers[plyDepth] || [])) {
    if (k[0] === fr && k[1] === fc && k[2] === tr && k[3] === tc) return 9000;
  }
  // History heuristic
  return history[fr][fc][tr][tc] || 0;
}

/* ─── Opening book ──────────────────────────────────────────── */
// [from_r, from_c, to_r, to_c] all 0-indexed
// Black (AI) responses to white's first moves
const OPENING_BOOK: Move4[] = [
  [1, 4, 3, 4] as Move4,
  [1, 3, 3, 3] as Move4,
  [0, 6, 2, 5] as Move4,
  [0, 6, 2, 5] as Move4,
  [0, 1, 2, 2] as Move4,
];

let moveCount = 0;

function getBookMove(board: Board): Move4 | null {
  if (moveCount >= 5) return null;
  // Try to find a good book move that is legal
  const legalMoves = getAllMoves(board, 'b');
  const legalSet = new Set(legalMoves.map(m => m.join(',')));
  for (const bm of OPENING_BOOK) {
    if (legalSet.has(bm.join(','))) {
      // Check piece is actually there
      const p = board[bm[0]][bm[1]];
      if (p && p.color === 'b') return bm;
    }
  }
  return null;
}

/* ─── Quiescence search ─────────────────────────────────────── */
function quiescence(board: Board, alpha: number, beta: number, maximizing: boolean): number {
  const stand_pat = evaluateFull(board);
  if (maximizing) {
    if (stand_pat >= beta) return beta;
    alpha = Math.max(alpha, stand_pat);
  } else {
    if (stand_pat <= alpha) return alpha;
    beta = Math.min(beta, stand_pat);
  }

  const color: Color = maximizing ? 'b' : 'w';
  const moves = getAllMoves(board, color);
  // Only captures
  const captures = moves.filter(([,, tr, tc]) => board[tr][tc] !== null);

  // Sort MVV-LVA
  captures.sort((a, b) => {
    const va = MVV_LVA[board[a[2]][a[3]]!.type];
    const vb = MVV_LVA[board[b[2]][b[3]]!.type];
    return vb - va;
  });

  if (maximizing) {
    for (const [fr, fc, tr, tc] of captures) {
      const nb = applyMove(board, fr, fc, tr, tc);
      const val = quiescence(nb, alpha, beta, false);
      if (val >= beta) return beta;
      alpha = Math.max(alpha, val);
    }
    return alpha;
  } else {
    for (const [fr, fc, tr, tc] of captures) {
      const nb = applyMove(board, fr, fc, tr, tc);
      const val = quiescence(nb, alpha, beta, true);
      if (val <= alpha) return alpha;
      beta = Math.min(beta, val);
    }
    return beta;
  }
}

/* ─── Grandmaster minimax (alpha-beta + TT + killers + history + null move) ── */
let searchDeadline = 0;
let searchAborted = false;

function alphaBeta(
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  ply: number,
  killers: Move4[][],
  history: number[][][][],
  nullAllowed: boolean,
): number {
  if (searchAborted || Date.now() > searchDeadline) {
    searchAborted = true;
    return 0;
  }

  // TT lookup
  const hash = boardHash(board, maximizing ? 'b' : 'w');
  const ttEntry = transpositionTable.get(hash);
  if (ttEntry && ttEntry.depth >= depth) {
    if (ttEntry.flag === TT_EXACT) return ttEntry.score;
    if (ttEntry.flag === TT_ALPHA && ttEntry.score <= alpha) return alpha;
    if (ttEntry.flag === TT_BETA && ttEntry.score >= beta) return beta;
  }

  if (depth <= 0) return quiescence(board, alpha, beta, maximizing);

  const color: Color = maximizing ? 'b' : 'w';

  // Null move pruning
  if (nullAllowed && depth >= 3 && !maximizing) {
    // Pass the move (switch sides without moving)
    const nullVal = alphaBeta(board, depth - 3, alpha, beta, true, ply + 1, killers, history, false);
    if (nullVal >= beta) return beta;
  }

  const moves = getAllMoves(board, color);
  if (moves.length === 0) return maximizing ? -19000 : 19000;

  // Order moves
  const prevBest = ttEntry?.best;
  moves.sort((a, b) => {
    let sa = scoreMove(board, a[0], a[1], a[2], a[3], killers, ply, history);
    let sb = scoreMove(board, b[0], b[1], b[2], b[3], killers, ply, history);
    if (prevBest && a[0]===prevBest[0]&&a[1]===prevBest[1]&&a[2]===prevBest[2]&&a[3]===prevBest[3]) sa = 999999;
    if (prevBest && b[0]===prevBest[0]&&b[1]===prevBest[1]&&b[2]===prevBest[2]&&b[3]===prevBest[3]) sb = 999999;
    return sb - sa;
  });

  let bestMove: Move4 | null = null;
  let origAlpha = alpha;
  let best = maximizing ? -Infinity : Infinity;

  for (const [fr, fc, tr, tc] of moves) {
    if (searchAborted) break;
    const nb = applyMove(board, fr, fc, tr, tc);
    const val = alphaBeta(nb, depth - 1, alpha, beta, !maximizing, ply + 1, killers, history, true);

    if (maximizing) {
      if (val > best) { best = val; bestMove = [fr, fc, tr, tc]; }
      if (val > alpha) alpha = val;
      if (beta <= alpha) {
        // Beta cutoff: store killer
        if (!board[tr][tc]) {
          killers[ply] = killers[ply] || [];
          killers[ply].unshift([fr, fc, tr, tc]);
          if (killers[ply].length > 2) killers[ply].length = 2;
          history[fr][fc][tr][tc] = (history[fr][fc][tr][tc] || 0) + depth * depth;
        }
        break;
      }
    } else {
      if (val < best) { best = val; bestMove = [fr, fc, tr, tc]; }
      if (val < beta) beta = val;
      if (beta <= alpha) {
        if (!board[tr][tc]) {
          killers[ply] = killers[ply] || [];
          killers[ply].unshift([fr, fc, tr, tc]);
          if (killers[ply].length > 2) killers[ply].length = 2;
          history[fr][fc][tr][tc] = (history[fr][fc][tr][tc] || 0) + depth * depth;
        }
        break;
      }
    }
  }

  // Store TT
  if (!searchAborted && transpositionTable.size < 200000) {
    const flag = best <= origAlpha ? TT_ALPHA : (best >= beta ? TT_BETA : TT_EXACT);
    transpositionTable.set(hash, { depth, score: best, flag, best: bestMove });
  }

  return best;
}

/* ─── Iterative deepening ───────────────────────────────────── */
function grandmasterMove(board: Board): Move4 | null {
  const bookMove = getBookMove(board);
  if (bookMove) { moveCount++; return bookMove; }

  transpositionTable = new Map();
  searchDeadline = Date.now() + 3000;
  searchAborted = false;

  const killers: Move4[][] = [];
  const history: number[][][][] = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => Array(8).fill(0))
    )
  );

  const allMoves = getAllMoves(board, 'b');
  if (allMoves.length === 0) return null;
  if (allMoves.length === 1) return allMoves[0];

  let bestMove: Move4 = allMoves[0];

  for (let depth = 1; depth <= 6; depth++) {
    if (searchAborted || Date.now() > searchDeadline) break;
    searchAborted = false;

    let iterBest: Move4 = bestMove;
    let iterBestVal = -Infinity;

    // Order by previous TT result
    const orderedMoves = [...allMoves];
    const ttTop = transpositionTable.get(boardHash(board, 'b'));
    if (ttTop?.best) {
      const bm = ttTop.best;
      const idx = orderedMoves.findIndex(m => m[0]===bm[0]&&m[1]===bm[1]&&m[2]===bm[2]&&m[3]===bm[3]);
      if (idx > 0) { orderedMoves.unshift(...orderedMoves.splice(idx, 1)); }
    }

    for (const [fr, fc, tr, tc] of orderedMoves) {
      if (searchAborted) break;
      const nb = applyMove(board, fr, fc, tr, tc);
      const val = alphaBeta(nb, depth - 1, -Infinity, Infinity, false, 0, killers, history, true);
      if (!searchAborted && val > iterBestVal) {
        iterBestVal = val;
        iterBest = [fr, fc, tr, tc];
      }
    }

    if (!searchAborted) bestMove = iterBest;
  }

  moveCount++;
  return bestMove;
}

/* ─── Simple evaluation (levels 1-4) ──────────────────────── */
const MATERIAL: Record<PieceType, number> = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 0 };

function evaluate(board: Board): number {
  let score = 0;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      const val = MATERIAL[p.type] * 10;
      score += p.color === 'b' ? val : -val;
    }
  return score;
}

function minimax(board: Board, depth: number, alpha: number, beta: number, maximizing: boolean, useMobility: boolean): number {
  if (depth === 0) {
    let s = evaluate(board);
    if (useMobility) s += (getAllMoves(board,'b').length - getAllMoves(board,'w').length) * 0.1;
    return s;
  }
  const color: Color = maximizing ? 'b' : 'w';
  const moves = getAllMoves(board, color);
  if (moves.length === 0) return maximizing ? -9999 : 9999;
  if (maximizing) {
    let best = -Infinity;
    for (const [fr,fc,tr,tc] of moves) {
      const val = minimax(applyMove(board,fr,fc,tr,tc), depth-1, alpha, beta, false, useMobility);
      best = Math.max(best, val); alpha = Math.max(alpha, val);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const [fr,fc,tr,tc] of moves) {
      const val = minimax(applyMove(board,fr,fc,tr,tc), depth-1, alpha, beta, true, useMobility);
      best = Math.min(best, val); beta = Math.min(beta, val);
      if (beta <= alpha) break;
    }
    return best;
  }
}

/* ─── AI move selection ──────────────────────────────────────── */
function getAIMove(board: Board, diff: Difficulty): Move4 | null {
  const moves = getAllMoves(board, 'b');
  if (moves.length === 0) return null;

  if (diff === 1) return moves[Math.floor(Math.random() * moves.length)];

  if (diff === 2) {
    const captures = moves.filter(([,, tr, tc]) => board[tr][tc]);
    if (captures.length > 0) {
      captures.sort((a, b) => (MATERIAL[board[b[2]][b[3]]!.type]??0) - (MATERIAL[board[a[2]][a[3]]!.type]??0));
      return captures[0];
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (diff === 5) return grandmasterMove(board);

  const depths: Record<Difficulty, number> = { 1:0, 2:0, 3:2, 4:3, 5:0 };
  const depth = depths[diff];
  let bestMove = moves[0], bestVal = -Infinity;
  for (const [fr,fc,tr,tc] of moves) {
    const val = minimax(applyMove(board,fr,fc,tr,tc), depth-1, -Infinity, Infinity, false, diff===4);
    if (val > bestVal) { bestVal = val; bestMove = [fr,fc,tr,tc]; }
  }
  return bestMove;
}

/* ─── Piece emojis ─────────────────────────────────────────── */
const PIECE_EMOJI: Record<Color, Record<PieceType, string>> = {
  w: { K:'♔', Q:'♕', R:'♖', B:'♗', N:'♘', P:'♙' },
  b: { K:'♚', Q:'♛', R:'♜', B:'♝', N:'♞', P:'♟' },
};

/* ─── Component ─────────────────────────────────────────────── */
type Screen = 'gate' | 'difficulty' | 'game';

export default function ChessPage() {
  const [screen, setScreen] = useState<Screen>('gate');
  const [difficulty, setDifficulty] = useState<Difficulty>(3);
  const [board, setBoard] = useState<Board>(initBoard);
  const [selected, setSelected] = useState<[number,number]|null>(null);
  const [legalMoves, setLegalMoves] = useState<[number,number][]>([]);
  const [turn, setTurn] = useState<Color>('w');
  const [status, setStatus] = useState<string>('Your turn: White');
  const [gameOver, setGameOver] = useState(false);
  const [capturedW, setCapturedW] = useState<Piece[]>([]);
  const [capturedB, setCapturedB] = useState<Piece[]>([]);
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
    moveCount = 0;
    transpositionTable = new Map<number, TTEntry>();
    setScreen('game');
  }

  function checkGameOver(b: Board, nextColor: Color): boolean {
    const moves = getAllMoves(b, nextColor);
    if (moves.length === 0) {
      const playerWon = nextColor === 'b';
      setStatus(playerWon ? '🎉 You win! Black has no moves.' : '💀 Black wins! You have no moves.');
      setGameOver(true);
      if (playerWon) { setWonGame(true); addMP(MP_WIN); setUserMP(getUserMP()); }
      return true;
    }
    const hasKing = b.some(row => row.some(p => p?.type === 'K' && p?.color === nextColor));
    if (!hasKing) {
      const playerWon = nextColor === 'b';
      setStatus(playerWon ? '🎉 You win! Black king captured.' : '💀 You lost! Your king was captured.');
      setGameOver(true);
      if (playerWon) { setWonGame(true); addMP(MP_WIN); setUserMP(getUserMP()); }
      return true;
    }
    return false;
  }

  function handleSquareClick(row: number, col: number) {
    if (gameOver || turn !== 'w' || aiThinking.current) return;
    const piece = board[row][col];
    if (selected) {
      const [sr, sc] = selected;
      const isLegal = legalMoves.some(([r,c]) => r===row && c===col);
      if (isLegal) {
        const captured = board[row][col];
        const nb = applyMove(board, sr, sc, row, col);
        if (captured) setCapturedW(p => [...p, captured]);
        setBoard(nb); setSelected(null); setLegalMoves([]);
        setTurn('b'); setStatus(difficulty === 5 ? 'Grandmaster thinking...' : 'AI is thinking...');
        if (!checkGameOver(nb, 'b')) {
          aiThinking.current = true;
          const delay = difficulty === 5 ? 100 : [600,600,800,1000,0][difficulty-1];
          setTimeout(() => {
            const pick = getAIMove(nb, difficulty);
            if (pick) {
              const [fr,fc,tr,tc] = pick;
              const aiCaptured = nb[tr][tc];
              const nb2 = applyMove(nb, fr, fc, tr, tc);
              if (aiCaptured) setCapturedB(p => [...p, aiCaptured]);
              setBoard(nb2); setTurn('w'); setStatus('Your turn: White');
              checkGameOver(nb2, 'w');
            }
            aiThinking.current = false;
          }, delay);
        }
        return;
      }
      if (piece?.color === 'w') { setSelected([row,col]); setLegalMoves(getLegalMoves(board,row,col)); return; }
      setSelected(null); setLegalMoves([]);
      return;
    }
    if (piece?.color === 'w') { setSelected([row,col]); setLegalMoves(getLegalMoves(board,row,col)); }
  }

  function restart() {
    setBoard(initBoard()); setSelected(null); setLegalMoves([]);
    setTurn('w'); setStatus('Your turn: White');
    setGameOver(false); setWonGame(false);
    setCapturedW([]); setCapturedB([]);
    aiThinking.current = false;
    moveCount = 0;
    transpositionTable = new Map<number, TTEntry>();
  }

  const CELL = 64;

  if (screen === 'gate') return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", position:'relative' }}>
      <Link href="/games" style={{ position:'absolute', top:8, left:8, padding:'6px 14px', borderRadius:8, background:'var(--glass)', border:'1px solid var(--glass-border)', color:'var(--text-secondary)', textDecoration:'none', fontSize:13, fontWeight:600 }}>← Back</Link>
      <div style={{ maxWidth:440, width:'90%', textAlign:'center', background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:24, padding:'48px 40px' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>♟️</div>
        <h1 style={{ margin:'0 0 10px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Chess</h1>
        <p style={{ color:'var(--text-secondary)', marginBottom:28, fontSize:14, lineHeight:1.6 }}>Full chess against an AI opponent. Choose your difficulty and play.</p>
        <div style={{ marginBottom:16, fontSize:12, color:'var(--text-tertiary)' }}>
          Cost: <span style={{ color:'#A78BFA', fontWeight:600 }}>-{MP_COST} MP</span>
          &nbsp;|&nbsp; Win: <span style={{ color:'#34D399', fontWeight:600 }}>+{MP_WIN} MP</span>
          &nbsp;|&nbsp; Balance: <span style={{ color:'#A78BFA', fontWeight:600 }}>{userMP} MP</span>
        </div>
        {mpError && <div style={{ marginBottom:16, padding:'10px 14px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', fontSize:13, color:'#EF4444' }}>Not enough MP to play.</div>}
        <button onClick={() => { setMpError(false); setScreen('difficulty'); }} style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#6D28D9,#06B6D4)', color:'#fff', fontWeight:700, fontSize:15 }}>Select Difficulty</button>
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
              <button key={d} onClick={() => setDifficulty(d)} style={{ padding:'14px 18px', borderRadius:14, textAlign:'left', cursor:'pointer', transition:'all 150ms', border:`2px solid ${sel ? 'var(--accent)' : 'var(--glass-border)'}`, background: sel ? 'var(--accent-subtle)' : 'var(--glass)', display:'flex', alignItems:'center', gap:14 }}>
                <span style={{ fontSize:24 }}>{info.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color: sel ? 'var(--accent)' : 'var(--text-primary)', fontSize:14 }}>{info.label}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{info.desc}</div>
                </div>
                {sel && <span style={{ color:'var(--accent)', fontWeight:700 }}>✓</span>}
              </button>
            );
          })}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={() => setScreen('gate')} style={{ flex:1, padding:'12px', borderRadius:10, border:'1px solid var(--glass-border)', background:'transparent', color:'var(--text-secondary)', fontSize:14, cursor:'pointer' }}>← Back</button>
          <button onClick={beginGame} style={{ flex:2, padding:'12px', borderRadius:12, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#6D28D9,#06B6D4)', color:'#fff', fontWeight:700, fontSize:14 }}>Play as {DIFF_INFO[difficulty].label} ({MP_COST} MP)</button>
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
          <h1 style={{ margin:0, fontSize:20, fontWeight:800, color:'var(--text-primary)' }}>♟ Chess</h1>
          <div style={{ fontSize:11, color:'var(--text-muted)' }}>{DIFF_INFO[difficulty].emoji} {DIFF_INFO[difficulty].label}</div>
        </div>
        <button onClick={restart} style={{ padding:'7px 16px', borderRadius:8, border:'1px solid var(--border)', background:'var(--glass)', color:'var(--text-secondary)', cursor:'pointer', fontSize:12, fontWeight:600 }}>↺ Restart</button>
      </div>

      <div style={{ marginBottom:12, padding:'8px 20px', borderRadius:12, background: gameOver ? 'rgba(109,40,217,0.15)' : 'var(--glass)', border:`1px solid ${gameOver ? 'var(--accent)' : 'var(--glass-border)'}`, fontSize:14, fontWeight:600, color: gameOver ? 'var(--accent)' : 'var(--text-primary)' }}>{status}</div>
      {wonGame && <div style={{ marginBottom:12, padding:'8px 20px', borderRadius:12, background:'rgba(52,211,153,0.12)', border:'1px solid #34D399', fontSize:13, fontWeight:600, color:'#34D399' }}>+{MP_WIN} MP earned{difficulty===5?' — Grandmaster defeated!':''}!</div>}

      <div style={{ marginBottom:8, fontSize:18, minHeight:28 }}>{capturedB.map((p,i) => <span key={i}>{PIECE_EMOJI[p.color][p.type]}</span>)}</div>

      <div style={{ display:'grid', gridTemplateColumns:`repeat(8, ${CELL}px)`, border:'2px solid rgba(109,40,217,0.4)', borderRadius:8, overflow:'hidden', boxShadow:'0 0 0 1px rgba(109,40,217,0.2), 0 20px 60px rgba(0,0,0,0.6)' }}>
        {board.map((row, r) => row.map((piece, c) => {
          const isLight = (r+c)%2===0;
          const isSelected = selected?.[0]===r && selected?.[1]===c;
          const isLegal = legalMoves.some(([lr,lc]) => lr===r && lc===c);
          const isCapture = isLegal && !!board[r][c];
          let bg = isLight ? '#7C3AED' : '#2D1B69';
          if (isSelected) bg = '#F59E0B';
          else if (isLegal) bg = isCapture ? 'rgba(239,68,68,0.6)' : (isLight ? '#9F67FF' : '#4C2D9E');
          return (
            <div key={`${r}-${c}`} onClick={() => handleSquareClick(r,c)} style={{ width:CELL, height:CELL, background:bg, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative', fontSize:36, lineHeight:1, transition:'background 120ms', userSelect:'none' }}>
              {isLegal && !isCapture && <div style={{ position:'absolute', width:18, height:18, borderRadius:'50%', background:'rgba(255,255,255,0.25)', pointerEvents:'none' }} />}
              {piece && <span style={{ color:piece.color==='w'?'#E2E8F0':'#1E1B4B', textShadow:piece.color==='w'?'0 1px 3px rgba(0,0,0,0.8)':'0 1px 3px rgba(255,255,255,0.3)', fontSize:40 }}>{PIECE_EMOJI[piece.color][piece.type]}</span>}
              {c===0 && <span style={{ position:'absolute', top:2, left:3, fontSize:9, color:isLight?'#5B21B6':'#7C3AED', fontWeight:700 }}>{8-r}</span>}
              {r===7 && <span style={{ position:'absolute', bottom:2, right:3, fontSize:9, color:isLight?'#5B21B6':'#7C3AED', fontWeight:700 }}>{String.fromCharCode(97+c)}</span>}
            </div>
          );
        }))}
      </div>

      <div style={{ marginTop:8, fontSize:18, minHeight:28 }}>{capturedW.map((p,i) => <span key={i}>{PIECE_EMOJI[p.color][p.type]}</span>)}</div>
      <div style={{ marginTop:14, fontSize:12, color:'var(--text-muted)', textAlign:'center', display:'flex', gap:12, alignItems:'center' }}>
        <span style={{ color:'#E2E8F0' }}>♔ You (White)</span>
        <span style={{ color:'var(--text-disabled)' }}>vs</span>
        <span style={{ color:'#1E1B4B', background:'#7C3AED', padding:'1px 6px', borderRadius:4 }}>♚ AI (Black)</span>
        <span style={{ color:'var(--text-disabled)' }}>|</span>
        <span style={{ color:'#A78BFA' }}>{userMP} MP</span>
      </div>
    </div>
  );
}
