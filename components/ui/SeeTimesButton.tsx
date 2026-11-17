"use client";

import { ArrowDown } from "lucide-react";
import { openSchedule } from "@/lib/schedule-nav";

/** Sets the schedule's class filter and scrolls to it. A button, because it changes a filter. */
export function SeeTimesButton({ cls, label, className = "" }: { cls: string; label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openSchedule({ cls }, { scroll: true })}
      className={`btn btn-quiet min-h-11 px-4 text-[0.9375rem] whitespace-nowrap ${className}`}
    >
      See times for {label}
      <ArrowDown aria-hidden="true" className="size-4" strokeWidth={1.75} />
    </button>
  );
}
