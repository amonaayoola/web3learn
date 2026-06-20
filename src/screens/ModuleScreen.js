import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import { colors, spacing, radius } from '../theme';

export default function ModuleScreen({ navigation, route }) {
  const { moduleId } = route.params;
  const module = curriculum.find(m => m.id === moduleId);
  const { isLessonCompleted, isQuizCompleted, getModuleProgress } = useProgress();

  if (!module) return null;

  const { completed, total } = getModuleProgress(module);
  const allLessonsDone = completed === total;
  const quizDone = isQuizCompleted(module.id);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: module.color + '30' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={[styles.iconCircle, { backgroundColor: module.color + '20' }]}>
          <Text style={styles.emoji}>{module.emoji}</Text>
        </View>
        <Text style={styles.moduleTitle}>{module.title}</Text>
        <Text style={styles.moduleDesc}>{module.description}</Text>
        <Text style={styles.progressText}>{completed}/{total} lessons complete</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>LESSONS</Text>

        {module.lessons.map((lesson, index) => {
          const done = isLessonCompleted(lesson.id);
          const prevDone = index === 0 || isLessonCompleted(module.lessons[index - 1].id);
          const locked = !prevDone;

          return (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonRow,
                done && styles.lessonDone,
                locked && styles.lessonLocked,
              ]}
              onPress={() => !locked && navigation.navigate('Lesson', { moduleId, lessonId: lesson.id })}
              activeOpacity={0.7}
            >
              <View style={[styles.lessonNum, { backgroundColor: done ? module.color : colors.border }]}>
                <Text style={styles.lessonNumText}>{done ? '✓' : index + 1}</Text>
              </View>
              <Text style={[styles.lessonTitle, locked && { color: colors.textMuted }]}>
                {lesson.title}
              </Text>
              {done && <Text style={styles.xpTag}>+20 XP</Text>}
              {locked && <Text style={styles.lockTag}>🔒</Text>}
            </TouchableOpacity>
          );
        })}

        <Text style={[styles.sectionLabel, { marginTop: spacing.lg }]}>MODULE QUIZ</Text>

        <TouchableOpacity
          style={[
            styles.quizCard,
            { borderColor: module.color + (allLessonsDone ? '60' : '20') },
            !allLessonsDone && styles.quizLocked,
          ]}
          onPress={() => allLessonsDone && navigation.navigate('Quiz', { moduleId })}
          activeOpacity={0.8}
        >
          <Text style={styles.quizIcon}>{quizDone ? '🏆' : '📝'}</Text>
          <View style={styles.quizInfo}>
            <Text style={[styles.quizTitle, { color: allLessonsDone ? module.color : colors.textMuted }]}>
              {quizDone ? 'Quiz Complete!' : 'Module Quiz'}
            </Text>
            <Text style={styles.quizSubtitle}>
              {allLessonsDone
                ? quizDone ? 'You earned 100 XP' : '5 questions · 100 XP reward'
                : 'Complete all lessons to unlock'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  backBtn: { alignSelf: 'flex-start', marginBottom: spacing.sm },
  backText: { color: colors.primary, fontWeight: '600', fontSize: 15 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emoji: { fontSize: 32 },
  moduleTitle: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  moduleDesc: { fontSize: 13, color: colors.textSecondary, marginBottom: 6 },
  progressText: { fontSize: 12, color: colors.textMuted },
  scroll: { flex: 1 },
  content: { padding: spacing.md },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  lessonDone: { borderLeftWidth: 3, borderLeftColor: '#00E676' },
  lessonLocked: { opacity: 0.5 },
  lessonNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNumText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  lessonTitle: { flex: 1, color: colors.textPrimary, fontWeight: '600', fontSize: 15 },
  xpTag: { color: colors.xpGold, fontWeight: '700', fontSize: 12 },
  lockTag: { fontSize: 14 },
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    padding: spacing.md,
    gap: spacing.md,
  },
  quizLocked: { opacity: 0.5 },
  quizIcon: { fontSize: 32 },
  quizInfo: { flex: 1 },
  quizTitle: { fontWeight: '700', fontSize: 16, marginBottom: 2 },
  quizSubtitle: { color: colors.textSecondary, fontSize: 13 },
});
