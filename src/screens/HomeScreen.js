import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated,
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import AnimatedXPBar from '../components/AnimatedXPBar';
import StreakDisplay from '../components/StreakDisplay';
import RankBadge from '../components/RankBadge';
import DailyChallengeCard from '../components/DailyChallengeCard';
import HotStreakBanner from '../components/HotStreakBanner';
import { colors, spacing, radius, moduleColors } from '../theme';

export default function HomeScreen({ navigation }) {
  const { xp, streak, freezeAvailable, dailyChallengeCompleted, consecutiveLessons, getModuleProgress } = useProgress();
  const [showHotStreak] = useState(consecutiveLessons >= 3);

  return (
    <SafeAreaView style={styles.safe}>
      <HotStreakBanner visible={showHotStreak} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoEmoji}>⛓️</Text>
            </View>
            <Text style={styles.logoText}>web3learn</Text>
          </View>
          <View style={styles.headerActions}>
            <StreakDisplay streak={streak} freezeAvailable={freezeAvailable} />
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.7}
            >
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rank + XP section */}
        <View style={styles.xpCard}>
          <View style={styles.xpCardTop}>
            <RankBadge xp={xp} size="normal" />
            <Text style={styles.xpNumber}>{xp} <Text style={styles.xpLabel}>XP</Text></Text>
          </View>
          <AnimatedXPBar xp={xp} />
        </View>

        {/* Quick Actions: SAGE + Wallet */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.sageCard}
            onPress={() => navigation.navigate('Tutor')}
            activeOpacity={0.8}
          >
            <View style={styles.sageAvatarSmall}>
              <Text style={styles.sageAvatarEmoji}>✦</Text>
            </View>
            <View style={styles.sageCardBody}>
              <Text style={styles.sageCardTitle}>Ask SAGE</Text>
              <Text style={styles.sageCardSub}>AI Web3 tutor</Text>
            </View>
            <Text style={styles.sageArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.walletCard}
            onPress={() => navigation.navigate('Wallet')}
            activeOpacity={0.8}
          >
            <Text style={styles.walletCardEmoji}>👛</Text>
            <View style={styles.walletCardBody}>
              <Text style={styles.walletCardTitle}>Wallet</Text>
              <Text style={styles.walletCardSub}>NFT badges</Text>
            </View>
            <Text style={styles.walletArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Challenge */}
        <DailyChallengeCard
          completed={dailyChallengeCompleted}
          onPress={() => navigation.navigate('DailyChallenge')}
        />

        {/* Section header */}
        <Text style={styles.sectionTitle}>YOUR PATH</Text>

        {/* Modules */}
        {curriculum.map((module, index) => {
          const { completed, total, percentage } = getModuleProgress(module);
          const isLocked = index > 0 && getModuleProgress(curriculum[index - 1]).percentage < 1;
          const mc = moduleColors[index] || moduleColors[0];
          const isDone = percentage === 1;

          return (
            <TouchableOpacity
              key={module.id}
              style={[
                styles.moduleCard,
                { borderColor: isLocked ? colors.border : mc.color + '30' },
                isLocked && styles.moduleLocked,
              ]}
              onPress={() => !isLocked && navigation.navigate('Module', { moduleId: module.id })}
              activeOpacity={isLocked ? 1 : 0.75}
            >
              {/* Left accent bar */}
              {!isLocked && (
                <View style={[styles.accentBar, { backgroundColor: mc.color }]} />
              )}

              <View style={[styles.moduleIconWrap, { backgroundColor: mc.color + '18' }]}>
                <Text style={styles.moduleEmoji}>{module.emoji}</Text>
                {isDone && (
                  <View style={[styles.doneBadge, { backgroundColor: mc.color }]}>
                    <Text style={styles.doneCheck}>✓</Text>
                  </View>
                )}
              </View>

              <View style={styles.moduleBody}>
                <View style={styles.moduleTitleRow}>
                  <Text style={[styles.moduleTitle, isLocked && styles.textLocked]}>
                    {module.title}
                  </Text>
                  {isLocked
                    ? <Text style={styles.lockEmoji}>🔒</Text>
                    : <Text style={[styles.lessonCount, { color: mc.color }]}>{completed}/{total}</Text>
                  }
                </View>
                <Text style={[styles.moduleDesc, isLocked && styles.textLockedSub]}>
                  {module.description}
                </Text>
                {!isLocked && (
                  <View style={styles.progressTrack}>
                    <View style={[
                      styles.progressFill,
                      { width: `${percentage * 100}%`, backgroundColor: mc.color },
                    ]} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoIcon: {
    width: 36, height: 36, borderRadius: radius.sm,
    backgroundColor: colors.primaryGlow,
    alignItems: 'center', justifyContent: 'center',
  },
  logoEmoji: { fontSize: 20 },
  logoText: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.3 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  profileBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  profileIcon: { fontSize: 16 },

  xpCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  xpCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  xpNumber: { fontSize: 24, fontWeight: '900', color: colors.xpGold },
  xpLabel: { fontSize: 14, fontWeight: '600', color: colors.textMuted },

  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  sageCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.primary + '50',
    paddingHorizontal: spacing.sm,
    paddingVertical: 12,
  },
  sageAvatarSmall: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primaryGlow,
    borderWidth: 1, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  sageAvatarEmoji: { fontSize: 14, color: colors.primary },
  sageCardBody: { flex: 1 },
  sageCardTitle: { fontSize: 13, fontWeight: '800', color: colors.textPrimary },
  sageCardSub: { fontSize: 10, color: colors.textMuted, marginTop: 1 },
  sageArrow: { fontSize: 14, color: colors.primary },

  walletCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.teal + '40',
    paddingHorizontal: spacing.sm,
    paddingVertical: 12,
  },
  walletCardEmoji: { fontSize: 22 },
  walletCardBody: { flex: 1 },
  walletCardTitle: { fontSize: 13, fontWeight: '800', color: colors.textPrimary },
  walletCardSub: { fontSize: 10, color: colors.textMuted, marginTop: 1 },
  walletArrow: { fontSize: 14, color: colors.teal },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: colors.textMuted,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },

  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
    gap: spacing.md,
    padding: spacing.md,
    paddingLeft: spacing.sm,
  },
  moduleLocked: { opacity: 0.45 },
  accentBar: { width: 4, borderRadius: 2, alignSelf: 'stretch', marginLeft: -spacing.sm + 4 },
  moduleIconWrap: {
    width: 56, height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  moduleEmoji: { fontSize: 28 },
  doneBadge: {
    position: 'absolute', bottom: -2, right: -2,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  doneCheck: { fontSize: 10, color: '#fff', fontWeight: '900' },
  moduleBody: { flex: 1 },
  moduleTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  moduleTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, flex: 1 },
  textLocked: { color: colors.textMuted },
  textLockedSub: { color: colors.textMuted },
  lockEmoji: { fontSize: 14 },
  lessonCount: { fontSize: 13, fontWeight: '700' },
  moduleDesc: { fontSize: 12, color: colors.textSecondary, marginBottom: 8 },
  progressTrack: { height: 5, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
});
