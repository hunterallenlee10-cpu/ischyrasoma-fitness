# Ischyra Soma Fitness: class booking page (concept)

One page at `/` for a real Pilates and GYROTONIC® studio in Gambrills, MD. Full brief in `BUILD-SPEC.md`.
**Re-read the matching part of BUILD-SPEC.md at the start of each phase.** Plan and checklist: `implementation_kickstart.md`.

## Stack
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4 (tokens in the `@theme` block of `app/globals.css`, no JS config)
- `motion` (from `motion/react`, lazy) for exactly two pieces: hero spring settle and the First Class Finder result
- `lucide-react` icons, one stroke width. Social icons are inline SVG
- Fonts: Fraunces (display) and Figtree (body), Google Fonts files served through `next/font/local` so the build needs no network
- `@vercel/analytics` is the only script beyond the app

## Commands
- `npm run dev` dev server on :3000
- `npm run build` then `npm start` production build (use this for Lighthouse, never dev)
- `npm run check` page checks (one h1, anchors, em dashes, alt text, phone/email, class times vs data, DRAFTs in live mode). Needs a running server: `CHECK_URL=http://localhost:3000 npm run check`
- `npm run lint` ESLint directly (`next lint` is gone)
- `npm run images` re-crop photos and rebuild icons from `public/images/raw`
- `npm run og` rebuild the Open Graph image
- Live mode locally: `NEXT_PUBLIC_SITE_MODE=live NEXT_PUBLIC_SITE_URL=http://localhost:3000 npm run build && npm start`

## Where things live
- `lib/business.ts` every business fact and switch (`bookingMode`, `textEnabled`, `showPrices`)
- `lib/classes.ts` class descriptions, prices, photos, filters
- `lib/schedule.ts` server-only feed fetch (Momence, 5s timeout, revalidate 900) with fallback to `data/schedule-snapshot.json`
- `components/sections/*` one file per section, `components/Schedule/`, `components/FirstClassFinder/`
- No file over 500 lines.

## Rules that never bend
1. Real facts only. Every fact comes from section 1 of BUILD-SPEC.md or the schedule data. Anything assumed gets a `// DRAFT` comment.
2. Real photos only, from `public/images/raw` (crops in `public/images/crop`). Never stock, never AI. Classes without a photo get a labelled placeholder or a type-led card.
3. No em dashes and no double hyphens in copy. Periods and commas.
4. One primary action: "Book this class" on a real class time. Calling 703.528.2821 is the second path. No newsletter, no forms.
5. Never hardcode or invent a class time. Times come from the data, formatted in America/New_York.
6. Write GYROTONIC®, GYROKINESIS® and Buff Bones® with their marks.
