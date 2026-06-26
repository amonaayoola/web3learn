import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDailyChallenge } from '../utils/dailyChallengeUtils';
import { colors, spacing, radius } from '../theme';

export default function DailyChallengeScreen({ navigation }) {
  const questions = getDailyChallenge();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.icon}>⚡</Text>
        <Text style={styles.title}>Daily Challenge</Text>
        <Text style={styles.subtitle}>5 questions across all 6 modules</Text>

        <View style={styles.rewardCard}>
          <Text style={styles.rewardLabel}>REWARD</Text>
          <Text style={styles.rewardValue}>2× XP Bonus</Text>
          <Text style={styles.rewardDesc}>Score well to maximize your earnings</Text>
        </View>

        <View style={styles.rules}>
          <Text style={styles.ruleItem}>⭐ Mixed questions from all 6 modules</Text>
          <Text style={styles.ruleItem}>❤️ Hearts system applies</Text>
          <Text style={styles.ruleItem}>🏆 2× XP multiplier on your score</Text>
          <Text style={styles.ruleItem}>🔄 Resets at midnight</Text>
        </View>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.replace('Quiz', { isDaily: true, questions })}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>Start Challenge →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.lg },
  backBtn: { marginBottom: spacing.lg },
  backText: { color: colors.primary, fontWeight: '600', fontSize: 15 },
  icon: { fontSize: 56, marginBottom: spacing.md, textAlign: 'center' },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  rewardCard: {
    backgroundColor: 'rgba(255,215,0,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,215,0,0.3)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  rewardLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.textMuted,
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.xpGold,
    marginBottom: 4,
  },
  rewardDesc: { fontSize: 13, color: colors.textSecondary },
  rules: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  ruleItem: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  startBtn: {
    backgroundColor: colors.xpGold,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  startBtnText: { color: '#000', fontWeight: '800', fontSize: 17 },
});
