export const RANKS = [
  { name: 'Crypto Curious', minXP: 0, maxXP: 99, color: '#A0A3B1', emoji: '🌱' },
  { name: 'Block Builder', minXP: 100, maxXP: 299, color: '#00E5C3', emoji: '🔨' },
  { name: 'Chain Explorer', minXP: 300, maxXP: 599, color: '#7C4DFF', emoji: '🧭' },
  { name: 'DeFi Navigator', minXP: 600, maxXP: 999, color: '#FF6B6B', emoji: '🚀' },
  { name: 'Web3 Master', minXP: 1000, maxXP: Infinity, color: '#FFD700', emoji: '👑' },
];

export const getRank = (xp) => {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) return RANKS[i];
  }
  return RANKS[0];
};

export const getNextRank = (xp) => {
  for (let i = 0; i < RANKS.length; i++) {
    if (xp < RANKS[i].maxXP) {
      const next = RANKS[i + 1];
      return next || null;
    }
  }
  return null;
};

export const getRankProgress = (xp) => {
  const current = getRank(xp);
  if (current.maxXP === Infinity) return { progress: 1, xpInRank: xp - current.minXP, xpNeeded: 0 };
  const xpInRank = xp - current.minXP;
  const xpNeeded = current.maxXP - current.minXP + 1;
  return { progress: xpInRank / xpNeeded, xpInRank, xpNeeded };
};
