import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress } from '../context/ProgressContext';
import { colors, spacing, radius, shadows } from '../theme';

const { width } = Dimensions.get('window');
const BOARD_SIZE = Math.floor((width - spacing.md * 2) / 8) * 8;
const CELL = BOARD_SIZE / 8;
export const MP_COST = 5;
const MP_WIN = 8;

// ─── Draughts Engine ─────────────────────────────────────────────────────────
// Board: 8x8. Dark squares only (r+c odd).
// Pieces: 1=black pawn (player, moves down), 2=black king
//         3=red pawn (AI, moves up),  4=red king

const EMPTY = 0, BLACK = 1, BLACK_KING = 2, RED = 3, RED_KING = 4;

function initBoard() {
  const b = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
  // Player (black) occupies rows 0-2
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 8; c++)
      if ((r + c) % 2 === 1) b[r][c] = BLACK;
  // AI (red) occupies rows 5-7
  for (let r = 5; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if ((r + c) % 2 === 1) b[r][c] = RED;
  return b;
}

const isPlayerPiece = p => p === BLACK || p === BLACK_KING;
const isAIPiece = p => p === RED || p === RED_KING;
const isKing = p => p === BLACK_KING || p === RED_KING;

function getDirs(piece) {
  if (piece === BLACK) return [[1, -1],[1, 1]];     // moves down
  if (piece === RED)   return [[-1,-1],[-1, 1]];    // moves up
  return [[-1,-1],[-1,1],[1,-1],[1,1]];              // kings: all 4
}

function getJumps(board, r, c, visited = null) {
  const piece = board[r][c];
  const dirs = getDirs(piece);
  const jumps = [];
  const v = visited || new Set([`${r},${c}`]);

  for (const [dr, dc] of dirs) {
    const mr = r + dr, mc = c + dc; // middle (captured)
    const lr = r + 2*dr, lc = c + 2*dc; // landing
    if (mr < 0 || mr > 7 || mc < 0 || mc > 7 || lr < 0 || lr > 7 || lc < 0 || lc > 7) continue;
    const mid = board[mr][mc];
    const land = board[lr][lc];
    if (land !== EMPTY) continue;
    if (v.has(`${lr},${lc}`)) continue;
    const midIsEnemy = isPlayerPiece(piece) ? isAIPiece(mid) : isPlayerPiece(mid);
    if (!midIsEnemy) continue;

    // Multi-jump: simulate capture and look for further jumps
    const newBoard = board.map(row => [...row]);
    newBoard[lr][lc] = isKing(piece) || (piece === BLACK && lr === 7) || (piece === RED && lr === 0)
      ? (isPlayerPiece(piece) ? BLACK_KING : RED_KING)
      : piece;
    newBoard[mr][mc] = EMPTY;
    newBoard[r][c] = EMPTY;

    const newV = new Set(v);
    newV.add(`${lr},${lc}`);
    const further = getJumps(newBoard, lr, lc, newV);

    if (further.length > 0) {
      further.forEach(seq => jumps.push({ captures: [[mr,mc], ...seq.captures], path: [[lr,lc], ...seq.path] }));
    } else {
      jumps.push({ captures: [[mr,mc]], path: [[lr,lc]] });
    }
  }
  return jumps;
}

function getMoves(board, r, c) {
  const piece = board[r][c];
  if (piece === EMPTY) return { jumps: [], slides: [] };
  const jumps = getJumps(board, r, c);
  const slides = [];
  if (jumps.length === 0) {
    for (const [dr, dc] of getDirs(piece)) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr <= 7 && nc >= 0 && nc <= 7 && board[nr][nc] === EMPTY)
        slides.push([nr, nc]);
    }
  }
  return { jumps, slides };
}

function getAllMoves(board, isPlayer) {
  const allJumps = [], allSlides = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (isPlayer ? !isPlayerPiece(p) : !isAIPiece(p)) continue;
      const { jumps, slides } = getMoves(board, r, c);
      jumps.forEach(j => allJumps.push({ from:[r,c], ...j }));
      slides.forEach(s => allSlides.push({ from:[r,c], slide:s }));
    }
  // Mandatory captures
  return allJumps.length > 0 ? { mandatory: true, moves: allJumps } : { mandatory: false, moves: allSlides };
}

