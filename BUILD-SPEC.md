# Ischyra Soma Fitness: Claude Code Build Prompt

Paste everything below the line into Claude Code, in an empty folder.

---

You are a senior web designer and front-end engineer. Your job is to build an award-level concept of ONE page for a real business: the class booking page of **Ischyra Soma Fitness**, a Pilates and GYROTONIC® studio in Gambrills, Maryland. This is a mockup that Lee Enterprises Unlimited promised the owner, Eshael M. Johnson, M.S., after she said yes to seeing it. Her current page at ischyrasomafitness.co/site-booking/ opens with the heading "CLASS SCHEDULE" and then shows no schedule under it. A visitor meets twelve membership terms with no prices, then gift cards, and only at the very bottom of the page does the booking system's stock widget load the class times. Its "Book now" buttons do not book. They scroll back up to the membership plans. The teacher flyers on her team page quote class times that no longer match the live schedule, and the footer still says 2023. The new page has to make her say "I need this" in the first five seconds. She will most likely open the link on her phone, so the first phone screen matters more than anything else: it must show a real class time she recognises, with a way to book it. It must look like a calm, expensive boutique studio, not an AI template. If you could swap the logo and pass it off as another studio's page, it is not finished.

**Finish the whole build in this session.** Ordinary obstacles (a port in use, a missing browser for screenshots, an image that will not convert, a Lighthouse run that fails) are yours to diagnose and work through. Do not end by listing what is left or offering to continue. The only planned stop is missing photos, as described in section 0.

First actions, in this order:
1. Save this whole prompt as `BUILD-SPEC.md` in the project root.
2. Write a short `CLAUDE.md`: the stack, the commands, the rules that never bend (real facts only, real photos only, no em dashes, one primary action), and "re-read the matching part of BUILD-SPEC.md at the start of each phase".
3. Run `git init`.
4. Write the plan file (section 9). Commit after every phase.

## 0. Get the assets first

All images live in Hunter's Google Drive folder **"Ischyra Soma Fitness - Website Demo Assets"**:
https://drive.google.com/drive/folders/1ZsZFhEbt1cYRG4swuhITJ6jbqQdETuPO

- `photos/` (folder ID `1WtRYZV1cTqH0QkyDQrNx-BAB24VXVlQV`): 18 real photos (19 if `06` was added) and 3 logo files from the studio's own website and its own booking account. These are the only photos allowed on the page.
- `reference-brand (look and feel only, not site images)/` (folder ID `18xPAPyrjxux-eaBFtHkRXPoIQnyjJFWv`): three of her "meet the teacher" flyers. Read them for the brand teal and her voice. Never put them on the page. Two of her flyers quote class times that are out of date, so take no times from them.
- `schedule-snapshot.json` (root of the folder, file ID `1HisbPsqGZwWYSpbDod1A4uwaTmxRjuMK`): 48 real upcoming classes for 17 November to 1 December 2026, pulled from her booking system on 17 November 2026. Save it as `data/schedule-snapshot.json`.

If you have a Google Drive connector, download every file in `photos/` into `public/images/raw/` and the snapshot into `data/`. If you do not, stop and ask Hunter to drop the `photos/` folder into `public/images/raw/` and the snapshot into `data/`, then continue. Look at every image yourself before you design, so you know what is in each one.

Keep the source files at full size and let `next/image` serve the right size per screen, with a `sizes` value on every image and AVIF and WebP turned on. Set width and height on every image to avoid layout shift. Do not hand-convert to one fixed file.

### Photo map (what each file is and where it goes)

Sizes vary a lot. Only `01` is wide enough to sit behind a desktop hero, and the page does not need a full-bleed hero anyway, because the schedule is the hero. The teacher headshots are 500x500 and are used as avatars no larger than 96px. Never stretch a photo past its native size.

