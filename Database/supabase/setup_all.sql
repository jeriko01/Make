-- =====================================================================
-- Complete Supabase Setup: Schema + RLS Security
-- Run this ONCE in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ovmckgzjegnhiwxfosfw/sql/new
-- =====================================================================

create extension if not exists "pgcrypto";

-- Enums
do $$ begin
  create type project_platform as enum ('web', 'android', 'ios', 'cross_platform');
exception when duplicate_object then null; end $$;

do $$ begin
  create type skill_type as enum ('language', 'framework', 'library', 'database', 'tool', 'platform');
exception when duplicate_object then null; end $$;

do $$ begin
  create type service_size as enum ('small', 'medium', 'large', 'wide');
exception when duplicate_object then null; end $$;

-- Auto-update updated_at helper
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 1. profile
create table if not exists profile (
  id                     smallint primary key default 1 check (id = 1),
  full_name              text not null default 'Eng make',
  title                  text not null default 'Senior Web & Mobile Engineering Studio',
  tagline                text not null default 'High-performance web and mobile products, built to work.',
  short_bio              text not null default 'I design and engineer full-stack web & mobile products — fast APIs, resilient cloud architectures, and production-ready applications.',
  long_bio               text not null default '',
  avatar_url             text,
  resume_url             text,
  location               text default 'Available Worldwide · Remote',
  email                  text default 'engmake1.1@gmail.com',
  years_experience_label text default 'Senior',
  updated_at             timestamptz not null default now()
);
insert into profile (id) values (1) on conflict (id) do nothing;

-- 2. hero
create table if not exists hero (
  id                  smallint primary key default 1 check (id = 1),
  headline            text not null default 'Engineering Studio',
  subtitle            text not null default 'Web & Mobile Products',
  description         text not null default '',
  primary_cta_label   text not null default 'View Projects',
  primary_cta_href    text not null default '#projects',
  secondary_cta_label text not null default 'Contact',
  secondary_cta_href  text not null default '#contact',
  updated_at          timestamptz not null default now()
);
insert into hero (id) values (1) on conflict (id) do nothing;

create table if not exists hero_stats (
  id            uuid primary key default gen_random_uuid(),
  label         text not null,
  value         text not null,
  display_order int  not null default 0,
  updated_at    timestamptz not null default now()
);

-- 3. about
create table if not exists about_cards (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  body          text not null,
  icon          text,
  display_order int  not null default 0,
  updated_at    timestamptz not null default now()
);

create table if not exists about_stats (
  id            uuid primary key default gen_random_uuid(),
  label         text not null,
  value         text not null,
  display_order int  not null default 0,
  updated_at    timestamptz not null default now()
);

-- 4. experience
create table if not exists experience (
  id             uuid primary key default gen_random_uuid(),
  company        text not null,
  role           text not null,
  location       text,
  start_date     date not null,
  end_date       date,
  is_current     boolean not null default false,
  description    text not null default '',
  tech_tags      text[] not null default '{}',
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  is_sample      boolean not null default false,
  updated_at     timestamptz not null default now(),
  constraint experience_dates_ck check (end_date is null or end_date >= start_date)
);

