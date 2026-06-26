import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress } from '../context/ProgressContext';
import { colors, spacing, radius, shadows } from '../theme';
import { MP_COST as CHESS_MP_COST } from './ChessGame';
import { MP_COST as DRAUGHTS_MP_COST } from './DraughtsGame';

const GAMES = [
  {
    id: 'chess',
    emoji: '♟️',
    title: 'Chess',
    subtitle: 'Classic strategy',
    description: 'Play against the AI. All standard rules — moves, captures, check and checkmate.',
    xp: '+50 XP · +12 MP on win',
    mpCost: CHESS_MP_COST,
    color: colors.purple,
    screen: 'Chess',
    difficulty: 'Medium',
  },
  {
    id: 'draughts',
    emoji: '🔴',
    title: 'Draughts',
    subtitle: 'Checkers / Draughts',
    description: 'Capture all your opponent\'s pieces. Mandatory jumps, kings, and multi-captures.',
    xp: '+40 XP · +8 MP on win',
    mpCost: DRAUGHTS_MP_COST,
    color: colors.coral,
    screen: 'Draughts',
    difficulty: 'Easy',
  },
];

const COMING_SOON = [
  { emoji: '🃏', title: 'Flashcards', desc: 'Rapid-fire concept recall' },
  { emoji: '⚡', title: 'Consensus Rush', desc: 'Race the clock validating blocks' },
  { emoji: '🔤', title: 'Crypto Wordle', desc: 'Guess the Web3 term in 6 tries' },
  { emoji: '🧠', title: 'Speed Quiz', desc: 'Beat the timer on rapid questions' },
  { emoji: '🧱', title: 'Block Builder', desc: 'Assemble blocks under MEV pressure' },
  { emoji: '🔗', title: 'Word Match', desc: 'Pair terms with their definitions' },
  { emoji: '✏️', title: 'Fill the Blank', desc: 'Complete the Web3 sentence' },
];

export default function GamesScreen({ navigation }) {
  const { mp, deductMP } = useProgress();

  const handlePlay = async (game) => {
    if (mp < game.mpCost) {
      Alert.alert(
        'Not enough MAIDEN Points',
        `${game.title} costs ${game.mpCost} MP to play. You have ${mp} MP — earn more by completing quizzes.`,
      );
      return;
    }
    const ok = await deductMP(game.mpCost);
    if (ok) navigation.navigate(game.screen);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Games</Text>
        <View style={styles.mpPill}>
          <Text style={styles.mpPillText}>{mp} MP</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>PLAY NOW</Text>

        {GAMES.map(game => (
          <TouchableOpacity
            key={game.id}
            style={[styles.gameCard, shadows.sm]}
            onPress={() => handlePlay(game)}
            activeOpacity={0.8}
          >
            <View style={[styles.gameIconWrap, { backgroundColor: game.color + '15' }]}>
              <Text style={styles.gameEmoji}>{game.emoji}</Text>
            </View>

            <View style={styles.gameBody}>
              <View style={styles.gameTitleRow}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <View style={[styles.diffBadge, { backgroundColor: game.color + '15' }]}>
                  <Text style={[styles.diffText, { color: game.color }]}>{game.difficulty}</Text>
                </View>
              </View>
              <Text style={styles.gameSubtitle}>{game.subtitle}</Text>
              <Text style={styles.gameDesc}>{game.description}</Text>
              <View style={styles.xpRow}>
                <Text style={styles.xpText}>{game.xp} · −{game.mpCost} MP to start</Text>
                <Text style={[styles.playLink, { color: game.color }]}>Play →</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionLabel, { marginTop: spacing.lg }]}>COMING SOON</Text>

        {COMING_SOON.map(g => (
          <View key={g.title} style={[styles.soonCard, shadows.xs]}>
            <Text style={styles.soonEmoji}>{g.emoji}</Text>
            <View style={styles.soonBody}>
              <Text style={styles.soonTitle}>{g.title}</Text>
              <Text style={styles.soonDesc}>{g.desc}</Text>
            </View>
            <View style={styles.soonBadge}>
              <Text style={styles.soonBadgeText}>Soon</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 48 }} />
      </ScrollView>
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
  mpPill: {
    minWidth: 60, paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: radius.full, backgroundColor: colors.mpGlow,
    alignItems: 'center',
  },
  mpPillText: { fontSize: 12, fontWeight: '700', color: colors.cyan },

  content: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  sectionLabel: {
    fontSize: 11, fontWeight: '700', letterSpacing: 1.5,
    color: colors.textMuted, marginBottom: spacing.md,
  },

  gameCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: colors.surface, borderRadius: radius.xl,
    padding: spacing.md, gap: spacing.md, marginBottom: spacing.md,
  },
  gameIconWrap: {
    width: 56, height: 56, borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  gameEmoji: { fontSize: 28 },
  gameBody: { flex: 1 },
  gameTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  gameTitle: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  diffBadge: { borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  diffText: { fontSize: 11, fontWeight: '700' },
  gameSubtitle: { fontSize: 12, color: colors.textMuted, marginBottom: 5, fontStyle: 'italic' },
  gameDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginBottom: 8 },
  xpRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  xpText: { fontSize: 12, fontWeight: '600', color: colors.xpGold },
  playLink: { fontSize: 13, fontWeight: '700' },

  soonCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.xl,
    padding: spacing.md, gap: spacing.md, marginBottom: spacing.sm,
    opacity: 0.6,
  },
  soonEmoji: { fontSize: 26, width: 40, textAlign: 'center' },
  soonBody: { flex: 1 },
  soonTitle: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  soonDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  soonBadge: {
    backgroundColor: colors.border, borderRadius: radius.full,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  soonBadgeText: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5 },
});
