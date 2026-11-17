"use client";

import { useEffect, useState } from "react";
import { LazyMotion, m, useReducedMotion } from "motion/react";
import { openSchedule, parseScheduleHash, SCHEDULE_EVENT, type ScheduleState } from "@/lib/schedule-nav";

const loadFeatures = () => import("@/lib/motion-features").then((r) => r.default);

export type StripDay = { key: string; weekdayShort: string; dayNum: number; weekdayLong: string; count: number; isToday: boolean };

/**
 * Seven days. On load the strip glides in 24px from the right and the selected pill settles with one
 * small spring overshoot, like a reformer carriage coming to rest. Plays once, 600ms. Reduced motion: still.
 */
export function DayStrip({ days }: { days: StripDay[] }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(days[0]?.key);

  useEffect(() => {
    const sync = (s: ScheduleState | null) => {
      if (s?.day && days.some((d) => d.key === s.day)) setSelected(s.day);
    };
    sync(parseScheduleHash(location.hash));
    const onChange = (e: Event) => sync((e as CustomEvent<ScheduleState>).detail);
    window.addEventListener(SCHEDULE_EVENT, onChange);
    return () => window.removeEventListener(SCHEDULE_EVENT, onChange);
  }, [days]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <nav aria-label="Classes by day" className="-mx-4 sm:mx-0">
        <m.ul
          className="spring-strip no-scrollbar relative flex gap-2 overflow-x-auto px-4 pb-1 sm:grid sm:grid-cols-7 sm:overflow-visible sm:px-0"
          initial={reduce ? false : { x: 24 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {days.map((d) => {
            const isSel = d.key === selected;
            return (
              <li key={d.key} className="shrink-0">
                <button
                  type="button"
                  onClick={() => openSchedule({ day: d.key }, { scroll: true })}
                  aria-current={isSel ? "date" : undefined}
                  className={`group relative flex min-h-[4.25rem] w-[4.75rem] flex-col items-center justify-center rounded-[12px] border px-2 py-2 text-center transition-colors sm:w-full ${
                    isSel ? "border-teal/40 text-ink" : "border-line bg-surface text-ink hover:border-teal/50"
                  }`}
                >
                  {isSel && (
                    <m.span
                      aria-hidden="true"
                      className="spring-pill absolute inset-0 rounded-[11px] bg-mist"
                      initial={reduce ? false : { x: 14 }}
                      animate={{ x: 0 }}
                      transition={{ type: "spring", duration: 0.6, bounce: 0.35 }}
                    />
                  )}
                  <span className="relative text-label font-semibold uppercase tracking-[0.12em] text-muted">
                    {d.weekdayShort}
                  </span>
                  <span className="tnum relative font-display text-[1.375rem] leading-none">{d.dayNum}</span>
                  <span className="relative mt-1 text-[0.8125rem] leading-none text-muted">
                    {d.count === 0 ? "No classes" : `${d.count} ${d.count === 1 ? "class" : "classes"}`}
                  </span>
                  <span className="sr-only">{`, ${d.weekdayLong}${d.isToday ? ", today" : ""}, open the schedule`}</span>
                </button>
              </li>
            );
          })}
        </m.ul>
      </nav>
    </LazyMotion>
  );
}
