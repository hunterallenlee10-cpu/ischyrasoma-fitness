import { Monitor } from "lucide-react";
import type { Session } from "@/lib/schedule";
import { classByKey } from "@/lib/classes";
import { BookButton } from "@/components/ui/BookButton";
import { Spots } from "@/components/ui/Spots";
import { Avatar } from "@/components/ui/Avatar";

export function NextClassCard({ session, when }: { session: Session | null; when: string }) {
  if (!session) {
    return (
      <div className="card p-5 sm:p-6">
        <p className="font-display text-h3">No upcoming group classes right now.</p>
        <p className="mt-2 text-muted">Private lessons are by appointment.</p>
      </div>
    );
  }
  const info = classByKey(session.classKey);
  return (
    <article aria-labelledby="next-class-title" className="card relative p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow inline-flex items-center gap-2 text-saddle">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-saddle" />
          Next class
        </p>
        {!session.inPerson && (
          <p className="inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-0.5 text-label font-semibold text-teal">
            <Monitor aria-hidden="true" className="size-3.5" strokeWidth={1.75} /> Virtual
          </p>
        )}
      </div>
      <p className="tnum mt-2 font-display text-[clamp(1.75rem,1.4rem+1.6vw,2.375rem)] font-medium leading-[1.05]">
        {when}
      </p>
      <p id="next-class-title" className="mt-1 font-display text-h3 text-ink">
        {session.name}
        {info?.levelNote && <span className="sr-only">. {info.levelNote}</span>}
      </p>
      <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <Avatar src={session.teacherPhoto} name={session.teacher} size={40} decorative />
        <p className="min-w-0 leading-snug">
          <span className="font-semibold">{session.teacher}</span>
          <span className="block text-muted">
            {session.durationMinutes} min <span aria-hidden="true">·</span> ${session.price} single class
          </span>
        </p>
      </div>
      <Spots remaining={session.remaining} capacity={session.capacity} className="mt-3" />
      <BookButton id="next-class-book" session={session} className="mt-4 w-full" />
    </article>
  );
}
