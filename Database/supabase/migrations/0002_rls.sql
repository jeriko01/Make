-- =====================================================================
-- Migration 0002: Row Level Security (defense in depth)
-- =====================================================================
-- The FastAPI backend uses the SERVICE ROLE key, which BYPASSES RLS.
-- The API layer is the primary gate: it filters is_published for public
-- reads and verifies admin authorization for every write.
--
-- These RLS policies are a second line of defense in case the anon key is
-- ever used directly against PostgREST:
--   * anon may SELECT only published rows of public content tables
--   * anon may INSERT a contact message (never SELECT them)
--   * everything else is denied to anon/authenticated by default
-- =====================================================================

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

-- ---- Public (anon) SELECT policies: singleton tables (always readable) ----
drop policy if exists p_profile_read on profile;
create policy p_profile_read on profile for select to anon using (true);

drop policy if exists p_hero_read on hero;
create policy p_hero_read on hero for select to anon using (true);

drop policy if exists p_contact_info_read on contact_info;
create policy p_contact_info_read on contact_info for select to anon using (true);

drop policy if exists p_seo_read on seo_metadata;
create policy p_seo_read on seo_metadata for select to anon using (true);

-- ---- Public (anon) SELECT policies: only published rows ----
do $$
declare t text;
begin
  foreach t in array array[
    'hero_stats','about_cards','about_stats','experience','skill_categories',
    'skills','project_categories','projects','services','testimonials','social_links'
  ]
  loop
    execute format('drop policy if exists p_%1$s_read_pub on %1$s;', t);
    execute format(
      'create policy p_%1$s_read_pub on %1$s for select to anon using (is_published = true);', t);
  end loop;
end $$;

-- ---- contact_messages: anon may INSERT only, never SELECT ----
drop policy if exists p_contact_messages_insert on contact_messages;
create policy p_contact_messages_insert on contact_messages
  for insert to anon with check (true);
-- (No SELECT/UPDATE/DELETE policy for anon => denied. Backend uses service role.)

-- NOTE: No policies are created for the `authenticated` role. All privileged
-- reads/writes go through the backend service-role client, which bypasses RLS
-- and enforces admin authorization in application code (app/auth.py).
