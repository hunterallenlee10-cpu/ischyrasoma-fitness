// Clicks through all 21 First Class Finder combinations and checks the matched class, real times and the advice line.
const { chromium } = require("playwright");
const exp = ["Never", "A few classes", "Yes, regularly"];
const goals = { "Learn the equipment properly": ["Pilates Apparatus: Foundations", "Pilates Apparatus: Foundations", "Pilates Apparatus"], "Mat work, no equipment": "Pilates Mat: Level I/II", "Stretch and move more freely": "Stretch & Flex: GYROKINESIS®", "Bone health and balance": "Buff Bones®", "A men only class": "Pilates Apparatus: Men Only", "A class taught in Korean": "Pilates Apparatus: Korean Language", "A class from home": "Virtual Pilates Mat" };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto((process.env.CHECK_URL || "http://localhost:3000") + "/", { waitUntil: "networkidle" });
  let ok = 0, bad = [];
  for (const [i, e] of exp.entries()) for (const [g, want] of Object.entries(goals)) {
    await p.locator(`#new-here label:text-is("${e}")`).click();
    await p.locator(`#new-here label:text-is("${g}")`).click();
    await p.waitForTimeout(450);
    const w = Array.isArray(want) ? want[i] : want;
    const got = await p.locator("#new-here article h3").first().innerText();
    const times = await p.locator("#new-here article [data-session-id]").count();
    const also = await p.locator("#new-here article").first().innerText();
    const advice = also.includes("Eshael recommends an Introductory Private Lesson");
    if (got === w && advice && (times > 0 || also.includes("No upcoming times right now"))) ok++; else bad.push(`${e} + ${g}: got ${got}, times ${times}`);
  }
  console.log(`finder: ${ok}/21 combinations correct`, bad);
  await b.close();
})();
