// Runs before every build. In live mode the build fails while any DRAFT item, the placeholder
// review card or a "TODO: swap" marker remains. ALLOW_DRAFTS=1 skips the guard for local
// Lighthouse runs only. Never set it on a real deployment.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

if (process.env.NEXT_PUBLIC_SITE_MODE !== "live") process.exit(0);
const root = new URL("..", import.meta.url).pathname;
const hits = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if ([".ts", ".tsx", ".css", ".txt", ".json"].includes(extname(p))) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        if (/DRAFT|TODO: swap|Your Google reviews go here/.test(line)) hits.push(`${p.replace(root, "")}:${i + 1}`);
      });
    }
  }
};
["app", "components", "lib"].forEach((d) => walk(join(root, d)));
if (!hits.length) process.exit(0);
if (process.env.ALLOW_DRAFTS === "1") {
  console.warn(`live-guard: ${hits.length} DRAFT items remain. ALLOW_DRAFTS=1 set, continuing for a local test build only.`);
  process.exit(0);
}
console.error(`live-guard: live mode build blocked, ${hits.length} DRAFT items or placeholders remain:\n` + hits.join("\n"));
process.exit(1);
