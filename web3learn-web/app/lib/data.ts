import type { Track } from './types';

// Use require to import JS files without module issues
const tracks: Track[] = require('../data/index.js').default;

export function getAllTracks(): Track[] {
  return tracks;
}

export function getTrack(id: string): Track | undefined {
  return tracks.find(t => t.id === id);
}

export function getModule(trackId: string, moduleId: string) {
  const track = getTrack(trackId);
  return track?.modules.find(m => m.id === moduleId);
}

export function getLesson(trackId: string, moduleId: string, lessonId: string) {
  const mod = getModule(trackId, moduleId);
  return mod?.lessons.find(l => l.id === lessonId);
}
