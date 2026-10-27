# Verification — 27 October 2026

- `npm.cmd run check`: 0 errors, 0 warnings.
- `npm.cmd run build`: static export succeeds.
- HTTP checks: Home, About, Contact, Fellows, Noticeboard, and all 45 fellow profile URLs return 200.
- All 45 fellow profile HTML files exist in the production output; slugs are unique.
- Unknown fellow URL returns 404 in SvelteKit.
- Visual review in Chrome: desktop homepage and directory; phone-size homepage and directory at 397px wide.
- Mobile menu opened successfully and Home navigation worked.
- Shared `?zone=energy` URL selected Clean Energy. Search for Kenny within that zone displayed one matching fellow.
- Browser console during mobile review showed no errors or warnings.

Not verified: live Supabase migration/RLS execution, admin workflows (not implemented in this phase), real contact submissions (no chapter endpoint supplied), populated notice detail pages (no approved posts supplied), public hosting deployment.
