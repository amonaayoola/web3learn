import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from '../context/ProgressContext';
import tracks from '../data/tracks';
import { colors, spacing, radius, shadows } from '../theme';

const LEVEL_ORDER = ['beginner', 'intermediate', 'expert'];
const LEVEL_LABELS = { beginner: 'Beginner', intermediate: 'Intermediate', expert: 'Expert' };
const LEVEL_COLORS = { beginner: '#00C896', intermediate: '#F59E0B', expert: '#EF4444' };

const CATEGORIES = [
  'All', 'Core Knowledge', 'Finance', 'Engineering', 'Marketing', 'Governance', 'Creative', 'Business',
  'Infrastructure', 'Web3 Concepts', 'Cryptography', 'Advanced Knowledge', 'Advanced Protocol',
];

function TrackCard({ track, onPress, userLevel }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  const unlockedCount = LEVEL_ORDER.filter(l => {
    if (!userLevel) return l === 'beginner';
    const idx = LEVEL_ORDER.indexOf(userLevel);
    return LEVEL_ORDER.indexOf(l) <= idx;
  }).length;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[styles.card, shadows.sm]}
      >
        {/* Gradient left strip */}
        <LinearGradient
          colors={track.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.cardStrip}
        />

        <View style={styles.cardBody}>
          {/* Top row */}
          <View style={styles.cardTop}>
            <View style={[styles.emojiBox, { backgroundColor: track.color + '18' }]}>
              <Text style={styles.cardEmoji}>{track.emoji}</Text>
            </View>
            <View style={styles.cardMeta}>
              <Text style={styles.cardTitle} numberOfLines={1}>{track.title}</Text>
              <View style={[styles.categoryPill, { backgroundColor: track.color + '18' }]}>
                <Text style={[styles.categoryText, { color: track.color }]}>{track.category}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.cardDesc} numberOfLines={2}>{track.description}</Text>

          {/* Level badges */}
          <View style={styles.levelRow}>
            {LEVEL_ORDER.map((level, i) => {
              const isUnlocked = i < unlockedCount;
              return (
                <View
                  key={level}
                  style={[
                    styles.levelBadge,
                    { backgroundColor: isUnlocked ? LEVEL_COLORS[level] + '22' : '#F5F5F5' },
                  ]}
                >
                  <Text style={[
                    styles.levelText,
                    { color: isUnlocked ? LEVEL_COLORS[level] : colors.textMuted },
                  ]}>
                    {isUnlocked ? '' : '🔒 '}{LEVEL_LABELS[level]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Arrow */}
        <Text style={[styles.arrow, { color: track.color }]}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function TracksScreen({ navigation }) {
  const { userLevel } = useProgress();
  const [activeCategory, setActiveCategory] = useState('All');
  const headerY = useRef(new Animated.Value(-20)).current;
  const headerO = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerO, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerY, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const filtered = activeCategory === 'All'
    ? tracks
    : tracks.filter(t => t.category === activeCategory);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerO, transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Skill Tracks</Text>
          <Text style={styles.headerSub}>{tracks.length} tracks · 3 levels each</Text>
        </View>
        <View style={{ width: 40 }} />
      </Animated.View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[styles.filterChip, activeCategory === cat && styles.filterChipOn]}
            activeOpacity={0.75}
          >
            <Text style={[styles.filterText, activeCategory === cat && styles.filterTextOn]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Level key */}
        <View style={styles.levelKey}>
          {LEVEL_ORDER.map(l => (
            <View key={l} style={styles.keyItem}>
              <View style={[styles.keyDot, { backgroundColor: LEVEL_COLORS[l] }]} />
              <Text style={styles.keyText}>{LEVEL_LABELS[l]}</Text>
            </View>
          ))}
        </View>

        {filtered.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            userLevel={userLevel}
            onPress={() => navigation.navigate('TrackDetail', { trackId: track.id })}
          />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    ...shadows.xs,
  },
  backIcon: { fontSize: 26, color: colors.primary, marginTop: -2 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.3 },
  headerSub: { fontSize: 12, color: colors.textMuted, marginTop: 1 },

  // Filter
  filterScroll: { maxHeight: 48 },
  filterContent: { paddingHorizontal: spacing.md, gap: 8, paddingVertical: 6 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
  },
  filterChipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  filterTextOn: { color: '#fff' },

  // Level key
  levelKey: {
    flexDirection: 'row', gap: 16,
    marginBottom: spacing.md,
    paddingHorizontal: 2,
  },
  keyItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  keyDot: { width: 8, height: 8, borderRadius: 4 },
  keyText: { fontSize: 11, color: colors.textMuted, fontWeight: '500' },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  cardStrip: { width: 5, alignSelf: 'stretch' },
  cardBody: { flex: 1, padding: spacing.md, gap: 8 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  emojiBox: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  cardEmoji: { fontSize: 24 },
  cardMeta: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: radius.full,
  },
  categoryText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
  cardDesc: { fontSize: 12, color: colors.textSecondary, lineHeight: 17 },
  levelRow: { flexDirection: 'row', gap: 6 },
  levelBadge: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: radius.full,
  },
  levelText: { fontSize: 10, fontWeight: '600' },
  arrow: { fontSize: 28, fontWeight: '300', paddingRight: 14, paddingLeft: 4 },
});
