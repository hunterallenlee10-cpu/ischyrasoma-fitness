import { Info } from "lucide-react";
import type { ScheduleData } from "@/lib/schedule";
import { business, teachers } from "@/lib/business";
import { ScheduleBoard } from "@/components/Schedule/ScheduleBoard";

export function ScheduleSection({ data }: { data: ScheduleData }) {
  // Only teachers who actually teach in the next two weeks appear in the teacher filter.
  const teaching = new Set([...data.week, ...data.nextWeek].flatMap((d) => d.sessions.map((s) => s.teacherSlug)));
  const teacherOptions = teachers.filter((t) => teaching.has(t.slug)).map(({ slug, name }) => ({ slug, name }));

  return (
    <section id="schedule" aria-labelledby="schedule-heading" className="section scroll-mt-16 border-t border-line bg-ivory">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow text-teal">Book a class</p>
          <h2 id="schedule-heading" tabIndex={-1} className="mt-3 text-h2 outline-none">
            The full schedule
          </h2>
          <p className="measure mt-4 text-lead text-muted">
            Pilates, GYROTONIC® and GYROKINESIS® classes at {business.name}, in the {business.address.center} in{" "}
            {business.address.city}, {business.address.region}. All times are Eastern Time. In person at the studio
            unless marked Virtual.
          </p>
        </div>

        {data.source === "snapshot" && (
          <p role="note" className="mt-6 inline-flex items-start gap-2 rounded-[12px] border border-line bg-surface px-4 py-3 text-[0.9375rem]">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={1.75} />
            Showing a saved schedule from {data.snapshotLabel}. Confirm times when you book.
          </p>
        )}

        <div className="mt-10">
          <ScheduleBoard week={data.week} nextWeek={data.nextWeek} teachers={teacherOptions} />
        </div>

        <p className="mt-10 text-[0.9375rem] text-muted">
          Prefer the app? Book on Momence for{" "}
          <a href={business.momence.iosApp} className="link">
            iPhone, from the App Store
          </a>{" "}
          or{" "}
          <a href={business.momence.androidApp} className="link">
            Android, from Google Play
          </a>
          .
        </p>
      </div>
    </section>
  );
}
