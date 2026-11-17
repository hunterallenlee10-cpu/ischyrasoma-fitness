# Hand-off: what Eshael needs to confirm or supply

Every item below is marked `// DRAFT` (or `TODO: swap`) in the code. In live mode the build refuses to run until each one is resolved (`scripts/live-guard.mjs`).

## Decisions

1. **Single classes or membership first.** "Book this class" currently opens the Momence session for that class (`bookingMode: 'session'` in `lib/business.ts`). Her current page sends every visitor to memberships first. One switch flips every button to "See membership options".
2. **The schedule feed.** Researched 17 November 2026:
   - **Today:** the page reads `readonly-api.momence.com/host-plugins/host/37215/host-schedule/sessions`. That is the same feed Momence's own official Schedule plugin (`momence.com/plugin/host-schedule/host-schedule.js`, installed from Studio Setup > Add to Website) calls. It needs no keys or login. It is not in Momence's public API docs, so it could change without notice. The saved snapshot covers that case.
   - **Documented alternative:** Momence Public API v2 (api.docs.momence.com). She creates a client in Dashboard > Apps & Integrations > Developer API, which is self-serve. `GET /api/v2/host/sessions` returns name, start, duration, capacity, bookingCount, teacher, isCancelled and isInPerson, so spots left come out exact. It needs a staff login (OAuth password grant) and tokens that refresh every few hours. Prices would come from `lib/classes.ts`, because the host session data has no price. Switching is contained to `lib/schedule.ts`.
   - **Optional:** Momence webhooks (`session.booked` and others) can refresh spots the moment someone books. They are experimental and support has to switch them on.
   - **Optional:** Momence documents embedding its checkout page in an iframe, so booking could happen without leaving her page.
   - **Booking stays on Momence** in every option: each button opens `momence.com/s/<session id>`.
3. **Texting.** A text link is built and switched off (`textEnabled: false`). Turn it on once she confirms 703.528.2821 takes texts.

## Facts to confirm

4. **Studio hours.** These are from her site's own data, but some live class times fall outside them: Pilates Apparatus Tuesday 7:30 AM (studio hours say Tuesday 5 to 9 PM), Men Only Saturday 3:00 PM (Saturday 7 AM to 2 PM), and Stretch & Flex Thursday 12:00 PM for 55 minutes (Thursday morning hours end at 12 PM). The same hours are in the structured data.
5. **The award wording.** "Best Pilates Studio in Crofton, Maryland for the fourth year in a row (Best in Crofton 2025)" and the short form "Best Pilates Studio in Crofton, 4 years running".
6. **Second email.** Her site also lists an eshael@ address. The page uses only info@ischyrasomafitness.co.
7. **Old address.** Some directories still show 1667 Crofton Center, Suite 6, Crofton. See `SEO-LAUNCH.md` for the list to fix.
8. **Search phrase.** "pilates classes Gambrills MD" was chosen as the main phrase. Confirm it against her Google Business Profile category.
9. **Buff Bones® filter.** It sits under no type chip (it is not mat, apparatus, GYROTONIC® or GYROKINESIS®). It shows under All and through its own class filter. Confirm where she files it.

## Permissions and people

10. **Photo 08** (teacher guiding a client on the reformer): client permission.
11. **Photo 09** (teacher and client on the reformer, arms up): client permission.
12. **Photo 07** (reverse plank on the mat): who is pictured, and permission.

## Things to supply

13. **Real Google reviews** with names and dates, for the empty "Your Google reviews go here" card.
14. **A vector logo file** (SVG or PDF). The script wordmark is a 315px PNG, fine at nav size only.
15. **Photos for classes that have none**: GYROTONIC® Tower Class (photo 06 of the pulley tower was not in the Drive folder), Buff Bones®, Men Only, Korean Language and Virtual Pilates Mat. Until then they use a labelled placeholder or a type-led card, never another class's photo.
16. **Membership prices**, if she wants "from $X" shown. A pricing block is built and switched off (`showMembershipPrices`).
17. **Membership one-liners** in her own words for the four programs. The rows show names only until she supplies them.

## Not used, on purpose

- Testimonials from her site: the names could not be matched to the quotes with certainty.
- Class times from her teacher flyers: two of them are out of date.
