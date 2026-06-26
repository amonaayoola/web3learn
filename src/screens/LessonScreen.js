import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress } from '../context/ProgressContext';
import { findModule } from '../data/allModules';
import { colors, spacing, radius, moduleColors } from '../theme';

const { width } = Dimensions.get('window');

export default function LessonScreen({ navigation, route }) {
  const { moduleId, lessonId } = route.params;
  const { module, moduleIndex } = findModule(moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);
  const mc = moduleColors[moduleIndex] || moduleColors[0];

  // ── All hooks at top (before any early return) ─────────────────────────
  const [slideIndex, setSlideIndex] = useState(0);
  const [showMiniQuiz, setShowMiniQuiz] = useState(false);
  const [miniSelected, setMiniSelected] = useState(null);
  const [miniAnswered, setMiniAnswered] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { completeLesson, isLessonCompleted } = useProgress();

  // Refs for swipe handlers — avoids stale closures inside PanResponder
  const handleNextRef = useRef(null);
  const handleBackRef = useRef(null);

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gs) =>
      Math.abs(gs.dx) > 15 && Math.abs(gs.dx) > Math.abs(gs.dy) * 1.5,
    onPanResponderRelease: (_, gs) => {
      if (gs.dx < -50 && Math.abs(gs.dy) < 100) handleNextRef.current?.();
      else if (gs.dx > 50 && Math.abs(gs.dy) < 100) handleBackRef.current?.();
    },
  })).current;

  if (!lesson) return null;

  // ── Derived values ────────────────────────────────────────────────────
  const slides = lesson.slides;
  const currentSlide = slides[slideIndex];
  const isLast = slideIndex === slides.length - 1;

  // Pick mini quiz question from the module quiz by lesson index
  const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
  const moduleQuiz = module.quiz || [];
  const miniQuestion = moduleQuiz.length > 0
    ? moduleQuiz[lessonIndex % moduleQuiz.length]
    : null;

  const totalDots = slides.length + (miniQuestion ? 1 : 0);
  const activeDot = showMiniQuiz ? slides.length : slideIndex;
  const progress = showMiniQuiz ? 1 : (slideIndex + 1) / slides.length;

  // ── Animations ────────────────────────────────────────────────────────
  const animateNext = (cb) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -20, duration: 120, useNativeDriver: true }),
    ]).start(() => {
      cb();
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  const animateBack = (cb) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 20, duration: 120, useNativeDriver: true }),
    ]).start(() => {
      cb();
      slideAnim.setValue(-20);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  // ── Handlers ──────────────────────────────────────────────────────────
  const finishLesson = async () => {
    const alreadyDone = isLessonCompleted(lessonId);
    const consec = await completeLesson(lessonId, 20);
    navigation.replace('LevelComplete', {
      moduleId, lessonId,
      xpEarned: alreadyDone ? 0 : 20,
      consecutiveLessons: consec,
      title: lesson.title,
      moduleColor: mc.color,
    });
  };

  const handleNext = () => {
    if (showMiniQuiz) return; // mini quiz footer handles its own button
    if (isLast) {
      if (miniQuestion) {
        animateNext(() => setShowMiniQuiz(true));
      } else {
        finishLesson();
      }
    } else {
      animateNext(() => setSlideIndex(i => i + 1));
    }
  };

  const handleBack = () => {
    if (showMiniQuiz) {
      animateBack(() => {
        setShowMiniQuiz(false);
        setMiniSelected(null);
        setMiniAnswered(false);
      });
      return;
    }
    if (slideIndex === 0) navigation.goBack();
    else animateBack(() => setSlideIndex(i => i - 1));
  };

  // Update swipe refs on every render so they always point to current handlers
  handleNextRef.current = handleNext;
  handleBackRef.current = handleBack;

  const handleMiniSelect = (i) => {
    if (miniAnswered) return;
    setMiniSelected(i);
    setMiniAnswered(true);
  };

  const miniIsCorrect = miniSelected !== null && miniSelected === miniQuestion?.correct;

  // ── Slide content ─────────────────────────────────────────────────────
  const isHighlight = currentSlide.type === 'highlight';
  const isIntro = currentSlide.type === 'intro' || currentSlide.type === 'summary';

  const renderSlide = () => (
    <>
      {isIntro && (
        <View style={[styles.emojiRing, { backgroundColor: mc.color + '18', borderColor: mc.color + '40' }]}>
          <Text style={styles.emojiLarge}>{module.emoji}</Text>
        </View>
      )}
      {isHighlight ? (
        <View style={[styles.highlightCard, { borderColor: mc.color + '50', backgroundColor: mc.color + '0D' }]}>
          <View style={[styles.highlightAccent, { backgroundColor: mc.color }]} />
          <View style={styles.highlightContent}>
            <Text style={[styles.slideTitle, { color: mc.color }]}>{currentSlide.title}</Text>
            <Text style={styles.slideBody}>{currentSlide.body}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.plainCard}>
          <Text style={[styles.slideTitle, isIntro && { textAlign: 'center' }]}>{currentSlide.title}</Text>
          <Text style={[styles.slideBody, isIntro && { textAlign: 'center' }]}>{currentSlide.body}</Text>
        </View>
      )}
    </>
  );

  // ── Mini quiz content ─────────────────────────────────────────────────
  const renderMiniQuiz = () => (
    <View style={styles.miniWrap}>
      <View style={[styles.miniBadge, { backgroundColor: mc.color + '20', borderColor: mc.color + '50' }]}>
        <Text style={[styles.miniBadgeText, { color: mc.color }]}>⚡ QUICK CHECK</Text>
      </View>
      <Text style={styles.miniQuestionText}>{miniQuestion.question}</Text>
      <View style={styles.miniOptions}>
        {(miniQuestion.options || []).map((opt, i) => {
          const isCorrectOpt = i === miniQuestion.correct;
          const isSelectedOpt = i === miniSelected;
          let bg = colors.surface;
          let borderColor = colors.border;
          let textColor = colors.textPrimary;
          if (miniAnswered) {
            if (isCorrectOpt) { bg = colors.successBg; borderColor = colors.success; textColor = colors.success; }
            else if (isSelectedOpt) { bg = colors.errorBg; borderColor = colors.error; textColor = colors.error; }
          } else if (isSelectedOpt) {
            bg = mc.color + '18'; borderColor = mc.color;
          }
          return (
            <TouchableOpacity
              key={i}
              style={[styles.miniOption, { backgroundColor: bg, borderColor }]}
              onPress={() => handleMiniSelect(i)}
              disabled={miniAnswered}
              activeOpacity={0.75}
            >
              <Text style={[styles.miniOptionText, { color: textColor }]}>
                {miniAnswered && isCorrectOpt ? '✓  ' : miniAnswered && isSelectedOpt && !isCorrectOpt ? '✗  ' : ''}
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {miniAnswered && (
        <View style={[
          styles.miniFeedback,
          miniIsCorrect ? styles.miniFeedbackCorrect : styles.miniFeedbackWrong,
        ]}>
          <Text style={styles.miniFeedbackTitle}>{miniIsCorrect ? '✅ Correct!' : '❌ Not quite'}</Text>
          {!miniIsCorrect && <Text style={styles.miniFeedbackBody}>{miniQuestion.explanation}</Text>}
        </View>
      )}
    </View>
  );

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: mc.color }]} />
      </View>

      {/* Nav */}
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.navBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.navBack}>{slideIndex === 0 && !showMiniQuiz ? '✕' : '‹'}</Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          {Array.from({ length: totalDots }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeDot
                  ? { backgroundColor: mc.color, width: 20 }
                  : i < activeDot
                  ? { backgroundColor: mc.color, opacity: 0.4 }
                  : { backgroundColor: colors.border },
              ]}
            />
          ))}
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Slide / Mini Quiz — swipe-enabled */}
      <Animated.View
        style={[
          styles.slideWrap,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
        {...panResponder.panHandlers}
      >
        {showMiniQuiz ? renderMiniQuiz() : renderSlide()}
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        {showMiniQuiz ? (
          <TouchableOpacity
            style={[
              styles.continueBtn,
              { backgroundColor: miniAnswered ? mc.color : colors.border },
            ]}
            onPress={miniAnswered ? finishLesson : undefined}
            disabled={!miniAnswered}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>Complete Lesson</Text>
            <Text style={styles.continueBtnArrow}>🎉</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.continueBtn, { backgroundColor: mc.color }]}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>
              {isLast ? (miniQuestion ? 'Quick Check' : 'Complete Lesson') : 'Continue'}
            </Text>
            <Text style={styles.continueBtnArrow}>{isLast && !miniQuestion ? '🎉' : '→'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  progressTrack: { height: 3, backgroundColor: colors.surface },
  progressFill: { height: '100%' },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  navBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  navBack: { color: colors.textSecondary, fontSize: 28, fontWeight: '300' },
  dots: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  dot: { height: 6, width: 6, borderRadius: 3 },

  slideWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emojiRing: {
    width: 88, height: 88, borderRadius: 44,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2,
    marginBottom: spacing.xl,
  },
  emojiLarge: { fontSize: 44 },
  highlightCard: {
    width: '100%',
    borderRadius: radius.xl,
    borderWidth: 1.5,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  highlightAccent: { width: 5 },
  highlightContent: { flex: 1, padding: spacing.lg },
  plainCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    letterSpacing: -0.3,
    lineHeight: 30,
  },
  slideBody: {
    fontSize: 17,
    color: colors.textSecondary,
    lineHeight: 27,
  },

  // ── Mini quiz ──────────────────────────────────────────────────────────
  miniWrap: { width: '100%', gap: spacing.md },
  miniBadge: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1.5,
  },
  miniBadgeText: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  miniQuestionText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 28,
  },
  miniOptions: { gap: spacing.sm },
  miniOption: {
    borderRadius: radius.lg,
    borderWidth: 1.5,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  miniOptionText: { fontSize: 15, fontWeight: '600', lineHeight: 22 },
  miniFeedback: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  miniFeedbackCorrect: { backgroundColor: colors.successBg, borderColor: colors.successBorder || colors.success },
  miniFeedbackWrong: { backgroundColor: colors.errorBg, borderColor: colors.errorBorder || colors.error },
  miniFeedbackTitle: { fontSize: 14, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  miniFeedbackBody: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },

  // ── Footer ─────────────────────────────────────────────────────────────
  footer: { padding: spacing.lg, paddingBottom: spacing.xl },
  continueBtn: {
    borderRadius: radius.full,
    paddingVertical: 16,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  continueBtnText: { color: '#fff', fontWeight: '800', fontSize: 17 },
  continueBtnArrow: { color: '#fff', fontSize: 18 },
});
