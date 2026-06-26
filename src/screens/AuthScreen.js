import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Animated, Dimensions, Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, radius, shadows, fonts } from '../theme';

const { height: H, width: W } = Dimensions.get('window');

// ─── Floating symbol that bobs up and down ────────────────────────────────
function FloatSymbol({ symbol, top, left, right, bottom, size = 22, delay = 0, range = 14, duration = 2800, opacity = 0.55 }) {
  const y = useRef(new Animated.Value(0)).current;
  const o = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in first
    Animated.timing(o, { toValue: opacity, duration: 600, delay, useNativeDriver: true }).start();
    // Then loop float
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: -range, duration, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration, useNativeDriver: true }),
      ])
    );
    const t = setTimeout(() => loop.start(), delay);
    return () => { clearTimeout(t); loop.stop(); };
  }, []);

  return (
    <Animated.Text style={[
      styles.floatSymbol,
      { fontSize: size, opacity: o, transform: [{ translateY: y }] },
      top !== undefined && { top },
      left !== undefined && { left },
      right !== undefined && { right },
      bottom !== undefined && { bottom },
    ]}>
      {symbol}
    </Animated.Text>
  );
}

// ─── Glowing orb ──────────────────────────────────────────────────────────
function GlowOrb({ color, size, top, left, right, bottom, delay = 0 }) {
  const scale = useRef(new Animated.Value(0.85)).current;
  const o = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(o, { toValue: 1, duration: 800, delay, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.12, duration: 3200, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.85, duration: 3200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[
      {
        position: 'absolute',
        width: size, height: size, borderRadius: size / 2,
        backgroundColor: color,
        opacity: o,
        transform: [{ scale }],
      },
      top !== undefined && { top },
      left !== undefined && { left },
      right !== undefined && { right },
      bottom !== undefined && { bottom },
    ]} />
  );
}

