export interface UserCurrency {
  xp: number;
  mp: number;
}

export function getUserCurrency(): UserCurrency {
  if (typeof window === 'undefined') return { xp: 0, mp: 0 };
  const raw = localStorage.getItem('maiden_user');
  if (!raw) return { xp: 0, mp: 0 };
  try {
    const user = JSON.parse(raw);
    return { xp: user.xp || 0, mp: user.mp || 0 };
  } catch {
    return { xp: 0, mp: 0 };
  }
}

export function getUserXP(): number {
  return getUserCurrency().xp;
}

export function getUserMP(): number {
  return getUserCurrency().mp;
}

export function addXP(amount: number): void {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem('maiden_user');
  if (!raw) return;
  try {
    const user = JSON.parse(raw);
    user.xp = (user.xp || 0) + amount;
    localStorage.setItem('maiden_user', JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function addMP(amount: number): void {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem('maiden_user');
  if (!raw) return;
  try {
    const user = JSON.parse(raw);
    user.mp = (user.mp || 0) + amount;
    localStorage.setItem('maiden_user', JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function deductMP(amount: number): boolean {
  if (typeof window === 'undefined') return false;
  // Test mode bypasses MP gate
  if (localStorage.getItem('maiden_test_mode') === 'true') return true;
  const raw = localStorage.getItem('maiden_user');
  if (!raw) return false;
  try {
    const user = JSON.parse(raw);
    if ((user.mp || 0) < amount) return false;
    user.mp = (user.mp || 0) - amount;
    localStorage.setItem('maiden_user', JSON.stringify(user));
    return true;
  } catch {
    return false;
  }
}

// Keep deductXP as alias for backward compat — games now cost MP
export function deductXP(amount: number): boolean {
  return deductMP(amount);
}