| File | Size | What it shows | Use it for |
|---|---|---|---|
| `00-logo-swan-logo-colour-transparent` | 794x804 | Full colour swan and feather logo with the script wordmark across it, transparent | Footer and the OG image |
| `00-logo-2-script-wordmark-dark` | 315x145 | Script wordmark "Ischyra Soma Fitness" in dark grey, transparent | Nav, at 150px wide or less. It is too small for anything bigger |
| `00-logo-3-swan-mark-black` | 169x169 | Black swan mark on white | Favicon and Apple touch icon source |
| `01-studio-room-wide-BEST` | 1600x1200 | The studio itself, wide: wood floor, reformers, Cadillac, framed mirrors, daylight. No people | **The trust photo.** Desktop hero side panel and the Visit section |
| `02-eshael-on-spine-corrector` | 1080x1080 | Eshael in white and black, leg extended overhead on the spine corrector, certificates on the wall behind her | **The best photo of the owner.** "Three per class" section. Crop the small swan badge out of the top left corner |
| `03-eshael-on-cadillac-tower` | 1179x776 | Eshael lying on the Cadillac with her legs in the springs, stone accent wall | Class guide card: Pilates Apparatus: Tower |
| `04-eshael-arc-reach-on-barrel` | 1080x1080 | Eshael in a long arched reach over the barrel, mirrors and reformers behind | Class guide card: Pilates Apparatus. Crop the script watermark out of the top right |
| `05-seated-gyrokinesis-stool` | 957x1493 | A teacher seated on a stool reaching one arm up, green mats on the floor | Class guide card: Stretch and Flex GYROKINESIS®. Crop the thin white edge on the right |
| `06-gyrotonic-pulley-tower-equipment` | 3024x4032 | The studio's GYROTONIC® pulley tower on the wood floor, no people. The photo is rotated on its side | Class guide card: GYROTONIC® Tower Class, rotated upright. This file may be missing from the folder, see the note under this table |
| `07-mat-reverse-plank` | 3202x2163 | A woman holding a reverse plank on a grey mat, wood floor | Class guide card: Pilates Mat Level I/II. Crop the bystander's legs off the left edge |
| `08-teacher-guiding-client-reformer` | 2083x3021 | A teacher giving hands-on guidance to a client on the reformer, dark vignette | Class guide card: Pilates Apparatus: Foundations, small. `// DRAFT: confirm client permission` |
| `09-teacher-and-client-reformer-arms-up` | 2738x4106 | A teacher standing behind a seated client on the reformer, arms raised, mirror behind | "Three per class" section, small. `// DRAFT: confirm client permission` |
| `10-studio-entrance-door` | 1200x1600 | The studio's entrance door with a glass panel, equipment visible inside | Visit section, beside the address |
| `11-teacher-eshael-johnson` | 500x500 | Headshot of Eshael Johnson | Avatar on her schedule rows |
| `12-teacher-rena-mcneill` | 500x500 | Headshot of Rena McNeill | Avatar on her schedule rows |
| `13-teacher-karen-fleming` | 500x500 | Headshot of Karen Fleming | Avatar on her schedule rows |
| `14-teacher-claudette-ojo` | 500x500 | Headshot of Claudette Ojo | Avatar on her schedule rows |
| `15-teacher-april-kankonde` | 500x500 | Headshot of April Kankonde | Avatar on her schedule rows |
| `16-teacher-abigail-shin` | 500x500 | Headshot of Abigail Shin | Avatar on her schedule rows |
| `17-teacher-minson-kim` | 500x500 | Minson Kim standing with the tower springs | Avatar on her schedule rows |
| `18-teacher-monique-bocock` | 500x500 | Headshot of Monique Bocock | Avatar on her schedule rows |
| `19-teacher-jouella-fabe` | 500x500 | Headshot of Jouella Fabe, dark background | Avatar on her schedule rows |

`06-gyrotonic-pulley-tower-equipment` may not be in the folder, because the file was too large to upload automatically. If it is there, rotate it upright and use it. If it is not, the GYROTONIC® Tower Class card uses the placeholder described below.

**Never generate, fetch or use stock or AI images.** They make a real studio look fake, and the owner will spot a stranger on her own page instantly. Buff Bones®, the Korean language class, the men only class, the virtual class and (if `06` is missing) the GYROTONIC® Tower Class have no photo of their own. For those, use a clean labelled placeholder block ("Photo: Buff Bones class, from Ischyra Soma Fitness") styled in the design system, or a type-led card with no photo. Do not reuse another class's photo for them.

## 1. Business facts (use only these, invent nothing)

Every line below goes into `lib/business.ts`. Sources are her own website and her own booking account, read on 17 November 2026.

