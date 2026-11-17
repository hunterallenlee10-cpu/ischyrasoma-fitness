// Shared by every control that opens the schedule on a day or filter. State lives in the URL hash
// (#schedule?day=sat&type=mat&teacher=minson-kim&class=buff-bones) so a link can open on "Saturday, Mat".

export type ScheduleState = { day?: string; type?: string; teacher?: string; cls?: string };
export const SCHEDULE_EVENT = "isf:schedule";

export function parseScheduleHash(hash: string): ScheduleState | null {
  const h = hash.replace(/^#/, "");
  if (!h.startsWith("schedule")) return null;
  const q = new URLSearchParams(h.split("?")[1] ?? "");
  return {
    day: q.get("day") ?? undefined,
    type: q.get("type") ?? undefined,
    teacher: q.get("teacher") ?? undefined,
    cls: q.get("class") ?? undefined,
  };
}

export function scheduleHash(s: ScheduleState) {
  const q = new URLSearchParams();
  if (s.day) q.set("day", s.day);
  if (s.type && s.type !== "all") q.set("type", s.type);
  if (s.teacher && s.teacher !== "all") q.set("teacher", s.teacher);
  if (s.cls) q.set("class", s.cls);
  const qs = q.toString();
  return `#schedule${qs ? `?${qs}` : ""}`;
}

/** Update the hash without jumping, tell the schedule, and optionally scroll to it. */
export function openSchedule(next: ScheduleState, opts: { scroll?: boolean; replace?: boolean } = {}) {
  const hash = scheduleHash(next);
  if (opts.replace) history.replaceState(null, "", hash);
  else history.pushState(null, "", hash);
  window.dispatchEvent(new CustomEvent<ScheduleState>(SCHEDULE_EVENT, { detail: next }));
  if (opts.scroll) {
    const el = document.getElementById("schedule");
    if (el) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      const heading = document.getElementById("schedule-heading");
      heading?.focus({ preventScroll: true });
    }
  }
}
