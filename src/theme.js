import { Platform } from 'react-native';

export const colors = {
  // Base
  background: '#0A0B14',
  surface: '#12141F',
  surfaceElevated: '#1A1D2E',
  surfaceHover: '#1F2235',
  border: '#252840',
  borderLight: '#2E3250',

  // Brand
  primary: '#6C47FF',
  primaryLight: '#8B6AFF',
  primaryDark: '#4E2EE0',
  primaryGlow: 'rgba(108,71,255,0.25)',

  // Module accent colors
  teal: '#00D9B8',
  tealGlow: 'rgba(0,217,184,0.2)',
  coral: '#FF5C8A',
  coralGlow: 'rgba(255,92,138,0.2)',
  amber: '#FF9F43',
  amberGlow: 'rgba(255,159,67,0.2)',
  purple: '#A855F7',
  purpleGlow: 'rgba(168,85,247,0.2)',
  cyan: '#06B6D4',
  cyanGlow: 'rgba(6,182,212,0.2)',
  pink: '#EC4899',
  pinkGlow: 'rgba(236,72,153,0.2)',

  // Gamification
  xpGold: '#FFD60A',
  xpGlow: 'rgba(255,214,10,0.2)',
  hearts: '#FF4D6D',
  heartsGlow: 'rgba(255,77,109,0.2)',
  streak: '#FF6B00',
  streakGlow: 'rgba(255,107,0,0.2)',
  freeze: '#38BDF8',

  // Semantic
  success: '#22D46B',
  successBg: 'rgba(34,212,107,0.12)',
  successBorder: 'rgba(34,212,107,0.3)',
  error: '#FF4757',
  errorBg: 'rgba(255,71,87,0.12)',
  errorBorder: 'rgba(255,71,87,0.3)',
  warning: '#FFD60A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9095B0',
  textMuted: '#555878',
  textInverse: '#0A0B14',
};

export const moduleColors = [
  { color: colors.teal, glow: colors.tealGlow },
  { color: colors.coral, glow: colors.coralGlow },
  { color: colors.amber, glow: colors.amberGlow },
  { color: colors.purple, glow: colors.purpleGlow },
  { color: colors.cyan, glow: colors.cyanGlow },
  { color: colors.pink, glow: colors.pinkGlow },
];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  glow: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  }),
};

export const typography = {
  display: { fontSize: 34, fontWeight: '900', letterSpacing: -0.5, color: colors.textPrimary },
  h1: { fontSize: 28, fontWeight: '800', letterSpacing: -0.3, color: colors.textPrimary },
  h2: { fontSize: 22, fontWeight: '700', letterSpacing: -0.2, color: colors.textPrimary },
  h3: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24, color: colors.textPrimary },
  bodyMedium: { fontSize: 16, fontWeight: '500', color: colors.textPrimary },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20, color: colors.textSecondary },
  caption: { fontSize: 12, fontWeight: '500', color: colors.textMuted },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, color: colors.textMuted },
  mono: { fontSize: 13, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: colors.textSecondary },
};
