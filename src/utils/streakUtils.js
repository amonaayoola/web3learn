import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = '@web3learn_streak';
const LAST_ACTIVITY_KEY = '@web3learn_last_activity';
const FREEZE_KEY = '@web3learn_freeze';
const FREEZE_USED_WEEK_KEY = '@web3learn_freeze_used_week';

const getISOWeek = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
    )
  );
};

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const isYesterday = (date, today) => {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return isSameDay(date, yesterday);
};

export const loadStreakData = async () => {
  try {
    const [streakStr, lastActivityStr, freezeStr, freezeWeekStr] = await Promise.all([
      AsyncStorage.getItem(STREAK_KEY),
      AsyncStorage.getItem(LAST_ACTIVITY_KEY),
      AsyncStorage.getItem(FREEZE_KEY),
      AsyncStorage.getItem(FREEZE_USED_WEEK_KEY),
    ]);

    const streak = parseInt(streakStr || '0', 10);
    const lastActivity = lastActivityStr ? new Date(lastActivityStr) : null;
    const hasFreeze = freezeStr === 'true';
    const today = new Date();
    const currentWeek = getISOWeek(today);
    const freezeUsedWeek = parseInt(freezeWeekStr || '0', 10);

    // Reset freeze availability each week
    const freezeAvailable = freezeUsedWeek !== currentWeek;

    return { streak, lastActivity, hasFreeze, freezeAvailable };
  } catch {
    return { streak: 0, lastActivity: null, hasFreeze: false, freezeAvailable: true };
  }
};

export const recordActivity = async (currentStreak, lastActivity) => {
  const today = new Date();

  if (lastActivity && isSameDay(new Date(lastActivity), today)) {
    // Already recorded today
    return currentStreak;
  }

  let newStreak = currentStreak;

  if (!lastActivity) {
    newStreak = 1;
  } else {
    const last = new Date(lastActivity);
    if (isYesterday(last, today)) {
      newStreak = currentStreak + 1;
    } else {
      // Check if freeze should be used
      const freezeStr = await AsyncStorage.getItem(FREEZE_KEY);
      const hasFreeze = freezeStr === 'true';
      const freezeWeekStr = await AsyncStorage.getItem(FREEZE_USED_WEEK_KEY);
      const freezeUsedWeek = parseInt(freezeWeekStr || '0', 10);
      const currentWeek = getISOWeek(today);

      // Gap of 2 days and freeze available
      const dayDiff = Math.floor((today - last) / 86400000);
      if (dayDiff === 2 && hasFreeze && freezeUsedWeek !== currentWeek) {
        // Use freeze
        await AsyncStorage.setItem(FREEZE_KEY, 'false');
        await AsyncStorage.setItem(FREEZE_USED_WEEK_KEY, String(currentWeek));
        newStreak = currentStreak; // Preserve streak
      } else {
        newStreak = 1; // Reset streak
      }
    }
  }

  await AsyncStorage.multiSet([
    [STREAK_KEY, String(newStreak)],
    [LAST_ACTIVITY_KEY, today.toISOString()],
  ]);

  return newStreak;
};

export const grantWeeklyFreeze = async () => {
  const today = new Date();
  const currentWeek = getISOWeek(today);
  const freezeWeekStr = await AsyncStorage.getItem(FREEZE_USED_WEEK_KEY);
  const freezeUsedWeek = parseInt(freezeWeekStr || '0', 10);

  if (freezeUsedWeek !== currentWeek) {
    await AsyncStorage.setItem(FREEZE_KEY, 'true');
  }
};
