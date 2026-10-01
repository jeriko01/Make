-- =====================================================================
-- Make — Portfolio for Sharmaarke
-- Migration 0001: Schema (tables, enums, relationships, constraints, indexes)
-- =====================================================================
-- Apply with the Supabase SQL editor or the Supabase CLI:
--   supabase db push        (CLI, from the /supabase directory)
-- or paste each migration, in order, into the SQL editor.
-- =====================================================================

create extension if not exists "pgcrypto";      -- gen_random_uuid()

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------
do $$ begin
  create type project_platform as enum ('web', 'android', 'ios', 'cross_platform');
exception when duplicate_object then null; end $$;

do $$ begin
  create type skill_type as enum ('language', 'framework', 'library', 'database', 'tool', 'platform');
exception when duplicate_object then null; end $$;

do $$ begin
  create type service_size as enum ('small', 'medium', 'large', 'wide');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- Helper: auto-update updated_at
-- ---------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------
-- profile  (single row: id is fixed to 1)
-- ---------------------------------------------------------------------
create table if not exists profile (
  id                     smallint primary key default 1 check (id = 1),
  full_name              text not null default 'Sharmaarke',
  title                  text not null default 'Web & Mobile App Developer',
  tagline                text not null default '',
  short_bio              text not null default '',
  long_bio               text not null default '',
  avatar_url             text,
  resume_url             text,
  location               text,
  email                  text,
  years_experience_label text not null default '3+ years',
  updated_at             timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- hero (single row)
-- ---------------------------------------------------------------------
create table if not exists hero (
  id                    smallint primary key default 1 check (id = 1),
  headline              text not null default '',
  subtitle              text not null default '',
  description           text not null default '',
  primary_cta_label     text not null default 'View Projects',
  primary_cta_href      text not null default '#projects',
  secondary_cta_label   text not null default 'Contact Me',
  secondary_cta_href    text not null default '#contact',
  updated_at            timestamptz not null default now()
);

create table if not exists hero_stats (
  id             uuid primary key default gen_random_uuid(),
  label          text not null,
  value          text not null,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- about
-- ---------------------------------------------------------------------
create table if not exists about_cards (
  id             uuid primary key default gen_random_uuid(),
  icon           text not null default 'Sparkles',
  title          text not null,
  description    text not null default '',
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

create table if not exists about_stats (
  id             uuid primary key default gen_random_uuid(),
  label          text not null,
  value          text not null,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- experience timeline
-- ---------------------------------------------------------------------
create table if not exists experience (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  organization   text,
  start_date     date not null,
  end_date       date,                          -- null => "Present" when is_current
  is_current     boolean not null default false,
  description    text not null default '',
  tech_tags      text[] not null default '{}',
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  is_sample      boolean not null default false,   -- clearly-labeled SAMPLE data
  updated_at     timestamptz not null default now(),
  constraint experience_dates_ck check (end_date is null or end_date >= start_date)
);

-- ---------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------
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
  proficiency      int check (proficiency between 0 and 100),  -- optional
  experience_label text,
  display_order    int  not null default 0,
  is_published     boolean not null default true,
  updated_at       timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------
create table if not exists project_categories (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  slug           text not null unique,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

create table if not exists projects (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique,
  category_id     uuid references project_categories(id) on delete set null,
  platform        project_platform not null default 'web',
  summary         text not null default '',
  description     text not null default '',
  cover_image_url text,
  gallery         text[] not null default '{}',
  tech_tags       text[] not null default '{}',
  metrics         jsonb,                          -- optional honest metrics [{label,value}]
  live_url        text,
  github_url      text,
  app_store_url   text,
  google_play_url text,
  is_featured     boolean not null default false,
  is_published    boolean not null default true,
  display_order   int  not null default 0,
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- services (bento grid)
-- ---------------------------------------------------------------------
create table if not exists services (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text not null default '',
  icon           text not null default 'Layers',
  size           service_size not null default 'medium',
  accent         text not null default 'violet',
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------
create table if not exists testimonials (
  id             uuid primary key default gen_random_uuid(),
  client_name    text not null,
  role_company   text,
  quote          text not null,
  rating         int not null default 5 check (rating between 1 and 5),
  photo_url      text,
  metrics        text,                            -- optional honest metric line
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  is_sample      boolean not null default false,  -- clearly-labeled SAMPLE data
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- social links & contact info (single row)
-- ---------------------------------------------------------------------
create table if not exists social_links (
  id             uuid primary key default gen_random_uuid(),
  platform       text not null,                   -- github | linkedin | twitter | ...
  label          text,
  url            text not null,
  display_order  int  not null default 0,
  is_published   boolean not null default true,
  updated_at     timestamptz not null default now()
);

create table if not exists contact_info (
  id               smallint primary key default 1 check (id = 1),
  email            text,
  location         text,
  availability     text not null default '',
  updated_at       timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- SEO metadata (single row)
-- ---------------------------------------------------------------------
create table if not exists seo_metadata (
  id             smallint primary key default 1 check (id = 1),
  title          text not null default 'Make — Sharmaarke',
  description    text not null default '',
  keywords       text[] not null default '{}',
  og_image_url   text,
  canonical_url  text,
  twitter_handle text,
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- contact messages (PRIVATE — never publicly readable)
-- ---------------------------------------------------------------------
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

-- ---------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------
create index if not exists idx_hero_stats_order      on hero_stats(display_order);
create index if not exists idx_about_cards_order      on about_cards(display_order);
create index if not exists idx_about_stats_order      on about_stats(display_order);
create index if not exists idx_experience_order        on experience(display_order);
create index if not exists idx_experience_published    on experience(is_published);
create index if not exists idx_skill_categories_order  on skill_categories(display_order);
create index if not exists idx_skills_category         on skills(category_id);
create index if not exists idx_skills_order            on skills(display_order);
create index if not exists idx_projects_published      on projects(is_published);
create index if not exists idx_projects_platform       on projects(platform);
create index if not exists idx_projects_category       on projects(category_id);
create index if not exists idx_projects_order          on projects(display_order);
create index if not exists idx_projects_featured       on projects(is_featured);
create index if not exists idx_services_order          on services(display_order);
create index if not exists idx_testimonials_order      on testimonials(display_order);
create index if not exists idx_social_links_order      on social_links(display_order);
create index if not exists idx_contact_messages_read   on contact_messages(is_read);
create index if not exists idx_contact_messages_created on contact_messages(created_at desc);

-- ---------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'profile','hero','hero_stats','about_cards','about_stats','experience',
    'skill_categories','skills','project_categories','projects','services',
    'testimonials','social_links','contact_info','seo_metadata'
  ]
  loop
    execute format(
      'drop trigger if exists trg_%1$s_updated on %1$s;
       create trigger trg_%1$s_updated before update on %1$s
       for each row execute function set_updated_at();', t);
  end loop;
end $$;

-- Ensure singleton rows exist
insert into profile (id)      values (1) on conflict (id) do nothing;
insert into hero (id)         values (1) on conflict (id) do nothing;
insert into contact_info (id) values (1) on conflict (id) do nothing;
insert into seo_metadata (id) values (1) on conflict (id) do nothing;
