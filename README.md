# beVisioneers Harare Hub

A SvelteKit 2 / Svelte 5 / TypeScript public chapter website. The initial release uses a reviewed local directory and produces a static site; Supabase is planned for leadership-managed content in phase two.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://127.0.0.1:5173. Use `npm.cmd` on Windows if PowerShell blocks npm.ps1.

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

The production export is in `build/`. Configure static hosting to serve directory index pages and `404.html` for unknown routes. Future live Supabase content should use server rendering with an appropriate SvelteKit adapter or trigger a rebuild when content changes; the current export does not fetch live data.

## Public pages

- Home: chapter introduction, selected fellows, all impact zones, latest notices, collaboration invitation.
- `/fellows`: name / impact-area search, impact-zone and cohort filters, alphabetical sorting, empty state. Impact-zone selection is shareable in the URL.
- `/fellows/[slug]`: all 45 fellow profiles, supplied climate zones, available LinkedIn links, related fellows, project-story empty state.
- `/noticeboard`: events, articles, opportunities, hub news, promotions, products, and services filters and search.
- `/noticeboard/[slug]`: ready for published entries; no fake content is seeded.
- `/about`, `/contact`, and a branded error page.

## Content and assets

`src/lib/data/fellows.ts` is transcribed from the two supplied screenshots. Check names and LinkedIn URLs against the original PDF before launch, especially unusual spellings. No biographies, project claims, products, offers, or events have been invented. Personal email addresses and phone numbers have not been copied into the public site.

`src/lib/data/notices.ts` holds approved notices. Add published entries there during the static phase and rebuild; dates and expiry are checked when rendered. A static export must be rebuilt to reflect publication/expiry changes. The future database also enforces publication and expiry in its read policies.

The visual reference is https://bevisioneers.world/ (home, about, fellows, and insights/stories), reviewed on 27 October 2026. Palette and Articulat typography follow the reference. The logo, webfonts, and two global fellowship images were retrieved from that site for this chapter preview. Global images are labelled as global-community imagery; replace them with approved Harare photos when available. Confirm chapter brand/asset usage with the global team before a public launch. Fellow cards use initials, not invented portraits.

## Supabase phase two

`supabase/migrations/202610270001_hub_foundation.sql` defines impact zones, fellows, private contacts, projects, project memberships, products/services, and notices. It includes draft/publication controls, expiry dates, and leadership-only write policies with row-level security.

1. Create/select the intended Supabase project; do not reuse an unrelated project.
2. Apply the foundation migration, then `supabase/seed.sql` using the SQL editor or Supabase CLI.
3. Invite leadership members through Supabase Auth. Insert their auth user IDs into `admin_members` using a trusted database session. Public clients cannot manage membership.
4. Build the leadership dashboard and authenticated server/client integration. Use the publishable key for public access; never expose a service-role key.
5. Add consented public contact fields through a restricted view/server endpoint. The private contacts table is leadership-only.
6. Add image storage and leadership upload policies, generate database TypeScript types, and test RLS with anonymous, regular authenticated, and leadership users before connecting production.

The migration has been prepared but has not been applied or tested against a live Supabase project. No database credentials are needed for this preview. `.env.example` records the future public connection variables.

## Remaining content

Leadership names/roles, an official chapter contact channel, Harare photography, fellow bios and project details, and the first approved notices. The contact page routes visitors to available fellow LinkedIn links and clearly distinguishes global fellowship enquiries; it does not simulate sending messages.
