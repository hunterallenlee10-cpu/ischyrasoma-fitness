// npm run check: tests what a script can test on the rendered page.
// Needs a running server. CHECK_URL defaults to http://localhost:3000
import { createRequire } from "node:module";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = new URL("..", import.meta.url).pathname;
const base = (process.env.CHECK_URL || "http://localhost:3000").replace(/\/$/, "");
const results = [];
const pass = (name, detail = "") => results.push({ ok: true, name, detail });
const fail = (name, detail) => results.push({ ok: false, name, detail });

// Facts from lib/business.ts (read as text so this script needs no TypeScript build).
const businessSrc = readFileSync(join(root, "lib/business.ts"), "utf8");
const phoneDisplay = businessSrc.match(/display:\s*"([^"]+)"/)[1];
const phoneTel = businessSrc.match(/tel:\s*"([^"]+)"/)[1];
const phoneSms = businessSrc.match(/sms:\s*"([^"]+)"/)[1];
const email = businessSrc.match(/email:\s*"([^"]+)"/)[1];

// Schedule data: the snapshot plus the live feed, if reachable. Cancelled classes are never allowed.
const snapshot = JSON.parse(readFileSync(join(root, "data/schedule-snapshot.json"), "utf8")).sessions;
let live = [];
try {
  const r = await fetch("https://readonly-api.momence.com/host-plugins/host/37215/host-schedule/sessions?pageSize=100&page=0", {
    signal: AbortSignal.timeout(6000),
  });
  if (r.ok) live = (await r.json()).payload ?? [];
} catch {}
const tf = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit", hour12: true });
const allowed = new Map();
for (const s of [...snapshot, ...live]) {
  if (s.isCancelled) continue;
  allowed.set(String(s.id), tf.format(new Date(s.startsAt)).replace(/\s/g, " "));
}
const cancelledIds = new Set(live.filter((s) => s.isCancelled).map((s) => String(s.id)));
const allowedTimes = new Set(allowed.values());

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const res = await page.goto(base + "/", { waitUntil: "networkidle" });
if (!res || res.status() !== 200) fail("home page returns 200", `status ${res && res.status()}`);
else pass("home page returns 200");
const mode = (await res.headerValue("x-robots-tag")) ? "demo" : "live";

const dom = await page.evaluate(() => {
  const text = document.body.innerText;
  const imgs = [...document.images].map((i) => ({
    src: i.currentSrc || i.src,
    alt: i.getAttribute("alt"),
    w: i.getAttribute("width"),
    h: i.getAttribute("height"),
    decorative: i.getAttribute("aria-hidden") === "true" || i.getAttribute("role") === "presentation",
  }));
  const links = [...document.querySelectorAll("a")].map((a) => ({
    href: a.getAttribute("href"),
    name: (a.getAttribute("aria-label") || a.textContent || "").replace(/\s+/g, " ").trim(),
    session: a.getAttribute("data-session-id"),
    time: a.getAttribute("data-session-time"),
  }));
  const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
  const h1 = [...document.querySelectorAll("h1")].map((h) => h.textContent.replace(/\s+/g, " ").trim());
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
  const sessionTimes = [...document.querySelectorAll("[data-session-time]")].map((e) => ({
    id: e.getAttribute("data-session-id"),
    time: e.getAttribute("data-session-time"),
  }));
  return { text, imgs, links, ids, h1, headings, sessionTimes, html: document.documentElement.outerHTML };
});

// 1. One h1, with the words that matter.
if (dom.h1.length === 1) pass("exactly one h1", dom.h1[0]);
else fail("exactly one h1", `found ${dom.h1.length}`);
if (dom.h1[0] && /Pilates/.test(dom.h1[0]) && /Gambrills, MD/i.test(dom.h1[0])) pass("h1 has Pilates and Gambrills, MD");
else fail("h1 has Pilates and Gambrills, MD", dom.h1[0] || "none");
let skipped = false;
for (let i = 1; i < dom.headings.length; i++) if (dom.headings[i] - dom.headings[i - 1] > 1) skipped = true;
skipped ? fail("headings step down in order", dom.headings.join(",")) : pass("headings step down in order");

// 2. Internal links and anchors.
const idSet = new Set(dom.ids);
const badAnchors = [];
const internal = new Set();
for (const l of dom.links) {
  if (!l.href) {
    badAnchors.push("(no href) " + l.name);
    continue;
  }
  if (l.href.startsWith("#")) {
    const id = l.href.slice(1).split("?")[0];
    if (id && !idSet.has(id)) badAnchors.push(l.href);
  } else if (l.href.startsWith("/") && !l.href.startsWith("//")) internal.add(l.href.split("#")[0]);
}
for (const href of internal) {
  const r = await fetch(base + href);
  if (r.status !== 200) badAnchors.push(`${href} -> ${r.status}`);
}
badAnchors.length ? fail("no broken internal links or anchors", badAnchors.join(" | ")) : pass("no broken internal links or anchors", `${dom.links.length} links`);

