-- Extended CMS: images, address, page copy, media library, storage

alter table public.site_settings
  add column if not exists phone text,
  add column if not exists address_line1 text,
  add column if not exists address_line2 text,
  add column if not exists address_line3 text,
  add column if not exists instagram_url text,
  add column if not exists linkedin_url text,
  add column if not exists image_home_about text,
  add column if not exists image_about_page text,
  add column if not exists image_contact_panel text,
  add column if not exists image_careers_panel text,
  add column if not exists image_business_cta text;

create table if not exists public.content_entries (
  key text primary key,
  group_label text not null,
  field_label text not null,
  field_type text not null check (field_type in ('text', 'textarea', 'image', 'url')),
  value text not null default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text not null unique,
  public_url text not null,
  alt_text text,
  folder text not null default 'general',
  created_at timestamptz not null default now()
);

alter table public.content_entries enable row level security;
alter table public.media_assets enable row level security;

create policy "public_read_content_entries" on public.content_entries
  for select using (true);

create policy "admin_all_content_entries" on public.content_entries
  for all using (public.is_admin()) with check (public.is_admin());

create policy "public_read_media_assets" on public.media_assets
  for select using (true);

create policy "admin_all_media_assets" on public.media_assets
  for all using (public.is_admin()) with check (public.is_admin());

-- Admin can read all services/faqs/jobs (including drafts) via existing admin_all_* policies

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'website-media',
  'website-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public, file_size_limit)
values ('resumes', 'resumes', false, 5242880)
on conflict (id) do nothing;

create policy "public_read_website_media"
on storage.objects for select
using (bucket_id = 'website-media');

create policy "admin_upload_website_media"
on storage.objects for insert
with check (bucket_id = 'website-media' and public.is_admin());

create policy "admin_update_website_media"
on storage.objects for update
using (bucket_id = 'website-media' and public.is_admin());

create policy "admin_delete_website_media"
on storage.objects for delete
using (bucket_id = 'website-media' and public.is_admin());

create policy "admin_all_resumes"
on storage.objects for all
using (bucket_id = 'resumes' and public.is_admin())
with check (bucket_id = 'resumes' and public.is_admin());

-- Seed site settings (upsert)
insert into public.site_settings (
  id, site_name, tagline, hero_eyebrow, hero_title_line1, hero_title_line2, hero_description,
  hero_image_url, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href,
  meta_title, meta_description, og_image_url,
  address_line1, address_line2, address_line3,
  image_home_about, image_about_page, image_contact_panel, image_careers_panel, image_business_cta
) values (
  1,
  'Hire Street VA',
  'Executive-Level Virtual Talent for Ambitious Businesses.',
  'EXECUTIVE BUSINESS SUPPORT SERVICES',
  'Exceptional Support.',
  'Limitless Possibilities.',
  'Build a stronger, more efficient business with virtual professionals who help you focus on what matters most.',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80',
  'Hire a Virtual Assistant', '/hire',
  'Explore Our Services', '/services',
  'Hire Street VA | Executive Business Support Services',
  'Hire Street VA connects ambitious businesses with executive-level virtual assistants for operations, support, and growth.',
  '/images/og-share.jpg',
  '26th Floor, Signature Alveo Park Triangle Tower',
  '32nd Street Corner 11th Avenue',
  'Bonifacio Global City',
  '/images/home-brand-collage.jpg',
  '/images/about-executive.jpg',
  '/images/about-collaboration.jpg',
  '/images/careers-strategy.jpg',
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2400&q=80'
)
on conflict (id) do update set
  address_line1 = excluded.address_line1,
  address_line2 = excluded.address_line2,
  address_line3 = excluded.address_line3,
  image_home_about = excluded.image_home_about,
  image_about_page = excluded.image_about_page,
  image_contact_panel = excluded.image_contact_panel,
  image_careers_panel = excluded.image_careers_panel,
  image_business_cta = excluded.image_business_cta;

