# Hire Street VA

Premium virtual assistance agency website — React, Tailwind CSS v4, Supabase CMS.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

## Supabase setup (required for CMS)

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run migrations in order:
   - `supabase/migrations/20260320120000_initial_schema.sql`
   - `supabase/migrations/20260320180000_cms_extended.sql`
3. Copy **Project URL** and **anon public key** into `.env`:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
4. **Authentication → Users**: create an admin user (email + password).
5. **SQL Editor** — grant admin access (replace the UUID with the user’s id from Authentication):
   ```sql
   insert into public.admin_profiles (user_id) values ('YOUR-USER-UUID');
   ```
6. Open **`/admin/login`** and sign in.

## Admin dashboard (`/admin`)

| Section | What you can change |
|--------|---------------------|
| **Website settings** | Hero, all page photos, address, email, phone, social links, SEO |
| **Page content** | Headlines & body copy (home, about, forms, CTA) |
| **Media library** | Upload & store every image in Supabase Storage |
| **Services** | Titles, descriptions, photos, order, publish/unpublish |
| **FAQ** | Questions & answers |
| **Careers** | Job postings |
| **Testimonials** | Quotes (publish only when approved) |
| **Inquiries** | Business contact form submissions |

Images upload to the **`website-media`** bucket and save a public URL automatically.

## Public site without Supabase

If `.env` is missing, the site uses local seed content and forms log in demo mode.

## Deploy

Deploy `dist` to Vercel with the same `VITE_*` environment variables.
