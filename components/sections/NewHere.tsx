import type { ScheduleData, Session } from "@/lib/schedule";
import { FirstClassFinder } from "@/components/FirstClassFinder/FirstClassFinder";

export function NewHere({ data }: { data: ScheduleData }) {
  // The next three real times for each class, straight from the schedule data.
  const upcoming: Record<string, Session[]> = {};
  for (const s of data.upcoming) {
    const list = (upcoming[s.classKey] ??= []);
    if (list.length < 3) list.push(s);
  }

  return (
    <section id="new-here" aria-labelledby="new-here-heading" className="section border-t border-line bg-surface">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow text-teal">First Class Finder</p>
          <h2 id="new-here-heading" className="mt-3 text-h2">
            New here? Find your first class in two taps.
          </h2>
          <p className="measure mt-4 text-lead text-muted">
            No experience needed. Every in-person class holds three people, so your teacher sees every move.
          </p>
        </div>
        <div className="mt-12">
          <FirstClassFinder upcoming={upcoming} />
        </div>
      </div>
    </section>
  );
}
