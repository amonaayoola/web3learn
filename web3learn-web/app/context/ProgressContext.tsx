'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressState {
  xp: number;
  streak: number;
  hearts: number;
  completedLessons: string[];
  completedQuizzes: string[];
}
interface ProgressCtx extends ProgressState {
  completeLesson: (id: string, xpAmt?: number) => void;
  completeQuiz: (id: string, xpAmt?: number) => number;
  addXp: (amount: number) => void;
  isLessonCompleted: (id: string) => boolean;
  isQuizCompleted: (id: string) => boolean;
  loseHeart: () => number;
  loaded: boolean;
}

const Ctx = createContext<ProgressCtx | null>(null);
const INIT: ProgressState = { xp: 0, streak: 1, hearts: 5, completedLessons: [], completedQuizzes: [] };

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(INIT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('w3l_progress');
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const persist = (s: ProgressState) => {
    localStorage.setItem('w3l_progress', JSON.stringify(s));
  };

  // All mutators use functional updates so multiple calls in the same tick
  // compose correctly (each reads the latest state) instead of clobbering.
  const completeLesson = (id: string, xpAmt = 20) => {
    setState(prev => {
      if (prev.completedLessons.includes(id)) return prev;
      const next = { ...prev, xp: prev.xp + xpAmt, completedLessons: [...prev.completedLessons, id] };
      persist(next);
      return next;
    });
  };

  const completeQuiz = (id: string, xpAmt = 100) => {
    if (state.completedQuizzes.includes(id)) return 0;
    setState(prev => {
      if (prev.completedQuizzes.includes(id)) return prev;
      const next = { ...prev, xp: prev.xp + xpAmt, completedQuizzes: [...prev.completedQuizzes, id] };
      persist(next);
      return next;
    });
    return xpAmt;
  };

  // Bonus XP not tied to a one-time completion id (e.g. weak-spot review,
  // matching-game accuracy bonus). Always additive.
  const addXp = (amount: number) => {
    if (amount <= 0) return;
    setState(prev => {
      const next = { ...prev, xp: prev.xp + amount };
      persist(next);
      return next;
    });
  };

  const loseHeart = () => {
    const newHearts = Math.max(0, state.hearts - 1);
    setState(prev => {
      const next = { ...prev, hearts: Math.max(0, prev.hearts - 1) };
      persist(next);
      return next;
    });
    return newHearts;
  };

  return (
    <Ctx.Provider value={{
      ...state, loaded,
      completeLesson, completeQuiz, addXp, loseHeart,
      isLessonCompleted: (id) => state.completedLessons.includes(id),
      isQuizCompleted: (id) => state.completedQuizzes.includes(id),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useProgress = () => { const c = useContext(Ctx); if (!c) throw new Error('no progress'); return c; };