- **Name:** Ischyra Soma Fitness. Longer form she uses: Ischyra Soma Fitness Pilates & GYROTONIC® Wellness Center. Short form: ISF. In body copy write "Ischyra Soma Fitness".
- **Owner:** Eshael M. Johnson, M.S. Classically trained Pilates instructor, GYROTONIC® teacher and GYROKINESIS® trainer. She started Pilates in 2009, began her comprehensive certification in 2017 and added the GYROTONIC® method in 2021. She also holds a Buff Bones® certification.
- **Address:** Princess Crofton Shopping Center, 1166 State Route 3 S, Suite 105, Gambrills, MD 21054. Map point about 39.0155, -76.6957.
- **Service area, in her words:** Crofton, Gambrills and surrounding Anne Arundel County communities.
- **Studio hours (from her site's own data):** Monday 4 to 9 PM. Tuesday and Wednesday 5 to 9 PM. Thursday 10 AM to 12 PM and 5 to 9 PM. Friday 6 to 9 PM. Saturday 7 AM to 2 PM. Sunday 8 AM to 2 PM. `// DRAFT: confirm hours`
- **Main search phrase:** "pilates classes Gambrills MD". Variations: "pilates studio Crofton MD", "GYROTONIC classes Crofton MD", "reformer pilates near Crofton". `// DRAFT: confirm against her Google Business Profile category`. Name, address and phone must appear exactly as written here everywhere on the page.
- **Phone:** 703.528.2821. Use `tel:+17035282821`. A text link `sms:+17035282821` is built but hidden behind a setting, `textEnabled: false`, until she confirms the number takes texts. `// DRAFT: confirm texting`
- **Email:** info@ischyrasomafitness.co
- **Links:** Facebook facebook.com/IschyraSomaFitness. Instagram instagram.com/ischyra_soma_fitness. LinkedIn linkedin.com/company/ischyra-soma-fitness. Booking runs on Momence, host ID 37215. The Momence app is on iOS (apps.apple.com/us/app/momence/id1577856009) and Android (play.google.com/store/apps/details?id=com.ribbon.mobileApp).
- **Recognition, in her words:** named the Best Pilates Studio in Crofton, Maryland for the fourth year in a row (Best in Crofton 2025). `// DRAFT: confirm wording`. Official Host Training Center for Power Pilates.
- **How she works (the differentiator):** small classes. Every in-person group class in her booking system holds 3 people. The virtual mat class holds 10. Her own tagline: "Better living through strength and grace™". Her sign-off: "Yours in strength and grace™".
- **Classes and single-class prices (from her booking system):**
  - Pilates Apparatus: Foundations. 55 min, $45. "This class is designed as an introduction to Pilates including the terminology, the equipment and the Principles of Pilates. You will learn the fundamentals and proper technique."
  - Pilates Apparatus. 55 min, $45. "Continue to build a strong Pilates foundation and begin to add some complex exercises. May include exercises on the reformer, Wunda chair or mat."
  - Pilates Apparatus: Tower. 55 min, $45. Uses springs and straps. She strongly recommends 5 to 10 classes, or Apparatus Foundations experience, or 3 private lessons first.
  - Pilates Mat: Level I/II. 45 or 55 min, $25. "Mat Pilates is a strengthening and lengthening form of exercise that focuses on your core (trunk) muscles while also training your arms and legs."
  - GYROTONIC® Tower Class. 55 min, $45. Benefits she lists: a healthier, more supple spine, increased range of motion, greater joint stability, improved agility and athletic performance.
  - Stretch & Flex: GYROKINESIS®. 30 or 55 min, $25. Coordinates movement, breath and mental focus through rhythmic, flowing sequences.
  - Buff Bones®. 55 min, $45. Low impact and bone health focused. Blends Pilates, yoga, strength training, balance work and functional movement. For people concerned about bone health, with medical clearance where there is osteopenia or osteoporosis.
  - Pilates Apparatus: Men Only. 55 min, $45.
  - Pilates Apparatus: Korean Language. 55 min, $45. Taught in Korean.
  - Virtual Pilates Mat. 45 min, $25, on Zoom. All levels welcome.
- **Teachers (names exactly as in her booking system):** Eshael Johnson, Rena McNeill, Karen Fleming, Claudette Ojo, April Kankonde, Abigail Shin, Minson Kim, Monique Bocock, Jouella Fabe.
- **Typical week (for your understanding only, the page is driven by data, never by this list):** Monday 6:30 AM virtual mat, 4 PM Buff Bones, 5 PM mat and GYROKINESIS, 5:30 PM Tower, 6 PM Apparatus. Tuesday 6:30 AM virtual mat, 7:30 AM Apparatus, 6 PM Foundations, 7 PM GYROTONIC Tower. Wednesday 6 PM Apparatus. Thursday 10 AM Korean language Apparatus, 11 AM GYROTONIC Tower, 12 PM GYROKINESIS, 6 PM Foundations. Friday 6 PM Apparatus. Saturday 9 AM Apparatus, 9:30 and 10 AM mat, 10:30 AM Apparatus, 3 PM Men Only. Sunday 10 AM Apparatus, 11 AM mat.
- **Memberships (her four programs, each sold in 3, 6 and 12 month terms, "billed once at the start of your chosen term"). No prices are published, so show none:**
  - Private Lessons with Studio Owner: `https://momence.com/m/683912` (3 months), `/m/683914` (6), `/m/683916` (12, she labels it Best Value)
  - Private Lessons with Certified Teacher: `/m/685358`, `/m/685362`, `/m/685363`
  - Mat & GYROKINESIS® Classes: `/m/685384`, `/m/685385`, `/m/685386`
  - Apparatus & GYROTONIC® Classes: `/m/685387`, `/m/685389`, `/m/685390`
- **Other booking links:** free 15 minute consultation and appointments `https://momence.com/appointments/appointment-reservation/37215`. Gift cards `https://momence.com/Ischyra-Soma-Fitness-Pilates-%26-GYROTONIC-Wellness-Center/gift-card-checkout/37215`.
- **Her advice to newcomers, from her own FAQ:** the best starting point is the Introductory Private Lesson. She also sells session packs, including an Introductory Private Lesson 3-pack.
- **Reviews:** none are used. Her site has testimonials, but the names could not be matched to the quotes with certainty. Build one empty, labelled placeholder ("Your Google reviews go here") with no name, no stars and no quote.
- **Conflicts to leave off:** an older address (1667 Crofton Center, Suite 6, Crofton) still appears on some directories. Her site lists eshael@ as a second email. Add both to the confirm list.
- **Do not claim:** star ratings, review counts, membership prices, years in business, insurance acceptance, physical therapy details, or any award beyond the line above.

## 2. The ONE goal

Every visitor action leads to **"Book this class"** on a real class time. That is the conversion engine (section 5). Calling 703.528.2821 is the always-visible second path. No other competing buttons, no newsletter, no email capture. Memberships and gift cards are on the page, but below the schedule and visually quieter than it.

## 3. Design direction: "Strength and Grace"

A quiet studio at 9 on a Saturday morning: daylight on a wood floor, maple equipment, one deep teal. It should feel unhurried and exact, like the method itself. It is emphatically not a gym page: no black backgrounds, no neon, no shouting, no stock smiles. The schedule is treated like a beautifully set timetable, with type doing the work.

- **Colours (a full system, by role). Write them as OKLCH tokens in the Tailwind `@theme` block with the hex beside each:**
  - Background `#F7F3EC` (warm ivory, from the studio walls)
  - Card / surface `#FFFDF9`, with 1px `#DDD5C7` borders
  - Text `#142F2E` (ink teal, never pure black), muted text `#4F6462`
  - Primary `#03696B` (studio teal, taken from the teal on her own teacher flyers, which measure about `#037374`, deepened slightly for contrast). Hover `#024F51`. Deep band `#0B3B3C`
  - Tint `#DCEBE6` (sea mist, a tint of the flyer's pale green) for the selected day and quiet highlights
  - Accent `#A8481F` (saddle, from the leather and maple of her equipment). Used only for the "Next class" marker and the newcomer badge. Its scarcity is the point
  - Success `#2F6B2A` (the green of her swan logo) for "spots left". Error `#A3312B`
  - Proportions: about 60% ivory, 30% white surfaces and ink text, under 10% teal, and the saddle accent in two places only.
  - Contrast, already checked: text on background 12.9 to 1. Muted text on background 5.7. White on primary 6.4. Primary on background 5.9. Primary on tint 5.3. Accent on background 5.3. Success on surface 6.4. Ivory on the deep band 11.1.
  - Never purple, never gradient accents, never glow. Photos are warm (wood and maple), so they sit on ivory without a tint. On the deep teal band, photos get no overlay, only a 1px ivory hairline frame.
- **Fonts (2 max, Google Fonts via `next/font`):**
  - Display: **Fraunces** (variable, weights 400 to 600, optical size on). A graceful serif with a little spring in its curves. Headlines, class times, the price.
  - Body: **Figtree** (400, 500, 600). Everything else.
  - Do not imitate her script wordmark with a font. The wordmark only ever appears as her logo image.
- **Type scale:** seven named steps (label, body, lead, h3, h2, h1, display), each a `clamp()` with rem bounds and a ceiling no more than 2.5 times its floor. Body never under 1rem. Text blocks about 66 characters wide. Body line height about 1.6, display about 1.05. The h1 clamp must pass this check: the longest word fits at 375px.
- **Material:** paper and maple. Cards are flat `#FFFDF9` with a 1px border and a 14px radius. No drop shadows except a soft one on the sticky bar. Class times are set in Fraunces with tabular figures so the column of times lines up like a printed timetable.
- **Spacing:** 8px grid. Section padding 112 to 128px desktop, 72px mobile.
- **Icons:** `lucide-react` only, one stroke width. Social icons are inline SVGs. No emoji.
- **Motion (only 2 places):** the hero "spring settle" and the First Class Finder result. Everything else gets hover and press states, plus plain CSS scroll reveals inside a reduced motion check. No loading intro, no cursor effects, no scroll-jacking. Respect `prefers-reduced-motion`. The headline and buttons are visible from the first instant and never fade in from invisible.
- **Layout variety:** the hero is type-led with the next class card. The schedule is a timetable list. The class guide is an uneven grid (two large cards, the rest small). "Three per class" is a split. Memberships are a quiet table on the deep teal band. Do not repeat four identical cards in a row down the page.

**What the best sites in this niche do (patterns only):**
- Keep one booking action on screen at all times on a phone, because people decide mid-scroll.
- State the class size and "no experience needed" early, because a newcomer's first fear is being lost in a crowd.
- Offer a single class before a commitment, with memberships after, because a term contract is a hard first step.
- Use real teachers and the real room, because trust in a body-work studio is personal.
- Build light, warm and fast, with a refined serif over a plain sans.
- Dated patterns to avoid: a full-screen lifestyle photo before any information, the booking system's stock widget dropped in unstyled, marquee banners, an old copyright year.
- Where even the best are weak, and where this page wins: almost none show a real class time on the first screen, none tell a newcomer which class to start with, and few show the price and spots left before the click.

**Things only this business has (all required):**
- Her tagline "Better living through strength and grace™" and her sign-off "Yours in strength and grace™".
- "3 per class" stated as a fact and proven by the live "spots left" count on every row.
- Her real teachers, by name and face, on every class.
- The Korean language class and the Men Only class, called out by name.
- Buff Bones® described in her own words for bone health.
- Best Pilates Studio in Crofton, fourth year in a row.
- The swan from her logo as the favicon.

## 4. Page structure (one page at `/`)

This is a mockup of one page: her class booking page. There is no `/contact` page and no other route except the 404. Contact details live in the Visit section and the footer.

**Nav (sticky, slim):** her script wordmark (`00-logo-2-script-wordmark-dark`, 150px wide) left. Anchors: Schedule, New here, Class guide, Memberships, Visit. Right: "703.528.2821" as a tap-to-call link with a phone icon, plus a "See class times" button that scrolls to the schedule. Mobile: a burger opens a full-screen sheet with big tap targets, plus a sticky bottom bar on mobile only: [Call] [See class times]. If `textEnabled` is true the bar adds [Text]. The sticky bar must never cover whatever has keyboard focus.

**1. Hero (make this the best section on the page):**
- Type-led on ivory. No full-bleed photo. On desktop, `01-studio-room-wide-BEST` sits in a contained panel on the right, about 5 of 12 columns, with a 14px radius. On phones the photo is left out of the first screen entirely.
- Eyebrow: "PILATES AND GYROTONIC® CLASSES IN GAMBRILLS, MD"
- Headline (Fraunces, large): **"This week's classes."** then **"Pick a time."**
- The eyebrow and the headline together are the page's single `<h1>`: the eyebrow as a small span, the headline as the large span.
- Sub: "Small classes at Ischyra Soma Fitness, never more than 3 people in the room. Find a time, see who is teaching, and book your spot."
- **The Next Class card**, directly under the sub. It shows the soonest upcoming class that is not cancelled: a saddle "NEXT CLASS" marker, the day and time in Fraunces ("Today, 6:00 PM"), the class name, the teacher's avatar and name, the length, "$45 single class", "1 of 3 spots left" in green, and the primary button "Book this class".
- **The day strip**, under the card: seven pills for the next seven days ("Tue 17", "Wed 18"...), each with a small count ("3 classes"). Today is selected, in the sea mist tint. Tapping a day scrolls to the schedule with that day open.
- **Signature motion, "spring settle":** on load the day strip glides in 24px from the right and the selected day pill settles with one small spring overshoot, like a reformer carriage coming to rest. 600ms, plays once. The Next Class card does not move. With reduced motion everything is simply in its final place.
- Under the day strip, three quick facts in a row: "3 people per class" | "Single classes from $25" | "Best Pilates Studio in Crofton, 4 years running" (`// DRAFT: confirm wording`).
- On a 375px screen the first screen shows, in order: nav, eyebrow, headline, sub (two lines), and the Next Class card with its button. The headline and the "Book this class" button must both be visible without scrolling.

**2. The schedule (id `schedule`):** headline "The full schedule". Sub: "All times are Eastern Time. In person at the studio unless marked Virtual."
- A day tab row (the same seven days, then "Next week"), sticky under the nav while this section is on screen.
- Filter chips: All, Mat, Apparatus, GYROTONIC®, GYROKINESIS®, Virtual. A second control filters by teacher. Filters and day are reflected in the URL hash so a link can open on "Saturday, Mat".
- Each class is one row: time in Fraunces with tabular figures, length, class name, a one-line level note where she gives one (Tower: "Best after 5 to 10 classes or 3 privates". Foundations: "Start here on equipment"), teacher avatar and name, spots left ("2 of 3 spots left", or "Full, join the waitlist"), the single-class price, and the "Book this class" button. On phones a row becomes a compact card with the button full width.
- A day with no classes says "No group classes this day. Private lessons are by appointment." with a link reading "Book a private lesson or free consultation".
- Under the list: "Prefer the app? Book on Momence for iPhone or Android" with two descriptive links.

**3. First Class Finder (the show-stopper, id `new-here`):** headline "New here? Find your first class in two taps."
- Step 1, "Have you done Pilates on equipment before?": "Never" | "A few classes" | "Yes, regularly".
- Step 2, "What are you after?": "Learn the equipment properly" | "Mat work, no equipment" | "Stretch and move more freely" | "Bone health and balance" | "A men only class" | "A class taught in Korean" | "A class from home".
- The result appears in place, with no contact form in front of it: the matched class name, her own description from section 1, and the next three real upcoming times for that class pulled from the schedule data, each with its teacher, spots left and a "Book this class" button.
- Matching rules: Learn the equipment maps to Pilates Apparatus: Foundations when step 1 is "Never" or "A few classes", and to Pilates Apparatus (plus Tower as "also for you") when step 1 is "Yes, regularly". Mat maps to Pilates Mat: Level I/II. Stretch maps to Stretch & Flex: GYROKINESIS®, with GYROTONIC® Tower Class as "also for you". Bone health maps to Buff Bones®, with her medical clearance note shown. Men only maps to Pilates Apparatus: Men Only. Korean maps to Pilates Apparatus: Korean Language. From home maps to Virtual Pilates Mat.
- Under every result, one calm line from her own advice: "Eshael recommends an Introductory Private Lesson as the best starting point." with a link reading "Book a free 15 minute consultation".
- The result panel opens with a short height and fade transition (the second motion piece). It works with mouse, touch and keyboard: the options are real radio groups, arrow keys move between them, and the result is announced to screen readers.
- If a matched class has no upcoming time in the data, say "No upcoming times right now" and offer the consultation link.
- **Fallback:** if the two-step interaction will not come together cleanly, build it as seven plain cards, one per goal, each showing the matched class and its next real time.

**4. Class guide (id `class-guide`, uneven grid, not identical cards):** headline "What each class is". Two large cards: Pilates Apparatus: Foundations (`08`) and Pilates Apparatus (`04`). Smaller cards: Tower (`03`), Pilates Mat Level I/II (`07`), GYROTONIC® Tower Class (`06` if present, else placeholder), Stretch & Flex: GYROKINESIS® (`05`), Buff Bones® (type-led), Men Only (type-led), Korean Language (type-led), Virtual Pilates Mat (type-led). Each card: her description from section 1, length, single-class price, and a button reading "See times for Pilates Mat" (with the right class name) that sets the schedule filter and scrolls to it. Each card carries a stable id (`#class-foundations`, `#class-mat` and so on).

**5. Three per class (proof she is real):** a split. Left: `02-eshael-on-spine-corrector`, large, with `09` small beside it. Right: headline "Three people. One teacher. Nowhere to hide, and no one left behind." Then, plainly: Eshael M. Johnson, M.S., classically trained Pilates instructor, GYROTONIC® teacher and GYROKINESIS® trainer. The Best in Crofton line. The Power Pilates host training centre line. Her tagline as a pull quote. Below it, the row of nine teacher avatars with names. Then the single empty review placeholder, labelled "Your Google reviews go here".

**6. Memberships and privates (id `memberships`, on the deep teal band):** headline "Ready to come every week?" Sub: "Memberships are billed once at the start of your chosen term." A quiet table: four rows (her four programs, with her own one-line descriptions) and three columns (3 months, 6 months, 12 months, with "Best Value" on 12). Each cell is a link reading for example "Choose 6 months of Mat & GYROKINESIS® Classes", going to the matching Momence link. No prices are shown. A pricing block exists in code, switched off, ready for "from $X" labels when she supplies numbers. Under the table, two quiet links: "Send a gift card" and "Book a free 15 minute consultation".

**7. Visit (id `visit`):** `10-studio-entrance-door` beside the address, the hours table, a "Get directions to Ischyra Soma Fitness" link to Google Maps, the phone link and the email link. On desktop, `01` repeats here at a contained size.

**8. FAQ (accordion, 6 questions, answered only from section 1):** Do I need experience? (No. Start with Foundations or mat, or an Introductory Private Lesson, which Eshael recommends.) How many people are in a class? (3 in person, 10 on the virtual mat class.) What does a single class cost? ($25 for mat, GYROKINESIS® and virtual classes, $45 for apparatus, GYROTONIC® Tower and Buff Bones® classes. Membership prices are shown at checkout.) Which class should I book first? (Points to the finder.) Is there a class in Korean, or for men only? (Yes, with the next real time for each, from the data.) Where are you? (The address, with the directions link.)

**9. Final call-to-action band:** ivory, type-led. "Yours in strength and grace™" as the line, then "See class times" and "Call 703.528.2821".

**10. Footer:** the colour swan logo, her tagline, phone (large), email, address, hours, the class list linking to the class guide ids, social icons. Small line: "© 2026 Ischyra Soma Fitness". On a separate small line: **"Concept preview by Lee Enterprises Unlimited."** (demo mode only, see section 7)

## 5. The schedule engine (the conversion engine)

There is no enquiry form on this page. She already has a booking system, so the engine is the schedule itself and every button books a real class.

**Data.** Build `lib/schedule.ts`, server side only:
- Fetch `https://readonly-api.momence.com/host-plugins/host/37215/host-schedule/sessions?pageSize=100&page=0` with a 5 second timeout and `revalidate: 900`. This is the public feed her own schedule widget reads. Each session has `id`, `sessionName`, `startsAt`, `endsAt`, `durationMinutes`, `teacher`, `inPerson`, `fixedTicketPrice`, `capacity`, `remainingSpots.remaining`, `isCancelled`, `link`.
- Drop every session where `isCancelled` is true. Keep the next 14 days. Format every time in `America/New_York`, whatever the visitor's own time zone, because classes happen in a room in Maryland.
- If the fetch fails, times out or returns nothing, fall back to `data/schedule-snapshot.json` and show a small honest note above the schedule: "Showing a saved schedule from 17 November 2026. Confirm times when you book." The build must succeed with no network at all.
- `// DRAFT: before launch, confirm with Momence the supported way to read the schedule (their official embed or API), and confirm Eshael is happy for single classes to be bookable from this page.`
- Never show a class time that is not in the data. Never hardcode a time.

**The button.** One setting in `lib/business.ts`, `bookingMode`, decides what "Book this class" does:
- `'session'` (the default for the demo): a real link to that session's own `link` on Momence, opened in a new tab, with link text like "Book Pilates Mat, Saturday 9:30 AM".
- `'membership'`: the button reads "See membership options" and scrolls to section 6. This mirrors what her current page does, in case she wants membership first.
- `// DRAFT: confirm which mode she wants`.

**Honesty.** Nothing is submitted on this page, so there is no success message. The visitor leaves to her real checkout. Spots left come from the data. If `remaining` is 0, the row reads "Full, join the waitlist" and still links to the session.

**Second paths.** Call uses `tel:+17035282821`. The text link uses `sms:+17035282821` with the body "Hi, I would like to book a class at Ischyra Soma Fitness." and only renders when `textEnabled` is true. On a desktop computer a text link does nothing, so there it is replaced by the email link.

## 6. Tech and file rules

- Install the current stable releases, print the installed versions, and read the upgrade notes for those major versions before writing code, because your habits may be older than the tools. At this date that means Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.
- Known changes to respect: route `params` and `searchParams` are Promises and must be awaited. The `middleware` file is now `proxy`. `next lint` is gone, so lint with ESLint directly. Tailwind 4 keeps its design tokens in a CSS `@theme` block, not a JavaScript config file.
- Motion: the `motion` library, imported from `motion/react`, loaded lazily and used only for the two motion pieces. Everything else is CSS.
- Server-rendered by default. Only the day tabs, filters, finder and mobile sheet are client components.
- One component file per section in `components/sections/`, plus `components/Schedule/` and `components/FirstClassFinder/`. **No file over 500 lines.**
- All business facts in `lib/business.ts`, class descriptions in `lib/classes.ts`, schedule logic in `lib/schedule.ts`.
- Fully responsive at 375, 768, 1024 and 1440px, with no horizontal scroll.
- Accessibility to WCAG 2.2 AA: semantic landmarks, alt text written from the photo map, visible focus rings in primary teal, the contrast pairs in section 3, base text 16px, tap targets 44px (never under 24px), zoom never blocked, tabs and filters with proper roles and keyboard support.
- Speed budgets on a production build with the phone profile: main content painted within 2.5 seconds, layout shift under 0.1, response to taps within 200 milliseconds.
- A "Back to top" button that appears only after scrolling 1.5 screens.
- **Link preview:** Open Graph and Twitter `summary_large_image` tags, a generated 1200x630 `og-image.png` (ivory background, the colour swan logo, "This week's classes" in Fraunces, and photo `01`), and a favicon and Apple touch icon made from `00-logo-3-swan-mark-black`. The link preview is the first thing the owner sees, so check it looks right.
- A real 404 page that returns a 404 status.
- No backend, no database, no API keys, no analytics scripts beyond `@vercel/analytics`.

## 7. SEO: built to score 100 at launch

This is a demo, but its SEO is finished, not postponed. Target: **Lighthouse SEO 100 in live mode**, and 90 or higher on Performance, Accessibility and Best Practices. Print the Lighthouse version you used.

**The launch switch.** A concept page must stay out of Google so it never competes with her real site, but Lighthouse fails any page marked `noindex`. So build one switch and drive everything from it:

- `NEXT_PUBLIC_SITE_MODE`: `demo` (the default) or `live`. `NEXT_PUBLIC_SITE_URL`: the base URL for every absolute link.
- **Demo mode:** robots meta `noindex, nofollow`, and an `X-Robots-Tag: noindex, nofollow` header on every response (pages, images, files), set in the framework's headers config. `app/robots.ts` still allows search engines in so they can read the hidden tag, lists no sitemap, and disallows the AI crawlers by name. `app/sitemap.ts` returns nothing. No `llms.txt`. The concept footer line shows.
- **Live mode:** robots meta `index, follow`, no hidden header. `app/robots.ts` lists the sitemap. `app/sitemap.ts` lists the page with a real last-modified date. `llms.txt` is served, written in Markdown with a top heading and proper links. The concept footer line is hidden. The build fails if any DRAFT item, placeholder review card or `// TODO: swap` marker remains.
- The deployed demo stays in demo mode. Live mode is only ever run locally.
- Expect the demo itself to read about 69 on SEO, with "hidden from search" the only failing check. That is by design. If your measured number differs, report the real one.

**Words in the right places**
- Title: `Pilates Classes in Gambrills, MD | Ischyra Soma Fitness` (55 characters).
- Meta description: `See this week's Pilates, GYROTONIC and GYROKINESIS class times at Ischyra Soma Fitness in Gambrills, MD. Three people per class. Book your spot online.`
- Exactly one `<h1>` on the page, server-rendered, containing "Pilates" and "Gambrills, MD" (see the hero). The logo is never the h1.
- The first paragraph under the hero says what she does and where. Headings step down in order and describe their sections.
- Name, address and phone as text in the Visit section and the footer, exactly as in section 1.
- "Crofton, Gambrills and surrounding Anne Arundel County communities" written out as text in the Visit section.

**What Lighthouse checks (all must pass in live mode)**
- `<html lang="en">`, a viewport tag, a 200 status, a valid `robots.txt`, a self-referencing canonical.
- Alt text on every image, written from the photo map. Decorative images get an empty alt.
- Every link says where it goes. No bare "learn more", "click here" or "read more". Icon-only links get an `aria-label`.
- Links are real links with an `href`. Anything that changes a filter, a day or the finder is a `<button>`.
- No hreflang.

**Structured data (JSON-LD, server-rendered, must validate)**
- `ExerciseGym` (a LocalBusiness subtype) with name, phone, URL, logo, image, address, geo, opening hours and `areaServed`.
- A `Service` entry for each class type in section 1.
- `FAQPage` markup is optional and earns no visible result in Google now. Include it only if it matches the visible FAQ word for word.
- Never add `aggregateRating` or `review` markup. Never mark up individual class sessions as events with invented details. Only true things.
- Validate every block: use a schema.org validator if one is reachable, otherwise parse each block and check its required properties by hand, and say which you did.

**`SEO-LAUNCH.md`** in the repo root, a short checklist for launch day: set `NEXT_PUBLIC_SITE_MODE=live` and `NEXT_PUBLIC_SITE_URL` to the real domain, redeploy, confirm the robots meta and sitemap. Redirect the old address `/site-booking/` to the new page, one to one, never to the home page. Link the Google Business Profile's booking button to this page. Update the address everywhere it still shows 1667 Crofton Center: Google Business Profile, Apple Business, Bing Places, Yelp, ClassPass, MapQuest and Thumbtack. Submit the sitemap in Google Search Console and Bing Webmaster Tools, request indexing, confirm the host's bot protection is not blocking search crawlers, and retire the preview address. Replace every DRAFT item. One honest line for the owner: the page is technically complete, and ranking from here depends mostly on her Google profile, reviews, links and listings.

## 8. Copy rules (strict)

- **No em dashes or double hyphens anywhere.** Use periods and commas.
- Short, plain, warm. Sound like a teacher who has taught this for years and has nothing to prove, not a marketing agency. Cut every sentence that does not earn its place.
- No hype words ("revolutionary", "transform", "seamless", "elevate", "journey"). No fake stats, no review counts, no "#1" claims, no prices beyond the single-class prices in section 1.
- Write GYROTONIC®, GYROKINESIS® and Buff Bones® with their marks, as she does.
- No medical promises. Buff Bones® keeps her own "with medical clearance" wording.
- Anything you had to assume gets a `// DRAFT` comment.

## 9. Build order (follow it, and tick the boxes)

Before writing any UI, create `implementation_kickstart.md` containing this plan, the design tokens and the checklist in section 10. Commit it. Then build ONE phase at a time. After each phase run the dev server, screenshot desktop (1440px) and mobile (375px) with Playwright (install its browser first, and if it cannot install, say so and check by reading the rendered HTML instead), look at the screenshots yourself, fix the three weakest things you see, run `npm run check`, print the result, tick the box and commit. Never regenerate the whole project to fix one section.

`npm run check` is a script you write in phase 1. It tests what a script can test: one h1 on the page, no broken internal links or anchors, no leftover blanks or placeholder text, no em dashes, alt text and dimensions on every image, every phone number and email on the page matching `lib/business.ts`, no class time on the page that is not in the schedule data, and no DRAFT items in live mode.

- [ ] Phase 1: scaffold, tokens, fonts, the check script, and a palette board (the swatches, a button, a card, a paragraph of body text and photo `01`). Screenshot the board and fix anything muddy or harsh before going on
- [ ] Phase 2: `lib/schedule.ts` with the live fetch and the snapshot fallback, nav, **hero with the Next Class card, day strip and spring settle** (polish it on mobile first until it is the best thing on the page), footer
- [ ] Review 1: a fresh subagent that has not seen the build scores the hero screenshots as an award juror would (design 40, usability 30, creativity 20, content 10) and names the three weakest things. One round of fixes, no more
- [ ] Phase 3: the full schedule with day tabs, filters, teacher filter and URL hash
- [ ] Phase 4: **First Class Finder**, then the class guide
- [ ] Phase 5: three per class, memberships band, visit, FAQ, final band, mobile sticky bar
- [ ] Phase 6: everything in section 7: the launch switch, the hidden-from-search header, title and description, the single h1, JSON-LD (validated), robots and sitemap, `llms.txt`, OG image, favicon, 404 page, `SEO-LAUNCH.md`
- [ ] Phase 6b: Lighthouse, mobile and desktop, in both modes, always against a production build, never the dev server. First live mode, locally, with `NEXT_PUBLIC_SITE_MODE=live NEXT_PUBLIC_SITE_URL=http://localhost:3000`. SEO must be 100, the other three 90 or higher. Then demo mode: the only failing SEO audit may be the indexing one. Fix whatever else is flagged and run again. Report the real numbers. If Lighthouse cannot run here, say so plainly and list what you checked by hand. Never estimate a score
- [ ] Review 2: a second fresh subagent scores the full page the same way and runs a fact audit: every number, name, time, price and claim on the built page is checked against section 1 and the schedule data. One round of fixes, no more
- [ ] Phase 7: final review against section 10, commit, and get it ready for a GitHub push and a Vercel import as its own project at an address that says preview or concept and never imitates her domain

## 10. Final review checklist (go through it before you say you are done)

- [ ] The first phone screen shows a real upcoming class with its time, teacher, price, spots left and a working "Book this class" button. The spring settle plays once.
- [ ] Every time on the page comes from the schedule data, in Eastern Time. Cancelled classes never appear. With the network off, the snapshot shows with its honest note.
- [ ] Every "Book this class" button opens the right Momence session. Switching `bookingMode` to `'membership'` changes every button.
- [ ] The First Class Finder returns the right class for all 21 combinations, shows real next times, and works with mouse, touch and keyboard.
- [ ] All 12 membership links, the gift card link and the consultation link go to the addresses in section 1.
- [ ] Every item in "Things only this business has" is on the page.
- [ ] Zero em dashes, zero "--" in copy, zero stock or AI-generated images, zero invented facts, no membership prices, no star ratings.
- [ ] The review placeholder is empty and labelled. Every DRAFT item is commented.
- [ ] Max 2 fonts, the palette tokens only, motion in only 2 places, no cursor effects or loading intro.
- [ ] Mobile at 375px: no overflow, burger works, the sticky bar works and never covers the focused element. A keyboard-only pass and a 200% zoom pass both succeed.
- [ ] Demo mode serves `noindex, nofollow` in both the meta tag and the header, with the concept line in the footer. Live mode serves `index, follow`, the sitemap and no concept line.
- [ ] The Open Graph image and favicon are hers, not a framework default.
- [ ] Lighthouse SEO is 100 in live mode, mobile and desktop. Performance, Accessibility and Best Practices are 90 or higher. In demo mode the only failing SEO audit is the indexing one.
- [ ] One h1 with "Pilates" and "Gambrills, MD". Every link and image has meaningful text. JSON-LD validates and claims nothing untrue.

## 11. When you finish

Print: the local URL, the installed versions, the Lighthouse version and scores for all four scored categories in both modes (mobile and desktop), the response headers of the home page and of one image in demo mode, the structured data validation result, the title, description and h1, the last `npm run check` output, desktop and mobile screenshots of the hero, the schedule, the First Class Finder and the memberships band, and a list of every `DRAFT` item the owner needs to confirm or supply: whether single classes may be booked from this page or membership comes first, the supported Momence feed, whether 703.528.2821 takes texts, the studio hours, the Best in Crofton wording, the second email, the old Crofton Center address on directories, client permission for photos `08` and `09`, who is pictured in `07`, real reviews with names and dates, a vector logo file, photos for the classes that have none, and membership prices if she wants them shown.
