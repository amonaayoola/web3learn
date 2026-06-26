import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import tracks from '../data/tracks';
import AnimatedXPBar from '../components/AnimatedXPBar';
import StreakDisplay from '../components/StreakDisplay';
import RankBadge from '../components/RankBadge';
import DailyChallengeCard from '../components/DailyChallengeCard';
import HotStreakBanner from '../components/HotStreakBanner';
import { colors, spacing, radius, shadows, moduleColors } from '../theme';
import { getRank } from '../utils/rankUtils';

// Staggered entrance
function useEntrance(delay = 0) {
  const o = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(o, { toValue: 1, duration: 380, delay, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration: 380, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return { opacity: o, transform: [{ translateY: y }] };
}

// Quick action card
function ActionCard({ emoji, label, sub, color, onPress, primary }) {
  return (
    <TouchableOpacity
      style={[styles.actionCard, primary && styles.actionCardPrimary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {primary ? (
        <LinearGradient
          colors={['#7C3AED', '#A855F7']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          borderRadius={20}
        />
      ) : null}
      <View style={[
        styles.actionIcon,
        primary
          ? { backgroundColor: 'rgba(255,255,255,0.22)' }
          : { backgroundColor: color + '18' },
      ]}>
        <Text style={styles.actionEmoji}>{emoji}</Text>
      </View>
      <Text style={[styles.actionLabel, primary && { color: '#fff' }]}>{label}</Text>
      <Text style={[styles.actionSub, primary && { color: 'rgba(255,255,255,0.7)' }]}>{sub}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const {
    xp, mp, streak, freezeAvailable, hearts,
    dailyChallengeCompleted, consecutiveLessons,
    getModuleProgress, isModuleLocked,
  } = useProgress();
  const rank = getRank(xp);

  const a0 = useEntrance(0);
  const a1 = useEntrance(60);
  const a2 = useEntrance(110);
  const a3 = useEntrance(155);
  const a4 = useEntrance(200);

  return (
    <SafeAreaView style={styles.safe}>
      <HotStreakBanner visible={consecutiveLessons >= 3} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Header ── */}
        <Animated.View style={[a0, styles.header]}>
          <View style={styles.logoRow}>
            <LinearGradient
              colors={['#7C3AED', '#A855F7']}
              style={styles.logoIcon}
              borderRadius={10}
            >
              <Text style={styles.logoEmoji}>⛓</Text>
            </LinearGradient>
            <Text style={styles.logoText}>MAIDEN</Text>
          </View>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── Hero XP Card ── */}
        <Animated.View style={a1}>
          <LinearGradient
            colors={['#5B21B6', '#7C3AED', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.heroCard, shadows.blue]}
          >
            {/* Decorative circle */}
            <View style={styles.heroCircle} />

            {/* Top row */}
            <View style={styles.heroRow}>
              <View style={styles.heroRank}>
                <Text style={styles.heroRankEmoji}>{rank.emoji}</Text>
                <View>
                  <Text style={styles.heroRankLabel}>RANK</Text>
                  <Text style={styles.heroRankName}>{rank.name}</Text>
                </View>
              </View>
              <View style={styles.heroStats}>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNum}>{streak}</Text>
                  <Text style={styles.heroStatSub}>🔥 streak</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNum}>{hearts}</Text>
                  <Text style={styles.heroStatSub}>❤️ hearts</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatNum}>{mp}</Text>
                  <Text style={styles.heroStatSub}>⚡ MP</Text>
                </View>
              </View>
            </View>

            {/* XP number */}
            <Text style={styles.heroXP}>
              {xp.toLocaleString()}<Text style={styles.heroXPUnit}> XP</Text>
            </Text>

            {/* Progress bar */}
            <AnimatedXPBar xp={xp} onBlue />
          </LinearGradient>
        </Animated.View>

        {/* ── Quick Actions 2×2 ── */}
        <Animated.View style={[a2, styles.actionsGrid]}>
          <ActionCard
            primary
            emoji="✦"
            label="Ask SAGE"
            sub="AI Tutor"
            onPress={() => navigation.navigate('Tutor')}
          />
          <ActionCard
            emoji="👛"
            label="Wallet"
            sub="NFT Badges"
            color={colors.purple}
            onPress={() => navigation.navigate('Wallet')}
          />
          <ActionCard
            emoji="🎮"
            label="Games"
            sub="Chess & More"
            color={colors.teal}
            onPress={() => navigation.navigate('Games')}
          />
          <ActionCard
            emoji="📊"
            label="Profile"
            sub="Stats & XP"
            color={colors.amber}
            onPress={() => navigation.navigate('Profile')}
          />
        </Animated.View>

        {/* ── Daily Challenge ── */}
        <Animated.View style={a3}>
          <DailyChallengeCard
            completed={dailyChallengeCompleted}
            onPress={() => navigation.navigate('DailyChallenge')}
          />
        </Animated.View>

        {/* ── Explore Tracks ── */}
        <Animated.View style={[a3, styles.tracksSection]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionPill}>
              <Text style={styles.sectionPillText}>EXPLORE SKILLS</Text>
            </View>
            <View style={styles.sectionLine} />
            <TouchableOpacity onPress={() => navigation.navigate('Tracks')} activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See all →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 4 }}>
            {tracks.slice(0, 6).map(track => (
              <TouchableOpacity
                key={track.id}
                style={styles.trackChip}
                onPress={() => navigation.navigate('TrackDetail', { trackId: track.id })}
                activeOpacity={0.8}
              >
                <LinearGradient colors={track.gradient} style={styles.trackChipGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Text style={styles.trackChipEmoji}>{track.emoji}</Text>
                </LinearGradient>
                <Text style={styles.trackChipLabel} numberOfLines={2}>{track.title}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.trackChip}
              onPress={() => navigation.navigate('Tracks')}
              activeOpacity={0.8}
            >
              <View style={[styles.trackChipGrad, { backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={{ fontSize: 22 }}>✦</Text>
              </View>
              <Text style={[styles.trackChipLabel, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        {/* ── Modules ── */}
        <Animated.View style={a4}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionPill}>
              <Text style={styles.sectionPillText}>YOUR PATH</Text>
            </View>
            <View style={styles.sectionLine} />
          </View>

          {curriculum.map((module, index) => {
            const { completed, total, percentage } = getModuleProgress(module);
            const isLocked = isModuleLocked(index, curriculum);
            const mc = moduleColors[index] || moduleColors[0];
            const isDone = percentage === 1;

            return (
              <TouchableOpacity
                key={module.id}
                style={[styles.moduleCard, shadows.sm, isLocked && { opacity: 0.38 }]}
                onPress={() => !isLocked && navigation.navigate('Module', { moduleId: module.id })}
                activeOpacity={isLocked ? 1 : 0.78}
              >
                {/* Gradient left accent */}
                {!isLocked && (
                  <LinearGradient
                    colors={mc.gradient}
                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                    style={styles.accentBar}
                  />
                )}

                {/* Icon circle */}
                <View style={[
                  styles.moduleIcon,
                  { backgroundColor: isLocked ? 'rgba(0,0,0,0.05)' : mc.color + '15' },
                ]}>
                  <Text style={styles.moduleEmoji}>{module.emoji}</Text>
                  {isDone && (
                    <LinearGradient colors={mc.gradient} style={styles.doneBadge}>
                      <Text style={styles.doneCheck}>✓</Text>
                    </LinearGradient>
                  )}
                </View>

                {/* Text */}
                <View style={styles.moduleBody}>
                  <View style={styles.moduleTitleRow}>
                    <Text style={[styles.moduleTitle, isLocked && { color: colors.textMuted }]}>
                      {module.title}
                    </Text>
                    {isLocked
                      ? <Text style={{ fontSize: 13 }}>🔒</Text>
                      : <Text style={[styles.moduleCount, { color: mc.color }]}>{completed}/{total}</Text>
                    }
                  </View>
                  <Text style={[styles.moduleDesc, isLocked && { color: colors.textMuted }]}>
                    {module.description}
                  </Text>
                  {!isLocked && (
                    <View style={styles.moduleProgressTrack}>
                      <LinearGradient
                        colors={mc.gradient}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={[styles.moduleProgressFill, { width: `${Math.max(percentage * 100, 3)}%` }]}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const ACTION_W = '47.5%';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.xs },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  logoIcon: {
    width: 34, height: 34,
    alignItems: 'center', justifyContent: 'center',
  },
  logoEmoji: { fontSize: 17 },
  logoText: {
    fontSize: 20, fontWeight: '800',
    color: colors.primary, letterSpacing: -0.4,
  },
  profileBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    ...shadows.xs,
  },
  profileIcon: { fontSize: 17 },

  // Hero card
  heroCard: {
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  heroCircle: {
    position: 'absolute',
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)',
    right: -40, top: -40,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroRank: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroRankEmoji: { fontSize: 26 },
  heroRankLabel: {
    fontSize: 9, fontWeight: '700', letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.6)',
  },
  heroRankName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  heroStats: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 7, gap: 12,
  },
  heroStat: { alignItems: 'center' },
  heroStatNum: { fontSize: 16, fontWeight: '800', color: '#fff' },
  heroStatSub: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  heroStatDivider: { width: 1, height: 26, backgroundColor: 'rgba(255,255,255,0.2)' },
  heroXP: {
    fontSize: 46, fontWeight: '800', color: '#fff',
    letterSpacing: -1.5, marginBottom: 10,
  },
  heroXPUnit: { fontSize: 22, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },

  // Quick actions
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  actionCard: {
    width: ACTION_W,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: spacing.md,
    gap: 4,
    overflow: 'hidden',
    ...shadows.sm,
  },
  actionCardPrimary: {
    backgroundColor: colors.primary,
  },
  actionIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 6,
  },
  actionEmoji: { fontSize: 20 },
  actionLabel: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  actionSub: { fontSize: 11, color: colors.textMuted },

  // Tracks
  tracksSection: { marginBottom: spacing.md },
  seeAllText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  trackChip: { width: 90, alignItems: 'center', gap: 6 },
  trackChipGrad: {
    width: 72, height: 72, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  trackChipEmoji: { fontSize: 32 },
  trackChipLabel: {
    fontSize: 11, fontWeight: '600', color: colors.textSecondary,
    textAlign: 'center', lineHeight: 14,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: spacing.sm, marginBottom: spacing.md,
  },
  sectionPill: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  sectionPillText: {
    fontSize: 10, fontWeight: '800',
    color: '#fff', letterSpacing: 1,
  },
  sectionLine: {
    flex: 1, height: 1,
    backgroundColor: 'rgba(0,85,212,0.12)',
  },

  // Module cards
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    padding: spacing.md,
    paddingLeft: spacing.xs,
    gap: spacing.sm,
  },
  accentBar: {
    width: 5, alignSelf: 'stretch', borderRadius: 3,
  },
  moduleIcon: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  moduleEmoji: { fontSize: 26 },
  doneBadge: {
    position: 'absolute', bottom: -2, right: -2,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  doneCheck: { fontSize: 10, color: '#fff', fontWeight: '700' },
  moduleBody: { flex: 1 },
  moduleTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  moduleTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, flex: 1 },
  moduleCount: { fontSize: 13, fontWeight: '700' },
  moduleDesc: { fontSize: 12, color: colors.textSecondary, marginBottom: 9, lineHeight: 16 },
  moduleProgressTrack: {
    height: 4, backgroundColor: colors.background, borderRadius: 2, overflow: 'hidden',
  },
  moduleProgressFill: { height: '100%', borderRadius: 2 },
});
