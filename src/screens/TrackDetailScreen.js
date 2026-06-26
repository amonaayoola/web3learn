import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from '../context/ProgressContext';
import tracks from '../data/tracks';
import { colors, spacing, radius, shadows } from '../theme';

const LEVEL_ORDER = ['beginner', 'intermediate', 'expert'];
const LEVEL_COLORS = { beginner: '#00C896', intermediate: '#F59E0B', expert: '#EF4444' };
const LEVEL_ICONS  = { beginner: '🌱', intermediate: '⚡', expert: '🔥' };

// ── Extracted so hooks are NOT called inside a .map() ─────────────────────
function AnimatedLevelCard({ module, index, isLocked, progress, onPress }) {
  const anim = useRef(new Animated.Value(0)).current;
  const animY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim,  { toValue: 1, duration: 360, delay: index * 90, useNativeDriver: true }),
      Animated.timing(animY, { toValue: 0, duration: 360, delay: index * 90, useNativeDriver: true }),
    ]).start();
  }, []);

  const lc = LEVEL_COLORS[module.level];
  const li = LEVEL_ICONS[module.level];
  const { percentage = 0 } = progress || {};
  const isDone = percentage >= 1;

  return (
    <Animated.View style={{ opacity: anim, transform: [{ translateY: animY }] }}>
      <TouchableOpacity
        style={[styles.levelCard, shadows.sm, isLocked && styles.levelCardLocked]}
        onPress={onPress}
        activeOpacity={isLocked ? 1 : 0.78}
      >
        {/* Colour bar */}
        {!isLocked && (
          <LinearGradient
            colors={[lc, lc + 'AA']}
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
            style={styles.levelBar}
          />
        )}

        <View style={styles.levelCardBody}>
          {/* Top row */}
          <View style={styles.levelCardTop}>
            <View style={[styles.levelIconBox, { backgroundColor: isLocked ? '#F5F5F5' : lc + '18' }]}>
              <Text style={styles.levelIcon}>{isLocked ? '🔒' : li}</Text>
            </View>
            <View style={styles.levelInfo}>
              <View style={styles.levelTagRow}>
                <View style={[styles.levelTag, { backgroundColor: isLocked ? '#F5F5F5' : lc + '22' }]}>
                  <Text style={[styles.levelTagText, { color: isLocked ? colors.textMuted : lc }]}>
                    {module.level.toUpperCase()}
                  </Text>
                </View>
                {isDone && (
                  <View style={[styles.doneTag, { backgroundColor: lc }]}>
                    <Text style={styles.doneTagText}>✓ DONE</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.levelTitle, isLocked && { color: colors.textMuted }]}>
                {module.title}
              </Text>
            </View>
            {!isLocked && <Text style={[styles.levelArrow, { color: lc }]}>›</Text>}
          </View>

          <Text style={[styles.levelDesc, isLocked && { color: colors.textMuted }]}>
            {module.description}
          </Text>

          {/* Stats + progress bar */}
          <View style={styles.levelFooter}>
            <Text style={[styles.lessonCount, { color: isLocked ? colors.textMuted : lc }]}>
              {module.lessons?.length || 0} lessons · {module.quiz?.length || 0} quiz questions
            </Text>
            {!isLocked && (
              <View style={styles.progressTrack}>
                <View style={[
                  styles.progressFill,
                  { width: `${Math.max(percentage * 100, percentage > 0 ? 4 : 0)}%`, backgroundColor: lc },
                ]} />
              </View>
            )}
          </View>

          {isLocked && (
            <View style={styles.lockNotice}>
              <Text style={styles.lockText}>
                Complete previous levels or change your skill level to unlock
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────
export default function TrackDetailScreen({ route, navigation }) {
  const { trackId } = route.params;
  const { userLevel, getModuleProgress } = useProgress();

  const track = tracks.find(t => t.id === trackId);
  if (!track) return null;

  const userLevelIdx = LEVEL_ORDER.indexOf(userLevel || 'beginner');

  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideY  = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.timing(slideY, { toValue: 0,  duration: 420, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <LinearGradient
          colors={track.gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Animated.View style={[styles.heroBody, { opacity: fadeIn, transform: [{ translateY: slideY }] }]}>
            <View style={styles.heroEmojiBg}>
              <Text style={styles.heroEmoji}>{track.emoji}</Text>
            </View>
            <Text style={styles.heroTitle}>{track.title}</Text>
            <Text style={styles.heroDesc}>{track.description}</Text>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>{track.category.toUpperCase()}</Text>
            </View>
          </Animated.View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.sectionLabel}>CHOOSE YOUR LEVEL</Text>

          {track.modules.map((module, i) => {
            const levelIdx = LEVEL_ORDER.indexOf(module.level);
            const isLocked = levelIdx > userLevelIdx;
            const progress = getModuleProgress ? getModuleProgress(module) : {};

            return (
              <AnimatedLevelCard
                key={module.id}
                module={module}
                index={i}
                isLocked={isLocked}
                progress={progress}
                onPress={() => !isLocked && navigation.navigate('Module', { moduleId: module.id })}
              />
            );
          })}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  // Hero
  hero: { paddingBottom: 32, paddingTop: 12 },
  backBtn: {
    marginLeft: 16, marginBottom: 16,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { fontSize: 24, color: '#fff', marginTop: -2 },
  heroBody: { alignItems: 'center', paddingHorizontal: spacing.lg, gap: 8 },
  heroEmojiBg: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
  },
  heroEmoji: { fontSize: 40 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#fff', textAlign: 'center', letterSpacing: -0.5 },
  heroDesc: { fontSize: 14, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 20 },
  heroPill: {
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.20)',
    marginTop: 4,
  },
  heroPillText: { fontSize: 10, fontWeight: '700', color: '#fff', letterSpacing: 1 },

  // Content
  content: { padding: spacing.md },
  sectionLabel: {
    fontSize: 11, fontWeight: '800', color: colors.textMuted,
    letterSpacing: 1.2, marginBottom: spacing.md,
  },

  // Level cards
  levelCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  levelCardLocked: { opacity: 0.55 },
  levelBar: { width: 5, alignSelf: 'stretch' },
  levelCardBody: { flex: 1, padding: spacing.md, gap: 8 },
  levelCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  levelIconBox: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  levelIcon: { fontSize: 24 },
  levelInfo: { flex: 1, gap: 4 },
  levelTagRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  levelTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full },
  levelTagText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  doneTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full },
  doneTagText: { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  levelTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  levelArrow: { fontSize: 28, fontWeight: '300', paddingLeft: 4 },
  levelDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  levelFooter: { gap: 6 },
  lessonCount: { fontSize: 12, fontWeight: '600' },
  progressTrack: { height: 4, backgroundColor: '#F0F4FF', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  lockNotice: { backgroundColor: '#F9FAFB', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7 },
  lockText: { fontSize: 12, color: colors.textMuted, fontStyle: 'italic' },
});
