# SEO launch day checklist

The preview runs in demo mode: `noindex, nofollow` in the meta tag and the `X-Robots-Tag` header, no sitemap, no `llms.txt`, and the concept line in the footer. It must never compete with the real site.

## 1. Switch to live

- [ ] Replace every `DRAFT` item (see the list in the hand-off notes). A live build fails while any `DRAFT`, `TODO: swap` marker or the placeholder review card remains (`scripts/live-guard.mjs`).
- [ ] Set `NEXT_PUBLIC_SITE_MODE=live` and `NEXT_PUBLIC_SITE_URL=https://<her real domain>` in the hosting project. Never set `ALLOW_DRAFTS` on a real deployment.
- [ ] Redeploy.
- [ ] Confirm the page source shows `<meta name="robots" content="index, follow">` and that the response has no `X-Robots-Tag` header.
- [ ] Confirm `/robots.txt` lists `Sitemap: https://<domain>/sitemap.xml`, `/sitemap.xml` lists the page with today's date, and `/llms.txt` answers.
- [ ] Confirm the canonical tag points at the real domain and the footer concept line is gone.

## 2. Move the old address over

- [ ] Redirect the old booking page `/site-booking/` to this page with a permanent (301) redirect, one to one. Never send it to the home page.
- [ ] Point the Google Business Profile booking button at this page.

## 3. Fix the address everywhere

The old address (1667 Crofton Center, Suite 6, Crofton) still shows on some directories. Update each to Princess Crofton Shopping Center, 1166 State Route 3 S, Suite 105, Gambrills, MD 21054, phone 703.528.2821, written exactly the same way every time:

- [ ] Google Business Profile
- [ ] Apple Business (Apple Maps)
- [ ] Bing Places
- [ ] Yelp
- [ ] ClassPass
- [ ] MapQuest
- [ ] Thumbtack

## 4. Tell the search engines

- [ ] Submit the sitemap in Google Search Console and request indexing for the page.
- [ ] Submit the sitemap in Bing Webmaster Tools.
- [ ] Check the host's bot protection or firewall is not blocking Googlebot or Bingbot.
- [ ] Retire the preview address (or keep it in demo mode, never both live).

## 5. One honest line for the owner

The page is technically complete for search: one clear heading, real class times, correct name, address and phone, structured data and a fast build. From here, ranking for "pilates classes Gambrills MD" depends mostly on your Google Business Profile, your reviews, links from local sites and consistent listings, not on more changes to this page.
