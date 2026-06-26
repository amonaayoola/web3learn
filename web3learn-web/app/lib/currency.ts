export interface UserCurrency {
  xp: number;
  mp: number;
}

/** Always reads fresh from localStorage - use inside useEffect */
export function getFreshCurrency(): UserCurrency {
  if (typeof window === 'undefined') return { xp: 0, mp: 0 };
  const raw = localStorage.getItem('maiden_user');
  if (!raw) return { xp: 0, mp: 0 };
  try {
    const user = JSON.parse(raw);
    return { xp: user.xp || 0, mp: user.mp || 0 };
  } catch { return { xp: 0, mp: 0 }; }
}
