import "server-only";
import snapshot from "@/data/schedule-snapshot.json";
import { business, teacherBySlugOrName, slugify } from "@/lib/business";
import { classForDataName } from "@/lib/classes";

// This is the feed Momence's own Schedule plugin (momence.com/plugin/host-schedule) reads. It is not in
// their public API docs. The documented alternative is GET /api/v2/host/sessions (see HANDOFF.md item 2).
// DRAFT: before launch, confirm with Momence which they prefer, and confirm Eshael is happy for single
// classes to be bookable from this page.
const FEED_URL = `https://readonly-api.momence.com/host-plugins/host/${business.momence.hostId}/host-schedule/sessions?pageSize=100&page=0`;
const TZ = "America/New_York";
const DAY_MS = 86_400_000;

export type Session = {
  id: string;
  classKey: string;
  name: string;
  startsAt: string;
  durationMinutes: number;
  teacher: string;
  teacherSlug: string;
  teacherPhoto: string | null;
  inPerson: boolean;
  price: number;
  capacity: number;
  remaining: number;
  link: string;
  dateKey: string;
  weekdayShort: string;
  weekdayLong: string;
  timeLabel: string;
  /** "Saturday 9:30 AM" for link text. */
  whenLabel: string;
  /** "Sat 21 Nov" */
  dateLabel: string;
};

export type ScheduleDay = {
  key: string;
  dateKey: string;
  weekdayShort: string;
  weekdayLong: string;
  dayNum: number;
  monthShort: string;
  isToday: boolean;
  /** "Today", "Tomorrow" or the weekday. */
  heading: string;
  sessions: Session[];
};

export type ScheduleData = {
  source: "live" | "snapshot";
  snapshotLabel: string;
  week: ScheduleDay[];
  nextWeek: ScheduleDay[];
  all: Session[];
  /** Every upcoming session in the feed, past the 14-day window too. Used for "next three times". */
  upcoming: Session[];
  next: Session | null;
  nextRelative: string;
};

type RawSession = {
  id: number | string;
  sessionName?: string;
  name?: string;
  startsAt: string;
  durationMinutes?: number;
  teacher?: string;
  inPerson?: boolean;
  fixedTicketPrice?: number | null;
  price?: number | null;
  capacity?: number;
  remainingSpots?: { remaining?: number; total?: number } | null;
  remaining?: number;
  isCancelled?: boolean;
  link?: string;
};

const dateKeyFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true });
const weekdayShortFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" });
const weekdayLongFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long" });
const dayNumFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, day: "numeric" });
const monthFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "short" });

export function dateKeyOf(d: Date) {
  return dateKeyFmt.format(d);
}

/** Noon UTC on a calendar date keeps weekday maths safe from DST edges. */
function noonOf(dateKey: string) {
  return new Date(`${dateKey}T17:00:00.000Z`);
}

function addDays(dateKey: string, n: number) {
  return dateKeyOf(new Date(noonOf(dateKey).getTime() + n * DAY_MS));
}

function normalise(raw: RawSession): Session | null {
  if (raw.isCancelled) return null;
  const name = (raw.sessionName ?? raw.name ?? "").trim();
  const info = classForDataName(name);
  if (!name || !raw.startsAt || !raw.link) return null;
  const start = new Date(raw.startsAt);
  if (Number.isNaN(start.getTime())) return null;
  const teacherName = (raw.teacher ?? "").trim();
  const teacher = teacherBySlugOrName(teacherName);
  const capacity = raw.capacity ?? raw.remainingSpots?.total ?? 0;
  const remaining = Math.max(0, raw.remainingSpots?.remaining ?? raw.remaining ?? 0);
  const price = raw.fixedTicketPrice ?? raw.price ?? info?.price ?? 0;
  // Keep "6:00 PM" together on one line.
  const timeLabel = timeFmt.format(start).replace(/\s/g, "\u00a0");
  const weekdayLong = weekdayLongFmt.format(start);
  return {
    id: String(raw.id),
    classKey: info?.key ?? slugify(name),
    name: info?.name ?? name,
    startsAt: start.toISOString(),
    durationMinutes: raw.durationMinutes ?? 55,
    teacher: teacher?.name ?? teacherName,
    teacherSlug: teacher?.slug ?? slugify(teacherName),
    teacherPhoto: teacher?.photo ?? null,
    inPerson: raw.inPerson !== false,
    price,
    capacity,
    remaining,
    link: raw.link,
    dateKey: dateKeyOf(start),
    weekdayShort: weekdayShortFmt.format(start),
    weekdayLong,
    timeLabel,
    whenLabel: `${weekdayLong} ${timeLabel}`,
    dateLabel: `${weekdayShortFmt.format(start)} ${dayNumFmt.format(start)} ${monthFmt.format(start)}`,
  };
}

