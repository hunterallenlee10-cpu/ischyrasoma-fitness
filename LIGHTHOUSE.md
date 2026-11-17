# Lighthouse results

Lighthouse 13.6.0, Chromium 1243 headless, against a production build (`npm run build && npm start`), never the dev server. Final run on 17 November 2026, after both review rounds.

| Mode | Device | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Live (`NEXT_PUBLIC_SITE_MODE=live`, local only) | Mobile | 99 | 100 | 100 | 100 | 0.9 s | 0 | 100 ms |
| Live | Desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| Demo (deployed preview) | Mobile | 99 | 100 | 100 | 69 | 0.9 s | 0 | 140 ms |
| Demo | Desktop | 100 | 100 | 100 | 69 | 0.7 s | 0 | 0 ms |

In demo mode the single failing SEO audit is `is-crawlable` ("Page is blocked from indexing"). That is by design: the preview carries `noindex, nofollow` so it never competes with her real site.

The live run used `ALLOW_DRAFTS=1` to get past the live-mode DRAFT guard for this local test. A real live deployment builds without it and fails until every DRAFT item is resolved.

Commands:

```bash
NEXT_PUBLIC_SITE_MODE=live NEXT_PUBLIC_SITE_URL=http://localhost:3000 ALLOW_DRAFTS=1 npm run build
NEXT_PUBLIC_SITE_MODE=live NEXT_PUBLIC_SITE_URL=http://localhost:3000 npm start
CHROME_PATH=/opt/pw-browsers/chromium npx lighthouse@13 http://localhost:3000/ --chrome-flags="--headless=new --no-sandbox"
CHROME_PATH=/opt/pw-browsers/chromium npx lighthouse@13 http://localhost:3000/ --preset=desktop --chrome-flags="--headless=new --no-sandbox"
```

## Deployed preview on Vercel

https://ischyra-booking-concept.vercel.app, demo mode, Lighthouse 13.6.0 from this container.

| Device | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile | 77 on the first (cold) run, then 91 and 94 | 100 | 100 | 69 (only `is-crawlable`, by design) |
| Desktop | 100 | 100 | 100 | 69 (only `is-crawlable`, by design) |

LCP 0.9 to 1.0 s and CLS 0 on every run. The mobile spread is total blocking time from hydration (300 ms to 1.1 s across runs), with the same JavaScript as the local build.
