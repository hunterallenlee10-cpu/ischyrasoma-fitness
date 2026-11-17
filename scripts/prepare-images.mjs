// Crops the few source photos that carry a watermark, badge, edge or bystander,
// and builds the favicon and Apple touch icon from her black swan mark.
// Crops keep the full remaining resolution. next/image does all resizing at request time.
// Run with: npm run images
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const raw = join(root, "public/images/raw");
const out = join(root, "public/images/crop");
mkdirSync(out, { recursive: true });

const crops = [
  // Small swan badge sits in the top left corner. Cut the left strip.
  { file: "02-eshael-on-spine-corrector.jpg", left: 228, top: 0, width: 852, height: 1080 },
  // Script watermark sits top right. Keep the left side, with her raised arms.
  { file: "04-eshael-arc-reach-on-barrel.jpg", left: 0, top: 0, width: 705, height: 1080 },
  // Thin white edge on the right and video controls along the bottom.
  { file: "05-seated-gyrokinesis-stool.jpg", left: 0, top: 0, width: 942, height: 1455 },
  // Bystander's legs on the left edge.
  { file: "07-mat-reverse-plank.jpg", left: 440, top: 0, width: 2762, height: 2163 },
  // Soften the dark lens vignette in the corners.
  { file: "08-teacher-guiding-client-reformer.jpg", left: 110, top: 160, width: 1860, height: 2700 },
  { file: "09-teacher-and-client-reformer-arms-up.jpg", left: 180, top: 300, width: 2380, height: 3500 },
];

for (const c of crops) {
  const info = await sharp(join(raw, c.file))
    .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(out, c.file));
  console.log("crop", c.file, `${info.width}x${info.height}`);
}

// Favicon and Apple touch icon from the black swan mark.
const app = join(root, "app");
const mark = join(raw, "00-logo-3-swan-mark-black.png");
await sharp(mark).resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(join(app, "icon.png"));
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#F7F3EC" } })
  .composite([{ input: await sharp(mark).resize(144, 144, { fit: "contain", background: { r: 247, g: 243, b: 236, alpha: 1 } }).flatten({ background: "#F7F3EC" }).png().toBuffer(), gravity: "center" }])
  .png()
  .toFile(join(app, "apple-icon.png"));
console.log("icons written");
