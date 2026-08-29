# Sahra — Nightlife Concierge & Reservation System

A bilingual (Arabic / English) marketing site and reservation system for the Sahra nightlife
concierge service, built with Next.js App Router, TypeScript and Tailwind CSS v4.

## Features

- **Bilingual routing** — `/ar` (RTL, default) and `/en` (LTR). Visitors are redirected to the
  language matching their browser; a switch in the header changes language on any page.
- **Reservation requests** — a detailed form (name, WhatsApp, city, date, party size, experience,
  budget, notes) plus a lightweight name/phone popup for visitors who are just browsing.
  Every submission is stored server-side and given a reference such as `SAH-2291`.
- **Owner dashboard** — protected at `/admin`, showing live stats, search, status filters,
  status changes (new / contacted / confirmed / cancelled), a detail view, one-click WhatsApp
  reply, CSV export and delete. The list refreshes automatically every 20 seconds.
- **WhatsApp-first** — floating button, hero CTA and per-lead reply links.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 — you will be redirected to `/ar` or `/en`.

## Dashboard access

Visit http://localhost:3000/admin

| Field    | Value       |
| -------- | ----------- |
| Username | `erenmoris` |
| Password | `1234`      |

Credentials come from `ADMIN_USERNAME` / `ADMIN_PASSWORD`, and the session cookie is signed with
`SESSION_SECRET`. Change all three before deploying publicly.

## Data storage

Storage is chosen automatically at runtime:

- **`DATABASE_URL` set** (Vercel Postgres, Neon, Supabase) → reservations are stored in Postgres.
  The `reservations` table and its index are created on first use, so no migration step is needed.
- **No `DATABASE_URL`** → reservations are stored in `data/reservations.json` (path configurable
  with `SAHRA_DATA_DIR`), with writes serialised so concurrent submissions cannot overwrite
  each other. Ideal for local development.

Both adapters live in `src/lib/store/` behind one interface, so adding another backend means
adding one file.

## Deploying to Vercel

1. Push this repository — Vercel detects Next.js with no extra configuration.
2. Add a Postgres database to the project (Storage → Postgres/Neon). It sets `DATABASE_URL`
   automatically; otherwise add it yourself.
3. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD` and a long random `SESSION_SECRET` as environment
   variables.

Without a database the site still works, but reservations submitted in production will not
persist, because Vercel's filesystem is ephemeral.

## Project structure

```
src/
  app/
    [locale]/page.tsx      landing page (hero, how it works, trust, venues, testimonials, form)
    admin/                 dashboard + login
    api/auth/              login / logout
    api/reservations/      create (public), list, update status, delete (dashboard only)
  components/              site and UI components
  i18n/                    locales, Arabic and English content
  lib/auth.ts              signed session cookie + credential check
  lib/store/               Postgres and JSON-file reservation adapters
  proxy.ts                 locale redirect + pathname header used for html lang/dir
```

## Configuration

- WhatsApp number: `WHATSAPP_NUMBER` in `src/i18n/dictionaries.ts`.
- All site copy for both languages: `src/i18n/dictionaries.ts`.
- Colours and fonts: `@theme` block in `src/app/globals.css`.
