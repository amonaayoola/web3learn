import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadStreakData, recordActivity } from '../utils/streakUtils';
import { loadHearts, deductHeart } from '../utils/heartsUtils';
import { isDailyChallengeCompleted, markDailyChallengeComplete } from '../utils/dailyChallengeUtils';

const ProgressContext = createContext(null);

const PROGRESS_KEY = '@web3learn_progress';
const XP_KEY = '@web3learn_xp';

export const ProgressProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState({});
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [streak, setStreak] = useState(0);
  const [freezeAvailable, setFreezeAvailable] = useState(true);
  const [hearts, setHearts] = useState(5);
  const [heartsLastRefill, setHeartsLastRefill] = useState(null);
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);
  const [consecutiveLessons, setConsecutiveLessons] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const [progressStr, xpStr, streakData, heartsData, dcCompleted] = await Promise.all([
          AsyncStorage.getItem(PROGRESS_KEY),
          AsyncStorage.getItem(XP_KEY),
          loadStreakData(),
          loadHearts(),
          isDailyChallengeCompleted(),
        ]);

        if (progressStr) {
          const p = JSON.parse(progressStr);
          setCompletedLessons(p.completedLessons || {});
          setCompletedQuizzes(p.completedQuizzes || {});
        }
        if (xpStr) setXp(parseInt(xpStr, 10));

        // Record today's activity and update streak
        const newStreak = await recordActivity(streakData.streak, streakData.lastActivity);
        setStreak(newStreak);
        setFreezeAvailable(streakData.freezeAvailable);

        setHearts(heartsData.hearts);
        setHeartsLastRefill(heartsData.lastRefill);
        setDailyChallengeCompleted(dcCompleted);
      } catch (e) {
        console.warn('Error loading progress:', e);
      } finally {
        setLoaded(true);
      }
    };
    init();
  }, []);

  const saveProgress = async (lessons, quizzes) => {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify({ completedLessons: lessons, completedQuizzes: quizzes }));
  };

  const addXP = async (amount) => {
    const newXP = xp + amount;
    setXp(newXP);
    await AsyncStorage.setItem(XP_KEY, String(newXP));
    return newXP;
  };

  const completeLesson = async (lessonId, xpReward = 20) => {
    if (completedLessons[lessonId]) return;
    const newLessons = { ...completedLessons, [lessonId]: true };
    setCompletedLessons(newLessons);
    await saveProgress(newLessons, completedQuizzes);
    await addXP(xpReward);

    const newConsec = consecutiveLessons + 1;
    setConsecutiveLessons(newConsec);
    return newConsec;
  };

  const completeQuiz = async (moduleId, xpReward = 100, isDaily = false) => {
    const finalXP = isDaily ? xpReward * 2 : xpReward;
    if (!completedQuizzes[moduleId]) {
      const newQuizzes = { ...completedQuizzes, [moduleId]: true };
      setCompletedQuizzes(newQuizzes);
      await saveProgress(completedLessons, newQuizzes);
    }
    await addXP(finalXP);

    if (isDaily) {
      setDailyChallengeCompleted(true);
      await markDailyChallengeComplete();
    }

    return finalXP;
  };

  const loseHeart = async () => {
    const newHearts = await deductHeart(hearts);
    setHearts(newHearts);
    return newHearts;
  };

  const resetConsecutiveLessons = () => setConsecutiveLessons(0);

  const isLessonCompleted = (lessonId) => !!completedLessons[lessonId];
  const isQuizCompleted = (moduleId) => !!completedQuizzes[moduleId];

  const getModuleProgress = (module) => {
    const total = module.lessons.length;
    const done = module.lessons.filter(l => completedLessons[l.id]).length;
    return { completed: done, total, percentage: total > 0 ? done / total : 0 };
  };

  return (
    <ProgressContext.Provider value={{
      xp,
      streak,
      freezeAvailable,
      hearts,
      heartsLastRefill,
      dailyChallengeCompleted,
      consecutiveLessons,
      completedLessons,
      completedQuizzes,
      loaded,
      addXP,
      completeLesson,
      completeQuiz,
      loseHeart,
      resetConsecutiveLessons,
      isLessonCompleted,
      isQuizCompleted,
      getModuleProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};