-- 5. skills
create table if not exists skill_categories (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

create table if not exists skills (
  id               uuid primary key default gen_random_uuid(),
  category_id      uuid references skill_categories(id) on delete set null,
  name             text not null,
  type             skill_type not null default 'tool',
  icon             text,
  proficiency      int check (proficiency between 0 and 100),
  experience_label text,
  display_order    int  not null default 0,
  is_featured      boolean not null default false,
  is_published     boolean not null default true,
  updated_at       timestamptz not null default now()
);

-- 6. projects
create table if not exists project_categories (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  slug           text not null unique,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

create table if not exists projects (
  id             uuid primary key default gen_random_uuid(),
  category_id    uuid references project_categories(id) on delete set null,
  title          text not null,
  slug           text not null unique,
  tagline        text not null default '',
  description    text not null default '',
  platform       project_platform not null default 'web',
  tech_stack     text[] not null default '{}',
  cover_image    text,
  gallery        text[] not null default '{}',
  live_url       text,
  repo_url       text,
  case_study     text,
  is_featured    boolean not null default false,
  is_sample      boolean not null default false,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

-- 7. services
create table if not exists services (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  slug           text not null unique,
  description    text not null default '',
  icon           text,
  card_size      service_size not null default 'medium',
  deliverables   text[] not null default '{}',
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

-- 8. testimonials
create table if not exists testimonials (
  id             uuid primary key default gen_random_uuid(),
  client_name    text not null,
  role_company   text,
  quote          text not null,
  rating         int not null default 5 check (rating between 1 and 5),
  photo_url      text,
  metrics        text,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  is_sample      boolean not null default false,
  updated_at     timestamptz not null default now()
);

-- 9. social_links & contact_info
create table if not exists social_links (
  id             uuid primary key default gen_random_uuid(),
  platform       text not null,
  label          text,
  url            text not null,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

create table if not exists contact_info (
  id               smallint primary key default 1 check (id = 1),
  email            text default 'engmake1.1@gmail.com',
  location         text default 'Available Worldwide · Remote',
  availability     text not null default 'Currently accepting new client projects and engineering roles.',
  updated_at       timestamptz not null default now()
);
insert into contact_info (id) values (1) on conflict (id) do nothing;

create table if not exists seo_metadata (
  id             smallint primary key default 1 check (id = 1),
  title          text not null default 'Eng make — Senior Web & Mobile Engineer',
  description    text not null default 'Portfolio of Eng make, building fast, accessible web applications and Android & iOS applications.',
  keywords       text[] not null default '{}',
  og_image_url   text,
  canonical_url  text,
  twitter_handle text,
  updated_at     timestamptz not null default now()
);
insert into seo_metadata (id) values (1) on conflict (id) do nothing;

-- 10. contact_messages (PRIVATE INBOX)
create table if not exists contact_messages (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  subject      text not null,
  message      text not null,
  is_read      boolean not null default false,
  ip_address   text,
  user_agent   text,
  created_at   timestamptz not null default now()
);

-- Enable RLS everywhere
do $$
declare t text;
begin
  foreach t in array array[
    'profile','hero','hero_stats','about_cards','about_stats','experience',
    'skill_categories','skills','project_categories','projects','services',
    'testimonials','social_links','contact_info','seo_metadata','contact_messages'
  ]
  loop
    execute format('alter table %I enable row level security;', t);
  end loop;
end $$;

-- Public (anon) SELECT policies
drop policy if exists p_profile_read on profile;
create policy p_profile_read on profile for select to anon using (true);

drop policy if exists p_hero_read on hero;
create policy p_hero_read on hero for select to anon using (true);

drop policy if exists p_contact_info_read on contact_info;
create policy p_contact_info_read on contact_info for select to anon using (true);

drop policy if exists p_seo_read on seo_metadata;
create policy p_seo_read on seo_metadata for select to anon using (true);

drop policy if exists p_hero_stats_read on hero_stats;
create policy p_hero_stats_read on hero_stats for select to anon using (true);

drop policy if exists p_about_cards_read on about_cards;
create policy p_about_cards_read on about_cards for select to anon using (true);

drop policy if exists p_about_stats_read on about_stats;
create policy p_about_stats_read on about_stats for select to anon using (true);

do $$
declare t text;
begin
  foreach t in array array[
    'experience','skill_categories','skills','project_categories','projects','services','testimonials','social_links'
  ]
  loop
    execute format('drop policy if exists p_%1$s_read_pub on %1$s;', t);
    execute format(
      'create policy p_%1$s_read_pub on %1$s for select to anon using (is_published = true);', t);
  end loop;
end $$;

-- contact_messages: anon may INSERT only, never SELECT
drop policy if exists p_contact_messages_insert on contact_messages;
create policy p_contact_messages_insert on contact_messages
  for insert to anon with check (true);