function applyMove(board, from, move) {
  const b = board.map(r => [...r]);
  const [fr, fc] = from;
  const piece = b[fr][fc];

  if (move.captures) {
    // Jump sequence
    const dest = move.path[move.path.length - 1];
    move.captures.forEach(([cr,cc]) => b[cr][cc] = EMPTY);
    b[dest[0]][dest[1]] = piece;
    b[fr][fc] = EMPTY;
    // Promotion
    if (piece === BLACK && dest[0] === 7) b[dest[0]][dest[1]] = BLACK_KING;
    if (piece === RED && dest[0] === 0) b[dest[0]][dest[1]] = RED_KING;
  } else {
    const [tr, tc] = move.slide;
    b[tr][tc] = piece;
    b[fr][fc] = EMPTY;
    if (piece === BLACK && tr === 7) b[tr][tc] = BLACK_KING;
    if (piece === RED && tr === 0) b[tr][tc] = RED_KING;
  }
  return b;
}

function countPieces(board) {
  let black = 0, red = 0;
  board.forEach(row => row.forEach(p => {
    if (isPlayerPiece(p)) black++;
    if (isAIPiece(p)) red++;
  }));
  return { black, red };
}

function getAIMove(board) {
  const { moves } = getAllMoves(board, false);
  if (!moves.length) return null;
  // Prefer captures; among captures prefer longer chains
  const scored = moves.map(m => ({
    ...m,
    score: (m.captures?.length || 0) * 10 + Math.random(),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function DraughtsGame({ navigation }) {
  const { addXP, addMP } = useProgress();
  const [board, setBoard] = useState(initBoard);
  const [selected, setSelected] = useState(null);
  const [validMoves, setValidMoves] = useState({ jumps: [], slides: [] });
  const [turn, setTurn] = useState('player');
  const [status, setStatus] = useState('Your turn (Black)');
  const [gameOver, setGameOver] = useState(false);
  const [counts, setCounts] = useState({ black: 12, red: 12 });
  const aiThinking = useRef(false);
  const flashAnim = useRef(new Animated.Value(1)).current;

  const flash = () => Animated.sequence([
    Animated.timing(flashAnim, { toValue: 0.5, duration: 100, useNativeDriver: true }),
    Animated.timing(flashAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
  ]).start();

  const handleCell = useCallback((r, c) => {
    if (gameOver || turn !== 'player' || aiThinking.current) return;
    const piece = board[r][c];
    const { mandatory, moves: allMoves } = getAllMoves(board, true);

    if (selected) {
      const [sr, sc] = selected;
      const pMoves = validMoves;

      // Check if tapped on a legal jump destination
      const jumpMove = pMoves.jumps.find(j => {
        const dest = j.path[j.path.length - 1];
        return dest[0] === r && dest[1] === c;
      });
      if (jumpMove) {
        const newBoard = applyMove(board, selected, jumpMove);
        flash();
        const c2 = countPieces(newBoard);
        setCounts(c2);
        setBoard(newBoard);
        setSelected(null);
        setValidMoves({ jumps: [], slides: [] });
        if (c2.red === 0) { setStatus('You win! All red pieces captured! 🏆'); setGameOver(true); addXP(40); addMP(MP_WIN); return; }
        if (!getAllMoves(newBoard, false).moves.length) { setStatus('You win! Red has no moves! 🏆'); setGameOver(true); addXP(40); addMP(MP_WIN); return; }
        setStatus('Red is thinking…');
        setTurn('ai');
        return;
      }

      // Check slide destination
      const slideMove = pMoves.slides.find(m => m.slide[0] === r && m.slide[1] === c);
      if (slideMove && !mandatory) {
        const newBoard = applyMove(board, selected, slideMove);
        flash();
        const c2 = countPieces(newBoard);
        setCounts(c2);
        setBoard(newBoard);
        setSelected(null);
        setValidMoves({ jumps: [], slides: [] });
        if (!getAllMoves(newBoard, false).moves.length) { setStatus('You win! Red has no moves! 🏆'); setGameOver(true); addXP(40); addMP(MP_WIN); return; }
        setStatus('Red is thinking…');
        setTurn('ai');
        return;
      }

      // Re-select a player piece
      if (isPlayerPiece(piece)) {
        const pm = getMoves(board, r, c);
        if (mandatory && !pm.jumps.length) {
          // Must jump — can only select pieces that can jump
          const hasJump = allMoves.some(m => m.from[0]===r && m.from[1]===c);
          if (!hasJump) return;
        }
        setSelected([r, c]);
        setValidMoves(pm);
      } else {
        setSelected(null);
        setValidMoves({ jumps: [], slides: [] });
      }
    } else {
      if (isPlayerPiece(piece)) {
        if (mandatory) {
          const hasJump = allMoves.some(m => m.from[0]===r && m.from[1]===c);
          if (!hasJump) { setStatus('Must capture! Select a piece that can jump.'); return; }
        }
        const pm = getMoves(board, r, c);
        setSelected([r, c]);
        setValidMoves(pm);
        if (status !== 'Your turn (Black)') setStatus('Your turn (Black)');
      }
    }
  }, [board, selected, validMoves, turn, gameOver, status]);

  // AI turn
  useEffect(() => {
    if (turn !== 'ai' || gameOver) return;
    aiThinking.current = true;
    const t = setTimeout(() => {
      setBoard(prev => {
        const move = getAIMove(prev);
        if (!move) {
          setStatus('You win! Red has no moves! 🏆');
          setGameOver(true);
          addXP(40); addMP(MP_WIN);
          aiThinking.current = false;
          return prev;
        }
        const newBoard = applyMove(prev, move.from, move);
        flash();
        const c2 = countPieces(newBoard);
        setCounts(c2);
        if (c2.black === 0) {
          setStatus('Red wins! Better luck next time.');
          setGameOver(true);
          aiThinking.current = false;
          return newBoard;
        }
        if (!getAllMoves(newBoard, true).moves.length) {
          setStatus('Red wins! No moves left for you.');
          setGameOver(true);
          aiThinking.current = false;
          return newBoard;
        }
        setStatus('Your turn (Black)');
        setTurn('player');
        aiThinking.current = false;
        return newBoard;
      });
    }, 700);
    return () => clearTimeout(t);
  }, [turn, gameOver]);

  const restart = () => {
    setBoard(initBoard());
    setSelected(null);
    setValidMoves({ jumps: [], slides: [] });
    setTurn('player');
    setStatus('Your turn (Black)');
    setGameOver(false);
    setCounts({ black: 12, red: 12 });
    aiThinking.current = false;
  };

  const isHighlighted = (r, c) => {
    if (!selected) return false;
    const jumpDests = validMoves.jumps.map(j => j.path[j.path.length - 1]);
    const slideDests = validMoves.slides.map(s => s.slide);
    return jumpDests.some(([jr,jc]) => jr===r && jc===c) ||
           slideDests.some(([sr,sc]) => sr===r && sc===c);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Draughts</Text>
        <TouchableOpacity onPress={restart} style={styles.restartBtn}>
          <Text style={styles.restartText}>↺ Restart</Text>
        </TouchableOpacity>
      </View>

      {/* Score */}
      <View style={styles.scoreRow}>
        <View style={styles.scoreCard}>
          <View style={[styles.scoreDot, { backgroundColor: '#222' }]} />
          <Text style={styles.scoreLabel}>You</Text>
          <Text style={styles.scoreNum}>{counts.black}</Text>
        </View>
        <Animated.View style={[styles.statusPill, { opacity: flashAnim }]}>
          <Text style={[
            styles.statusText,
            gameOver && (status.includes('You win') ? styles.win : styles.lose),
            !gameOver && turn === 'ai' && { color: colors.textMuted },
          ]}>
            {status}
          </Text>
          {gameOver && status.includes('You win') && (
            <Text style={styles.xpTag}>+40 XP</Text>
          )}
        </Animated.View>
        <View style={styles.scoreCard}>
          <View style={[styles.scoreDot, { backgroundColor: '#CC2222' }]} />
          <Text style={styles.scoreLabel}>Red</Text>
          <Text style={styles.scoreNum}>{counts.red}</Text>
        </View>
      </View>

      {/* Board */}
      <View style={styles.boardWrap}>
        <View style={[styles.board, shadows.md]}>
          {board.map((row, r) => (
            <View key={r} style={styles.row}>
              {row.map((piece, c) => {
                const isDark = (r + c) % 2 === 1;
                const isSel = selected && selected[0]===r && selected[1]===c;
                const isHi = isHighlighted(r, c);
                const mustJump = getAllMoves(board, true).mandatory &&
                                  getAllMoves(board, true).moves.some(m => m.from[0]===r && m.from[1]===c);

                let bg = isDark ? '#5D4037' : '#D7CCC8';
                if (isDark && isSel) bg = '#7FB870';
                if (isDark && isHi) bg = '#BFD96B';

                return (
                  <TouchableOpacity
                    key={c}
                    style={[styles.cell, { backgroundColor: bg, width: CELL, height: CELL }]}
                    onPress={() => handleCell(r, c)}
                    activeOpacity={isDark ? 0.8 : 1}
                  >
                    {isHi && isDark && (
                      <View style={styles.moveHint} />
                    )}
                    {piece !== EMPTY && (
                      <View style={[
                        styles.piece,
                        isPlayerPiece(piece)
                          ? [styles.blackPiece, mustJump && !isSel && styles.mustJumpRing]
                          : styles.redPiece,
                        isSel && styles.selectedPiece,
                      ]}>
                        {isKing(piece) && <Text style={styles.crownText}>♛</Text>}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendPiece, { backgroundColor: '#222' }]} />
          <Text style={styles.legendText}>You (moves down)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendPiece, { backgroundColor: '#CC2222' }]} />
          <Text style={styles.legendText}>AI (moves up)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PIECE_SIZE = CELL * 0.72;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
  },
  backBtn: { padding: 4 },
  backText: { color: colors.primary, fontWeight: '600', fontSize: 15 },
  title: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  restartBtn: { padding: 4 },
  restartText: { color: colors.textSecondary, fontWeight: '600', fontSize: 14 },

  scoreRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.md, marginBottom: spacing.sm, gap: spacing.sm,
  },
  scoreCard: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.surface, borderRadius: radius.lg,
    paddingHorizontal: spacing.sm, paddingVertical: 6, ...shadows.xs,
  },
  scoreDot: { width: 10, height: 10, borderRadius: 5 },
  scoreLabel: { fontSize: 12, color: colors.textMuted, fontWeight: '500' },
  scoreNum: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },

  statusPill: {
    flex: 1, alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.lg,
    paddingHorizontal: spacing.sm, paddingVertical: 6, ...shadows.xs,
  },
  statusText: { fontSize: 12, fontWeight: '600', color: colors.textPrimary, textAlign: 'center' },
  win: { color: colors.success },
  lose: { color: colors.error },
  xpTag: { fontSize: 11, fontWeight: '700', color: colors.xpGold, marginTop: 1 },

  boardWrap: { alignItems: 'center', paddingHorizontal: spacing.md },
  board: {
    borderRadius: 4, overflow: 'hidden',
    borderWidth: 3, borderColor: '#3E2723',
  },
  row: { flexDirection: 'row' },
  cell: { alignItems: 'center', justifyContent: 'center' },

  piece: {
    width: PIECE_SIZE, height: PIECE_SIZE, borderRadius: PIECE_SIZE / 2,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 3,
  },
  blackPiece: {
    backgroundColor: '#1A1A1A',
    borderWidth: 2, borderColor: '#444',
  },
  redPiece: {
    backgroundColor: '#CC2222',
    borderWidth: 2, borderColor: '#FF5555',
  },
  selectedPiece: {
    transform: [{ scale: 1.1 }],
    shadowOpacity: 0.6, shadowRadius: 6,
  },
  mustJumpRing: {
    borderColor: colors.amber,
    borderWidth: 3,
  },
  crownText: { fontSize: PIECE_SIZE * 0.45, color: 'rgba(255,215,0,0.9)' },
  moveHint: {
    position: 'absolute',
    width: PIECE_SIZE * 0.45, height: PIECE_SIZE * 0.45,
    borderRadius: PIECE_SIZE * 0.22,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  legend: {
    flexDirection: 'row', justifyContent: 'center', gap: spacing.xl,
    marginTop: spacing.md,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendPiece: { width: 14, height: 14, borderRadius: 7 },
  legendText: { fontSize: 11, color: colors.textMuted },
});
