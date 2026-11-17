import { Monitor } from "lucide-react";
import type { Session } from "@/lib/schedule";
import { classByKey } from "@/lib/classes";
import { BookButton } from "@/components/ui/BookButton";
import { Spots } from "@/components/ui/Spots";
import { Avatar } from "@/components/ui/Avatar";

function TimeLabel({ session }: { session: Session }) {
  const [clock, meridiem] = session.timeLabel.split(" ");
  return (
    <time dateTime={session.startsAt} className="tnum font-display text-[1.625rem] leading-none text-ink">
      {clock}
      <span className="ml-1 text-[0.9375rem] tracking-wide text-muted">{meridiem}</span>
    </time>
  );
}

/** One class: a timetable row on wide screens, a compact card on phones. */
export function ScheduleRow({ session }: { session: Session }) {
  const info = classByKey(session.classKey);
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 border-b border-line px-4 py-5 last:border-b-0 sm:px-6 md:grid-cols-[7.5rem_minmax(0,1fr)_12.5rem_auto] md:items-center md:gap-x-6 md:py-6">
      <div className="flex items-baseline gap-3 md:block">
        <TimeLabel session={session} />
        <p className="text-[0.9375rem] text-muted md:mt-1.5">{session.durationMinutes} min</p>
      </div>
      <p className="tnum self-start text-right font-display text-h3 md:hidden">${session.price}</p>

      <div className="col-span-2 min-w-0 md:col-span-1">
        <h4 className="font-display text-h3 font-medium leading-tight">{session.name}</h4>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-muted">
          {info?.levelNote && <span>{info.levelNote}</span>}
          {!session.inPerson && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-0.5 text-label font-semibold text-teal">
              <Monitor aria-hidden="true" className="size-3.5" strokeWidth={1.75} /> Virtual, on Zoom
            </span>
          )}
        </p>
      </div>

      <div className="col-span-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 md:col-span-1 md:block">
        <p className="flex items-center gap-2.5">
          <Avatar src={session.teacherPhoto} name={session.teacher} size={36} decorative />
          <span className="whitespace-nowrap font-medium leading-tight">{session.teacher}</span>
        </p>
        <Spots remaining={session.remaining} capacity={session.capacity} className="text-[0.9375rem] md:mt-2" />
      </div>

      <div className="col-span-2 flex items-center gap-5 md:col-span-1">
        <p className="tnum hidden text-right md:block">
          <span className="block font-display text-h3 leading-none">${session.price}</span>
          <span className="text-label text-muted">single class</span>
        </p>
        <BookButton session={session} size="sm" className="w-full md:w-auto" />
      </div>
    </li>
  );
}
