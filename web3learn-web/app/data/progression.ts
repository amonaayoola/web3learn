// Track unlock prerequisites.
// Level 1 tracks have no prerequisites (always unlocked).
// Each entry lists which track IDs must be completed before this track unlocks.

export const TRACK_PREREQUISITES: Record<string, string[]> = {
  // Level 1: always unlocked
  fundamentals: [],
  trading: [],
  ai: [],
  vibecoding: [],

  // Level 2: unlocks after any Level 1 course
  defi: ['fundamentals'],
  nft: ['fundamentals'],
  security: ['fundamentals'],
  tokenomics: ['trading'],

  // Level 3: unlocks after any Level 2 course
  dev: ['defi'],
  layer2: ['defi'],
  proposals: ['defi'],
  identity: ['nft'],
  dao: ['security'],
  marketing: ['nft'],
  business: ['tokenomics'],

  // Level 4: unlocks after any Level 3 course
  crosschain: ['layer2'],
  zkproofs: ['layer2'],
};

export type TrackLevel = 1 | 2 | 3 | 4;

export const TRACK_LEVELS: Record<string, TrackLevel> = {
  fundamentals: 1,
  trading: 1,
  ai: 1,
  vibecoding: 1,
  defi: 2,
  nft: 2,
  security: 2,
  tokenomics: 2,
  dev: 3,
  layer2: 3,
  proposals: 3,
  identity: 3,
  dao: 3,
  marketing: 3,
  business: 3,
  crosschain: 4,
  zkproofs: 4,
};

export const LEVEL_LABELS: Record<TrackLevel, string> = {
  1: 'Start Here',
  2: 'Build Your Foundation',
  3: 'Go Deeper',
  4: 'Advanced Topics',
};
