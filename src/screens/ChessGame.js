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
export const MP_COST = 8;
const MP_WIN = 12;

// ─── Chess Engine ───────────────────────────────────────────────────────────

const INITIAL_BOARD = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['P','P','P','P','P','P','P','P'],
  ['R','N','B','Q','K','B','N','R'],
];

const PIECE_EMOJI = {
  K:'♔', Q:'♕', R:'♖', B:'♗', N:'♘', P:'♙',
  k:'♚', q:'♛', r:'♜', b:'♝', n:'♞', p:'♟',
};

const PIECE_VALUES = { p:1, n:3, b:3, r:5, q:9, k:100 };

const isWhite = p => p && p === p.toUpperCase() && p !== p.toLowerCase();
const isBlack = p => p && p === p.toLowerCase() && p !== p.toUpperCase();
const color = p => p ? (isWhite(p) ? 'white' : 'black') : null;
const isEnemy = (p, c) => p && (c === 'white' ? isBlack(p) : isWhite(p));
const isFriend = (p, c) => p && (c === 'white' ? isWhite(p) : isBlack(p));

function getRawMoves(board, row, col, clr, enPassant) {
  const piece = board[row][col];
  if (!piece) return [];
  const type = piece.toUpperCase();
  const moves = [];

  if (type === 'P') {
    const dir = clr === 'white' ? -1 : 1;
    const startRow = clr === 'white' ? 6 : 1;
    const nr = row + dir;
    if (nr >= 0 && nr < 8 && !board[nr][col]) {
      moves.push([nr, col]);
      if (row === startRow && !board[row + 2 * dir]?.[col]) {
        moves.push([row + 2 * dir, col]);
      }
    }
    for (const dc of [-1, 1]) {
      const nc = col + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        if (isEnemy(board[nr][nc], clr)) moves.push([nr, nc]);
        if (enPassant && enPassant[0] === nr && enPassant[1] === nc) moves.push([nr, nc]);
      }
    }
  }

  if (type === 'N') {
    for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      const nr = row+dr, nc = col+dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && !isFriend(board[nr][nc], clr))
        moves.push([nr, nc]);
    }
  }

  if (type === 'B' || type === 'Q') {
    for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
      let nr = row+dr, nc = col+dc;
      while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        if (isFriend(board[nr][nc], clr)) break;
        moves.push([nr, nc]);
        if (isEnemy(board[nr][nc], clr)) break;
        nr += dr; nc += dc;
      }
    }
  }

  if (type === 'R' || type === 'Q') {
    for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      let nr = row+dr, nc = col+dc;
      while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        if (isFriend(board[nr][nc], clr)) break;
        moves.push([nr, nc]);
        if (isEnemy(board[nr][nc], clr)) break;
        nr += dr; nc += dc;
      }
    }
  }

  if (type === 'K') {
    for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
      const nr = row+dr, nc = col+dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && !isFriend(board[nr][nc], clr))
        moves.push([nr, nc]);
    }
  }

  return moves;
}

function applyMove(board, from, to, enPassant) {
  const b = board.map(r => [...r]);
  const [fr, fc] = from;
  const [tr, tc] = to;
  const piece = b[fr][fc];

  // En passant capture
  if (piece?.toUpperCase() === 'P' && enPassant && tr === enPassant[0] && tc === enPassant[1]) {
    b[isWhite(piece) ? tr + 1 : tr - 1][tc] = null;
  }
  b[tr][tc] = piece;
  b[fr][fc] = null;
  // Promotion
  if (piece === 'P' && tr === 0) b[tr][tc] = 'Q';
  if (piece === 'p' && tr === 7) b[tr][tc] = 'q';
  return b;
}

function findKing(board, clr) {
  const king = clr === 'white' ? 'K' : 'k';
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c] === king) return [r, c];
  return null;
}

function isAttacked(board, row, col, byColor) {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p || color(p) !== byColor) continue;
      if (getRawMoves(board, r, c, byColor, null).some(([mr,mc]) => mr===row && mc===col)) return true;
    }
  return false;
}

function inCheck(board, clr) {
  const king = findKing(board, clr);
  if (!king) return false;
  return isAttacked(board, king[0], king[1], clr === 'white' ? 'black' : 'white');
}

function getLegalMoves(board, row, col, clr, enPassant) {
  return getRawMoves(board, row, col, clr, enPassant).filter(([tr, tc]) => {
    const nb = applyMove(board, [row, col], [tr, tc], enPassant);
    return !inCheck(nb, clr);
  });
}

function getAllLegal(board, clr, enPassant) {
  const all = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      if (!board[r][c] || color(board[r][c]) !== clr) continue;
      getLegalMoves(board, r, c, clr, enPassant).forEach(m => all.push({ from:[r,c], to:m }));
    }
  return all;
}

function isCheckmate(board, clr, enPassant) {
  return getAllLegal(board, clr, enPassant).length === 0 && inCheck(board, clr);
}
function isStalemate(board, clr, enPassant) {
  return getAllLegal(board, clr, enPassant).length === 0 && !inCheck(board, clr);
}