// ─── Blockchain node network (static decorative) ──────────────────────────
function NodeNetwork() {
  const nodes = [
    { x: W * 0.10, y: H * 0.12 },
    { x: W * 0.35, y: H * 0.06 },
    { x: W * 0.78, y: H * 0.10 },
    { x: W * 0.88, y: H * 0.28 },
    { x: W * 0.05, y: H * 0.30 },
    { x: W * 0.60, y: H * 0.22 },
    { x: W * 0.20, y: H * 0.82 },
    { x: W * 0.75, y: H * 0.78 },
    { x: W * 0.92, y: H * 0.88 },
    { x: W * 0.08, y: H * 0.70 },
  ];
  // Edges between some nodes
  const edges = [[0,1],[1,2],[2,3],[0,4],[1,5],[2,5],[5,3],[6,9],[7,8],[6,7]];
  const o = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(o, { toValue: 1, duration: 1200, delay: 300, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: o }]}>
      {/* Edges */}
      {edges.map(([a, b], i) => {
        const ax = nodes[a].x, ay = nodes[a].y;
        const bx = nodes[b].x, by = nodes[b].y;
        const dx = bx - ax, dy = by - ay;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        return (
          <View key={`e${i}`} style={{
            position: 'absolute',
            left: ax, top: ay,
            width: len, height: 1,
            backgroundColor: 'rgba(150,200,255,0.18)',
            transformOrigin: '0 50%',
            transform: [{ rotate: `${angle}deg` }],
          }} />
        );
      })}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <View key={`n${i}`} style={{
          position: 'absolute',
          left: n.x - 4, top: n.y - 4,
          width: 8, height: 8, borderRadius: 4,
          backgroundColor: 'rgba(180,220,255,0.40)',
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.30)',
        }} />
      ))}
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function AuthScreen({ navigation }) {
  const { signIn, signUp, continueAsGuest, loading } = useAuth();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const cardScale = useRef(new Animated.Value(0.92)).current;
  const cardO = useRef(new Animated.Value(0)).current;
  const logoO = useRef(new Animated.Value(0)).current;
  const logoY = useRef(new Animated.Value(-18)).current;
  const tabAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoO, { toValue: 1, duration: 550, delay: 200, useNativeDriver: true }),
      Animated.timing(logoY, { toValue: 0, duration: 550, delay: 200, useNativeDriver: true }),
      Animated.timing(cardO, { toValue: 1, duration: 550, delay: 350, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, tension: 60, friction: 10, delay: 350, useNativeDriver: true }),
    ]).start();
  }, []);

  const switchTab = (t) => {
    setTab(t); setError('');
    Animated.spring(tabAnim, { toValue: t === 'signin' ? 0 : 1, tension: 80, friction: 14, useNativeDriver: false }).start();
  };

  const underlineLeft = tabAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '50%'] });

  const handleSubmit = async () => {
    setError('');
    if (!email.trim() || !password) { setError('Please fill in all fields.'); return; }
    try {
      tab === 'signin' ? await signIn(email, password) : await signUp(email, password);
      navigation.replace('Onboarding');
    } catch (e) {
      setError(e.message?.replace('AuthApiError: ', '') || 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      {/* ── BACKGROUND ── */}
      {/* MAIDEN gradient: deep violet → purple → cyan */}
      <LinearGradient
        colors={['#0D0D1A', '#3B1A78', '#7C3AED', '#06B6D4']}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Orbs: gold, cyan, violet */}
      <GlowOrb color="rgba(245,158,11,0.35)"   size={280} top={-80}      right={-100} delay={0} />
      <GlowOrb color="rgba(6,182,212,0.35)"    size={220} bottom={H*0.28} left={-80}  delay={200} />
      <GlowOrb color="rgba(124,58,237,0.35)"   size={180} top={H*0.32}   right={-50}  delay={400} />
      <GlowOrb color="rgba(245,158,11,0.20)"   size={130} bottom={-50}   right={40}   delay={100} />
      <GlowOrb color="rgba(6,182,212,0.18)"    size={100} top={H*0.58}   left={10}    delay={600} />

      {/* Blockchain node network */}
      <NodeNetwork />

      {/* Floating Web3 symbols */}
      <FloatSymbol symbol="◆"  top={H*0.04}  left={W*0.06}  size={28} opacity={0.70} delay={0}    duration={3200} range={12} />
      <FloatSymbol symbol="₿"  top={H*0.08}  right={W*0.08} size={26} opacity={0.65} delay={400}  duration={2900} range={16} />
      <FloatSymbol symbol="⬡"  top={H*0.20}  left={W*0.04}  size={22} opacity={0.50} delay={200}  duration={3600} range={10} />
      <FloatSymbol symbol="✦"  top={H*0.14}  right={W*0.18} size={18} opacity={0.60} delay={700}  duration={2500} range={14} />
      <FloatSymbol symbol="∞"  top={H*0.28}  right={W*0.05} size={24} opacity={0.45} delay={300}  duration={3100} range={12} />
      <FloatSymbol symbol="⚡" bottom={H*0.30} left={W*0.05}  size={22} opacity={0.60} delay={500}  duration={2800} range={18} />
      <FloatSymbol symbol="✦"  bottom={H*0.35} right={W*0.07} size={14} opacity={0.50} delay={900}  duration={3400} range={10} />
      <FloatSymbol symbol="◈"  bottom={H*0.22} left={W*0.12}  size={20} opacity={0.40} delay={100}  duration={3000} range={14} />
      <FloatSymbol symbol="₿"  bottom={H*0.18} right={W*0.15} size={16} opacity={0.35} delay={800}  duration={3300} range={8}  />
      <FloatSymbol symbol="◆"  bottom={H*0.12} left={W*0.40}  size={13} opacity={0.30} delay={600}  duration={2700} range={10} />

      {/* ── CONTENT ── */}
      <View style={[styles.content, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 16 }]}>

        {/* Brand */}
        <Animated.View style={[styles.brand, { opacity: logoO, transform: [{ translateY: logoY }] }]}>
          <View style={styles.brandIconWrap}>
            <LinearGradient
              colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0.10)']}
              style={styles.brandIcon}
              borderRadius={20}
            >
              <Text style={styles.brandEmoji}>⛓</Text>
            </LinearGradient>
          </View>
          <Text style={styles.brandName}>MAIDEN</Text>
          <Text style={styles.brandTag}>Your Web3 journey starts here</Text>
        </Animated.View>

        {/* Card */}
        <Animated.View style={[styles.card, { opacity: cardO, transform: [{ scale: cardScale }] }]}>

          {/* Tabs */}
          <View style={styles.tabs}>
            {['signin', 'signup'].map(t => (
              <TouchableOpacity key={t} style={styles.tabItem} onPress={() => switchTab(t)} activeOpacity={0.7}>
                <Text style={[styles.tabText, tab === t && styles.tabTextOn]}>
                  {t === 'signin' ? 'Sign In' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            ))}
            <Animated.View style={[styles.tabLine, { left: underlineLeft }]} />
          </View>

          {/* Inputs */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputRow, emailFocused && styles.inputRowOn]}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.inputField}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="rgba(0,0,0,0.28)"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>
            <View style={styles.hairline} />
            <View style={[styles.inputRow, passFocused && styles.inputRowOn]}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(0,0,0,0.28)"
                secureTextEntry
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
              />
            </View>
          </View>

          {!!error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠ {error}</Text>
            </View>
          )}

          {/* CTA */}
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.86} disabled={loading} style={loading && { opacity: 0.65 }}>
            <LinearGradient
              colors={['#7C3AED', '#06B6D4']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.cta}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.ctaText}>{tab === 'signin' ? 'Sign In' : 'Create Account'}</Text>
              }
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.orLine} />
          </View>

          <TouchableOpacity
            style={styles.guestBtn}
            onPress={async () => { await continueAsGuest(); navigation.replace('Onboarding'); }}
            activeOpacity={0.75}
          >
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text style={[styles.footer, { opacity: cardO }]}>
          By continuing you agree to our Terms & Privacy Policy
        </Animated.Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  // Floating symbols
  floatSymbol: {
    position: 'absolute',
    color: '#FFFFFF',
    fontWeight: '300',
  },

  // Content
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },

  // Brand
  brand: { alignItems: 'center', gap: 8 },
  brandIconWrap: {
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 4,
  },
  brandIcon: {
    width: 76, height: 76,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.30)',
  },
  brandEmoji: { fontSize: 36 },
  brandName: {
    fontSize: 36, fontFamily: fonts.headingExtraBold, color: '#fff', letterSpacing: -1,
  },
  brandTag: {
    fontSize: 14, color: 'rgba(255,255,255,0.65)', fontWeight: '400',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.30,
    shadowRadius: 48,
    elevation: 24,
    gap: spacing.md,
  },

  // Tabs
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    marginBottom: 4,
    position: 'relative',
  },
  tabItem: { flex: 1, paddingBottom: 12, alignItems: 'center' },
  tabText: { fontSize: 15, fontWeight: '500', color: 'rgba(0,0,0,0.35)' },
  tabTextOn: { color: colors.primary, fontWeight: '700' },
  tabLine: {
    position: 'absolute', bottom: 0, width: '50%', height: 2.5,
    backgroundColor: colors.primary, borderRadius: 2,
  },

  // Inputs
  inputGroup: {
    borderRadius: 16, borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden', backgroundColor: '#FAFAFA',
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 15,
    backgroundColor: '#FAFAFA',
  },
  inputRowOn: { backgroundColor: 'rgba(0,113,227,0.04)' },
  inputLabel: { width: 84, fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  inputField: { flex: 1, fontSize: 15, color: colors.textPrimary },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.08)', marginLeft: 16 },

  // Error
  errorBox: {
    backgroundColor: colors.errorBg, borderRadius: 10,
    borderWidth: 1, borderColor: colors.errorBorder,
    paddingHorizontal: 12, paddingVertical: 9,
  },
  errorText: { color: colors.error, fontSize: 13, fontWeight: '500' },

  // CTA
  cta: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: 0.1 },

  // Divider
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  orLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.10)' },
  orText: { fontSize: 13, color: 'rgba(0,0,0,0.35)', fontWeight: '500' },

  // Guest
  guestBtn: {
    borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.10)',
    paddingVertical: 14, alignItems: 'center', backgroundColor: '#FAFAFA',
  },
  guestText: { color: colors.textSecondary, fontSize: 15, fontWeight: '600' },

  // Footer
  footer: {
    textAlign: 'center', fontSize: 11,
    color: 'rgba(255,255,255,0.40)', lineHeight: 16,
  },
});
