import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme';
import { getMidnightCountdown } from '../utils/dailyChallengeUtils';

export default function DailyChallengeCard({ completed, onPress }) {
  const [countdown, setCountdown] = useState(getMidnightCountdown());
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getMidnightCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!completed) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 1500, useNativeDriver: false }),
          Animated.timing(glowAnim, { toValue: 0, duration: 1500, useNativeDriver: false }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [completed]);

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,214,10,0.2)', 'rgba(255,214,10,0.6)'],
  });

  return (
    <TouchableOpacity onPress={!completed ? onPress : undefined} activeOpacity={0.8} style={{ marginBottom: spacing.lg }}>
      <Animated.View style={[styles.card, { borderColor: completed ? 'rgba(255,214,10,0.15)' : borderColor }]}>
        <View style={styles.top}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>⚡</Text>
          </View>
          <View style={styles.badgeWrap}>
            {!completed && <View style={styles.liveDot} />}
            <View style={styles.xpBadge}>
              <Text style={styles.xpBadgeText}>2× XP</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.title, completed && { opacity: 0.5 }]}>Daily Challenge</Text>
        <Text style={styles.sub}>
          {completed ? '✅ Completed — come back tomorrow' : '5 questions across all modules'}
        </Text>
        {completed ? (
          <Text style={styles.countdown}>Resets in {countdown}</Text>
        ) : (
          <View style={styles.startRow}>
            <Text style={styles.startText}>Start now</Text>
            <Text style={styles.startArrow}>→</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,214,10,0.05)',
    borderWidth: 1.5,
    borderRadius: radius.xl,
    padding: spacing.md,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  iconWrap: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: 'rgba(255,214,10,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: 22 },
  badgeWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.success },
  xpBadge: { backgroundColor: colors.xpGold, borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 3 },
  xpBadgeText: { color: '#000', fontWeight: '800', fontSize: 11 },
  title: { fontSize: 18, fontWeight: '800', color: colors.xpGold, marginBottom: 3, letterSpacing: -0.2 },
  sub: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.md },
  countdown: { fontSize: 12, color: colors.textMuted },
  startRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  startText: { fontSize: 14, fontWeight: '700', color: colors.xpGold },
  startArrow: { fontSize: 14, color: colors.xpGold },
});
