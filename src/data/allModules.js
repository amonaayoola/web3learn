import { curriculum } from './curriculum';
import tracks from './tracks';

/**
 * Find a module by ID across both curriculum and all skill tracks.
 * Returns { module, moduleIndex, color } or { module: null }.
 */
export function findModule(moduleId) {
  // 1. Check main curriculum
  const idx = curriculum.findIndex(m => m.id === moduleId);
  if (idx !== -1) {
    return { module: curriculum[idx], moduleIndex: idx, color: curriculum[idx].color };
  }

  // 2. Search all skill tracks
  for (const track of tracks) {
    for (const mod of track.modules) {
      if (mod.id === moduleId) {
        return { module: mod, moduleIndex: 0, color: mod.color || track.color };
      }
    }
  }

  return { module: null, moduleIndex: -1, color: '#7C3AED' };
}
