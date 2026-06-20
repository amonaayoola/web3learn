import AsyncStorage from '@react-native-async-storage/async-storage';

const HEARTS_KEY = '@web3learn_hearts';
const HEARTS_REFILL_KEY = '@web3learn_hearts_refill';
const MAX_HEARTS = 5;
const REFILL_INTERVAL_MS = 4 * 60 * 60 * 1000; // 4 hours

export const loadHearts = async () => {
  try {
    const [heartsStr, refillStr] = await Promise.all([
      AsyncStorage.getItem(HEARTS_KEY),
      AsyncStorage.getItem(HEARTS_REFILL_KEY),
    ]);

    let hearts = parseInt(heartsStr ?? String(MAX_HEARTS), 10);
    const lastRefill = refillStr ? new Date(refillStr) : new Date();
    const now = new Date();

    // Auto-refill hearts based on elapsed time
    if (hearts < MAX_HEARTS) {
      const elapsed = now - lastRefill;
      const heartsToAdd = Math.floor(elapsed / REFILL_INTERVAL_MS);
      if (heartsToAdd > 0) {
        hearts = Math.min(MAX_HEARTS, hearts + heartsToAdd);
        await AsyncStorage.multiSet([
          [HEARTS_KEY, String(hearts)],
          [HEARTS_REFILL_KEY, now.toISOString()],
        ]);
      }
    }

    return { hearts, lastRefill };
  } catch {
    return { hearts: MAX_HEARTS, lastRefill: new Date() };
  }
};

export const deductHeart = async (currentHearts) => {
  const newHearts = Math.max(0, currentHearts - 1);
  const now = new Date();
  await AsyncStorage.multiSet([
    [HEARTS_KEY, String(newHearts)],
    [HEARTS_REFILL_KEY, now.toISOString()],
  ]);
  return newHearts;
};

export const refillHearts = async () => {
  await AsyncStorage.multiSet([
    [HEARTS_KEY, String(MAX_HEARTS)],
    [HEARTS_REFILL_KEY, new Date().toISOString()],
  ]);
  return MAX_HEARTS;
};

export const getRefillCountdown = (lastRefill) => {
  if (!lastRefill) return null;
  const nextRefill = new Date(new Date(lastRefill).getTime() + REFILL_INTERVAL_MS);
  const remaining = nextRefill - new Date();
  if (remaining <= 0) return '0:00';
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
};

export const MAX_HEARTS_COUNT = MAX_HEARTS;
