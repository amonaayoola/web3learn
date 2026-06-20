import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform,
  Animated, ActivityIndicator,
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { getRank } from '../utils/rankUtils';
import { sendMessage, SUGGESTED_PROMPTS } from '../lib/aiTutor';
import { colors, spacing, radius, typography } from '../theme';

const SAGE_INTRO = `Hey! I'm SAGE — your personal Web3 guide. I can explain any concept from the curriculum, answer questions about blockchain, wallets, DeFi, NFTs, and more, or tell you what to learn next.

What's on your mind?`;

export default function TutorScreen({ navigation }) {
  const { xp, streak, hearts, completedQuizzes } = useProgress();
  const rank = getRank(xp);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: SAGE_INTRO, id: 'intro' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  const completedModuleIds = Object.keys(completedQuizzes || {});

  const userContext = {
    xp,
    rankName: rank.name,
    streak,
    hearts,
    completedModules: completedModuleIds,
  };

  useEffect(() => {
    if (isLoading) {
      const animate = (dot, delay) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.delay(600 - delay),
          ])
        ).start();
      };
      animate(dotAnim1, 0);
      animate(dotAnim2, 200);
      animate(dotAnim3, 400);
    } else {
      dotAnim1.setValue(0);
      dotAnim2.setValue(0);
      dotAnim3.setValue(0);
    }
  }, [isLoading]);

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  };

  const handleSend = useCallback(async (text) => {
    const content = (text || input).trim();
    if (!content || isLoading) return;

    setInput('');
    setError(null);

    const userMsg = { role: 'user', content, id: Date.now().toString() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setIsLoading(true);
    scrollToBottom();

    try {
      const apiMessages = nextMessages
        .filter(m => m.id !== 'intro')
        .map(m => ({ role: m.role, content: m.content }));

      // Include the intro in context as assistant's first turn if it's the start
      const contextMessages = messages.length === 1
        ? [{ role: 'assistant', content: SAGE_INTRO }, { role: 'user', content }]
        : apiMessages;

      const reply = await sendMessage(contextMessages, userContext);

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: reply, id: Date.now().toString() + '_a' },
      ]);
    } catch (err) {
      if (err.message === 'NO_API_KEY') {
        setError('api_key');
      } else {
        setError('network');
      }
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  }, [input, messages, isLoading, userContext]);

  const renderMessage = (msg) => {
    const isUser = msg.role === 'user';
    return (
      <View key={msg.id} style={[styles.msgRow, isUser && styles.msgRowUser]}>
        {!isUser && (
          <View style={styles.sageAvatar}>
            <Text style={styles.sageAvatarText}>S</Text>
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleSage]}>
          <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>
            {msg.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.sageHeaderAvatar}>
            <Text style={styles.sageHeaderEmoji}>✦</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>SAGE</Text>
            <Text style={styles.headerSub}>AI Web3 Tutor</Text>
          </View>
        </View>
        <View style={styles.onlineIndicator}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Live</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map(renderMessage)}

          {/* Typing indicator */}
          {isLoading && (
            <View style={styles.msgRow}>
              <View style={styles.sageAvatar}>
                <Text style={styles.sageAvatarText}>S</Text>
              </View>
              <View style={[styles.bubble, styles.bubbleSage, styles.typingBubble]}>
                {[dotAnim1, dotAnim2, dotAnim3].map((dot, i) => (
                  <Animated.View
                    key={i}
                    style={[styles.typingDot, { opacity: dot, transform: [{ translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) }] }]}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Error states */}
          {error === 'api_key' && (
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>API Key Required</Text>
              <Text style={styles.errorBody}>
                Add your Anthropic API key to the{'\n'}
                <Text style={styles.errorMono}>EXPO_PUBLIC_ANTHROPIC_KEY</Text>
                {'\n'}variable in your <Text style={styles.errorMono}>.env</Text> file to chat with SAGE.
              </Text>
              <Text style={styles.errorHint}>Get a key at console.anthropic.com</Text>
            </View>
          )}

          {error === 'network' && (
            <View style={[styles.errorCard, styles.errorNetworkCard]}>
              <Text style={styles.errorTitle}>Connection error</Text>
              <Text style={styles.errorBody}>Couldn't reach SAGE. Check your connection and try again.</Text>
            </View>
          )}

          {/* Suggested prompts — show when only intro message exists */}
          {messages.length === 1 && !isLoading && (
            <View style={styles.suggestedWrap}>
              <Text style={styles.suggestedLabel}>SUGGESTED</Text>
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.suggestionChip}
                  onPress={() => handleSend(prompt)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestionText}>{prompt}</Text>
                  <Text style={styles.suggestionArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={{ height: 16 }} />
        </ScrollView>

        {/* Input row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask SAGE anything..."
            placeholderTextColor={colors.textMuted}
            multiline
            maxLength={500}
            onSubmitEditing={() => handleSend()}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || isLoading) && styles.sendBtnDisabled]}
            onPress={() => handleSend()}
            disabled={!input.trim() || isLoading}
            activeOpacity={0.8}
          >
            {isLoading
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={styles.sendIcon}>↑</Text>
            }
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  backBtn: { padding: spacing.xs, marginRight: 2 },
  backArrow: { fontSize: 22, color: colors.textSecondary },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  sageHeaderAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.primaryGlow,
    borderWidth: 1.5, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  sageHeaderEmoji: { fontSize: 16, color: colors.primary },
  headerTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.2 },
  headerSub: { fontSize: 11, color: colors.textMuted },
  onlineIndicator: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.success },
  onlineText: { fontSize: 11, fontWeight: '600', color: colors.success },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.md, paddingTop: spacing.md },

  msgRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: spacing.md, gap: spacing.sm },
  msgRowUser: { flexDirection: 'row-reverse' },

  sageAvatar: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.primaryGlow,
    borderWidth: 1, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  sageAvatarText: { fontSize: 12, fontWeight: '800', color: colors.primary },

  bubble: {
    maxWidth: '80%',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  bubbleSage: {
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleText: { fontSize: 15, lineHeight: 22, color: colors.textPrimary },
  bubbleTextUser: { color: '#fff' },

  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 14 },
  typingDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.textMuted },

  suggestedWrap: { marginTop: spacing.md },
  suggestedLabel: {
    fontSize: 10, fontWeight: '800', letterSpacing: 2,
    color: colors.textMuted, marginBottom: spacing.sm,
  },
  suggestionChip: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md, paddingVertical: 12,
    marginBottom: spacing.sm,
  },
  suggestionText: { fontSize: 14, color: colors.textSecondary, flex: 1 },
  suggestionArrow: { fontSize: 14, color: colors.textMuted, marginLeft: spacing.sm },

  errorCard: {
    backgroundColor: colors.errorBg,
    borderWidth: 1, borderColor: colors.errorBorder,
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorNetworkCard: {
    backgroundColor: 'rgba(255,159,67,0.08)',
    borderColor: 'rgba(255,159,67,0.3)',
  },
  errorTitle: { fontSize: 14, fontWeight: '700', color: colors.error, marginBottom: 6 },
  errorBody: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  errorMono: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: colors.textPrimary },
  errorHint: { fontSize: 11, color: colors.textMuted, marginTop: 8 },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.textPrimary,
    maxHeight: 120,
    lineHeight: 22,
  },
  sendBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: colors.border },
  sendIcon: { fontSize: 18, color: '#fff', fontWeight: '700' },
});
