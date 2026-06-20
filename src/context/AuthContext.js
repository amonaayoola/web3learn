import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, signIn as sbSignIn, signUp as sbSignUp, signOut as sbSignOut, syncProgress, loadCloudProgress } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const data = await sbSignIn(email, password);
    setUser(data.user);
    setIsGuest(false);
    return data;
  };

  const signUp = async (email, password, username) => {
    const data = await sbSignUp(email, password, username);
    if (data.user) {
      setUser(data.user);
      setIsGuest(false);
    }
    return data;
  };

  const signOut = async () => {
    await sbSignOut();
    setUser(null);
    setIsGuest(false);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setUser(null);
  };

  const syncToCloud = async (progressData) => {
    if (!user) return;
    try {
      await syncProgress(user.id, progressData);
    } catch (e) {
      console.warn('Cloud sync failed:', e);
    }
  };

  const pullFromCloud = async () => {
    if (!user) return null;
    try {
      return await loadCloudProgress(user.id);
    } catch (e) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isGuest,
      loading,
      profile,
      signIn,
      signUp,
      signOut,
      continueAsGuest,
      syncToCloud,
      pullFromCloud,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
