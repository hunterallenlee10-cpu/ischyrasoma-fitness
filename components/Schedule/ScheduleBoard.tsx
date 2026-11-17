"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import type { ScheduleDay, Session } from "@/lib/schedule";
import { classByKey, typeFilters, type ClassType } from "@/lib/classes";
import { business } from "@/lib/business";
import { openSchedule, parseScheduleHash, SCHEDULE_EVENT, type ScheduleState } from "@/lib/schedule-nav";
import { ScheduleRow } from "@/components/Schedule/ScheduleRow";

const NEXT_WEEK = "next-week";

type Props = {
  week: ScheduleDay[];
  nextWeek: ScheduleDay[];
  teachers: { slug: string; name: string }[];
};

export function ScheduleBoard({ week, nextWeek, teachers }: Props) {
  const [day, setDay] = useState(week[0]?.key ?? NEXT_WEEK);
  const [type, setType] = useState<"all" | ClassType>("all");
  const [teacher, setTeacher] = useState("all");
  const [cls, setCls] = useState<string | undefined>(undefined);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const matches = useCallback(
    (s: Session, f: { type: string; teacher: string; cls?: string }) => {
      if (f.cls && s.classKey !== f.cls) return false;
      if (f.teacher !== "all" && s.teacherSlug !== f.teacher) return false;
      if (f.type === "all") return true;
      if (f.type === "virtual") return !s.inPerson;
      return classByKey(s.classKey)?.types.includes(f.type as ClassType) ?? false;
    },
    [],
  );

  const tabs = useMemo(() => {
    const f = { type, teacher, cls };
    const list = week.map((d) => ({
      key: d.key,
      label: d.weekdayShort,
      num: String(d.dayNum),
      long: `${d.weekdayLong} ${d.dayNum} ${d.monthShort}${d.isToday ? ", today" : ""}`,
      count: d.sessions.filter((s) => matches(s, f)).length,
    }));
    list.push({
      key: NEXT_WEEK,
      label: "Next",
      num: "week",
      long: "Next week",
      count: nextWeek.reduce((n, d) => n + d.sessions.filter((s) => matches(s, f)).length, 0),
    });
    return list;
  }, [week, nextWeek, type, teacher, cls, matches]);

  /** Apply a new state. If the open day has nothing left after filtering, move to the first day that has. */
  const apply = useCallback(
    (next: ScheduleState, opts: { fromFilter?: boolean; writeHash?: boolean } = {}) => {
      const nType = (typeFilters.some((t) => t.key === next.type) ? next.type : "all") as "all" | ClassType;
      const nTeacher = next.teacher && teachers.some((t) => t.slug === next.teacher) ? next.teacher : "all";
      const nCls = next.cls && classByKey(next.cls) ? next.cls : undefined;
      let nDay = next.day && (next.day === NEXT_WEEK || week.some((d) => d.key === next.day)) ? next.day : undefined;
      const f = { type: nType, teacher: nTeacher, cls: nCls };
      const countFor = (k: string) =>
        k === NEXT_WEEK
          ? nextWeek.reduce((n, d) => n + d.sessions.filter((s) => matches(s, f)).length, 0)
          : (week.find((d) => d.key === k)?.sessions.filter((s) => matches(s, f)).length ?? 0);
      if (!nDay || (opts.fromFilter && countFor(nDay) === 0)) {
        const keys = [...week.map((d) => d.key), NEXT_WEEK];
        nDay = (opts.fromFilter && keys.find((k) => countFor(k) > 0)) || nDay || week[0]?.key || NEXT_WEEK;
      }
      setType(nType);
      setTeacher(nTeacher);
      setCls(nCls);
      setDay(nDay);
      if (opts.writeHash) openSchedule({ day: nDay, type: nType, teacher: nTeacher, cls: nCls }, { replace: true });
    },
    [week, nextWeek, teachers, matches],
  );

  // Read the URL hash on load, and follow later changes from the hero, the class guide or the finder.
  useEffect(() => {
    const fromHash = () => {
      const s = parseScheduleHash(location.hash);
      if (s) apply(s, { fromFilter: Boolean(s.type || s.teacher || s.cls) && !s.day });
    };
    fromHash();
    const onEvent = (e: Event) => {
      const s = (e as CustomEvent<ScheduleState>).detail;
      apply(s, { fromFilter: !s.day });
    };
    window.addEventListener(SCHEDULE_EVENT, onEvent);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener(SCHEDULE_EVENT, onEvent);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [apply]);

  const current = { day, type, teacher, cls };
  const f = { type, teacher, cls };
  const days = day === NEXT_WEEK ? nextWeek : week.filter((d) => d.key === day);
  const anyFilter = type !== "all" || teacher !== "all" || Boolean(cls);
  const clsInfo = cls ? classByKey(cls) : undefined;

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const last = tabs.length - 1;
    const to = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (to < 0) return;
    e.preventDefault();
    tabRefs.current[to]?.focus();
    apply({ ...current, day: tabs[to].key }, { writeHash: true });
  };

  return (
    <div>
      {/* Day tabs stay under the nav while the schedule is on screen. */}
      <div className="sticky top-16 z-20 -mx-4 border-b border-line bg-ivory/95 px-4 pt-3 backdrop-blur-sm sm:mx-0 sm:px-0 lg:top-[4.5rem]">
        <div role="tablist" aria-label="Choose a day" className="no-scrollbar relative -mb-px flex gap-1 overflow-x-auto">
          {tabs.map((t, i) => {
            const sel = t.key === day;
            return (
              <button
                key={t.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.key}`}
                type="button"
                aria-selected={sel}
                aria-controls="schedule-panel"
                tabIndex={sel ? 0 : -1}
                onKeyDown={(e) => onTabKey(e, i)}
                onClick={() => apply({ ...current, day: t.key }, { writeHash: true })}
                className={`relative flex min-h-14 min-w-[4.25rem] shrink-0 flex-col items-center justify-center rounded-t-[10px] border-b-2 px-3 pb-2 pt-1.5 transition-colors sm:flex-1 ${
                  sel ? "border-teal bg-mist text-ink" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                <span className="text-label font-semibold uppercase tracking-[0.12em]">{t.label}</span>
                <span className="tnum font-display text-[1.125rem] leading-tight text-ink">{t.num}</span>
                <span className="sr-only">{`, ${t.long}, ${t.count} ${t.count === 1 ? "class" : "classes"}`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by class type" className="no-scrollbar relative -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {typeFilters.map((t) => {
            const on = type === t.key && !cls;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={on}
                onClick={() => apply({ ...current, type: t.key, cls: undefined }, { fromFilter: true, writeHash: true })}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
                  on ? "border-teal bg-teal text-white" : "border-line bg-surface text-ink hover:border-teal"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-3 text-[0.9375rem] font-medium">
          Teacher
          <select
            value={teacher}
            onChange={(e) => apply({ ...current, teacher: e.target.value }, { fromFilter: true, writeHash: true })}
            className="min-h-11 flex-1 rounded-full border border-line bg-surface px-4 pr-9 text-ink lg:flex-none"
          >
            <option value="all">All teachers</option>
            {teachers.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {clsInfo && (
        <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-mist py-1 pl-4 pr-1 text-[0.9375rem]">
          Showing {clsInfo.name} only
          <button
            type="button"
            onClick={() => apply({ ...current, cls: undefined }, { writeHash: true })}
            className="inline-flex min-h-9 items-center gap-1 rounded-full bg-surface px-3 font-semibold text-teal"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={2} /> Show every class
          </button>
        </p>
      )}

      <div
        id="schedule-panel"
        role="tabpanel"
        aria-labelledby={`tab-${day}`}
        tabIndex={-1}
        className="mt-6 space-y-8"
      >
        {days.length === 0 && day === NEXT_WEEK && (
          <div className="card p-6 sm:p-8">
            <p className="font-display text-h3">No classes are listed for next week yet.</p>
          </div>
        )}
        {days.map((d) => {
          const list = d.sessions.filter((s) => matches(s, f));
          return (
            <section key={d.dateKey} aria-labelledby={`day-${d.dateKey}`}>
              <h3 id={`day-${d.dateKey}`} className="mb-3 flex items-baseline gap-3 font-display text-h3">
                {d.heading}
                <span className="font-sans text-[0.9375rem] font-normal text-muted">
                  {d.heading === d.weekdayLong ? "" : `${d.weekdayLong}, `}
                  {d.dayNum} {d.monthShort}
                </span>
              </h3>
              {list.length > 0 ? (
                <ol className="card overflow-hidden">
                  {list.map((s) => (
                    <ScheduleRow key={s.id} session={s} />
                  ))}
                </ol>
              ) : d.sessions.length === 0 ? (
                <div className="card p-6 sm:p-8">
                  <p className="font-display text-h3">No group classes this day.</p>
                  <p className="mt-1 text-muted">Private lessons are by appointment.</p>
                  <a href={business.momence.consultation} className="link mt-4 inline-block">
                    Book a private lesson or free consultation
                  </a>
                </div>
              ) : (
                <div className="card p-6 sm:p-8">
                  <p className="font-display text-h3">Nothing on {d.weekdayLong} matches these filters.</p>
                  {anyFilter && (
                    <button
                      type="button"
                      onClick={() => apply({ day, type: "all", teacher: "all" }, { writeHash: true })}
                      className="btn btn-quiet mt-4"
                    >
                      Show every class on {d.weekdayLong}
                    </button>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
