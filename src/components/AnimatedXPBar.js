import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { getRank, getRankProgress, getNextRank } from '../utils/rankUtils';

export default function AnimatedXPBar({ xp }) {
  const { progress, xpInRank, xpNeeded } = getRankProgress(xp);
  const rank = getRank(xp);
  const nextRank = getNextRank(xp);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: Math.max(0.02, progress),
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const barWidth = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: barWidth }]}>
          <View style={[styles.fillInner, { backgroundColor: rank.color }]} />
          <View style={[styles.fillGlow, { backgroundColor: rank.color }]} />
        </Animated.View>
      </View>
      {nextRank && (
        <Text style={styles.label}>
          {xpInRank} / {xpNeeded} XP → {nextRank.name}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: 6 },
  track: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: { height: '100%', position: 'relative' },
  fillInner: { position: 'absolute', inset: 0, borderRadius: 4 },
  fillGlow: {
    position: 'absolute', inset: 0, borderRadius: 4,
    opacity: 0.4,
    transform: [{ scaleY: 2 }],
  },
  label: { fontSize: 11, color: colors.textMuted, textAlign: 'right' },
});
