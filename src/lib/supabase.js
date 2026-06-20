import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const signUp = async (email, password, username) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: data.user.id, username });
    if (profileError) throw profileError;

    await supabase
      .from('user_progress')
      .insert({ user_id: data.user.id });
  }

  return data;
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user ?? null;
};

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
};

export const syncProgress = async (userId, progressData) => {
  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      xp: progressData.xp,
      streak: progressData.streak,
      completed_lessons: progressData.completedLessons,
      completed_quizzes: progressData.completedQuizzes,
      hearts: progressData.hearts,
      daily_challenge_date: progressData.dailyChallengeDate,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  if (error) console.warn('Sync error:', error);
};

export const loadCloudProgress = async (userId) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data;
};