function getAIMove(board, enPassant) {
  const moves = getAllLegal(board, 'black', enPassant);
  if (!moves.length) return null;
  // Prefer highest-value captures
  const scored = moves.map(m => {
    const target = board[m.to[0]][m.to[1]];
    const val = target ? (PIECE_VALUES[target.toLowerCase()] || 0) : 0;
    // Slight preference for center
    const centerBonus = (3 - Math.abs(m.to[1] - 3.5)) * 0.05 + (3 - Math.abs(m.to[0] - 3.5)) * 0.05;
    return { ...m, score: val + centerBonus + Math.random() * 0.1 };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function ChessGame({ navigation }) {
  const { addXP, addMP } = useProgress();
  const [board, setBoard] = useState(INITIAL_BOARD.map(r => [...r]));
  const [selected, setSelected] = useState(null); // [row, col]
  const [legalMoves, setLegalMoves] = useState([]);
  const [turn, setTurn] = useState('white');
  const [enPassant, setEnPassant] = useState(null);
  const [status, setStatus] = useState('Your turn (White)');
  const [gameOver, setGameOver] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const aiThinking = useRef(false);
  const flashAnim = useRef(new Animated.Value(1)).current;

  const flash = () => {
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 0.4, duration: 120, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const handleCell = useCallback((row, col) => {
    if (gameOver || turn !== 'white' || aiThinking.current) return;
    const piece = board[row][col];

    if (selected) {
      const isMove = legalMoves.some(([r,c]) => r===row && c===col);
      if (isMove) {
        // Make the move
        const [fr, fc] = selected;
        const movingPiece = board[fr][fc];
        const newBoard = applyMove(board, selected, [row, col], enPassant);

        // En passant tracking
        let newEP = null;
        if (movingPiece?.toUpperCase() === 'P' && Math.abs(row - fr) === 2) {
          newEP = [(fr + row) / 2, col];
        }

        setBoard(newBoard);
        setLastMove({ from: selected, to: [row, col] });
        setSelected(null);
        setLegalMoves([]);
        setEnPassant(newEP);
        flash();

        // Check state
        if (isCheckmate(newBoard, 'black', newEP)) {
          setStatus('Checkmate! You win! 🏆');
          setGameOver(true);
          addXP(50);
          addMP(MP_WIN);
          return;
        }
        if (isStalemate(newBoard, 'black', newEP)) {
          setStatus("Stalemate — it's a draw.");
          setGameOver(true);
          return;
        }
        setStatus(inCheck(newBoard, 'black') ? "Check! Black's turn" : "Black is thinking…");
        setTurn('black');
      } else if (piece && isWhite(piece)) {
        // Re-select
        setSelected([row, col]);
        setLegalMoves(getLegalMoves(board, row, col, 'white', enPassant));
      } else {
        setSelected(null);
        setLegalMoves([]);
      }
    } else {
      if (piece && isWhite(piece)) {
        setSelected([row, col]);
        setLegalMoves(getLegalMoves(board, row, col, 'white', enPassant));
      }
    }
  }, [board, selected, legalMoves, turn, enPassant, gameOver]);

  // AI move
  useEffect(() => {
    if (turn !== 'black' || gameOver) return;
    aiThinking.current = true;
    const timer = setTimeout(() => {
      setBoard(prev => {
        const move = getAIMove(prev, enPassant);
        if (!move) {
          const playerWon = inCheck(prev, 'black');
          setStatus(playerWon ? 'Checkmate! You win! 🏆' : "Stalemate — draw.");
          setGameOver(true);
          aiThinking.current = false;
          if (playerWon) { addXP(50); addMP(MP_WIN); }
          return prev;
        }
        const newBoard = applyMove(prev, move.from, move.to, enPassant);
        let newEP = null;
        const mp = prev[move.from[0]][move.from[1]];
        if (mp?.toUpperCase() === 'P' && Math.abs(move.to[0] - move.from[0]) === 2) {
          newEP = [(move.from[0] + move.to[0]) / 2, move.to[1]];
        }
        setEnPassant(newEP);
        setLastMove({ from: move.from, to: move.to });
        flash();

        if (isCheckmate(newBoard, 'white', newEP)) {
          setStatus('Checkmate! Black wins.');
          setGameOver(true);
          aiThinking.current = false;
          return newBoard;
        }
        if (isStalemate(newBoard, 'white', newEP)) {
          setStatus("Stalemate — draw.");
          setGameOver(true);
          aiThinking.current = false;
          return newBoard;
        }
        setStatus(inCheck(newBoard, 'white') ? 'Check! Your turn (White)' : 'Your turn (White)');
        setTurn('white');
        aiThinking.current = false;
        return newBoard;
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [turn, gameOver]);

  const restart = () => {
    setBoard(INITIAL_BOARD.map(r => [...r]));
    setSelected(null);
    setLegalMoves([]);
    setTurn('white');
    setEnPassant(null);
    setStatus('Your turn (White)');
    setGameOver(false);
    setLastMove(null);
    aiThinking.current = false;
  };

  const isLastMove = (r, c) => lastMove && (
    (lastMove.from[0]===r && lastMove.from[1]===c) ||
    (lastMove.to[0]===r && lastMove.to[1]===c)
  );
  const isLegal = (r, c) => legalMoves.some(([lr,lc]) => lr===r && lc===c);
  const isSelected = (r, c) => selected && selected[0]===r && selected[1]===c;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chess</Text>
        <TouchableOpacity onPress={restart} style={styles.restartBtn}>
          <Text style={styles.restartText}>↺ Restart</Text>
        </TouchableOpacity>
      </View>

      {/* Status Bar */}
      <Animated.View style={[styles.statusBar, { opacity: flashAnim }]}>
        <Text style={[
          styles.statusText,
          gameOver && (status.includes('You win') ? styles.statusWin : styles.statusLose),
          !gameOver && status.includes('Check') && styles.statusCheck,
        ]}>
          {status}
        </Text>
        {gameOver && status.includes('You win') && (
          <Text style={styles.xpEarned}>+50 XP</Text>
        )}
      </Animated.View>

      {/* Board */}
      <View style={styles.boardWrap}>
        <View style={[styles.board, shadows.md]}>
          {board.map((row, r) => (
            <View key={r} style={styles.row}>
              {row.map((piece, c) => {
                const isLight = (r + c) % 2 === 0;
                const sel = isSelected(r, c);
                const legal = isLegal(r, c);
                const lm = isLastMove(r, c);
                const inCheckSq = piece?.toUpperCase() === 'K' && inCheck(board, color(piece) || 'white') &&
                                   color(piece) === turn;

                let bg = isLight ? '#F0D9B5' : '#B58863';
                if (lm) bg = isLight ? '#CDD16F' : '#A9A832';
                if (sel) bg = '#7FC97B';
                if (inCheckSq) bg = '#E84040';

                return (
                  <TouchableOpacity
                    key={c}
                    style={[styles.cell, { backgroundColor: bg, width: CELL, height: CELL }]}
                    onPress={() => handleCell(r, c)}
                    activeOpacity={piece ? 0.85 : 0.6}
                  >
                    {legal && (
                      piece
                        ? <View style={styles.captureRing} />
                        : <View style={styles.moveDot} />
                    )}
                    {piece && (
                      <Text style={[styles.piece, isWhite(piece) ? styles.whitePiece : styles.blackPiece]}>
                        {PIECE_EMOJI[piece]}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Rank labels */}
        <View style={styles.rankLabels}>
          {[8,7,6,5,4,3,2,1].map(n => (
            <Text key={n} style={[styles.rankLabel, { height: CELL, lineHeight: CELL }]}>{n}</Text>
          ))}
        </View>
      </View>

      {/* File labels */}
      <View style={[styles.fileLabels, { marginLeft: 18 }]}>
        {['a','b','c','d','e','f','g','h'].map(f => (
          <Text key={f} style={[styles.fileLabel, { width: CELL }]}>{f}</Text>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#7FC97B' }]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#CDD16F' }]} />
          <Text style={styles.legendText}>Last move</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#E84040' }]} />
          <Text style={styles.legendText}>Check</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

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

  statusBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md, gap: spacing.sm,
    backgroundColor: colors.surface, marginHorizontal: spacing.md,
    borderRadius: radius.lg, marginBottom: spacing.sm, ...shadows.xs,
  },
  statusText: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  statusWin: { color: colors.success },
  statusLose: { color: colors.error },
  statusCheck: { color: colors.amber },
  xpEarned: { fontSize: 13, fontWeight: '700', color: colors.xpGold },

  boardWrap: {
    flexDirection: 'row', marginLeft: spacing.md, alignItems: 'flex-start',
  },
  board: {
    borderRadius: 4, overflow: 'hidden',
    borderWidth: 2, borderColor: '#7D5035',
  },
  row: { flexDirection: 'row' },
  cell: { alignItems: 'center', justifyContent: 'center' },
  piece: { fontSize: CELL * 0.65, textAlign: 'center', lineHeight: CELL * 0.8 },
  whitePiece: { textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  blackPiece: {},
  moveDot: {
    width: CELL * 0.3, height: CELL * 0.3, borderRadius: CELL * 0.15,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  captureRing: {
    position: 'absolute',
    width: CELL - 4, height: CELL - 4,
    borderRadius: CELL / 2,
    borderWidth: 3, borderColor: 'rgba(0,0,0,0.3)',
  },
  rankLabels: { justifyContent: 'space-around', marginLeft: 4 },
  rankLabel: { fontSize: 11, color: colors.textMuted, textAlign: 'center', width: 14 },
  fileLabels: { flexDirection: 'row', marginTop: 4 },
  fileLabel: { fontSize: 11, color: colors.textMuted, textAlign: 'center' },

  legend: {
    flexDirection: 'row', justifyContent: 'center', gap: spacing.lg,
    marginTop: spacing.md, paddingHorizontal: spacing.md,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: colors.textMuted },
});
