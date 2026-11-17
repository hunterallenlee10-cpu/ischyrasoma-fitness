// Builds the 1200x630 Open Graph and Twitter image from her real logo, photo 01 and Fraunces.
// Run with: npm run og (writes app/opengraph-image.png and app/twitter-image.png)
import { createRequire } from "node:module";
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const { chromium } = createRequire(import.meta.url)("playwright");
const root = new URL("..", import.meta.url).pathname;
const b64 = (p) => readFileSync(join(root, p)).toString("base64");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:F;src:url(data:font/woff2;base64,${b64("app/fonts/Fraunces-opsz-wght.woff2")}) format("woff2");font-weight:300 700}
@font-face{font-family:S;src:url(data:font/woff2;base64,${b64("app/fonts/Figtree-wght.woff2")}) format("woff2");font-weight:300 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F7F3EC;color:#142F2E;font-family:S;display:grid;grid-template-columns:640px 1fr;overflow:hidden}
.l{padding:56px 0 56px 64px;display:flex;flex-direction:column}
.logo{width:150px;height:auto}
.eb{margin-top:auto;font-weight:600;font-size:20px;letter-spacing:.14em;text-transform:uppercase;color:#03696B}
h1{font-family:F;font-weight:500;font-size:84px;line-height:1.02;letter-spacing:-.02em;margin-top:14px}
h1 span{display:block;color:#03696B;font-weight:400}
.f{margin-top:28px;font-size:24px;color:#4F6462}
.r{padding:40px 40px 40px 0}
.r img{width:100%;height:100%;object-fit:cover;object-position:38% 50%;border-radius:18px;border:1px solid #DDD5C7}
</style></head><body>
<div class="l"><img class="logo" src="data:image/png;base64,${b64("public/images/raw/00-logo-swan-logo-colour-transparent.png")}">
<p class="eb">Pilates and GYROTONIC® in Gambrills, MD</p>
<h1>This week&rsquo;s classes.<span>Pick a time.</span></h1>
<p class="f">Three people per class. Book your spot online.</p></div>
<div class="r"><img src="data:image/jpeg;base64,${b64("public/images/raw/01-studio-room-wide-BEST.jpg")}"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const out = join(root, "app/opengraph-image.png");
await page.screenshot({ path: out, type: "png" });
await browser.close();
copyFileSync(out, join(root, "app/twitter-image.png"));
const alt = "Ischyra Soma Fitness: this week's Pilates classes in Gambrills, MD, beside a photo of the studio";
writeFileSync(join(root, "app/opengraph-image.alt.txt"), alt);
writeFileSync(join(root, "app/twitter-image.alt.txt"), alt);
console.log("wrote app/opengraph-image.png and app/twitter-image.png");
