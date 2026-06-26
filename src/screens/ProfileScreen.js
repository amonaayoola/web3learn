import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import { getRank, getRankProgress } from '../utils/rankUtils';
import RankBadge from '../components/RankBadge';
import AnimatedXPBar from '../components/AnimatedXPBar';
import StreakDisplay from '../components/StreakDisplay';
import { colors, spacing, radius } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { user, isGuest, signOut, syncToCloud } = useAuth();
  const { xp, streak, freezeAvailable, hearts, completedLessons, completedQuizzes, getModuleProgress } = useProgress();
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  const rank = getRank(xp);
  const modulesCompleted = curriculum.filter(m => getModuleProgress(m).percentage === 1).length;
  const totalLessons = Object.keys(completedLessons).length;

  const handleSync = async () => {
    if (!user) return;
    setSyncing(true);
    setSyncMsg('');
    try {
      await syncToCloud({ xp, streak, completedLessons, completedQuizzes, hearts });
      setSyncMsg('✅ Synced successfully!');
    } catch (e) {
      setSyncMsg('❌ Sync failed. Check your connection.');
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncMsg(''), 3000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigation.replace('Auth');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Avatar + Name */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: rank.color + '20', borderColor: rank.color }]}>
            <Text style={styles.avatarEmoji}>{rank.emoji}</Text>
          </View>
          <Text style={styles.username}>
            {isGuest ? 'Guest User' : (user?.email?.split('@')[0] || 'Web3 Learner')}
          </Text>
          {!isGuest && <Text style={styles.email}>{user?.email}</Text>}
          {isGuest && <Text style={styles.guestLabel}>Playing as Guest</Text>}
          <RankBadge xp={xp} size="large" />
        </View>

        {/* XP Bar */}
        <View style={styles.card}>
          <AnimatedXPBar xp={xp} />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{xp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{modulesCompleted}/{curriculum.length}</Text>
            <Text style={styles.statLabel}>Modules</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalLessons}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
        </View>

        {/* Hearts */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hearts</Text>
          <View style={styles.heartsRow}>
            {[...Array(5)].map((_, i) => (
              <Text key={i} style={[styles.heartIcon, { opacity: i < hearts ? 1 : 0.2 }]}>❤️</Text>
            ))}
          </View>
        </View>

        {/* Streak */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Streak</Text>
          <StreakDisplay streak={streak} freezeAvailable={freezeAvailable} />
        </View>

        {/* Sync (only for logged-in users) */}
        {user && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cloud Sync</Text>
            <Text style={styles.cardSubtitle}>Manually sync your progress to the cloud</Text>
            {syncMsg ? <Text style={styles.syncMsg}>{syncMsg}</Text> : null}
            <TouchableOpacity
              style={[styles.syncBtn, syncing && { opacity: 0.6 }]}
              onPress={handleSync}
              disabled={syncing}
              activeOpacity={0.8}
            >
              {syncing ? <ActivityIndicator color={colors.primary} size="small" /> : <Text style={styles.syncBtnText}>Sync Now</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* Sign Out / Sign In */}
        {isGuest ? (
          <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.replace('Auth')} activeOpacity={0.8}>
            <Text style={styles.signInBtnText}>Create Account to Save Progress</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
            <Text style={styles.signOutBtnText}>Sign Out</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  backBtn: { padding: 4 },
  backText: { color: colors.primary, fontWeight: '600', fontSize: 15 },
  title: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  avatarSection: { alignItems: 'center', marginBottom: spacing.lg, gap: spacing.sm },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, marginBottom: spacing.sm,
  },
  avatarEmoji: { fontSize: 38 },
  username: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  email: { fontSize: 13, color: colors.textSecondary },
  guestLabel: { fontSize: 12, color: colors.textMuted, fontStyle: 'italic' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 13, fontWeight: '700', color: colors.textMuted, letterSpacing: 1, marginBottom: spacing.sm, textTransform: 'uppercase' },
  cardSubtitle: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.sm },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  statCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.sm, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  statLabel: { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  heartsRow: { flexDirection: 'row', gap: 6 },
  heartIcon: { fontSize: 22 },
  syncMsg: { fontSize: 13, marginBottom: spacing.sm, fontWeight: '600', color: colors.textPrimary },
  syncBtn: {
    borderWidth: 1.5, borderColor: colors.primary,
    borderRadius: radius.md, padding: spacing.sm, alignItems: 'center',
  },
  syncBtnText: { color: colors.primary, fontWeight: '700', fontSize: 14 },
  signOutBtn: {
    backgroundColor: 'rgba(255,82,82,0.1)',
    borderWidth: 1.5, borderColor: colors.error,
    borderRadius: radius.lg, padding: spacing.md, alignItems: 'center',
    marginTop: spacing.sm,
  },
  signOutBtnText: { color: colors.error, fontWeight: '700', fontSize: 15 },
  signInBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg, padding: spacing.md, alignItems: 'center',
    marginTop: spacing.sm,
  },
  signInBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
