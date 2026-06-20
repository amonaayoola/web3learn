import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function StreakDisplay({ streak, freezeAvailable }) {
  return (
    <View style={styles.container}>
      <Text style={styles.fire}>🔥</Text>
      <Text style={styles.count}>{streak}</Text>
      {freezeAvailable && <Text style={styles.freeze}>🧊</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,107,0,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,107,0,0.25)',
  },
  fire: { fontSize: 16 },
  count: { color: colors.streak, fontWeight: '800', fontSize: 15 },
  freeze: { fontSize: 13 },
});