// 3. Link text says where it goes.
const vague = dom.links.filter((l) => /^(learn more|click here|read more|more|here|link)$/i.test(l.name) || !l.name);
vague.length ? fail("every link has descriptive text", vague.map((l) => l.href).join(" | ")) : pass("every link has descriptive text");

// 4. No leftover blanks or placeholder text.
const blanks = dom.text.match(/lorem|ipsum|\bTODO\b|\bTBD\b|\bXXX\b|undefined|\bNaN\b|\[object|\{\{|\$\{|\bnull\b/gi);
blanks ? fail("no leftover blanks or placeholder text", [...new Set(blanks)].join(", ")) : pass("no leftover blanks or placeholder text");

// 5. No em dashes or double hyphens, on the page or in source copy.
const pageDash = dom.text.match(/.{0,30}(—|--).{0,30}/g);
const srcFiles = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if ([".ts", ".tsx", ".md", ".txt"].includes(extname(p)) && !p.endsWith("BUILD-SPEC.md")) srcFiles.push(p);
  }
};
["app", "components", "lib", "public"].forEach((d) => {
  try {
    walk(join(root, d));
  } catch {}
});
const srcDash = srcFiles.filter((f) => readFileSync(f, "utf8").includes("—")).map((f) => f.replace(root, ""));
pageDash || srcDash.length
  ? fail("zero em dashes and double hyphens", [...(pageDash || []), ...srcDash].join(" | "))
  : pass("zero em dashes and double hyphens");

// 6. Alt text and dimensions on every image.
const badImgs = dom.imgs.filter((i) => i.alt === null || !i.w || !i.h);
badImgs.length ? fail("alt text and dimensions on every image", badImgs.map((i) => i.src).join(" | ")) : pass("alt text and dimensions on every image", `${dom.imgs.length} images`);

// 7. Phone numbers and emails match lib/business.ts.
const phoneBad = [];
for (const l of dom.links) {
  if (l.href?.startsWith("tel:") && l.href !== phoneTel) phoneBad.push(l.href);
  if (l.href?.startsWith("sms:") && !l.href.startsWith(phoneSms)) phoneBad.push(l.href);
  if (l.href?.startsWith("mailto:") && l.href.replace("mailto:", "").split("?")[0] !== email) phoneBad.push(l.href);
}
for (const m of dom.text.match(/\(?\d{3}\)?[\s.\-]\d{3}[.\-]\d{4}/g) || []) if (m !== phoneDisplay) phoneBad.push(m);
for (const m of dom.text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || []) if (m !== email) phoneBad.push(m);
phoneBad.length ? fail("phone and email match lib/business.ts", phoneBad.join(" | ")) : pass("phone and email match lib/business.ts", `${phoneDisplay}, ${email}`);

// 8. Every class time on the page is in the schedule data, and cancelled sessions never show.
const timeBad = [];
for (const s of dom.sessionTimes) {
  if (cancelledIds.has(s.id)) timeBad.push(`cancelled session ${s.id}`);
  else if (!allowed.has(s.id)) timeBad.push(`unknown session ${s.id}`);
  else if (allowed.get(s.id) !== s.time.replace(/\s/g, " ")) timeBad.push(`session ${s.id} shows ${s.time}, data says ${allowed.get(s.id)}`);
}
for (const t of dom.text.match(/\b\d{1,2}:\d{2}\s?[AP]M\b/g) || []) if (!allowedTimes.has(t.replace(/\s+/g, " "))) timeBad.push(`time "${t}" not in data`);
for (const l of dom.links) {
  const m = l.href?.match(/momence\.com\/s\/(\d+)/);
  if (m && !allowed.has(m[1])) timeBad.push(`booking link to unknown session ${m[1]}`);
}
timeBad.length
  ? fail("every class time is in the schedule data", timeBad.join(" | "))
  : pass("every class time is in the schedule data", `${dom.sessionTimes.length} sessions, source ${live.length ? "live+snapshot" : "snapshot"}`);

// 9. Live mode: no DRAFT items, review placeholder or TODO: swap markers.
if (mode === "live") {
  const drafts = srcFiles.filter((f) => /DRAFT|TODO: swap/.test(readFileSync(f, "utf8"))).map((f) => f.replace(root, ""));
  const placeholder = /Your Google reviews go here/.test(dom.text);
  drafts.length || placeholder
    ? fail("live mode: no DRAFT items or placeholders", [...drafts, placeholder ? "review placeholder on page" : ""].filter(Boolean).join(" | "))
    : pass("live mode: no DRAFT items or placeholders");
} else pass("demo mode: DRAFT items allowed", "X-Robots-Tag present");

await browser.close();
const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
console.log(`\n${results.length - failed.length}/${results.length} checks passed, mode ${mode}, ${base}`);
process.exit(failed.length ? 1 : 0);
