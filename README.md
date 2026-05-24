# Digital Vikingz — Next.js + Supabase + Dashboard

Full-stack site with marketing pages + admin dashboard at `/vikingz-1000-admin`.

## What's wired up

### Public site (mostly static, **blog is DB-driven**)
- `/` — Home (hardcoded design)
- `/about`, `/operating-manual`, `/build-process`, `/vertical-playbooks`, `/the-audit`, `/contact`, `/privacy-policy` — hardcoded
- `/services/[slug]` (7 service pages) — hardcoded
- **`/blog`** — list view, **reads from Supabase `Post` table** ✅
- **`/blog/[slug]`** — detail view, **reads from Supabase** ✅
- **`/blog/category/[slug]`** — category archive, **reads from Supabase** ✅

### Dashboard (fully functional CRUD)
- `/vikingz-1000-admin` — stats dashboard
- `/vikingz-1000-admin/posts` — create, edit, delete blog posts
- `/vikingz-1000-admin/pages` — manage marketing pages (Hero text, SEO)
- `/vikingz-1000-admin/services` — manage service entries
- `/vikingz-1000-admin/media` — upload + manage images (Supabase Storage)
- `/vikingz-1000-admin/settings` — site settings (contact, Calendly, footer, CTAs)
- `/login` — sign-in

---

## Setup (one time)

### 1. Run the SQL migration

Open Supabase Dashboard → SQL Editor → paste `digital-vikingz-supabase-migration.sql` → Run.

This creates all tables, indexes, RLS, seed data, admin user, and storage bucket.

### 2. Set `.env.local`

Copy `.env.example` → `.env.local`, then fill:

```env
# Pooled connection (port 6543) for runtime
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-1-<REGION>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Direct connection (port 5432) for Prisma introspection
DIRECT_URL="postgresql://postgres:<PASSWORD>@db.<PROJECT_REF>.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<32-char base64>"
AUTH_SECRET="<same as NEXTAUTH_SECRET>"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Supabase Storage for media uploads
NEXT_PUBLIC_SUPABASE_URL="https://<PROJECT_REF>.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<service role key>"
SUPABASE_STORAGE_BUCKET="digital-vikingz-media"
```

> **Generate `NEXTAUTH_SECRET` on Windows PowerShell:**
> `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))`

### 3. Install + generate

```bash
npm install
npx prisma generate
```

> ⚠️ DO NOT run `npx prisma db push` — the SQL file already created the tables. `db push` will conflict.

### 4. Run dev server

```bash
npm run dev
```

Open:
- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/login`

---

## Default admin login (from SQL migration)

```
Email:    admin@digitalvikingz.com
Password: ChangeThisStrongPassword123!
```

Change the password immediately after first login via Settings or by creating a new admin in Supabase Dashboard → Authentication → Users.

---

## How to publish a blog post

1. Login at `/login`
2. Go to `/vikingz-1000-admin/posts`
3. Click **+ New Post**
4. Fill: title, slug (auto-generated), excerpt, content (HTML), category, tags
5. Optionally: featured image (uploaded to Supabase Storage), SEO meta, OG/Twitter cards
6. Toggle **Published** on
7. Click **Save**
8. Visit `/blog` — post appears immediately (ISR refreshes every 60s, manual refresh forces it)

---

## Image uploads

Images uploaded via the admin go to Supabase Storage bucket `digital-vikingz-media` and are recorded in the `Media` table with alt text, title, caption, description.

Limits: 5MB per file, image MIME types only.

---

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add **all** `.env.local` variables as Environment Variables in Vercel
4. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to production domain
5. Build runs `prisma generate` automatically via `postinstall`

---

## Troubleshooting

**`Table public.Page does not exist`**
- SQL migration didn't run, or `.env.local` `DATABASE_URL` points to wrong project
- Verify in Supabase SQL Editor: `SELECT * FROM public."Page";`

**`Connection refused` / `Tenant not found`**
- `DATABASE_URL` port must be `6543`, not `5432`
- Must include `?pgbouncer=true&connection_limit=1`
- Password must be URL-encoded (`@` → `%40`, etc.)

**Posts I created in admin don't show on `/blog`**
- Confirm `published = true` on the post
- ISR cache: wait 60s or restart dev server

**Admin redirects to `/login` in loop**
- `NEXTAUTH_URL` missing or wrong
- `NEXTAUTH_SECRET` empty