async function fetchLive(): Promise<RawSession[] | null> {
  try {
    const res = await fetch(FEED_URL, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 900 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { payload?: RawSession[] };
    const list = Array.isArray(json?.payload) ? json.payload : null;
    return list && list.length > 0 ? list : null;
  } catch {
    return null;
  }
}

function buildDay(dateKey: string, todayKey: string, sessions: Session[]): ScheduleDay {
  const d = noonOf(dateKey);
  const weekdayLong = weekdayLongFmt.format(d);
  const tomorrowKey = addDays(todayKey, 1);
  return {
    key: weekdayShortFmt.format(d).toLowerCase(),
    dateKey,
    weekdayShort: weekdayShortFmt.format(d),
    weekdayLong,
    dayNum: Number(dayNumFmt.format(d)),
    monthShort: monthFmt.format(d),
    isToday: dateKey === todayKey,
    heading: dateKey === todayKey ? "Today" : dateKey === tomorrowKey ? "Tomorrow" : weekdayLong,
    sessions: sessions.filter((s) => s.dateKey === dateKey),
  };
}

export function relativeWhen(s: Session, todayKey: string) {
  if (s.dateKey === todayKey) return `Today, ${s.timeLabel}`;
  if (s.dateKey === addDays(todayKey, 1)) return `Tomorrow, ${s.timeLabel}`;
  return `${s.weekdayLong}, ${s.timeLabel}`;
}

export async function getSchedule(): Promise<ScheduleData> {
  const live = process.env.SCHEDULE_OFFLINE === "1" ? null : await fetchLive();
  const source: ScheduleData["source"] = live ? "live" : "snapshot";
  const raw: RawSession[] = live ?? (snapshot.sessions as RawSession[]);

  let all = raw
    .map(normalise)
    .filter((s): s is Session => s !== null)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  let now = Date.now();
  // A saved schedule that has fully passed would leave the page empty. Anchor to its first day instead,
  // the note above the schedule already says which date it was saved on.
  if (source === "snapshot" && !all.some((s) => Date.parse(s.startsAt) > now) && all.length) {
    now = Date.parse(all[0].startsAt) - 60_000;
  }
  const todayKey = dateKeyOf(new Date(now));
  const endKey = addDays(todayKey, 14);
  const upcoming = all.filter((s) => Date.parse(s.startsAt) > now);
  all = upcoming.filter((s) => s.dateKey < endKey);

  const week = Array.from({ length: 7 }, (_, i) => buildDay(addDays(todayKey, i), todayKey, all));
  const nextWeek = Array.from({ length: 7 }, (_, i) => buildDay(addDays(todayKey, i + 7), todayKey, all)).filter(
    (d) => d.sessions.length > 0,
  );
  const next = all[0] ?? null;

  return {
    source,
    snapshotLabel: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
      new Date(`${snapshot.fetched}T12:00:00Z`),
    ),
    week,
    nextWeek,
    all,
    upcoming,
    next,
    nextRelative: next ? relativeWhen(next, todayKey) : "",
  };
}
