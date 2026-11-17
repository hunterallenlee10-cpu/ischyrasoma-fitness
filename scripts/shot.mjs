// Screenshot helper. Usage:
// node scripts/shot.mjs <url> <outPrefix> [--full] [--selector=#id] [--widths=1440,375] [--scale=1]
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const [url, out, ...rest] = process.argv.slice(2);
const opts = Object.fromEntries(rest.map((a) => a.replace(/^--/, "").split("=")).map(([k, v]) => [k, v ?? true]));
const widths = String(opts.widths ?? "1440,375").split(",").map(Number);
const scale = Number(opts.scale ?? 1);

const browser = await chromium.launch();
for (const w of widths) {
  const h = w <= 400 ? 667 : w <= 800 ? 1024 : 900;
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: scale,
    reducedMotion: opts.reduced ? "reduce" : "no-preference",
    hasTouch: w <= 800,
    isMobile: w <= 800,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(Number(opts.wait ?? 900));
  if (opts.selector) {
    const el = page.locator(opts.selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await el.screenshot({ path: `${out}-${w}.png` });
  } else {
    await page.screenshot({ path: `${out}-${w}.png`, fullPage: Boolean(opts.full) });
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${out}-${w}.png`, overflow > 0 ? `OVERFLOW ${overflow}px` : "no overflow");
  await ctx.close();
}
await browser.close();
