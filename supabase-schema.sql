-- Run this in your Supabase SQL editor after creating a project

-- Users profile table (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users on delete cascade,
  username text unique not null,
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- User progress table
create table user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  xp integer default 0,
  streak integer default 0,
  completed_lessons jsonb default '{}',
  completed_quizzes jsonb default '{}',
  hearts integer default 5,
  daily_challenge_date text,
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table user_progress enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Progress policies
create policy "Users can view own progress"
  on user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on user_progress for update
  using (auth.uid() = user_id);
