# Sahra — Nightlife Concierge & Reservation System

Bilingual (Arabic / English) marketing site and booking system for **Sahra / سهرة**, an Egypt nightlife concierge covering Cairo, the North Coast (Sahel), El Gouna, Sharm El Sheikh and Hurghada.

Built with **Next.js App Router**, **React 19**, **TypeScript** and **Tailwind CSS v4**. Deployed on Vercel.

Live: [sahra-website.vercel.app](https://sahra-website.vercel.app)

---

## Features

### Public site

- **Bilingual routing** — `/ar` (RTL, default) and `/en` (LTR). Root `/` permanently redirects to `/ar`. Language switch in the header.
- **Homepage** — entrance splash (once per session), hero, promo ticker, teaser cards (venues / chalets / trust), how-it-works, reservation form, Snapchat card, floating WhatsApp button.
- **Venues** (`/{locale}/venues`) — nightlife types (rooftops, boats, beach clubs, VIP), partner logos, photo gallery, full-bleed entrance video.
- **Chalets** (`/{locale}/chalets` + detail pages) — owner listings with galleries and specs. **No prices on site** — visitors ask on WhatsApp.
- **Nightlife guide** (`/{locale}/guide`) — SEO content page with FAQ.
- **Trust** (`/{locale}/trust`) — why Sahra, WhatsApp screenshot proof, coverage / SEO block.
- **Privacy** (`/{locale}/privacy`) — localized policy (data collection, WhatsApp click logging, retention, rights).

### Booking & contact

- **Reservation form** — name, WhatsApp number, optional notes. Creates a reference like `SAH-2291`, stores the lead, and can email the owner (Resend or Web3Forms).
- **WhatsApp-first CTAs** — floating button, hero, form, chalets, privacy.
- **Snapchat** — `@sahraeg` card and tracked links.
- **Contact capture before leave** — before opening WhatsApp or Snapchat, visitors enter **name + phone** (modal). Saved in `localStorage` so returning visitors skip the form. Clicks are logged in the admin dashboard.

### Owner dashboard (`/admin`)

- Login-protected session (signed cookie).
- **Reservations** — live list, search, status filters (`new` / `contacted` / `confirmed` / `cancelled`), detail view, one-click WhatsApp reply, CSV export, delete. Auto-refresh ~every 20s.
- **WhatsApp / Snapchat clicks** — placement, page, locale, **name and phone**.
- **Content CMS** (`/admin/content`) — toggle sections, edit hero/nav/logo, ticker, SEO/FAQ, testimonials (WhatsApp screenshots), gallery, **chalet listings**, promo video. Media upload via Vercel Blob (or `public/uploads` locally).

### SEO & analytics

- Dynamic **sitemap** and **robots** (admin / API disallowed).
- **JSON-LD**: Organization, LocalBusiness, Service, Venue ItemList, WebSite, WebPage, FAQ, BreadcrumbList, Event, Reservation.
- **Open Graph / Twitter** cards + dynamic `opengraph-image` (1200×630) for WhatsApp / Facebook shares.
- Absolute **canonical** URLs and **hreflang** (`ar` / `en`).
- Optional **GA4** and **Meta Pixel** (loaded only when env vars are set).
- Google Search Console verification support.

---

## Pages

| Route | Description |
| ----- | ----------- |
| `/` | 301 → `/ar` |
| `/{locale}` | Landing page |
| `/{locale}/venues` | Nights out / venues |
| `/{locale}/chalets` | Chalet listings |
| `/{locale}/chalets/[slug]` | Chalet detail |
| `/{locale}/guide` | Nightlife guide + FAQ |
| `/{locale}/trust` | Trust & proof |
| `/{locale}/privacy` | Privacy policy |
| `/admin/login` | Dashboard login |
| `/admin` | Reservations + click tracking |
| `/admin/content` | CMS editor |

Locales: `ar` | `en`. Default: **Arabic**.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript |
| Fonts | El Messiri, Cairo, IBM Plex Mono |
| Database | Postgres (`@neondatabase/serverless`) or local JSON |
| Media | Vercel Blob |
| Email | Resend and/or Web3Forms |
| Hosting | Vercel |

---

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you are redirected to `/ar`.

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

---

## Dashboard access

Visit [http://localhost:3000/admin](http://localhost:3000/admin)

| Field | Default (change in production) |
| ----- | ------------------------------ |
| Username | from `ADMIN_USERNAME` |
| Password | from `ADMIN_PASSWORD` |

Session cookie is signed with `SESSION_SECRET`. Change all three before going public.

---

## Environment variables

See `.env.example` for the full list. Important ones:

| Variable | Purpose |
| -------- | ------- |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Dashboard login |
| `SESSION_SECRET` | Signed session cookie |
| `DATABASE_URL` | Postgres — reservations + CMS (omit → `./data` JSON) |
| `SAHRA_DATA_DIR` | Local JSON directory (optional) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob uploads |
| `NEXT_PUBLIC_SITE_URL` | Canonical / sitemap / OG base URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public WhatsApp (digits only, no `+`) |
| `OWNER_NOTIFY_EMAIL` | Email alerts for new bookings |
| `RESEND_API_KEY` / `RESEND_FROM` | Resend (verified domain required) |
| `WEB3FORMS_ACCESS_KEY` | Web3Forms fallback (no domain setup) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (`G-…`) |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta Pixel |

---

## Data storage

Chosen at runtime:

- **`DATABASE_URL` set** (Neon / Vercel Postgres / Supabase) → reservations, WhatsApp clicks and CMS content in Postgres. Tables are created on first use.
- **No `DATABASE_URL`** → JSON files under `./data` (or `SAHRA_DATA_DIR`). Fine for local development; on Vercel the filesystem is ephemeral, so production needs Postgres.

Adapters live in `src/lib/store/` behind one interface.

---

## Owner email alerts

When someone submits the reservation form:

1. **Resend** (preferred) — set `RESEND_API_KEY`, `RESEND_FROM` (verified domain), `OWNER_NOTIFY_EMAIL`. Do not use `onboarding@resend.dev` for real inboxes.
2. **Web3Forms** — set `WEB3FORMS_ACCESS_KEY` and `OWNER_NOTIFY_EMAIL` (no domain verification).

---

## Deploying to Vercel

1. Push this repo — Vercel detects Next.js with no extra config.
2. Add a Postgres store (or set `DATABASE_URL`).
3. Set admin credentials, `SESSION_SECRET`, WhatsApp number, site URL, and email keys.
4. Optional: connect Vercel Blob for media uploads; set GA4 / Meta Pixel IDs.
5. After deploy: submit `/ar` and `/en` for indexing in Google Search Console; confirm `/` returns **301** to `/ar`.

---

## Project structure

```
src/
  app/
    [locale]/             public pages (home, venues, chalets, guide, trust, privacy)
    admin/                 dashboard, login, content CMS
    api/                   auth, reservations, whatsapp-click, admin content/media
    opengraph-image.tsx    share card image
    sitemap.ts / robots.ts SEO crawl config
  components/              UI (Hero, TrackedLink, Analytics, chalets, …)
  i18n/                    locales + AR/EN dictionaries
  lib/
    seo.ts                 metadata helpers
    content/               CMS merge, chalets, media
    store/                 Postgres + file adapters
    notify-owner.ts        Resend / Web3Forms
    contact-capture.ts     localStorage name/phone
  proxy.ts                 locale 301 + admin path normalize + x-pathname
```

---

## Configuration notes

- Site copy (AR/EN): `src/i18n/dictionaries.ts` (CMS can override many strings).
- WhatsApp number: `NEXT_PUBLIC_WHATSAPP_NUMBER` (fallback in dictionaries).
- Colours & fonts: `@theme` in `src/app/globals.css`.
- Default locale: Arabic — `src/i18n/config.ts`.

---

## License

Private project — all rights reserved.
