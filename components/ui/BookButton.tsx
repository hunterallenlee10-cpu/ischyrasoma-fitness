import { ArrowUpRight } from "lucide-react";
import { bookingMode } from "@/lib/business";
import type { Session } from "@/lib/schedule";

/**
 * The one primary action. In 'session' mode it is a real link to the Momence session.
 * In 'membership' mode it reads "See membership options" and goes to the memberships band.
 */
export function BookButton({
  session,
  className = "",
  size = "md",
  id,
}: {
  session: Session;
  className?: string;
  size?: "md" | "sm";
  id?: string;
}) {
  const sizing = size === "sm" ? "min-h-11 px-4 text-[0.9375rem]" : "";
  if (bookingMode === "membership") {
    return (
      <a id={id} href="#memberships" className={`btn btn-primary ${sizing} ${className}`}>
        See membership options
      </a>
    );
  }
  const full = session.remaining === 0;
  return (
    <a
      id={id}
      href={session.link}
      target="_blank"
      rel="noopener"
      data-session-id={session.id}
      data-session-time={session.timeLabel}
      className={`btn btn-primary ${sizing} ${className}`}
    >
      {full ? "Join the waitlist" : "Book this class"}
      <span className="sr-only">
        {`, ${session.name}, ${session.whenLabel}, with ${session.teacher} (opens Momence in a new tab)`}
      </span>
      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
    </a>
  );
}
