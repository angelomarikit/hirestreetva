-- Office gallery CMS + featured video for homepage section

alter table public.site_settings
  add column if not exists office_featured_video_url text;

create table if not exists public.office_gallery_items (
  id uuid primary key default gen_random_uuid(),
  media_type text not null check (media_type in ('image', 'video')),
  public_url text not null,
  storage_path text,
  caption text not null default '',
  grid_layout text not null default 'standard'
    check (grid_layout in ('large', 'standard', 'wide')),
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.office_gallery_items enable row level security;

create policy "public_read_office_gallery_published"
  on public.office_gallery_items for select
  using (is_published = true);

create policy "admin_all_office_gallery"
  on public.office_gallery_items for all
  using (public.is_admin())
  with check (public.is_admin());

update storage.buckets
set
  file_size_limit = 52428800,
  allowed_mime_types = array[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
    'video/mp4', 'video/webm', 'video/quicktime'
  ]
where id = 'website-media';

insert into public.office_gallery_items (media_type, public_url, caption, grid_layout, sort_order, is_published)
select * from (values
  ('image', '/images/office/office-01.jpg', 'Reception lounge with warm wood and modern seating', 'large', 1, true),
  ('image', '/images/office/office-02.jpg', 'Collaborative workspace with curved arch and city views', 'standard', 2, true),
  ('image', '/images/office/office-03.jpg', 'Office pantry and bar area overlooking the skyline', 'standard', 3, true),
  ('image', '/images/office/office-04.jpg', 'Executive meeting room with marble table', 'standard', 4, true),
  ('image', '/images/office/office-05.jpg', 'Premium reception desk and welcome area', 'standard', 5, true),
  ('image', '/images/office/office-06.jpg', 'Lounge with arched shelving and presentation screen', 'standard', 6, true),
  ('image', '/images/office/office-07.jpg', 'Signature Alveo Park Triangle Tower — Bonifacio Global City', 'wide', 7, true)
) as v(media_type, public_url, caption, grid_layout, sort_order, is_published)
where not exists (select 1 from public.office_gallery_items limit 1);
