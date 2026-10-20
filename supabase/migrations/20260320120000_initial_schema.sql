-- Hire Street VA CMS schema

create extension if not exists "pgcrypto";

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  site_name text not null,
  tagline text not null,
  hero_eyebrow text not null,
  hero_title_line1 text not null,
  hero_title_line2 text not null,
  hero_description text not null,
  hero_image_url text not null,
  primary_cta_label text not null,
  primary_cta_href text not null,
  secondary_cta_label text not null,
  secondary_cta_href text not null,
  contact_email text,
  whatsapp_url text,
  messenger_url text,
  meta_title text not null,
  meta_description text not null,
  og_image_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  image_url text not null,
  sort_order int not null default 0,
  is_published boolean not null default false,
  cta_href text not null default '/hire',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_role text not null,
  author_image_url text,
  sort_order int not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.job_openings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  location text not null default 'Remote',
  employment_type text not null default 'Contract',
  description text not null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.business_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company_name text,
  contact_number text,
  service_needed text,
  message text not null,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_opening_id uuid references public.job_openings(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  cover_letter text,
  resume_path text,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.job_openings enable row level security;
alter table public.business_inquiries enable row level security;
alter table public.job_applications enable row level security;
alter table public.admin_profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.admin_profiles ap where ap.user_id = auth.uid()
  );
$$;

-- Public read published content
create policy "public_read_site_settings" on public.site_settings
  for select using (true);

create policy "public_read_published_services" on public.services
  for select using (is_published = true);

create policy "public_read_published_testimonials" on public.testimonials
  for select using (is_published = true);

create policy "public_read_published_faqs" on public.faqs
  for select using (is_published = true);

create policy "public_read_published_jobs" on public.job_openings
  for select using (is_published = true);

-- Anonymous submissions
create policy "public_insert_inquiries" on public.business_inquiries
  for insert with check (consent = true);

create policy "public_insert_applications" on public.job_applications
  for insert with check (consent = true);

-- Admin full access
create policy "admin_all_site_settings" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin_all_services" on public.services
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin_all_testimonials" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin_all_faqs" on public.faqs
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin_all_jobs" on public.job_openings
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin_read_inquiries" on public.business_inquiries
  for select using (public.is_admin());

create policy "admin_read_applications" on public.job_applications
  for select using (public.is_admin());

create policy "admin_read_profiles" on public.admin_profiles
  for select using (public.is_admin());

-- Storage buckets (run in Supabase dashboard or separate migration):
-- media (public read for published assets)
-- resumes (private, admin-only read)
