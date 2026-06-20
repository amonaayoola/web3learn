import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRank } from '../utils/rankUtils';
import { radius } from '../theme';

export default function RankBadge({ xp, size = 'normal' }) {
  const rank = getRank(xp);
  const s = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';

  return (
    <View style={[
      styles.badge,
      { borderColor: rank.color + '50', backgroundColor: rank.color + '15' },
      sizes[s].badge,
    ]}>
      <Text style={sizes[s].emoji}>{rank.emoji}</Text>
      <Text style={[styles.name, { color: rank.color }, sizes[s].name]}>{rank.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.full,
    gap: 5,
  },
  name: { fontWeight: '700' },
});

const sizes = {
  sm: {
    badge: { paddingHorizontal: 8, paddingVertical: 3 },
    emoji: { fontSize: 12 },
    name: { fontSize: 11 },
  },
  md: {
    badge: { paddingHorizontal: 10, paddingVertical: 5 },
    emoji: { fontSize: 14 },
    name: { fontSize: 13 },
  },
  lg: {
    badge: { paddingHorizontal: 16, paddingVertical: 8 },
    emoji: { fontSize: 20 },
    name: { fontSize: 16 },
  },
};
