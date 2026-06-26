import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress } from '../context/ProgressContext';
import { findModule } from '../data/allModules';
import HeartsDisplay from '../components/HeartsDisplay';
import { getRefillCountdown } from '../utils/heartsUtils';
import { colors, spacing, radius, moduleColors } from '../theme';

export default function QuizScreen({ navigation, route }) {
  const { moduleId, isDaily = false, questions: passedQuestions } = route.params || {};
  const { module, moduleIndex } = moduleId ? findModule(moduleId) : { module: null, moduleIndex: -1 };
  const questions = passedQuestions || module?.quiz || [];
  const mc = moduleColors[moduleIndex] || { color: colors.primary, glow: colors.primaryGlow };

  // ── Queue-based state for retry logic ─────────────────────────────────
  // queue holds question indices; wrong answers get re-appended
  const [queue, setQueue] = useState(() => questions.map((_, i) => i));
  const [qCursor, setQCursor] = useState(0);
  // firstAttempts: { [questionIndex]: boolean } — tracks first-time correct/wrong
  const [firstAttempts, setFirstAttempts] = useState({});
  // missedSet: Set of question indices that were ever wrong
  const [missedSet, setMissedSet] = useState(new Set());

  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [shakeHearts, setShakeHearts] = useState(false);

  const { hearts, heartsLastRefill, loseHeart, completeQuiz } = useProgress();
  const [currentHearts, setCurrentHearts] = useState(hearts);
  const [failed, setFailed] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Current question from queue
  const qIndex = queue[qCursor] ?? 0;
  const q = questions[qIndex];
  const accentColor = isDaily ? colors.xpGold : (mc.color || colors.primary);

  // Is this question being retried?
  const isRetry = qIndex in firstAttempts && firstAttempts[qIndex] === false;

  // Progress: unique questions answered / total (stays put during retries)
  const uniqueAnswered = Object.keys(firstAttempts).length;
  const progressFraction = questions.length > 0 ? uniqueAnswered / questions.length : 0;
  const retryCount = queue.length - questions.length;

  const isAnswerCorrect = (optionIndex, question) => {
    const type = question.type || 'multiple_choice';
    if (type === 'true_false') return (optionIndex === 1) === question.correct;
    return optionIndex === question.correct;
  };

  const handleSelect = async (optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);

    const correct = isAnswerCorrect(optionIndex, q);
    const isFirstAttempt = !(qIndex in firstAttempts);

    // Record first attempt only
    if (isFirstAttempt) {
      setFirstAttempts(prev => ({ ...prev, [qIndex]: correct }));
    }

    if (!correct) {
      if (isFirstAttempt) {
        setMissedSet(prev => new Set([...prev, qIndex]));
      }
      // Re-append to queue so the user sees it again
      setQueue(prev => [...prev, qIndex]);

      const newHearts = await loseHeart();
      setCurrentHearts(newHearts);
      setShakeHearts(true);
      setTimeout(() => setShakeHearts(false), 600);
      if (newHearts === 0) {
        setTimeout(() => setFailed(true), 1200);
        return;
      }
    }
  };

  const handleNext = () => {
    if (qCursor + 1 >= queue.length) {
      finishQuiz();
      return;
    }
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -16, duration: 120, useNativeDriver: true }),
    ]).start(() => {
      setQCursor(c => c + 1);
      setSelected(null);
      setAnswered(false);
      slideAnim.setValue(16);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  const finishQuiz = async () => {
    // Include current question if not yet tracked (handles the very last answer)
    const finalFirstAttempts = { ...firstAttempts };
    if (!(qIndex in finalFirstAttempts)) {
      finalFirstAttempts[qIndex] = selected !== null && isAnswerCorrect(selected, q);
    }
    const correctCount = Object.values(finalFirstAttempts).filter(Boolean).length;
    const baseXP = Math.round((correctCount / questions.length) * 100);
    const earned = await completeQuiz(moduleId || 'daily', baseXP, isDaily);
    setXpEarned(earned);
    setFirstAttempts(finalFirstAttempts);
    setDone(true);
  };

  const isCurrentCorrect = selected !== null && isAnswerCorrect(selected, q);

  // ─── Question Renderers ──────────────────────────────────────────────

  const renderMultipleChoice = () => (
    <View style={styles.optionsList}>
      {q.options.map((opt, i) => {
        const isCorrectOpt = i === q.correct;
        const isSelectedOpt = i === selected;
        let state = 'default';
        if (answered) {
          if (isCorrectOpt) state = 'correct';
          else if (isSelectedOpt) state = 'wrong';
        } else if (isSelectedOpt) {
          state = 'selected';
        }
        return (
          <TouchableOpacity
            key={i}
            style={[styles.option, optionStateStyle(state)]}
            onPress={() => handleSelect(i)}
            disabled={answered}
            activeOpacity={0.75}
          >
            <View style={[styles.optionLetter, optionLetterStyle(state, accentColor)]}>
              <Text style={[styles.optionLetterText, answered && isCorrectOpt && { color: '#fff' }]}>
                {answered && isCorrectOpt ? '✓' : answered && isSelectedOpt ? '✗' : String.fromCharCode(65 + i)}
              </Text>
            </View>
            <Text style={[styles.optionText, answered && isCorrectOpt && { color: colors.success }, answered && isSelectedOpt && !isCorrectOpt && { color: colors.error }]}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderTrueFalse = () => {
    const trueCorrect = q.correct === true;
    const falseCorrect = q.correct === false;
    const trueState = answered ? (trueCorrect ? 'correct' : selected === 1 ? 'wrong' : 'default') : selected === 1 ? 'selected' : 'default';
    const falseState = answered ? (falseCorrect ? 'correct' : selected === 0 ? 'wrong' : 'default') : selected === 0 ? 'selected' : 'default';

    return (
      <View style={styles.tfRow}>
        {[{ label: 'True', val: 1, state: trueState }, { label: 'False', val: 0, state: falseState }].map(({ label, val, state }) => (
          <TouchableOpacity
            key={val}
            style={[styles.tfCard, tfStateStyle(state)]}
            onPress={() => handleSelect(val)}
            disabled={answered}
            activeOpacity={0.75}
          >
            <Text style={styles.tfEmoji}>{label === 'True' ? '✅' : '❌'}</Text>
            <Text style={[styles.tfLabel, state === 'correct' && { color: colors.success }, state === 'wrong' && { color: colors.error }]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderFillBlank = () => (
    <View style={styles.chipRow}>
      {q.blank_options.map((opt, i) => {
        const isCorrectOpt = i === q.correct;
        const isSelectedOpt = i === selected;
        let state = 'default';
        if (answered) {
          if (isCorrectOpt) state = 'correct';
          else if (isSelectedOpt) state = 'wrong';
        } else if (isSelectedOpt) state = 'selected';

        return (
          <TouchableOpacity
            key={i}
            style={[styles.chip, chipStateStyle(state)]}
            onPress={() => handleSelect(i)}
            disabled={answered}
            activeOpacity={0.75}
          >
            <Text style={[styles.chipText, state === 'correct' && { color: colors.success }, state === 'wrong' && { color: colors.error }]}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderQuestion = () => {
    const type = q.type || 'multiple_choice';
    switch (type) {
      case 'true_false': return renderTrueFalse();
      case 'fill_blank': return renderFillBlank();
      default: return renderMultipleChoice();
    }
  };

  // ─── Fail Screen ─────────────────────────────────────────────────────
  if (failed) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.fullCenter}>
          <Text style={styles.bigEmoji}>💔</Text>
          <Text style={styles.failTitle}>Out of Hearts</Text>
          <Text style={styles.failSub}>Hearts refill in {getRefillCountdown(heartsLastRefill)}</Text>
          <HeartsDisplay hearts={0} />
          <TouchableOpacity style={[styles.fullBtn, { backgroundColor: colors.error, marginTop: 32 }]} onPress={() => navigation.goBack()}>
            <Text style={styles.fullBtnText}>Back to Module</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Results Screen ───────────────────────────────────────────────────
  if (done) {
    const correct = Object.values(firstAttempts).filter(Boolean).length;
    const total = questions.length;
    const pct = Math.round((correct / total) * 100);
    const retries = missedSet.size;

    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.resultContent}>
          <Text style={styles.bigEmoji}>{pct === 100 ? '🏆' : pct >= 60 ? '🎯' : '📊'}</Text>
          <Text style={styles.resultTitle}>{isDaily ? 'Challenge Complete!' : 'Quiz Done'}</Text>
          {isDaily && (
            <View style={styles.doubleBadge}>
              <Text style={styles.doubleBadgeText}>⚡ 2× XP</Text>
            </View>
          )}
          <View style={styles.resultXpRow}>
            <Text style={styles.resultXp}>+{xpEarned}</Text>
            <Text style={styles.resultXpLabel}>XP</Text>
          </View>
          <Text style={styles.resultScore}>{correct} of {total} correct · {pct}%</Text>

          {retries > 0 && (
            <View style={styles.retryBanner}>
              <Text style={styles.retryBannerText}>
                🔄 {retries} question{retries > 1 ? 's' : ''} needed a retry
              </Text>
            </View>
          )}

          {questions.map((q, i) => {
            const wasCorrectFirstTry = firstAttempts[i] === true;
            // In missedSet = got it wrong first, but eventually answered correctly
            const wasRetried = missedSet.has(i);
            // Display as correct if either first-try right OR retried to success
            const displayCorrect = wasCorrectFirstTry || wasRetried;
            const correctLabel = q.type === 'true_false'
              ? (q.correct ? 'True' : 'False')
              : q.type === 'fill_blank'
              ? q.blank_options[q.correct]
              : q.options[q.correct];

            return (
              <View key={q.id} style={[styles.resultItem, displayCorrect ? styles.resultItemCorrect : styles.resultItemWrong]}>
                <Text style={styles.resultQ}>{q.question}</Text>
                <Text style={styles.resultA}>
                  {wasCorrectFirstTry ? '✅' : wasRetried ? '🔄' : '❌'} {correctLabel}
                </Text>
                {wasRetried && <Text style={styles.resultExp}>Got it after a retry — nice recovery!</Text>}
                {!displayCorrect && <Text style={styles.resultExp}>{q.explanation}</Text>}
              </View>
            );
          })}

          <TouchableOpacity style={[styles.fullBtn, { backgroundColor: accentColor, marginTop: 24 }]} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.fullBtnText}>Back to Home</Text>
          </TouchableOpacity>
          <View style={{ height: 48 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Quiz Screen ──────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.exitBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.exitText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressFraction * 100}%`, backgroundColor: accentColor }]} />
          </View>
          <Text style={styles.progressLabel}>
            {uniqueAnswered}/{questions.length}
            {retryCount > 0 ? `  ·  🔄 ${retryCount}` : ''}
          </Text>
        </View>
        <HeartsDisplay hearts={currentHearts} shake={shakeHearts} />
      </View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.quizContent}
        scrollEnabled={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Question type / retry badge */}
          <View style={styles.badgeRow}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>
                {(q.type === 'true_false') ? 'TRUE OR FALSE' : (q.type === 'fill_blank') ? 'FILL IN THE BLANK' : 'MULTIPLE CHOICE'}
              </Text>
            </View>
            {isRetry && (
              <View style={[styles.typeBadge, styles.retryBadge]}>
                <Text style={[styles.typeBadgeText, { color: colors.error }]}>🔄 TRY AGAIN</Text>
              </View>
            )}
          </View>

          <Text style={styles.question}>{q.question}</Text>
          {renderQuestion()}

          {answered && (
            <View style={[styles.feedbackCard, isCurrentCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
              <Text style={styles.feedbackTitle}>{isCurrentCorrect ? '✅ Correct!' : '❌ Not quite — you\'ll see this again'}</Text>
              <Text style={styles.feedbackBody}>{q.explanation}</Text>
            </View>
          )}
        </Animated.View>
      </Animated.ScrollView>

      {answered && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.fullBtn, { backgroundColor: isCurrentCorrect ? accentColor : colors.error }]}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.fullBtnText}>
              {qCursor + 1 >= queue.length ? 'See Results' : isCurrentCorrect ? 'Next →' : 'Got it →'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── State style helpers ─────────────────────────────────────────────────────
const optionStateStyle = (state) => {
  switch (state) {
    case 'selected': return { borderColor: colors.primary, backgroundColor: colors.primaryGlow };
    case 'correct': return { borderColor: colors.success, backgroundColor: colors.successBg };
    case 'wrong': return { borderColor: colors.error, backgroundColor: colors.errorBg };
    default: return {};
  }
};
const optionLetterStyle = (state, accentColor) => {
  switch (state) {
    case 'correct': return { backgroundColor: colors.success, borderColor: colors.success };
    case 'wrong': return { backgroundColor: colors.error, borderColor: colors.error };
    case 'selected': return { borderColor: accentColor };
    default: return {};
  }
};
const tfStateStyle = (state) => {
  switch (state) {
    case 'selected': return { borderColor: colors.primary, backgroundColor: colors.primaryGlow };
    case 'correct': return { borderColor: colors.success, backgroundColor: colors.successBg };
    case 'wrong': return { borderColor: colors.error, backgroundColor: colors.errorBg };
    default: return {};
  }
};
const chipStateStyle = (state) => {
  switch (state) {
    case 'selected': return { borderColor: colors.primary, backgroundColor: colors.primaryGlow };
    case 'correct': return { borderColor: colors.success, backgroundColor: colors.successBg };
    case 'wrong': return { borderColor: colors.error, backgroundColor: colors.errorBg };
    default: return {};
  }
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  exitBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  exitText: { color: colors.textMuted, fontSize: 20 },
  progressWrap: { flex: 1, gap: 4 },
  progressTrack: { height: 6, backgroundColor: colors.surface, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressLabel: { fontSize: 10, color: colors.textMuted, textAlign: 'right' },

  quizContent: { padding: spacing.md, paddingBottom: spacing.xl },
  badgeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  retryBadge: {
    borderColor: colors.error + '60',
    backgroundColor: colors.errorBg,
  },
  typeBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: colors.textMuted },
  question: { fontSize: 20, fontWeight: '700', color: colors.textPrimary, lineHeight: 28, marginBottom: spacing.xl, letterSpacing: -0.2 },

  // Multiple choice
  optionsList: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.md,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  optionLetter: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  optionLetterText: { fontSize: 12, fontWeight: '700', color: colors.textMuted },
  optionText: { flex: 1, fontSize: 15, color: colors.textPrimary, lineHeight: 22 },

  // True/False
  tfRow: { flexDirection: 'row', gap: spacing.md },
  tfCard: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 32,
    backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.border,
    borderRadius: radius.xl,
    gap: spacing.sm,
  },
  tfEmoji: { fontSize: 32 },
  tfLabel: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },

  // Fill blank
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: 20, paddingVertical: 12,
    backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.border,
    borderRadius: radius.full,
  },
  chipText: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },

  // Feedback
  feedbackCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  feedbackCorrect: { backgroundColor: colors.successBg, borderColor: colors.successBorder },
  feedbackWrong: { backgroundColor: colors.errorBg, borderColor: colors.errorBorder },
  feedbackTitle: { fontSize: 15, fontWeight: '800', color: colors.textPrimary, marginBottom: 6 },
  feedbackBody: { fontSize: 14, color: colors.textSecondary, lineHeight: 21 },

  footer: { padding: spacing.md, paddingBottom: spacing.xl },
  fullBtn: { borderRadius: radius.full, paddingVertical: 16, alignItems: 'center' },
  fullBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  // Fail
  fullCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  bigEmoji: { fontSize: 64, marginBottom: spacing.sm },
  failTitle: { fontSize: 26, fontWeight: '900', color: colors.textPrimary },
  failSub: { fontSize: 14, color: colors.textSecondary },

  // Results
  resultContent: { padding: spacing.md, alignItems: 'center' },
  resultTitle: { fontSize: 26, fontWeight: '900', color: colors.textPrimary, marginBottom: spacing.sm },
  doubleBadge: { backgroundColor: colors.xpGold, borderRadius: radius.full, paddingHorizontal: 14, paddingVertical: 5, marginBottom: spacing.sm },
  doubleBadgeText: { color: '#000', fontWeight: '800', fontSize: 13 },
  resultXpRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 4 },
  resultXp: { fontSize: 52, fontWeight: '900', color: colors.xpGold },
  resultXpLabel: { fontSize: 20, fontWeight: '700', color: colors.xpGold, opacity: 0.7 },
  resultScore: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.md },
  retryBanner: {
    backgroundColor: colors.errorBg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    alignSelf: 'stretch',
  },
  retryBannerText: { fontSize: 13, color: colors.textSecondary, textAlign: 'center' },
  resultItem: { width: '100%', borderRadius: radius.lg, borderWidth: 1, padding: spacing.md, marginBottom: spacing.sm },
  resultItemCorrect: { backgroundColor: colors.successBg, borderColor: colors.successBorder },
  resultItemWrong: { backgroundColor: colors.errorBg, borderColor: colors.errorBorder },
  resultQ: { fontSize: 13, color: colors.textSecondary, marginBottom: 4 },
  resultA: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  resultExp: { fontSize: 12, color: colors.textMuted, fontStyle: 'italic', lineHeight: 18 },
});
