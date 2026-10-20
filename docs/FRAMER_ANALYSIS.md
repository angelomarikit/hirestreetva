# Phase 1 — Framer Design Analysis (Agenciy Template)

**Source:** Connected project *Agenciy - Creative Agency Framer Template (copy)*  
**Reference focus:** Home (`/`) — Design #3 interactive agency pattern

## Layout structure (desktop)

| Section (Framer layer) | React mapping |
|------------------------|---------------|
| Hero-Section | Cinematic full-bleed hero, bordered frame, BG image + content stack |
| Service-Section | **Signature** — tag + split header, vertical service rows with hover image |
| About-Section | Warm editorial block, asymmetric top/bottom |
| Project-Section | Case study / talent showcase (→ VA success stories or hidden until CMS) |
| Process-Section | Scroll-driven steps, BG pattern |
| Awards-Section | Value props / trust rows (→ Why Hire Street VA) |
| Team-Section | Optional talent (→ careers teaser) |
| Testimonial-Section | Large quote + carousel cards |
| FAQ Section | Minimal accordion |
| Contact Section | Split CTA + form pattern |

**Breakpoints:** Desktop (`WQLkyLRf1`), Tablet (`p2SBAWsuF`), Phone (`pJWXhZOcs`) — fluid type scales at 810px and 1440px.

## Typography (Framer → Hire Street VA)

| Framer | Size / rhythm | HSVA equivalent |
|--------|----------------|-----------------|
| Inter Display / Inter | Sans UI + display | **Plus Jakarta Sans** (primary sans) |
| Playfair Display Italic | 140px H1, tight tracking | **Cormorant Garamond** italic for display contrast |
| H1 140 Regular | 140→100→80px, −8.4px tracking | `text-display` clamp ~3.5–8.75rem |
| H2 64 / 48 | Section titles | `text-section` |
| H3 40 | Service row titles | `text-service` |
| P16 / P18 | Body | 16–18px, generous line-height |

## Color (Framer dark agency → brand)

Framer uses near-black surfaces, white type, whisper gray secondary.  
**HSVA palette:** `#0B0B0D`, `#171719`, `#242326`, rose gold `#B87970`, copper `#C98E85`, ivory `#F8F5F2`.

## Service section interaction (critical)

Framer `Service-Section` structure:

- **Top:** small tag + two-column intro (heading left, description right)
- **Bottom:** stacked **Service Card** rows (4+ in template)

**Desktop behavior to replicate:**

1. Oversized service title per row with index prefix
2. Hover/focus: active row full opacity; siblings muted
3. Fixed or sticky **image preview** region; crossfade on active service
4. Description + arrow affordance on active row
5. Rose-gold accent on index and dividers

**Mobile:** Tap expands row; image + description inline (no hover dependency).

## Motion

- Smooth scroll wrapper (`Smooth Scroll` layer)
- Blur gradients at section edges
- Staggered hero text reveal, line accents
- Scroll-triggered section entrances (GSAP ScrollTrigger for timeline/progress; Motion for UI micro-interactions)

## Implementation plan

1. **Design system** — Tailwind v4 CSS tokens, fonts, components (Button, SectionLabel, Container).
2. **Homepage first** — Hero + InteractiveServices + ivory About + dark Why + timeline How It Works + conversion blocks.
3. **Routes** — `/`, `/about`, `/services`, `/hire`, `/careers`, `/contact`, `/admin/*`.
4. **Supabase** — migrations, RLS, storage buckets; public read published content only.
5. **Admin** — Auth-gated CRUD for all CMS entities.
6. **Polish** — reduced-motion, SEO, build verification.
