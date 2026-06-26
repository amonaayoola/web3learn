import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from '../context/ProgressContext';
import { colors, spacing, radius, shadows } from '../theme';

const { width } = Dimensions.get('window');

const LEVELS = [
  {
    id: 'beginner',
    emoji: '🌱',
    title: 'Beginner',
    subtitle: 'New to Web3',
    description: 'Start from the ground up. Learn blockchain fundamentals before moving to advanced topics.',
    unlocks: 'Unlocks: Module 1 — then progress sequentially',
    color: colors.teal,
    glow: 'rgba(0,180,160,0.12)',
    modules: ['Blockchain Basics'],
    tag: 'RECOMMENDED',
  },
  {
    id: 'intermediate',
    emoji: '⚡',
    title: 'Intermediate',
    subtitle: 'Know the basics',
    description: 'You understand how blockchains work. Jump into DeFi, NFTs and smart contracts.',
    unlocks: 'Unlocks: Modules 1–3 immediately',
    color: colors.amber,
    glow: 'rgba(255,149,0,0.12)',
    modules: ['Blockchain Basics', 'Crypto Wallets', 'DeFi Fundamentals'],
    tag: null,
  },
  {
    id: 'expert',
    emoji: '🔥',
    title: 'Expert',
    subtitle: 'Deep in Web3',
    description: 'Already familiar with DeFi and NFTs? Fast-track to DAOs, Layer 2 and advanced topics.',
    unlocks: 'Unlocks: All 6 modules immediately',
    color: colors.coral,
    glow: 'rgba(255,59,92,0.12)',
    modules: ['All 6 modules'],
    tag: null,
  },
];

export default function OnboardingScreen({ navigation }) {
  const { setLevel } = useProgress();
  const [selected, setSelected] = useState('beginner');
  const [confirming, setConfirming] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleConfirm = async () => {
    if (confirming) return;
    setConfirming(true);
    await setLevel(selected);
    navigation.replace('Home');
  };

  const selectedLevel = LEVELS.find(l => l.id === selected);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Hero */}
        <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.iconCard}>
            <Text style={styles.heroEmoji}>⛓️</Text>
          </View>
          <Text style={styles.heroTitle}>What's your Web3 level?</Text>
          <Text style={styles.heroSub}>
            Your starting point unlocks the right modules so you're never bored or overwhelmed.
          </Text>
        </Animated.View>

        {/* Level Cards */}
        <View style={styles.cards}>
          {LEVELS.map((level, i) => {
            const isSelected = selected === level.id;
            return (
              <Animated.View
                key={level.id}
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: Animated.add(slideAnim, new Animated.Value(i * 12)) }],
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.card,
                    isSelected && { borderColor: level.color, borderWidth: 2, backgroundColor: level.glow },
                    !isSelected && styles.cardUnselected,
                  ]}
                  onPress={() => setSelected(level.id)}
                  activeOpacity={0.8}
                >
                  {/* Tag */}
                  {level.tag && (
                    <View style={[styles.tag, { backgroundColor: level.color }]}>
                      <Text style={styles.tagText}>{level.tag}</Text>
                    </View>
                  )}

                  <View style={styles.cardTop}>
                    {/* Icon */}
                    <View style={[styles.emojiCircle, { backgroundColor: isSelected ? level.color + '25' : colors.background }]}>
                      <Text style={styles.emojiText}>{level.emoji}</Text>
                    </View>

                    {/* Title + subtitle */}
                    <View style={styles.cardMeta}>
                      <Text style={[styles.cardTitle, isSelected && { color: level.color }]}>
                        {level.title}
                      </Text>
                      <Text style={styles.cardSubtitle}>{level.subtitle}</Text>
                    </View>

                    {/* Radio */}
                    <View style={[
                      styles.radio,
                      isSelected && { borderColor: level.color, backgroundColor: level.color },
                    ]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </View>

                  <Text style={styles.cardDesc}>{level.description}</Text>

                  <View style={[styles.unlockRow, { backgroundColor: isSelected ? level.color + '15' : colors.background }]}>
                    <Text style={[styles.unlockText, isSelected && { color: level.color }]}>
                      {level.unlocks}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* CTA */}
        <TouchableOpacity
          onPress={handleConfirm}
          activeOpacity={0.85}
          disabled={confirming}
          style={confirming && { opacity: 0.7 }}
        >
          <LinearGradient
            colors={['#7C3AED', '#06B6D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaBtn}
          >
            <Text style={styles.ctaBtnText}>
              {confirming ? 'Starting…' : `Start as ${selectedLevel.title} →`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerNote}>You can always revisit settings to change your level.</Text>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingTop: spacing.lg },

  hero: { alignItems: 'center', marginBottom: spacing.xl, paddingHorizontal: spacing.sm },
  iconCard: {
    width: 72, height: 72, borderRadius: radius.xl,
    backgroundColor: colors.primary + '12',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  heroEmoji: { fontSize: 34 },
  heroTitle: {
    fontSize: 26, fontWeight: '700', color: colors.textPrimary,
    textAlign: 'center', letterSpacing: -0.3, marginBottom: spacing.sm,
  },
  heroSub: {
    fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22,
  },

  cards: { gap: spacing.md, marginBottom: spacing.xl },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.sm,
    overflow: 'hidden',
  },
  cardUnselected: {},

  tag: {
    position: 'absolute', top: 12, right: 12,
    borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3,
  },
  tagText: { fontSize: 9, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },

  cardTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  emojiCircle: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
  },
  emojiText: { fontSize: 24 },
  cardMeta: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  cardSubtitle: { fontSize: 13, color: colors.textSecondary },

  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },

  cardDesc: {
    fontSize: 14, color: colors.textSecondary, lineHeight: 20,
    marginBottom: spacing.sm,
  },

  unlockRow: {
    borderRadius: radius.md, paddingHorizontal: spacing.sm, paddingVertical: 6,
  },
  unlockText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },

  ctaBtn: {
    borderRadius: radius.full,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  ctaBtnText: { color: '#fff', fontWeight: '700', fontSize: 17 },

  footerNote: {
    textAlign: 'center', fontSize: 12, color: colors.textMuted,
  },
});
