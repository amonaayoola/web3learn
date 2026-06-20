import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { curriculum } from '../data/curriculum';
import { moduleColors, colors, spacing, radius } from '../theme';

export default function LevelCompleteScreen({ navigation, route }) {
  const { moduleId, lessonId, xpEarned, title, consecutiveLessons, moduleColor } = route.params;
  const moduleIndex = curriculum.findIndex(m => m.id === moduleId);
  const module = curriculum[moduleIndex];
  const mc = moduleColors[moduleIndex] || moduleColors[0];
  const accentColor = moduleColor || mc.color;

  const scaleAnim = useRef(new Animated.Value(0.4)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const xpAnim = useRef(new Animated.Value(0)).current;
  const ring1 = useRef(new Animated.Value(0.8)).current;
  const ring2 = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, tension: 70, friction: 7, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(ring1, { toValue: 1.3, tension: 40, friction: 8, useNativeDriver: true }),
        Animated.spring(ring2, { toValue: 1.6, tension: 30, friction: 10, useNativeDriver: true }),
      ]),
    ]).start();

    Animated.timing(xpAnim, { toValue: xpEarned, duration: 900, useNativeDriver: false }).start();
  }, []);

  const isHotStreak = consecutiveLessons >= 3;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        {/* Animated rings */}
        <View style={styles.ringsWrap}>
          <Animated.View style={[
            styles.ring,
            { borderColor: accentColor + '15', transform: [{ scale: ring2 }] },
          ]} />
          <Animated.View style={[
            styles.ring,
            { borderColor: accentColor + '30', transform: [{ scale: ring1 }] },
          ]} />
          <Animated.View style={[
            styles.badge,
            { backgroundColor: accentColor + '18', borderColor: accentColor + '50', transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}>
            <Text style={styles.badgeEmoji}>⭐</Text>
          </Animated.View>
        </View>

        {/* Text */}
        <Animated.View style={{ opacity: opacityAnim, alignItems: 'center' }}>
          <Text style={styles.title}>Lesson Complete!</Text>
          <Text style={styles.lessonName}>{title}</Text>

          {isHotStreak && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotText}>🔥 {consecutiveLessons} in a row!</Text>
            </View>
          )}
        </Animated.View>

        {/* XP card */}
        <View style={[styles.xpCard, { borderColor: colors.xpGold + '40' }]}>
          <Text style={styles.xpSign}>+</Text>
          <Animated.Text style={styles.xpValue}>
            {xpEarned}
          </Animated.Text>
          <Text style={styles.xpUnit}>XP</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.continueBtn, { backgroundColor: accentColor }]}
            onPress={() => navigation.navigate('Module', { moduleId })}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>Keep Learning</Text>
            <Text style={styles.continueBtnArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
          >
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.lg },
  ringsWrap: { width: 160, height: 160, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  ring: {
    position: 'absolute',
    width: 140, height: 140,
    borderRadius: 70,
    borderWidth: 2,
  },
  badge: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2,
  },
  badgeEmoji: { fontSize: 50 },
  title: { fontSize: 30, fontWeight: '900', color: colors.textPrimary, letterSpacing: -0.5, marginBottom: 6 },
  lessonName: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.sm },
  hotBadge: {
    backgroundColor: colors.streakGlow,
    borderWidth: 1, borderColor: colors.streak + '50',
    borderRadius: radius.full,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  hotText: { color: colors.streak, fontWeight: '700', fontSize: 14 },
  xpCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    gap: 4,
  },
  xpSign: { fontSize: 28, fontWeight: '900', color: colors.xpGold, opacity: 0.6 },
  xpValue: { fontSize: 56, fontWeight: '900', color: colors.xpGold, lineHeight: 60 },
  xpUnit: { fontSize: 20, fontWeight: '700', color: colors.xpGold, opacity: 0.7, alignSelf: 'flex-end', marginBottom: 8 },
  buttons: { width: '100%', gap: spacing.sm },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: radius.full,
    paddingVertical: 16,
    gap: spacing.sm,
  },
  continueBtnText: { color: '#fff', fontWeight: '800', fontSize: 17 },
  continueBtnArrow: { color: '#fff', fontSize: 18 },
  homeBtn: { paddingVertical: 14, alignItems: 'center' },
  homeBtnText: { color: colors.textMuted, fontSize: 15 },
});
