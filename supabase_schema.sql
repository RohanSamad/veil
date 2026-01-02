-- VEIL Phase 2 Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. User Profiles
-- Extends standard Supabase auth.users
create table public.user_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.user_profiles enable row level security;

-- RLS: Users can read/update their own profile
create policy "Users can view own profile" 
  on public.user_profiles for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on public.user_profiles for update 
  using (auth.uid() = id);

-- 3. ELL State
-- Stores the user's emotional language patterns
create table public.ell_state (
  user_id uuid references public.user_profiles(id) on delete cascade primary key,
  
  -- Core ELL Data (JSONB for flexibility as schema evolves)
  state_data jsonb default '{
    "dominant_patterns": [],
    "coherence_indicators": {},
    "calibration_flags": {},
    "interaction_meta": {
      "total_interactions": 0,
      "last_interaction": null
    }
  }'::jsonb,
  
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.ell_state enable row level security;

-- RLS: Users can read/update their own state
create policy "Users can view own ELL state" 
  on public.ell_state for select 
  using (auth.uid() = user_id);

create policy "Users can update own ELL state" 
  on public.ell_state for update 
  using (auth.uid() = user_id);

-- 4. Interaction Logs
-- Metadata only (NO RAW MESSAGES stored by default)
create table public.interaction_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.user_profiles(id) on delete cascade,
  trace_id text not null,
  
  -- What mode was used?
  mode text not null, -- 'road_test', 'scenario', etc.
  
  -- High-level signals
  intensity_score int,
  risk_level text,
  outcome_verdict text,
  
  -- Pattern tag assigned
  pattern_tag text,
  
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.interaction_logs enable row level security;

create policy "Users can view own logs" 
  on public.interaction_logs for select 
  using (auth.uid() = user_id);

create policy "Users can insert own logs" 
  on public.interaction_logs for insert 
  with check (auth.uid() = user_id);

-- 5. Auto-create profile on signup trigger
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.user_profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  -- Initialize empty ELL state
  insert into public.ell_state (user_id) values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
