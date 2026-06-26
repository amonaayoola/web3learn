import { Platform } from 'react-native';

export const colors = {
  // Base — light surface, violet-tinted (matches MAIDEN brand without a full dark redesign)
  background: '#F5F3FF',
  backgroundRaised: '#EDE9FE',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: 'rgba(124,58,237,0.10)',
  borderLight: 'rgba(124,58,237,0.05)',

  // Violet brand palette
  primary: '#7C3AED',
  primaryDark: '#6D28D9',
  primaryDeep: '#5B21B6',
  primaryLight: '#A855F7',
  primaryGlow: 'rgba(124,58,237,0.2)',
  primaryUltraLight: 'rgba(124,58,237,0.08)',

  // Hero gradients (used with LinearGradient) — violet → cyan, the MAIDEN gradient
  heroGradient: ['#7C3AED', '#06B6D4'],
  heroGradientDeep: ['#5B21B6', '#7C3AED', '#A855F7'],
  blueGradientCard: ['#7C3AED', '#A855F7'],

  // Module accents
  teal: '#06B6D4',
  tealGlow: 'rgba(6,182,212,0.15)',
  coral: '#FF3B5C',
  coralGlow: 'rgba(255,59,92,0.12)',
  amber: '#F59E0B',
  amberGlow: 'rgba(245,158,11,0.15)',
  purple: '#A855F7',
  purpleGlow: 'rgba(168,85,247,0.15)',
  cyan: '#06B6D4',
  cyanGlow: 'rgba(6,182,212,0.15)',
  pink: '#FF2D55',
  pinkGlow: 'rgba(255,45,85,0.12)',

  // Gamification
  xpGold: '#F59E0B',
  xpGlow: 'rgba(245,158,11,0.15)',
  mp: '#06B6D4',
  mpGlow: 'rgba(6,182,212,0.15)',
  hearts: '#EF4444',
  streak: '#F59E0B',
  streakGlow: 'rgba(245,158,11,0.15)',
  freeze: '#06B6D4',

  // Semantic
  success: '#10B981',
  successBg: 'rgba(16,185,129,0.10)',
  successBorder: 'rgba(16,185,129,0.25)',
  error: '#EF4444',
  errorBg: 'rgba(239,68,68,0.10)',
  errorBorder: 'rgba(239,68,68,0.25)',
  warning: '#F59E0B',

  // Text
  textPrimary: '#1D1D1F',
  textSecondary: '#6E6E73',
  textMuted: '#86868B',
  textInverse: '#FFFFFF',
  textOnBlue: 'rgba(255,255,255,0.85)',
};

export const moduleColors = [
  { color: colors.teal,   glow: colors.tealGlow,   gradient: ['#06B6D4', '#22D3EE'] },
  { color: colors.coral,  glow: colors.coralGlow,  gradient: ['#FF3B5C', '#FF6B80'] },
  { color: colors.amber,  glow: colors.amberGlow,  gradient: ['#F59E0B', '#FBBF24'] },
  { color: colors.purple, glow: colors.purpleGlow, gradient: ['#A855F7', '#C87FE8'] },
  { color: colors.cyan,   glow: colors.cyanGlow,   gradient: ['#06B6D4', '#5BC8F5'] },
  { color: colors.pink,   glow: colors.pinkGlow,   gradient: ['#FF2D55', '#FF6080'] },
];

export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64,
};

export const radius = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 36, full: 9999,
};

export const shadows = {
  xs: {
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  sm: {
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 3,
  },
  md: {
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 22,
    elevation: 5,
  },
  lg: {
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 34,
    elevation: 10,
  },
  blue: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.40,
    shadowRadius: 20,
    elevation: 8,
  },
  colored: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  }),
};

// MAIDEN type system: Sora for headings/display, Outfit for body text.
// Falls back to system fonts until expo-font finishes loading these.
export const fonts = {
  heading: 'Sora_700Bold',
  headingExtraBold: 'Sora_800ExtraBold',
  headingSemiBold: 'Sora_600SemiBold',
  body: 'Outfit_400Regular',
  bodyMedium: 'Outfit_500Medium',
  bodySemiBold: 'Outfit_600SemiBold',
  bodyBold: 'Outfit_700Bold',
};

export const typography = {
  display: { fontSize: 34, fontFamily: fonts.headingExtraBold, letterSpacing: -0.5, color: colors.textPrimary },
  h1: { fontSize: 28, fontFamily: fonts.heading, letterSpacing: -0.3, color: colors.textPrimary },
  h2: { fontSize: 22, fontFamily: fonts.headingSemiBold, letterSpacing: -0.2, color: colors.textPrimary },
  h3: { fontSize: 18, fontFamily: fonts.headingSemiBold, color: colors.textPrimary },
  body: { fontSize: 17, fontFamily: fonts.body, lineHeight: 26, color: colors.textPrimary },
  bodySmall: { fontSize: 15, fontFamily: fonts.body, lineHeight: 22, color: colors.textSecondary },
  caption: { fontSize: 13, fontFamily: fonts.body, color: colors.textMuted },
  label: { fontSize: 12, fontFamily: fonts.bodySemiBold, letterSpacing: 0.5, color: colors.textMuted },
  mono: { fontSize: 13, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: colors.textSecondary },
};

export const animation = {
  fast: 200,
  normal: 300,
  slow: 500,
  spring: { tension: 65, friction: 10 },
};
