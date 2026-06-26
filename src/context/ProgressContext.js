import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadStreakData, recordActivity } from '../utils/streakUtils';
import { loadHearts, deductHeart } from '../utils/heartsUtils';
import { isDailyChallengeCompleted, markDailyChallengeComplete } from '../utils/dailyChallengeUtils';

const ProgressContext = createContext(null);

const PROGRESS_KEY = '@web3learn_progress';
const XP_KEY = '@web3learn_xp';
const MP_KEY = '@web3learn_mp';
const LEVEL_KEY = '@web3learn_level';

// New users start with enough MAIDEN Points to try a game before earning more from quizzes
const STARTER_MP = 20;
const QUIZ_MP_REWARD = 5;

// Modules unlocked from the start for each level
const LEVEL_UNLOCKED = {
  beginner: 1,      // only module 1 unlocked, sequential after
  intermediate: 3,  // modules 1-3 unlocked, rest sequential
  expert: 6,        // all 6 modules unlocked immediately
};

export const ProgressProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [mp, setMp] = useState(STARTER_MP);
  const [completedLessons, setCompletedLessons] = useState({});
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [streak, setStreak] = useState(0);
  const [freezeAvailable, setFreezeAvailable] = useState(true);
  const [hearts, setHearts] = useState(5);
  const [heartsLastRefill, setHeartsLastRefill] = useState(null);
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);
  const [consecutiveLessons, setConsecutiveLessons] = useState(0);
  const [userLevel, setUserLevelState] = useState(null); // null = not onboarded
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const [progressStr, xpStr, mpStr, streakData, heartsData, dcCompleted, levelStr] = await Promise.all([
          AsyncStorage.getItem(PROGRESS_KEY),
          AsyncStorage.getItem(XP_KEY),
          AsyncStorage.getItem(MP_KEY),
          loadStreakData(),
          loadHearts(),
          isDailyChallengeCompleted(),
          AsyncStorage.getItem(LEVEL_KEY),
        ]);

        if (progressStr) {
          const p = JSON.parse(progressStr);
          setCompletedLessons(p.completedLessons || {});
          setCompletedQuizzes(p.completedQuizzes || {});
        }
        if (xpStr) setXp(parseInt(xpStr, 10));
        if (mpStr !== null) setMp(parseInt(mpStr, 10));
        else await AsyncStorage.setItem(MP_KEY, String(STARTER_MP));
        if (levelStr) setUserLevelState(levelStr);

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

  const addMP = async (amount) => {
    const newMP = mp + amount;
    setMp(newMP);
    await AsyncStorage.setItem(MP_KEY, String(newMP));
    return newMP;
  };

  // Returns false (and leaves balance untouched) if the user can't afford the cost
  const deductMP = async (amount) => {
    if (mp < amount) return false;
    const newMP = mp - amount;
    setMp(newMP);
    await AsyncStorage.setItem(MP_KEY, String(newMP));
    return true;
  };

  const setLevel = async (level) => {
    setUserLevelState(level);
    await AsyncStorage.setItem(LEVEL_KEY, level);
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
    await addMP(QUIZ_MP_REWARD);

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

  // Returns true if module at given index is accessible based on userLevel + progress
  const isModuleLocked = (index, curriculum) => {
    if (!userLevel) return index > 0; // default: sequential
    const freeCount = LEVEL_UNLOCKED[userLevel] || 1;
    // Modules within freeCount are always accessible
    if (index < freeCount) return false;
    // Beyond freeCount, require the previous module's quiz to be done
    const prevModule = curriculum[index - 1];
    return prevModule ? !completedQuizzes[prevModule.id] : false;
  };

  // Starting module index for this level (for highlighting on HomeScreen)
  const startingModuleIndex = (() => {
    if (!userLevel) return 0;
    return Math.min(LEVEL_UNLOCKED[userLevel] - 1, 5);
  })();

  return (
    <ProgressContext.Provider value={{
      xp,
      mp,
      streak,
      freezeAvailable,
      hearts,
      heartsLastRefill,
      dailyChallengeCompleted,
      consecutiveLessons,
      completedLessons,
      completedQuizzes,
      loaded,
      userLevel,
      isOnboarded: userLevel !== null,
      startingModuleIndex,
      setLevel,
      addXP,
      addMP,
      deductMP,
      completeLesson,
      completeQuiz,
      loseHeart,
      resetConsecutiveLessons,
      isLessonCompleted,
      isQuizCompleted,
      getModuleProgress,
      isModuleLocked,
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
