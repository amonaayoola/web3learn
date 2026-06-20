import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Dimensions,
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import { colors, spacing, radius, moduleColors } from '../theme';

const { width } = Dimensions.get('window');

export default function LessonScreen({ navigation, route }) {
  const { moduleId, lessonId } = route.params;
  const moduleIndex = curriculum.findIndex(m => m.id === moduleId);
  const module = curriculum[moduleIndex];
  const lesson = module?.lessons.find(l => l.id === lessonId);
  const mc = moduleColors[moduleIndex] || moduleColors[0];

  const [slideIndex, setSlideIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { completeLesson, isLessonCompleted } = useProgress();

  if (!lesson) return null;

  const slides = lesson.slides;
  const current = slides[slideIndex];
  const isLast = slideIndex === slides.length - 1;
  const progress = (slideIndex + 1) / slides.length;

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

  const handleNext = async () => {
    if (isLast) {
      const alreadyDone = isLessonCompleted(lessonId);
      const consec = await completeLesson(lessonId, 20);
      navigation.replace('LevelComplete', {
        moduleId, lessonId,
        xpEarned: alreadyDone ? 0 : 20,
        consecutiveLessons: consec,
        title: lesson.title,
        moduleColor: mc.color,
      });
    } else {
      animateNext(() => setSlideIndex(i => i + 1));
    }
  };

  const handleBack = () => {
    if (slideIndex === 0) navigation.goBack();
    else animateBack(() => setSlideIndex(i => i - 1));
  };

  const isHighlight = current.type === 'highlight';
  const isIntro = current.type === 'intro' || current.type === 'summary';

  return (
    <SafeAreaView style={styles.safe}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: mc.color }]} />
      </View>

      {/* Nav */}
      <View style={styles.nav}>
        <TouchableOpacity onPress={handleBack} style={styles.navBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.navBack}>{slideIndex === 0 ? '✕' : '‹'}</Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === slideIndex
                  ? { backgroundColor: mc.color, width: 20 }
                  : i < slideIndex
                  ? { backgroundColor: mc.color, opacity: 0.4 }
                  : { backgroundColor: colors.border },
              ]}
            />
          ))}
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Slide */}
      <Animated.View
        style={[
          styles.slideWrap,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {isIntro && (
          <View style={[styles.emojiRing, { backgroundColor: mc.color + '18', borderColor: mc.color + '40' }]}>
            <Text style={styles.emojiLarge}>{module.emoji}</Text>
          </View>
        )}

        {isHighlight ? (
          <View style={[styles.highlightCard, { borderColor: mc.color + '50', backgroundColor: mc.color + '0D' }]}>
            <View style={[styles.highlightAccent, { backgroundColor: mc.color }]} />
            <View style={styles.highlightContent}>
              <Text style={[styles.slideTitle, { color: mc.color }]}>{current.title}</Text>
              <Text style={styles.slideBody}>{current.body}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.plainCard}>
            <Text style={[styles.slideTitle, isIntro && { textAlign: 'center' }]}>{current.title}</Text>
            <Text style={[styles.slideBody, isIntro && { textAlign: 'center' }]}>{current.body}</Text>
          </View>
        )}
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: mc.color }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>
            {isLast ? 'Complete Lesson' : 'Continue'}
          </Text>
          <Text style={styles.continueBtnArrow}>{isLast ? '🎉' : '→'}</Text>
        </TouchableOpacity>
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
  plainCard: { width: '100%' },
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
