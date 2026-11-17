# Implementation kickstart

Plan, tokens and checklists for the Ischyra Soma Fitness class booking page. Source of truth: `BUILD-SPEC.md`.

## Decisions taken before code

- **Rendering.** `cacheComponents` is switched off. The page renders per request (`connection()`), so "Today" and "Next class" are always correct, while the Momence fetch itself is cached in the Data Cache with `revalidate: 900`. The build makes no network calls.
- **Fonts.** Fraunces (opsz + wght variable, latin) and Figtree (wght variable, latin) are the Google Fonts files, committed under `app/fonts` and loaded with `next/font/local`. `next/font/google` would need network during the build, which the brief forbids.
- **Photos.** Raw files stay at full size in `public/images/raw`. Six photos needed a crop (badge, watermark, white edge, bystander, lens vignette). Those crops keep their full remaining resolution in `public/images/crop`. `next/image` does all resizing, AVIF and WebP on.
- **Photo 06 is missing** from the Drive folder. The GYROTONIC® Tower Class card uses a labelled placeholder.
- **Feed shape.** The live feed uses `sessionName`, `fixedTicketPrice`, `remainingSpots.remaining`, `isCancelled`. The snapshot uses `name`, `price`, `remaining`. `lib/schedule.ts` normalises both.
- **Class names in the data** lack marks ("Stretch & Flex: GYROKINESIS", "Buff Bones"). `lib/classes.ts` maps data names to display names with marks.
- **URL hash** for the schedule: `#schedule?day=sat&type=mat&teacher=minson-kim&class=buff-bones`.
- **Buff Bones®** is not placed under any type chip (it is not mat, apparatus, GYROTONIC® or GYROKINESIS®). It shows under All and through its own class filter. `// DRAFT`
- **Membership one-liners** are not in the brief, so each row gets a plain line built only from the program name. `// DRAFT: replace with her own descriptions`

## Build order

- [x] Phase 1: scaffold, tokens, fonts, the check script, palette board. Screenshot and fix
- [x] Phase 2: `lib/schedule.ts` (live + snapshot fallback), nav, hero (Next Class card, day strip, spring settle), footer
- [x] Review 1: fresh subagent scores the hero (design 40, usability 30, creativity 20, content 10). One round of fixes
- [x] Phase 3: full schedule, day tabs, filters, teacher filter, URL hash
- [x] Phase 4: First Class Finder, class guide
- [ ] Phase 5: three per class, memberships band, visit, FAQ, final band, mobile sticky bar
- [ ] Phase 6: launch switch, X-Robots-Tag, title and description, single h1, JSON-LD, robots, sitemap, llms.txt, OG image, favicon, 404, SEO-LAUNCH.md
- [ ] Phase 6b: Lighthouse on a production build, mobile and desktop, live then demo
- [ ] Review 2: fresh subagent scores the full page and audits every fact. One round of fixes
- [ ] Phase 7: final review against section 10, commit, ready for GitHub and Vercel

Each phase: dev server, Playwright screenshots at 1440 and 375, fix the three weakest things, `npm run check`, tick, commit.

## Design tokens

| Role | Hex | OKLCH |
|---|---|---|
| Background (ivory) | `#F7F3EC` | `oklch(96.53% 0.0102 81.80)` |
| Surface | `#FFFDF9` | `oklch(99.45% 0.0057 84.57)` |
| Border | `#DDD5C7` | `oklch(87.56% 0.0209 81.78)` |
| Ink | `#142F2E` | `oklch(28.36% 0.0331 192.29)` |
| Muted | `#4F6462` | `oklch(48.54% 0.0255 189.20)` |
| Primary (studio teal) | `#03696B` | `oklch(47.27% 0.0797 197.12)` |
| Primary hover | `#024F51` | `oklch(38.83% 0.0653 197.78)` |
| Deep band | `#0B3B3C` | `oklch(32.23% 0.0490 197.07)` |
| Tint (sea mist) | `#DCEBE6` | `oklch(92.74% 0.0173 174.04)` |
| Accent (saddle) | `#A8481F` | `oklch(52.14% 0.1373 41.51)` |
| Success | `#2F6B2A` | `oklch(47.20% 0.1160 142.13)` |
| Error | `#A3312B` | `oklch(48.44% 0.1509 27.29)` |

Measured contrast: ink on bg 12.87, muted on bg 5.70, white on primary 6.49, primary on bg 5.87, primary on tint 5.27, accent on bg 5.26, success on surface 6.35, ivory on deep 11.14, tint on deep 10.01.

**Type scale** (`clamp()`, ceiling at most 2.5x floor): label 0.75 to 0.8125rem, body 1 to 1.0625rem, lead 1.125 to 1.3125rem, h3 1.25 to 1.5rem, h2 1.75 to 2.75rem, h1 2.25 to 4.25rem, display 2.5 to 5rem. Body line height 1.6, display 1.05. Measure about 66ch.

**Material:** flat surface cards, 1px border, 14px radius, no shadows except the sticky bar. Times in Fraunces with tabular figures. 8px grid. Sections 112 to 128px desktop, 72px mobile.

**Motion:** spring settle (hero day strip) and the finder result. Nothing else beyond hover, press and reduced-motion-guarded CSS reveals.

## Final review checklist (section 10)

- [ ] First phone screen: real upcoming class, time, teacher, price, spots left, working "Book this class". Spring settle plays once
- [ ] Every time from the data, Eastern Time. No cancelled classes. Network off shows the snapshot with its note
- [ ] Every "Book this class" opens the right Momence session. `bookingMode: 'membership'` changes every button
- [ ] Finder right for all 21 combinations, real next times, mouse, touch and keyboard
- [ ] 12 membership links, gift card link, consultation link match section 1
- [ ] Every "Things only this business has" item is on the page
- [ ] Zero em dashes, zero "--" in copy, zero stock or AI images, zero invented facts, no membership prices, no star ratings
- [ ] Review placeholder empty and labelled. Every DRAFT item commented
- [ ] Max 2 fonts, palette tokens only, motion in 2 places, no cursor effects or loading intro
- [ ] 375px: no overflow, burger works, sticky bar works and never covers focus. Keyboard-only and 200% zoom pass
- [ ] Demo: `noindex, nofollow` meta and header, concept line. Live: `index, follow`, sitemap, no concept line
- [ ] OG image and favicon are hers
- [ ] Lighthouse SEO 100 live (mobile and desktop), other three 90+. Demo: only the indexing audit fails
- [ ] One h1 with "Pilates" and "Gambrills, MD". Meaningful link and image text. JSON-LD validates, claims nothing untrue
