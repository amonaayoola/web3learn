import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Clipboard, Animated, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import { colors, spacing, radius, moduleColors } from '../theme';

const WALLET_KEY = '@web3learn_wallet_address';

const NFT_BADGES = curriculum.map((module, i) => ({
  id: module.id,
  emoji: module.emoji,
  title: module.title.split(' ').slice(0, 3).join(' '),
  color: moduleColors[i].color,
  glow: moduleColors[i].glow,
  tokenId: `#${1000 + i}`,
}));

async function getOrCreateWallet() {
  const existing = await AsyncStorage.getItem(WALLET_KEY);
  if (existing) return existing;
  const bytes = await Crypto.getRandomBytesAsync(20);
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const address = '0x' + hex;
  await AsyncStorage.setItem(WALLET_KEY, address);
  return address;
}

function shortAddress(addr) {
  if (!addr) return '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export default function WalletScreen({ navigation }) {
  const { xp, completedQuizzes = {} } = useProgress();
  const [address, setAddress] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    getOrCreateWallet().then(setAddress);
  }, []);

  const totalEarned = Object.keys(completedQuizzes).length;
  const isModuleDone = (moduleId) => !!completedQuizzes[moduleId];

  const handleCopy = () => {
    Clipboard.setString(address);
    setCopied(true);
    Animated.sequence([
      Animated.timing(copyAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(copyAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start(() => setCopied(false));
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Web3 Wallet</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet card */}
        <View style={styles.walletCard}>
          <View style={styles.walletCardTop}>
            <View style={styles.walletIconWrap}>
              <Text style={styles.walletIcon}>👛</Text>
            </View>
            <View>
              <Text style={styles.walletLabel}>LEARNING WALLET</Text>
              <Text style={styles.walletNetwork}>Testnet · Ethereum</Text>
            </View>
            <View style={styles.connectedBadge}>
              <View style={styles.connectedDot} />
              <Text style={styles.connectedText}>Active</Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <Text style={styles.addressText}>
              {address ? shortAddress(address) : '···'}
            </Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy} activeOpacity={0.7}>
              <Text style={styles.copyBtnText}>{copied ? '✓ Copied' : 'Copy'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressFull}>
            <Text style={styles.addressFullText} numberOfLines={1} ellipsizeMode="middle">
              {address || 'Generating...'}
            </Text>
          </View>

          <View style={styles.walletStats}>
            <View style={styles.walletStat}>
              <Text style={styles.walletStatNum}>{totalEarned}</Text>
              <Text style={styles.walletStatLabel}>NFTs Earned</Text>
            </View>
            <View style={styles.walletStatDivider} />
            <View style={styles.walletStat}>
              <Text style={styles.walletStatNum}>{xp}</Text>
              <Text style={styles.walletStatLabel}>XP on record</Text>
            </View>
            <View style={styles.walletStatDivider} />
            <View style={styles.walletStat}>
              <Text style={styles.walletStatNum}>{curriculum.length - totalEarned}</Text>
              <Text style={styles.walletStatLabel}>Left to mint</Text>
            </View>
          </View>
        </View>

        {/* Info strip */}
        <View style={styles.infoStrip}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Complete all lessons and the quiz in each module to earn its NFT badge. These are currently simulated — real minting on testnet is coming in the next update.
          </Text>
        </View>

        {/* NFT Badges */}
        <Text style={styles.sectionTitle}>ACHIEVEMENT BADGES</Text>

        <View style={styles.badgesGrid}>
          {NFT_BADGES.map((badge) => {
            const earned = isModuleDone(badge.id);
            return (
              <View
                key={badge.id}
                style={[
                  styles.nftCard,
                  earned
                    ? { borderColor: badge.color + '50', backgroundColor: badge.color + '0D' }
                    : styles.nftCardLocked,
                ]}
              >
                {/* Glow overlay for earned */}
                {earned && (
                  <View style={[styles.nftGlow, { backgroundColor: badge.color + '1A' }]} />
                )}

                <View style={[
                  styles.nftEmojiWrap,
                  earned
                    ? { backgroundColor: badge.color + '25', borderColor: badge.color + '60' }
                    : { backgroundColor: colors.border + '60', borderColor: 'transparent' },
                ]}>
                  <Text style={[styles.nftEmoji, !earned && { opacity: 0.4 }]}>{badge.emoji}</Text>
                  {earned && (
                    <View style={[styles.earnedCheck, { backgroundColor: badge.color }]}>
                      <Text style={styles.earnedCheckText}>✓</Text>
                    </View>
                  )}
                </View>

                <Text style={[styles.nftTitle, !earned && styles.nftTitleLocked]} numberOfLines={2}>
                  {badge.title}
                </Text>
                <Text style={[styles.nftTokenId, earned ? { color: badge.color } : {}]}>
                  {earned ? badge.tokenId : '🔒 Locked'}
                </Text>

                {earned && (
                  <View style={[styles.nftMintedBadge, { backgroundColor: badge.color + '25', borderColor: badge.color + '50' }]}>
                    <Text style={[styles.nftMintedText, { color: badge.color }]}>EARNED</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Connect real wallet CTA */}
        <View style={styles.connectCard}>
          <Text style={styles.connectEmoji}>🔗</Text>
          <View style={styles.connectBody}>
            <Text style={styles.connectTitle}>Connect a Real Wallet</Text>
            <Text style={styles.connectSub}>
              WalletConnect support coming soon — link MetaMask, Coinbase Wallet, or any WC-compatible wallet to claim achievements on-chain.
            </Text>
          </View>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: { padding: spacing.xs },
  backArrow: { fontSize: 22, color: colors.textSecondary },
  headerTitle: { fontSize: 17, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.2 },

  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.lg },

  walletCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    padding: spacing.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  walletCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  walletIconWrap: {
    width: 42, height: 42, borderRadius: radius.md,
    backgroundColor: colors.primaryGlow,
    alignItems: 'center', justifyContent: 'center',
  },
  walletIcon: { fontSize: 22 },
  walletLabel: {
    fontSize: 10, fontWeight: '800', letterSpacing: 2,
    color: colors.primary, marginBottom: 2,
  },
  walletNetwork: { fontSize: 12, color: colors.textMuted },
  connectedBadge: {
    marginLeft: 'auto',
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.successBg,
    borderWidth: 1, borderColor: colors.successBorder,
    borderRadius: radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  connectedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  connectedText: { fontSize: 11, fontWeight: '600', color: colors.success },

  addressRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 6,
  },
  addressText: { fontSize: 22, fontWeight: '900', color: colors.textPrimary, letterSpacing: 1 },
  copyBtn: {
    backgroundColor: colors.primaryGlow,
    borderRadius: radius.full,
    paddingHorizontal: 12, paddingVertical: 5,
    borderWidth: 1, borderColor: colors.primary + '50',
  },
  copyBtnText: { fontSize: 12, fontWeight: '700', color: colors.primary },

  addressFull: {
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm, paddingVertical: 7,
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  addressFullText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 11, color: colors.textMuted,
  },

  walletStats: {
    flexDirection: 'row',
    borderTopWidth: 1, borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  walletStat: { flex: 1, alignItems: 'center' },
  walletStatDivider: { width: 1, backgroundColor: colors.border },
  walletStatNum: { fontSize: 20, fontWeight: '900', color: colors.textPrimary, marginBottom: 2 },
  walletStatLabel: { fontSize: 10, color: colors.textMuted, fontWeight: '600' },

  infoStrip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: 'rgba(108,71,255,0.06)',
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.primary + '25',
    padding: spacing.sm,
    marginBottom: spacing.lg,
  },
  infoIcon: { fontSize: 14 },
  infoText: { flex: 1, fontSize: 12, color: colors.textSecondary, lineHeight: 18 },

  sectionTitle: {
    fontSize: 10, fontWeight: '800', letterSpacing: 2,
    color: colors.textMuted, marginBottom: spacing.md,
  },

  badgesGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  nftCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  nftCardLocked: {
    borderColor: colors.border,
    opacity: 0.55,
  },
  nftGlow: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 50,
  },
  nftEmojiWrap: {
    width: 56, height: 56,
    borderRadius: radius.lg,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5,
    marginBottom: spacing.sm,
    position: 'relative',
  },
  nftEmoji: { fontSize: 28 },
  earnedCheck: {
    position: 'absolute', bottom: -4, right: -4,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  earnedCheckText: { fontSize: 10, color: '#fff', fontWeight: '900' },
  nftTitle: {
    fontSize: 13, fontWeight: '700', color: colors.textPrimary,
    textAlign: 'center', marginBottom: 4, lineHeight: 18,
  },
  nftTitleLocked: { color: colors.textMuted },
  nftTokenId: {
    fontSize: 11, fontWeight: '600', color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  nftMintedBadge: {
    borderRadius: radius.full, borderWidth: 1,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  nftMintedText: { fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },

  connectCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
  },
  connectEmoji: { fontSize: 28, marginTop: 2 },
  connectBody: { flex: 1 },
  connectTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  connectSub: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
});
