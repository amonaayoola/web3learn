import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllQuizQuestions } from '../data/curriculum';

const DAILY_CHALLENGE_KEY = '@web3learn_daily_challenge';
const DAILY_CHALLENGE_DATE_KEY = '@web3learn_daily_challenge_date';

const getTodayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

// Deterministic shuffle based on date seed
const seededShuffle = (arr, seed) => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getDateSeed = () => {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

export const getDailyChallenge = () => {
  const all = getAllQuizQuestions();
  const seed = getDateSeed();
  const shuffled = seededShuffle(all, seed);
  return shuffled.slice(0, 5);
};

export const isDailyChallengeCompleted = async () => {
  try {
    const dateStr = await AsyncStorage.getItem(DAILY_CHALLENGE_DATE_KEY);
    return dateStr === getTodayString();
  } catch {
    return false;
  }
};

export const markDailyChallengeComplete = async () => {
  try {
    await AsyncStorage.setItem(DAILY_CHALLENGE_DATE_KEY, getTodayString());
  } catch {}
};

export const getMidnightCountdown = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const remaining = midnight - now;
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
