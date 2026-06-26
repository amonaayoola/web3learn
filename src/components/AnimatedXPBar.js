import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { getRank, getRankProgress, getNextRank } from '../utils/rankUtils';

export default function AnimatedXPBar({ xp, onBlue = false }) {
  const { progress, xpInRank, xpNeeded } = getRankProgress(xp);
  const rank = getRank(xp);
  const nextRank = getNextRank(xp);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: Math.max(0.02, progress),
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const barWidth = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const trackColor = onBlue ? 'rgba(255,255,255,0.20)' : colors.border;
  const fillColor = onBlue ? '#FFFFFF' : rank.color;
  const labelColor = onBlue ? 'rgba(255,255,255,0.75)' : colors.textMuted;

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View style={[styles.fill, { width: barWidth, backgroundColor: fillColor }]} />
      </View>
      {nextRank && (
        <Text style={[styles.label, { color: labelColor }]}>
          {xpInRank} / {xpNeeded} XP to {nextRank.name}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: 6 },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
  label: { fontSize: 11, textAlign: 'right' },
});