-- Page copy defaults
insert into public.content_entries (key, group_label, field_label, field_type, value, sort_order) values
  ('home.about.title.line1', 'Home Page', 'About section — headline line 1', 'text', 'Great Businesses', 10),
  ('home.about.title.line2', 'Home Page', 'About section — headline line 2 (serif)', 'text', 'Are Never Built Alone.', 11),
  ('home.about.body', 'Home Page', 'About section — description', 'textarea', 'Hire Street VA helps businesses access virtual support so leaders can focus on growth, relationships, and meaningful work — with a premium experience from inquiry to collaboration.', 12),
  ('about.intro.body', 'About Page', 'Introduction paragraph', 'textarea', 'Hire Street VA is a premium virtual assistance agency dedicated to helping business owners, entrepreneurs, and growing companies access reliable remote support — so leaders can stay focused on vision, relationships, and the work that moves the business forward.', 20),
  ('about.who.title', 'About Page', 'Who we are — heading', 'text', 'Who we are', 21),
  ('about.who.body', 'About Page', 'Who we are — body', 'textarea', 'Founded and led by Delma Hole, Hire Street VA connects ambitious businesses with virtual professionals who support day-to-day operations, communication, and specialized business tasks.', 22),
  ('about.believe.title', 'About Page', 'What we believe — heading', 'text', 'What we believe', 23),
  ('about.believe.body', 'About Page', 'What we believe — body', 'textarea', 'Great businesses are never built alone. Behind every growing company is a rhythm of coordination — inbox management, scheduling, client follow-ups, research, and the countless details that keep operations running smoothly.', 24),
  ('about.owners.title', 'About Page', 'For business owners — heading', 'text', 'For business owners', 30),
  ('about.owners.body', 'About Page', 'For business owners — body', 'textarea', 'If you are looking to hire a virtual assistant, Hire Street VA helps you explore support that fits your workflow — from administrative and executive assistance to customer service, social media, e-commerce, scheduling, and more.', 31),
  ('about.va.title', 'About Page', 'For virtual assistants — heading', 'text', 'For virtual assistants', 32),
  ('about.va.body', 'About Page', 'For virtual assistants — body', 'textarea', 'Hire Street VA also provides a clear path for professionals who want to apply and grow in remote support roles.', 33),
  ('contact.panel.line1', 'Contact & Hire Forms', 'Left panel — line 1', 'text', 'Let''s Talk', 40),
  ('contact.panel.line2', 'Contact & Hire Forms', 'Left panel — line 2', 'text', 'About Your Support Needs', 41),
  ('hire.panel.line2', 'Contact & Hire Forms', 'Hire page — left panel line 2', 'text', 'About Hiring a VA', 42),
  ('careers.panel.line2', 'Contact & Hire Forms', 'Careers form — left panel line 2', 'text', 'About Joining Our Team', 43),
  ('cta.business.title1', 'Home Page', 'Business CTA — title line 1', 'text', 'You Lead the Vision.', 50),
  ('cta.business.title2', 'Home Page', 'Business CTA — title line 2', 'text', 'We''ll Help With the Rest.', 51),
  ('cta.business.body', 'Home Page', 'Business CTA — description', 'textarea', 'Explore virtual assistance solutions designed to free up your time and support your business operations.', 52),
  ('home.office.eyebrow', 'Home Page', 'Office gallery — eyebrow', 'text', 'Our Office', 15),
  ('home.office.title.line1', 'Home Page', 'Office gallery — title line 1', 'text', 'Where support meets', 16),
  ('home.office.title.line2', 'Home Page', 'Office gallery — title line 2 (serif)', 'text', 'professional presence.', 17),
  ('home.office.body', 'Home Page', 'Office gallery — description', 'textarea', 'Visit us on the 26th floor at Signature Alveo Park Triangle Tower, Bonifacio Global City — a space designed for focused work, client meetings, and the team behind Hire Street VA.', 18)
on conflict (key) do nothing;
