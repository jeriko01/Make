-- =====================================================================
-- Migration 0004: Storage buckets for image uploads
-- =====================================================================
-- One public bucket for images referenced by the public site.
-- Uploads happen through the FastAPI backend using the service-role key,
-- so no anon insert policy is needed. Public read is allowed so <img> tags
-- can load covers/avatars/testimonial photos.
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;

-- Public read of objects in the media bucket
drop policy if exists p_media_public_read on storage.objects;
create policy p_media_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'media');

-- Writes are performed by the backend via the service-role key (bypasses RLS).
-- No anon/authenticated insert/update/delete policies are defined on purpose.
