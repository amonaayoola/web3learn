import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
  KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, Animated,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, radius } from '../theme';

export default function AuthScreen({ navigation }) {
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const tabAnim = useRef(new Animated.Value(0)).current;
  const { signIn, signUp, continueAsGuest } = useAuth();

  const switchTab = (t) => {
    setTab(t);
    setError('');
    Animated.spring(tabAnim, {
      toValue: t === 'signin' ? 0 : 1,
      useNativeDriver: false,
      tension: 120,
      friction: 10,
    }).start();
  };

  const handleAuth = async () => {
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (tab === 'signup') {
      if (!username) { setError('Please enter a username.'); return; }
      if (password !== confirmPassword) { setError('Passwords don\'t match.'); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    }
    setLoading(true);
    try {
      if (tab === 'signin') {
        await signIn(email.trim(), password);
      } else {
        await signUp(email.trim(), password, username.trim());
      }
      navigation.replace('Home');
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigation.replace('Home');
  };

  const tabIndicatorLeft = tabAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['2%', '52%'],
  });

  const inputStyle = (field) => [
    styles.input,
    focusedField === field && styles.inputFocused,
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.heroGlow} />
            <View style={styles.heroIcon}>
              <Text style={styles.heroEmoji}>⛓️</Text>
            </View>
            <Text style={styles.heroTitle}>web3learn</Text>
            <Text style={styles.heroSub}>Master crypto, DeFi, and Web3{'\n'}one lesson at a time.</Text>
          </View>

          {/* Tab toggle */}
          <View style={styles.tabContainer}>
            <Animated.View style={[styles.tabIndicator, { left: tabIndicatorLeft }]} />
            <TouchableOpacity style={styles.tabBtn} onPress={() => switchTab('signin')} activeOpacity={0.8}>
              <Text style={[styles.tabText, tab === 'signin' && styles.tabTextActive]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabBtn} onPress={() => switchTab('signup')} activeOpacity={0.8}>
              <Text style={[styles.tabText, tab === 'signup' && styles.tabTextActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {tab === 'signup' && (
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>USERNAME</Text>
                <TextInput
                  style={inputStyle('username')}
                  placeholder="coolweb3dev"
                  placeholderTextColor={colors.textMuted}
                  value={username}
                  onChangeText={setUsername}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            )}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>EMAIL</Text>
              <TextInput
                style={inputStyle('email')}
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
            </View>
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>PASSWORD</Text>
              <TextInput
                style={inputStyle('password')}
                placeholder="••••••••"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
              />
            </View>
            {tab === 'signup' && (
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
                <TextInput
                  style={inputStyle('confirm')}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry
                />
              </View>
            )}

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.primaryBtnLoading]}
              onPress={handleAuth}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.primaryBtnText}>{tab === 'signin' ? 'Sign In' : 'Create Account'} →</Text>
              }
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Guest */}
          <TouchableOpacity style={styles.guestBtn} onPress={handleGuest} activeOpacity={0.8}>
            <Text style={styles.guestBtnText}>Continue as Guest</Text>
          </TouchableOpacity>
          <Text style={styles.guestNote}>Progress won't sync across devices</Text>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, flexGrow: 1 },

  hero: { alignItems: 'center', paddingTop: spacing.xxl, paddingBottom: spacing.xl, position: 'relative' },
  heroGlow: {
    position: 'absolute', top: 40, width: 200, height: 200, borderRadius: 100,
    backgroundColor: colors.primaryGlow,
  },
  heroIcon: {
    width: 80, height: 80, borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroEmoji: { fontSize: 40 },
  heroTitle: { fontSize: 34, fontWeight: '900', color: colors.textPrimary, letterSpacing: -1, marginBottom: 10 },
  heroSub: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginBottom: spacing.xl,
    position: 'relative',
    height: 48,
  },
  tabIndicator: {
    position: 'absolute',
    top: 4, bottom: 4,
    width: '46%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  tabBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  tabText: { color: colors.textMuted, fontWeight: '600', fontSize: 15 },
  tabTextActive: { color: '#fff' },

  form: { gap: spacing.md, marginBottom: spacing.lg },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, color: colors.textMuted, paddingLeft: 4 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 15,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceElevated,
  },
  errorBox: {
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  errorText: { color: colors.error, fontSize: 13, textAlign: 'center' },

  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  primaryBtnLoading: { opacity: 0.7 },
  primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 0.2 },

  divider: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginVertical: spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { color: colors.textMuted, fontSize: 12 },

  guestBtn: {
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: radius.lg,
    paddingVertical: 14,
    alignItems: 'center',
  },
  guestBtnText: { color: colors.textSecondary, fontWeight: '600', fontSize: 15 },
  guestNote: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.sm },
});
