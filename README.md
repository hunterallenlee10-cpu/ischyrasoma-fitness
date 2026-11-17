# Ischyra Soma Fitness: class booking page (concept)

A concept of one page, the class booking page, for Ischyra Soma Fitness, a Pilates and GYROTONIC® studio in Gambrills, MD. Prepared by Lee Enterprises Unlimited. The brief is in `BUILD-SPEC.md`, the plan and checklists in `implementation_kickstart.md`.

The first phone screen shows the next real class (time, teacher, price, spots left) with a working "Book this class". Every time on the page comes from her Momence schedule, in Eastern Time, with a saved snapshot as a fallback.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start   # production build
npm run check          # page checks, needs a running server (CHECK_URL defaults to http://localhost:3000)
npm run test:finder    # all 21 First Class Finder combinations
npm run lint
```

Versions: Next.js 16.4.6, React 19.3.0, TypeScript 5.9.3, Tailwind CSS 4.3.3, motion 14.14.0, lucide-react 1.74.0, @vercel/analytics 2.0.1. Node 20.9 or later.

## Modes

| Variable | Default | Meaning |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` | `demo`: noindex meta and header, no sitemap, no llms.txt, concept footer line. `live`: indexable, sitemap, llms.txt |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Base URL for canonical, Open Graph and structured data |
| `SCHEDULE_OFFLINE` | unset | `1` skips the live feed and shows the saved snapshot with its note |

The preview deployment stays in demo mode. A live build fails while any DRAFT item remains (see `HANDOFF.md`).

## Live preview

**https://ischyra-booking-concept.vercel.app** (Vercel project `ischyra-booking-concept`, team `leu`). Demo mode: `noindex, nofollow` in the meta tag and the `X-Robots-Tag` header, so it never competes with her real site. Vercel Authentication is off so she can open it without a login.

The production deployment was made from branch `claude/nifty-dirac-6dn41s`. Later pushes to that branch create preview deployments. To update the main address, redeploy to production from the Vercel dashboard or set the project's production branch.

## Deploy the preview on Vercel (from scratch)

1. Import this repository as its own Vercel project.
2. Name it so the address says concept or preview and never imitates her domain, for example `ischyra-booking-concept`.
3. Set `NEXT_PUBLIC_SITE_MODE=demo` and `NEXT_PUBLIC_SITE_URL=https://ischyra-booking-concept.vercel.app` (the address Vercel gives you).
4. Deploy. Check that the page source shows `noindex, nofollow` and the response has `X-Robots-Tag: noindex, nofollow`.

Launch day steps for her real domain: `SEO-LAUNCH.md`. Lighthouse results: `LIGHTHOUSE.md`. Screenshots: `docs/screenshots/`.
