'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthState { isAuthenticated: boolean; isGuest: boolean; email: string | null; }
interface AuthCtx extends AuthState {
  signIn: (email: string, pw: string) => Promise<void>;
  signUp: (email: string, pw: string) => Promise<void>;
  continueAsGuest: () => void;
  signOut: () => void;
  loading: boolean;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ isAuthenticated: false, isGuest: false, email: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('w3l_auth');
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const save = (s: AuthState) => {
    setState(s);
    localStorage.setItem('w3l_auth', JSON.stringify(s));
  };

  const signIn = async (email: string, _pw: string) => {
    await new Promise(r => setTimeout(r, 600));
    save({ isAuthenticated: true, isGuest: false, email });
  };
  const signUp = async (email: string, _pw: string) => {
    await new Promise(r => setTimeout(r, 600));
    save({ isAuthenticated: true, isGuest: false, email });
  };
  const continueAsGuest = () => save({ isAuthenticated: true, isGuest: true, email: null });
  const signOut = () => {
    localStorage.removeItem('w3l_auth');
    setState({ isAuthenticated: false, isGuest: false, email: null });
  };

  return <Ctx.Provider value={{ ...state, signIn, signUp, continueAsGuest, signOut, loading }}>{children}</Ctx.Provider>;
}

export const useAuth = () => { const c = useContext(Ctx); if (!c) throw new Error('no auth'); return c; };
